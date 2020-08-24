// 连接mysql
const mysql = require('mysql')
// promise的mysql操作
const co = require('co-mysql')
const config = require('../config')

const db = mysql.createPool({
    host: config.DB_HOST,
    user: config.DB_USER,
    password: config.DB_PASS,
    port: 3306,
    database: config.DB_NAME
})

//对外输出

module.exports = co(db)