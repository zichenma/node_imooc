const http = require('http')
const queryString = require('querystring')

const server = http.createServer((req, res) => {
    console.log('method: ', req.method) // GET
    const url = req.url
    console.log('url: ', url)
    req.query = queryString.parse(url.split('?')[1])
    // http://localhost:8000/api/blog/list?author=zhangsan&keyword=A
    console.log('query', req.query) //{ author: 'zhangsan', keyword: 'A' }
    res.end(
        JSON.stringify(req.query)
    )
})


server.listen(8000, () => {
    console.log('listening on 8000 port')
})

