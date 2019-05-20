const fs = require('fs');
const path = require('path');


// callback 方式获取一个文件的内容

function getFileContent (fileName, callback) {
   //  __dirname: 当前文件的目录, 全局变量
   // files 为文件夹名
    const fullFillName = path.resolve(__dirname, 'files', fileName);
    fs.readFile(fullFillName, (err, data) => {
        if (err) {
            console.log(err);
            return;
        }
        // 默认为二进制,所以需要toString
        callback(data.toString());
    })
}

// 测试： callback-hell 

// getFileContent('a.json', aData => {
//     console.log('a data', aData);
//     getFileContent(JSON.parse(aData).next, bData => {
//         console.log('b data', bData);
//         getFileContent(JSON.parse(bData).next, cData => {
//             console.log('c data', cData);
//         })
//     })
  
// })

// Promise: 

function getFileContentPromise(fileName) {
    const promise = new Promise( (resolve, reject) => {
        const fullFillName = path.resolve(__dirname, 'files', fileName);
        fs.readFile(fullFillName, (err, data) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(
                JSON.parse(data.toString())
            )
        })
    })
    return promise;
}




getFileContentPromise('a.json').then(aData => {
    console.log('a data: ', aData);
    return getFileContentPromise(aData.next);
}).then(bData => {
    console.log('b data: ', bData);
    return getFileContentPromise(bData.next);
}).then(cData => {
    console.log('c Data: ', cData);
})

// async await will be in koa2
// async function getFileContentAsync(fileName) {
//     const fullFillName = path.resolve(__dirname, 'files', fileName);
//     const  result = await fs.readFile(fullFillName, (err, data) => {
//         if (err) {
//             console.log(error);
//             return;
//         }
//         return  JSON.parse(data.toString());
//     })
// }