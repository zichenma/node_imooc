const handleUserRouter = (req, res) => {
    const method = req.method; // GET POST
    // 登陆
    if (method === 'POST' && req.path === '/api/user/login') {
        return {
            msg: 'POST Login'
        }
    }
}

module.exports = handleUserRouter;