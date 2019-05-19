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

module.exports = {
    getList
}