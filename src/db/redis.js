const redis = require('redis');
const { REDIS_CONF } = require('../conf/db');

// 创建客户端 
// redisClient is a singelton
const redisClient = redis.createClient(REDIS_CONF.port, REDIS_CONF.host);
redisClient.on('error', err => {
    console.error(err)
})

function set(key, val) {
    // 如果不转换成字符串，则会变成： 
    // redisClient.set(key, val.toString(), redis.print);
    if (typeof val === 'object') {
        val = JSON.stringify(val);
    }
    redisClient.set(key, val, redis.print);
}

function get(key) {
    const promise = new Promise((resolve, reject) => {
        redisClient.get(key, (err, val) => {
            if (err) {
                reject(err);
                return;
            }
            if (val === null) {
                resolve(null);
                return;
            }
            // 这里的try...catch是为了确保格式
            try {
                resolve(
                    JSON.parse(val)
                )

            } catch (ex) {
                resolve(val);
            }
        })
    })
    return promise;
}

module.exports = {
    set,
    get
}