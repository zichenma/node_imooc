const getList = (author, keyword) => {
    // 先返回假数据(格式是正确的)
    return [
        {
            id: 1,
            title: 'Title A',
            content: 'Content A',
            createTime: 558273366767,
            author: 'zhangsan'
        },
        {
            id: 2,
            title: 'Title A',
            content: 'Content A',
            createTime: 558273366767,
            author: 'zhangsan'
        },
        {
            id: 3,
            title: 'Title B',
            content: 'Content B',
            createTime: 1558274247809,
            author: 'lisi'
        }
    ]
}

const getDetail = id => {
    // 先返回假数据
    return {
        id: 1,
        title: 'Title A',
        content: 'Content A',
        createTime: 558273366767,
        author: 'zhangsan'
    }
}

const newBlog = (blogData = {}) => {
    // blogData 是一个博客对象， 包含 title content 属性

    return {
        id : 3 // 表示新建博客，插入到数据表里面的 id
    }
}

const updateBlog = (id, blogData = {}) => {
    // id 就是要更新博客的 id
    // blogData 是一个博客对象， 包含 title content 属性
    // console.log('update blog', id, blogData);
    return true;
    // return false;
    // errorModel:
    // {
    //     "message": "Updates blog failed",
    //     "errno": -1
    // }
}

const delBlog = (id) => {
    // id 就是要删除博客的 id
    return true;
}

module.exports = {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    delBlog,
}