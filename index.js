const redis = require('redis');

// 创建客户端
// 如果连的是服务器上的主机，则需要更改 127.0.0.1
const redisClient = redis.createClient(6379, '127.0.0.1')
redisClient.on('error', err => {
    console.error(err)
})
// 测试
// redis.print 会在设置完key后打印出来正不正确
redisClient.set('myname', 'zhangsan2', redis.print);
redisClient.get('myname', (err, val) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log('val', val);
    // 退出Redis：
    redisClient.quit();
})