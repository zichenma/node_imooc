const { 
        getList, 
        getDetail,
        newBlog,
        updateBlog,
        delBlog,
    } = require('../controller/blog')

const { SuccessModel, ErrorModel } = require('../model/resModel')

// 统一的登陆验证函数：
const loginCheck = (req => {
    if (!req.session.username) {
        return Promise.resolve(new ErrorModel('Not login yet'));
    }
})

const handleBlogRouter = (req, res) => {
    const method = req.method; // GET POST
    const id = req.query.id;

    // 获取博客列表
    if (method === 'GET' && req.path === '/api/blog/list') {
        let author = req.query.author || '';
        const keyword = req.query.keyword || '';
        // 仅仅适用于mock data
        // const listData = getList(author, keyword);
        // return new SuccessModel(listData);
        if (req.query.isadmin) {
            //管理员界面
            const loginCheckResult = loginCheck(req);
            if (loginCheckResult) {
                // 未登陆
                return loginCheckResult;
            }
            auhtor.req.session.username;
        }

        // result 是一个从数据库拿到的promise对象
        const result = getList(author, keyword);
        return result.then(listData => {
            return new SuccessModel(listData);
        })
    
        return result.then(listData => {
            return new SuccessModel(listData);
        })
    }
    
     // 获取博客详情
    if (method === 'GET' && req.path === '/api/blog/detail') {
        // const data =  getDetail(id);
        // return new SuccessModel(data);
        const result = getDetail(id);
        return result.then(data => {
            return new SuccessModel(data);
        })
    }

    // 新建博客
    if (method === 'POST' && req.path === '/api/blog/new') {
        // const data = newBlog(req.body);
        // return new SuccessModel(data);

        const loginCheckResult = loginCheck(req);
        // 有值就说明未登陆
        if (loginCheckResult) {
            // 未登陆
            return loginCheckResult;
        }

        const author = req.session.username;
        req.body.author = author;
        const result = newBlog(req.body);
        return result.then(data => {
            return new SuccessModel(data);
        })
    }

    // 跟新博客
    if (method === 'POST' && req.path === '/api/blog/update') {
        const loginCheckResult = loginCheck(req);
        if (loginCheckResult) {
            return loginCheckResult;
        }
        const result = updateBlog(id, req.body);
        return result.then(val => {
            if (val) {
                return new SuccessModel();
            } else {
                return new ErrorModel('Updates blog failed');
            }
        })
    }

    // 删除博客
    if (method === 'POST' && req.path === '/api/blog/del') {
        const loginCheckResult = loginCheck(req);
        if (loginCheckResult) {
            return loginCheckResult;
        }
        // 防止用一个ID就能删除别人的博客，所以需要作者
        const author = req.session.username; 
        const result = delBlog(id, author);
        return result.then(value => {
            if (value) {
                return new SuccessModel();
            } else {
                return new ErrorModel('Delete blog failed');
            }
        })
    }  
}

module.exports = handleBlogRouter;