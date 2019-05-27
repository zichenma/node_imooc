const queryString = require('querystring');
const handleBlogRouter = require ('./src/router/blog');
const handleUserRouter = require('./src/router/user');
const { get, set } = require('./src/db/redis');

// session 数据
// const SESSION_DATA = {};

// 设置一天的过期时间
const getCookieExpires = () => {
    const d = new Date();
    d.setTime(d.getTime() + (24 * 60 * 60 * 1000));
    return d.toGMTString();
}

// 用于处理 postdata
const getPostData = req => {
    const promise = new Promise((resolve, reject) => {
        if (req.method !== 'POST') {
            resolve({});
            return;
        }
        if (req.headers['content-type'] !== 'application/json') {
            resolve({});
            return;
        }
        let postData = '';
   
        req.on('data', chunk => {
            postData += chunk.toString();
        })
        req.on('end', () => {
            if (!postData) {
                resolve({});
                return;
            }
            resolve(
                JSON.parse(postData)
            )
        })
    
    })
    return promise;
}

const serverHandle = (req, res) => {
    // 设置返回格式 JSON
    res.setHeader('Content-type', 'application/json')

    // 获取PATH: 
    const url = req.url;
    req.path = url.split('?')[0];

    // 解析 query
    req.query = queryString.parse(url.split('?')[1]);
    
    // 解析 cookie
    req.cookie = {};
    const cookieStr = req.headers.cookie || ''; // k1=v1;k2=v2;k3=v3
    cookieStr.split(';').forEach(item => {
        if (!item) {
            return;
        }
        const arr = item.split('=');
        // 因为会自动生成一个空格，所以这里必须trim掉， 否则key将会重复
        // e.g. 'username', ' username'
        const key = arr[0].trim();
        const val = arr[1].trim();
        req.cookie[key] = val;
    })

    // 解析 session
    // let userId = req.cookie.userid;
    // let needSetCookie = false;
    // if (userId) {
    //     // 没有session
    //     if (!SESSION_DATA[userId]) {
    //         // 初始化session
    //         SESSION_DATA[userId] = {};
    //     } 
    // } else {
    //     needSetCookie = true;
    //     // 初始化userId
    //     userId = `${Date.now()}_${Math.random()}`;
    //     // 初始化session
    //     SESSION_DATA[userId] = {};
    // }
    // req.session = SESSION_DATA[userId];

    // 解析 session (使用 redis)
    let userId = req.cookie.userid;
    let needSetCookie = false;

    if (!userId) {
        needSetCookie = true;
        userId = `${Date.now()}_${Math.random()}`;
        // 初始化 redis 中的 session 值
        set(userId, {});
    } 
    // 获取session
    req.sessionId = userId;
    get(req.sessionId).then(sessionData => {
        if (sessionData === null) {
            // 初始化 redis 中的 session 值
            set(req.sessionId, {});
            // 设置 session
            req.session = {};
        } else {
            // 设置 session
            req.session = sessionData;
        }
        console.log('req.session ', req.session);

        // 处理 post data
        return getPostData(req);
    }).then(postData => {
        req.body = postData;
    // 处理 blog 路由:

    // 仅适用于假数据
    // const blogData = handleBlogRouter(req, res);
    // if (blogData) {
    //     res.end(
    //         JSON.stringify(blogData)
    //     )
    //     return;
    // }

    const blogResult = handleBlogRouter(req, res);
    
    if (blogResult) {
        blogResult.then(blogData => {
            if (needSetCookie) {
                // 操作 cookie 
                // path 必须设置成根目录，否则默认的path为path=/api/user/login
                // 如果与默认path不一致，cookie就会失效, 因此必须保证所有的网页验证登陆都有效
                // httpOnly 禁止前端跟改cookie, 添加后前端document.cookie不会显示cookied,且不能修改
                // 这里不要转行，转行会报错，暂时不知道原因
                res.setHeader('Set-Cookie', `userid=${userId}; path=/; httpOnly; expires=${getCookieExpires()}`);
                // response header will show: 
                // Set-Cookie: username=zhangsan; path=/
                // 前端 console.log 会显示：
                // document.cookie
                // "username=zhangsan"
            }
            res.end(
               JSON.stringify(blogData)
           )
       });
       return;
    }

    // 处理 User 路由
    // const userData = handleUserRouter(req, res);

    // if (userData) {
    //     res.end(
    //         JSON.stringify(userData)
    //     )
    //     return;
    // }
    const userResult = handleUserRouter(req, res);
    if (userResult) {
        userResult.then(userData => {
            if (needSetCookie) {
                res.setHeader('Set-Cookie', `userid=${userId}; path=/; httpOnly; expires=${getCookieExpires()}`);
            }
            res.end(
                JSON.stringify(userData)
            );
        })
        return;
    }

    // 未命中路由， 返回404
    res.writeHead(404, {'Content-type': 'text/plan'})
    res.write('404 Not Found\n')
    res.end();
    });
}

module.exports = serverHandle;