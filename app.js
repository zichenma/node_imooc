const express = require('express');

// 当 http 请求的实例
const app = express();

// 通过app注册，里面的函数就叫做中间件, 中间件是一个函数，使用
// 方法： app.get('get-cookie', fn1(), fn2(), ...), fn1, fn2将要顺序执行

//执行级别：1 （ 如果没有路由的话，则会执行此函数）
app.use((req, res, next) => {
    console.log('Request begins...', req.method, req.url);
    // next 会执行 app.get 或者 app.use (没有post) 开头的所有函数(依次执行)
    // next 为连接函数所用, 如果把next注释掉，下面的函数都不会被执行
    next();
})

//执行级别：1 
app.use((req, res, next) => {
    // 假设在处理 cookie
    req.cookie = {
        userId: 'abc123'
    }
    next();
})

//执行级别：1 
app.use((req, res, next) => {
    // 假设处理 post data
    // 异步的处理
    setTimeout(() => {
        req.body = {
            a: 100,
            b: 200
        }
        next();
    })
})

//执行级别：2
app.use('/api', (req, res, next) => {
    console.log('处理 /api 路由');
    next();
})

//执行级别：2
app.get('/api', (req, res, next) => {
    console.log('get /api 路由');
    next();
})

// 模拟登陆验证 (标准express中间件： req, res, next)：
function loginCheck (req, res, next) {
    setTimeout(() => {
        console.log('模拟登陆失败');
        res.json({
            errno: -1,
            msg: '登陆失败'
        })

        // 此时就不需要执行next了，失败就不用向下执行了
        // console.log('模拟登陆成功');
        // next()
    })
}

//执行级别：2
app.post('/api', (req, res, next) => {
    console.log('post /api 路由');
    next();
})

//执行级别：2
// 中间件 第一个参数是路由，第二个参数是函数，第三个参数是函数...
// 一般加三个就可以，如果多于三个就需要重新设计函数

app.get('/api/get-cookie', loginCheck, (req, res, next) => {
    console.log('get /api/get-cookie');
    res.json({
        errno: 0,
        data: req.cookie
    });
})

//执行级别：2
app.post('/api/get-post-data', (req, res, next) => {
    console.log('post /api/get-post-data');
    res.json({
        errno: 0,
        data: req.body
    });
})

app.use((req, res, next) => {
    console.log('handle 404');
    res.json({
        errno: -1,
        msg: '404 not found'
    })
})

app.listen(3000, () => {
    console.log('server is running on port 3000');
})