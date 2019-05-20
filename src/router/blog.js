const { getList, getDetail } = require('../controller/blog')
const { SuccessModel, ErrorModel } = require('../model/resModel')

const handleBlogRouter = (req, res) => {
    const method = req.method; // GET POST


    // 获取博客列表
    if (method === 'GET' && req.path === '/api/blog/list') {
        const author = req.query.author || '';
        const keyword = req.query.keyword || '';
        const listData = getList(author, keyword);
        return new SuccessModel(listData);
    }
    
     // 获取博客详情
    if (method === 'GET' && req.path === '/api/blog/detail') {
        const id = req.query.id;
        const data =  getDetail(id);
        return new SuccessModel(data);
    }

    // 新建博客
    if (method === 'POST' && req.path === '/api/blog/new') {
        return {
            meg: 'POST New Blog'
        }
    }

    // 跟新博客
    if (method === 'POST' && req.path === '/api/blog/update') {
        return {
            meg: 'POST Update Blog'
        }
    }

    // 删除博客
    if (method === 'POST' && req.path === '/api/blog/delete') {
        return {
            meg: 'POST Delete Blog'
        }
    }  
}

module.exports = handleBlogRouter;