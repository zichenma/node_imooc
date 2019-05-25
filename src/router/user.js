const { login } = require('../controller/user');
const { SuccessModel, ErrorModel } = require('../model/resModel');


// 设置一天的过期时间
const getCookieExpires = () => {
    const d = new Date();
    d.setTime(d.getTime() + (24 * 60 * 60 * 1000));
    console.log('GMT', d.toGMTString());
    return d.toGMTString();
}

const handleUserRouter = (req, res) => {
    const method = req.method; // GET POST
    // 登陆
    if (method === 'GET' && req.path === '/api/user/login') {
        const { username, password } = req.query;
        // req.body是POST的数据
      //  const { username, password } = req.body;
       const result = login(username, password);
       return result.then(data => {
           if (data.username) {
                // 操作 cookie 
                // path 必须设置成根目录，否则默认的path为path=/api/user/login
                // 如果与默认path不一致，cookie就会失效, 因此必须保证所有的网页验证登陆都有效
                // httpOnly 禁止前端跟改cookie, 添加后前端document.cookie不会显示cookied,且不能修改
                // 这里不要转行，转行会报错，暂时不知道原因
                res.setHeader('Set-Cookie', `username=${data.username}; path=/; httpOnly; expires=${getCookieExpires()}`);
                // response header will show: 
                // Set-Cookie: username=zhangsan; path=/
                // 前端 console.log 会显示：
                // document.cookie
                // "username=zhangsan"
                return new SuccessModel();
           }
           return new ErrorModel('Login Failed');
       })
    }

    // 登陆验证的测试
    if (method === 'GET' && req.path === '/api/user/login-test') {
        if (req.cookie.username) {
            return Promise.resolve(new SuccessModel({
                username: req.cookie.username
            }));
        }
        return Promise.resolve(new ErrorModel('Not login yet'));
    }
}

module.exports = handleUserRouter;