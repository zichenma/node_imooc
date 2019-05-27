const { login } = require('../controller/user');
const { SuccessModel, ErrorModel } = require('../model/resModel');
const { set } = require('../db/redis');


const handleUserRouter = (req, res) => {
    const method = req.method; // GET POST
    // 登陆
    if (method === 'POST' && req.path === '/api/user/login') {
        const { username, password } = req.body;
         // 用GET测试的时候用req.query
        //  const { username, password } = req.query;
       // req.body是POST的数据
      // const { username, password } = req.body;
       const result = login(username, password);
       return result.then(data => {
           if (data.username) {
                // Cookie操作参考6—5，此处的comment
                // 设置 session 
                req.session.username = data.username;
                req.session.realname = data.realname;
                // 同步到 redis 中
                set(req.sessionId, req.session)
                return new SuccessModel();
           }
           return new ErrorModel('Login Failed');
       })
    }

    // 登陆验证的测试
    // if (method === 'GET' && req.path === '/api/user/login-test') {
    //     if (req.session.username) {
    //         return Promise.resolve(new SuccessModel({
    //             session: req.session
    //         }));
    //     }
    //     return Promise.resolve(new ErrorModel('Not login yet'));
    // }
}

module.exports = handleUserRouter;