const serverHandle = (req, res) => {
    // 1.设置返回格式
    res.setHeader('Content-type', 'application/json')
    // 2.设置返回数据
    const resData = {
        name : 'ShuangYue100',
        site: 'imooc',
        // 识别当前环境
        env: process.env.NODE_ENV
    }
    res.end (
        JSON.stringify(resData)
    )
}

module.exports = serverHandle;