'use strict'
var mysql      = require('mysql');
var pool  = mysql.createPool({
  host : '120.77.38.20',
  user     : 'root',
  password : 'Mcc616254086',
  database : 'Reading',
  connectionLimit : 10
  //charset  : 'gbk'
});
let mySql1 = "SELECT max(chapter_id) maxId from book_chapter where book_id = ?"                   
let mySqlData1 = [10]
pool.getConnection(function(err, connection) {
    connection.query(mySql1, mySqlData1, function (error, results, fields) {
        console.log('查询1', results[0].maxId)
        connection.release();
    });

})
