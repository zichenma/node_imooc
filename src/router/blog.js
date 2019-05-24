const { 
        getList, 
        getDetail,
        newBlog,
        updateBlog,
        delBlog,
    } = require('../controller/blog')

const { SuccessModel, ErrorModel } = require('../model/resModel')

const handleBlogRouter = (req, res) => {
    const method = req.method; // GET POST
    const id = req.query.id;

    // 获取博客列表
    if (method === 'GET' && req.path === '/api/blog/list') {
        const author = req.query.author || '';
        const keyword = req.query.keyword || '';
        // 仅仅适用于mock data
        // const listData = getList(author, keyword);
        // return new SuccessModel(listData);
        
        // result 是一个从数据库拿到的promise对象
        const result = getList(author, keyword);
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

        // 因为还没有登陆，暂时用假数据
        const author = 'zhangsan';
        req.body.author = author;
        const result = newBlog(req.body);
        return result.then(data => {
            return new SuccessModel(data);
        })
    }

    // 跟新博客
    if (method === 'POST' && req.path === '/api/blog/update') {
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
        // 防止用一个ID就能删除别人的博客，所以需要作者
        const author = 'zhangsan'; // 假数据，待开发登陆时再改成真数据

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