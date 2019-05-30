const fs = require('fs');
const path = require('path');

// __dirname 当面目录, 可以认为是一个全局变量
const fileName = path.resolve(__dirname, 'data.txt');

// 读取文件内容
// fs.readFile(fileName, (err, data) => {
//     if (err) {
//         console.error(err);
//         return;
//     }
//     // data 是二进制，需要转换成字符串
//     console.log(data.toString());
// })

// 写入文件

// const content = 'This is new content\n';
// const opt = {
//     flag: 'a' //追加写入(接着写)， 覆盖用 'w'
// }
// fs.writeFile(fileName, content, opt), (err) => {
//     if (err) {
//         console.error(err);
//         return;
//     }
// };

// 判断文件是否存在

// fs.exists(fileName, (exist) => {
//     console.log('exist', exist);
// })