const mysql = require('mysql') 
// 创建连接对象
const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    port: '3306',
    database: 'myblog'
})

// 开始连接：
con.connect();

// 执行 sql 语句：

// const sql = `update users set realname='lisi2' where username='lisi'`;
const sql = `insert into blogs (title, content, createtime, author) values ('title C', 'content C', 1558581023420, 'zhangsan');`
con.query(sql, (err, result) => {
    if (err) {
        console.error(err)
        return;
    }
    // if sqlMessage: 'Client does not support authentication protocol requested by server; consider upgrading MySQL client'
    // do: ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'root' in workbeanch
    console.log(result);
});

// 关闭连接
con.end();
