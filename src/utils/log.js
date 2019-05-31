const fs = require('fs');
const path = require('path');

// 写日志
function writeLog(writeStream, log) {
    writeStream.write(log + '\n'); // 关键代码
}

// 生成 Write Stream
function createWriteStream(fileName) {
    // util 上一层是 src, src上一层是logs
    const fullFileName = path.join(__dirname, '../', '../', 'logs', fileName);
    const writeSteam = fs.createWriteStream(fullFileName, {
        // a 是 append
        flag: 'a'
    });
    return writeSteam;
}

// 写访问日志
const accessWriteSteam = createWriteStream('access.log');
function access(log) {
    writeLog(accessWriteSteam, log)
}

module.exports = {
    access
}
