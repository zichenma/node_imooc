const { exec } = require('../db/mysql')

const getList = (author, keyword) => {
    // 注意1后面有空格
    let sql = `select * from blogs where 1=1 `;
    // 如果没有 1=1， 当 author, keyword为空值的时候就会报错
    // 相同原理： xxx.html?a=1&k1=v1&k2=v2&k3=v3
    if (author) {
        sql += `and author='${author}' `
    }
    if (keyword) {
        sql += `and title like '%${keyword}%' `
    }
    sql += `order by createtime desc;`

    // 返回的是一个promise
    return exec(sql);
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