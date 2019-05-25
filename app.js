const queryString = require('querystring');
const handleBlogRouter = require ('./src/router/blog');
const handleUserRouter = require('./src/router/user');


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
    console.log('req.cookie is', req.cookie);

    // 处理 Post data
    getPostData(req).then(postData => {
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