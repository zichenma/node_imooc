const handleBlogRouter = (req, res) => {
    const method = req.method; // GET POST


    // 获取博客列表
    if (method === 'GET' && req.path === '/api/blog/list') {
        return {
            msg : 'GET List'
        }
    }
    
     // 获取博客详情
    if (method === 'GET' && req.path === '/api/blog/detail') {
        return {
            msg : 'GET Detail'
        }
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