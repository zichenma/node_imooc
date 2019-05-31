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
    // return {
    //     id: 1,
    //     title: 'Title A',
    //     content: 'Content A',
    //     createTime: 558273366767,
    //     author: 'zhangsan'
    // }
    const sql = `select * from blogs where id='${id}'`;
    // 哪怕是只有一行结果，也是一个数组
    return exec(sql).then(rows => {
        // 把数组返回一个对象
        return rows[0];
    })
}

const newBlog = (blogData = {}) => {
    // blogData 是一个博客对象，包含 title content author 属性
    const title = blogData.title
    // console.log('title is', title)
    const content = blogData.content
    const author = blogData.author
    const createTime = Date.now()

    const sql = `
        insert into blogs (title, content, createtime, author)
        values ('${title}', '${content}', ${createTime}, '${author}');
    `

    return exec(sql).then(insertData => {
        // console.log('insertData is ', insertData)
        return {
            id: insertData.insertId
        }
    })
}

const updateBlog = (id, blogData = {}) => {
    // id 就是要更新博客的 id
    // blogData 是一个博客对象， 包含 title content 属性
    // console.log('update blog', id, blogData);
    const { title, content } = blogData;
    const sql = `
        update blogs set title='${title}', content='${content}' where id=${id}
    `
    return exec(sql).then(updateData => {
        // console.log('updateData is ', updateData);
        if (updateData.affectedRows > 0) {
            return true;
        }
        return false;
    });
}

const delBlog = (id, author) => {
    // id 就是要删除博客的 id
    // 实际工作中考虑软删除
    const sql = `delete from blogs where id='${id}' and author='${author}';`
    return exec(sql).then(delData => {
        if (delData.affectedRows > 0) {
            return true;
        }
        return false;
    });
}

module.exports = {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    delBlog,
}