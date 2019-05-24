const { loginCheck } = require('../controller/user');
const { SuccessModel, ErrorModel } = require('../model/resModel');

const handleUserRouter = (req, res) => {
    const method = req.method; // GET POST
    // 登陆
    if (method === 'POST' && req.path === '/api/user/login') {
       const { username, password } = req.body;
       const result = loginCheck(username, password);
       return result.then(data => {
           if (data.username) {
               return new SuccessModel();
           }
           return new ErrorModel('Login Failed');
       })
    }
}

module.exports = handleUserRouter;