const http = require('http')


const server = http.createServer((req, res) => {
  if (req.method === 'POST') {
      // 数据格式
      console.log('content-type', req.headers['content-type'])
      // 接收数据
      let postData = ''
      // chunk 是二进制格式
      req.on('data', chunk => {
          postData += chunk.toString()
      })
      req.on('end', () => {
          console.log('postData :', postData)
          res.end('finished data') // 在这里返回， 因为是异步
      })
  }
});

server.listen(8000, () => {
    console.log('listening on 8000 port')
})

