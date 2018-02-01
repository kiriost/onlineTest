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

var getBookInfo = (row, offset) => {
    //得到所有书籍的信息
    let returnData = {}
    let mySql1 = 'SELECT id, book_name, cover, book_type, author, is_show, book.describe from book limit ?, ?'
    let mySqlData1 = [row, offset]
    let mySql2 = 'SELECT count(*) allNumber from book'
    let promise = new Promise((resolve, reject) => {
        pool.getConnection(function(err, connection) {

            connection.query(mySql1, mySqlData1, function (error, results, fields) {
                //console.log('查询1', results)
                returnData.tableData = results

                connection.query(mySql2, function (error, results, fields) {
                    //console.log('查询2', results)
                    returnData.allPageNum = results
                    //console.log('合并后', returnData)
                    resolve(returnData)
                    connection.release();
                    if (error) throw reject(error);
                })

                if (error) throw reject(error);
            });

        });  
    });
    return promise  
}

var distinctBookInfo = (row, is_show, offset) => {
    //筛选上架和未上架书籍的信息
    let returnData = {}
    let mySql1 = 'SELECT id, book_name, cover, book_type, author, is_show, book.describe from book where is_show = ? limit ?, ?'
    let mySqlData1 = [is_show, row, offset]
    let mySql2 = 'SELECT count(*) allNumber from book where is_show = ?'
    let mySqlData2 = [is_show]
    let promise = new Promise((resolve, reject) => {
        pool.getConnection(function(err, connection) {

            connection.query(mySql1, mySqlData1, function (error, results, fields) {
                //console.log('查询1', results)
                returnData.tableData = results

                connection.query(mySql2, mySqlData2, function (error, results, fields) {
                    //console.log('查询2', results)
                    returnData.allPageNum = results
                    //console.log('合并后', returnData)
                    resolve(returnData)
                    connection.release();
                    if (error) throw reject(error);
                })

                if (error) throw reject(error);
            });

        });  
    });
    return promise  
}

var searchBookInfo = (row, field, offset) => {
    //搜索书籍的信息
    field = '%' + field + '%'
    let returnData = {}
    let mySql1 = 'SELECT \
    id, book_name, cover, book_type, author, is_show, book.describe \
    from book \
    where book_name like ? or author like ? limit ?, ?'
    let mySqlData1 = [field, field, row, offset]
    let mySql2 = 'SELECT count(*) allNumber from book where book_name like ? or author like ?'
    let mySqlData2 = [field, field]
    let promise = new Promise((resolve, reject) => {
        pool.getConnection(function(err, connection) {

            connection.query(mySql1, mySqlData1, function (error, results, fields) {
                //console.log('查询1', results)
                returnData.tableData = results

                connection.query(mySql2, mySqlData2, function (error, results, fields) {
                    //console.log('查询2', results)
                    returnData.allPageNum = results
                    //console.log('合并后', returnData)
                    resolve(returnData)
                    connection.release();
                    if (error) throw reject(error);
                })

                if (error) throw reject(error);
            });

        });  
    });
    return promise  
}

var deleteBook = (id) => {
    //删除评论
    let mySql1 = 'delete from book where id=?'
    let mySqlData1 = [id]
    let promise = new Promise((resolve, reject) => {
        pool.getConnection(function(err, connection) {

            connection.query(mySql1, mySqlData1, function (error, results, fields) {
                console.log('查询1', results)
                resolve(1)
                connection.release();
                if (error) throw reject(error);
            });

        });  
    });
    return promise  
}

var changeShow = (id, is_show) => {
    //更新书籍上架状态
    let mySql1 = 'update book set is_show=? where id=?'
    let mySqlData1 = [is_show, id]
    let promise = new Promise((resolve, reject) => {
        pool.getConnection(function(err, connection) {

            connection.query(mySql1, mySqlData1, function (error, results, fields) {
                //console.log('查询1', results.changedRows)
                resolve(1)
                connection.release();
                if (error) throw reject(error);
            });

        });  
    });
    return promise  
}

var reqChapterInfo = (row, field, offset, bookId) => {
    //搜索章节的信息
    if(bookId == 0){
        bookId = '%'
    }
    field = '%' + field + '%'
    let returnData = {}
    let mySql1 = 'SELECT \
    distinct book_chapter.id allChapterId, chapter_id, book_name, book_type, author, chapter_name, chapter_type, chapter_money, book_id\
    from book_chapter, book \
    where book.id = book_chapter.book_id and chapter_name like ? and book.id like ? limit ?, ?'
    let mySqlData1 = [field, bookId, row, offset]
    let mySql2 = 'SELECT count(distinct book_chapter.id) allNumber from book_chapter, book \
    where book.id = book_chapter.book_id and chapter_name like ? and book.id like ?'
    let mySqlData2 = [field, bookId]
    let promise = new Promise((resolve, reject) => {
        pool.getConnection(function(err, connection) {

            connection.query(mySql1, mySqlData1, function (error, results, fields) {
                //console.log('查询1', results)
                returnData.tableData = results

                connection.query(mySql2, mySqlData2, function (error, results, fields) {
                    //console.log('查询2', results)
                    returnData.allPageNum = results
                    //console.log('合并后', returnData)
                    resolve(returnData)
                    connection.release();
                    if (error) throw reject(error);
                })

                if (error) throw reject(error);
            });

        });  
    });
    return promise  
}

var setChapterMoney = (id, chapterType, chapterMoney) => {
    //更新章节的价格
    let mySql1 = 'update book_chapter set chapter_type=?, chapter_money=? where id=?'
    let mySqlData1 = [chapterType, chapterMoney, id]
    console.log(mySqlData1)
    let promise = new Promise((resolve, reject) => {
        pool.getConnection(function(err, connection) {

            connection.query(mySql1, mySqlData1, function (error, results, fields) {
                //console.log('查询1', results)
                resolve(1)
                connection.release();
                if (error) throw reject(error);
            });

        });  
    });
    return promise  
}

var distinctChapterInfo = (row, chapter_type, offset, bookId) => {
    //选择章节付费信息
    if(bookId == 0){
        bookId = '%'
    }
    let returnData = {}
    let mySql1 = 'SELECT \
    distinct book_chapter.id allChapterId, chapter_id, book_name, book_type, author, chapter_name, chapter_type, chapter_money, book_id\
    from book_chapter, book \
    where book.id = book_chapter.book_id and book.id like ? and book_chapter.chapter_type like ? limit ?, ?'
    let mySqlData1 = [bookId, chapter_type, row, offset]
    let mySql2 = 'SELECT count(distinct book_chapter.id) allNumber from book_chapter, book \
    where book.id = book_chapter.book_id and book.id like ? and book_chapter.chapter_type like ?'
    let mySqlData2 = [bookId, chapter_type]
    let promise = new Promise((resolve, reject) => {
        pool.getConnection(function(err, connection) {

            connection.query(mySql1, mySqlData1, function (error, results, fields) {
                console.log('查询1', results)
                returnData.tableData = results

                connection.query(mySql2, mySqlData2, function (error, results, fields) {
                    console.log('查询2', results)
                    returnData.allPageNum = results
                    console.log('合并后', returnData)
                    resolve(returnData)
                    connection.release();
                    if (error) throw reject(error);
                })

                if (error) throw reject(error);
            });

        });  
    });
    return promise  
}

var deleteChapter = (id) => {
    //删除章节
    let mySql1 = 'delete from book_chapter where id=?'
    let mySqlData1 = [id]
    let promise = new Promise((resolve, reject) => {
        pool.getConnection(function(err, connection) {

            connection.query(mySql1, mySqlData1, function (error, results, fields) {
                console.log('查询1', results)
                resolve(1)
                connection.release();
                if (error) throw reject(error);
            });

        });  
    });
    return promise  
}

var reqAllBookStatistic = (row, field, offset) => {
    //搜索书籍的信息
    field = '%' + field + '%'
    let returnData = {}
    let mySql1 = 'SELECT \
    distinct book.id, book_name, book_type, author, chase_book_num, click_num, reward_num, subscriber_num\
    from book_profile, book \
    where book.id = book_profile.book_id and (book_name like ? or author like ?) limit ?, ?'
    let mySqlData1 = [field, field, row, offset]
    let mySql2 = 'SELECT count(distinct book.id) allNumber from book_profile, book where book.id = book_profile.book_id and book_name like ? or author like ?'
    let mySqlData2 = [field, field]
    let promise = new Promise((resolve, reject) => {
        pool.getConnection(function(err, connection) {

            connection.query(mySql1, mySqlData1, function (error, results, fields) {
                //console.log('查询1', results)
                returnData.tableData = results

                connection.query(mySql2, mySqlData2, function (error, results, fields) {
                    //console.log('查询2', results)
                    returnData.allPageNum = results
                    //console.log('合并后', returnData)
                    resolve(returnData)
                    connection.release();
                    if (error) throw reject(error);
                })

                if (error) throw reject(error);
            });

        });  
    });
    return promise  
}

var reqComment = (row, field, offset) => {
    //搜索评论的信息
    field = '%' + field + '%'
    let returnData = {}
    let mySql1 = 'SELECT \
    book.id, book_name, book_type, author, user_name, comment_content, comment_type\
    from book_comment, book, user\
    where book.id = book_comment.book_id and book_comment.user_id = user.id and (book_name like ? or author like ? or user_name like ?) limit ?, ?'
    let mySqlData1 = [field, field, field, row, offset]
    let mySql2 = 'SELECT count(distinct book_comment.id) allNumber from book_comment, book, user\
    where book.id = book_comment.book_id and book_comment.user_id = user.id and (book_name like ? or author like ? or user_name like ?)'
    let mySqlData2 = [field, field, field]
    let promise = new Promise((resolve, reject) => {
        pool.getConnection(function(err, connection) {

            connection.query(mySql1, mySqlData1, function (error, results, fields) {
                //console.log('查询1', results)
                returnData.tableData = results

                connection.query(mySql2, mySqlData2, function (error, results, fields) {
                    //console.log('查询2', results)
                    returnData.allPageNum = results
                    //console.log('合并后', returnData)
                    resolve(returnData)
                    connection.release();
                    if (error) throw reject(error);
                })

                if (error) throw reject(error);
            });

        });  
    });
    return promise  
}

var updateTop = (id, type) => {
    //更新书籍上架状态
    let mySql1 = 'update book_comment set comment_type=? where id=?'
    let mySqlData1 = [type, id]
    let promise = new Promise((resolve, reject) => {
        pool.getConnection(function(err, connection) {

            connection.query(mySql1, mySqlData1, function (error, results, fields) {
                console.log('查询1', results.changedRows)
                resolve(1)
                connection.release();
                if (error) throw reject(error);
            });

        });  
    });
    return promise  
}

var deleteComment = (id) => {
    //删除评论
    let mySql1 = 'delete from book_comment where id=?'
    let mySqlData1 = [id]
    let promise = new Promise((resolve, reject) => {
        pool.getConnection(function(err, connection) {

            connection.query(mySql1, mySqlData1, function (error, results, fields) {
                console.log('查询1', results)
                resolve(1)
                connection.release();
                if (error) throw reject(error);
            });

        });  
    });
    return promise  
}

var reqUser = (row, field, offset) => {
    //搜索用户的信息
    field = '%' + field + '%'
    let returnData = {}
    let mySql1 = 'SELECT \
    distinct user.id, user_name, phone, balance, recommend_ticket_num, diamond_ticket_num\
    from user, user_profile\
    where user.id = user_profile.user_id and user_name like ? limit ?, ?'
    let mySqlData1 = [field, row, offset]
    let mySql2 = 'SELECT count(distinct user.id) allNumber from user, user_profile\
    where user.id = user_profile.user_id and user_name like ?'
    let mySqlData2 = [field, field, field]
    let promise = new Promise((resolve, reject) => {
        pool.getConnection(function(err, connection) {

            connection.query(mySql1, mySqlData1, function (error, results, fields) {
                //console.log('查询1', results)
                returnData.tableData = results

                connection.query(mySql2, mySqlData2, function (error, results, fields) {
                    //console.log('查询2', results)
                    returnData.allPageNum = results
                    //console.log('合并后', returnData)
                    resolve(returnData)
                    connection.release();
                    if (error) throw reject(error);
                })

                if (error) throw reject(error);
            });

        });  
    });
    return promise  
}

var reqUserSubscribe = (row, id, offset) => {
    //查找用户追书的信息
    let returnData = {}
    let mySql1 = 'SELECT \
    book.id, book_name, author\
    from book, user_profile\
    where subscribe_book = book.id and user_id = ? limit ?, ?'
    let mySqlData1 = [id, row, offset]
    let mySql2 = 'SELECT count(distinct book.id) allNumber from book, user_profile\
    where subscribe_book = book.id and user_id = ?'
    let mySqlData2 = [id]
    let promise = new Promise((resolve, reject) => {
        pool.getConnection(function(err, connection) {

            connection.query(mySql1, mySqlData1, function (error, results, fields) {
                //console.log('查询1', results)
                returnData.tableData = results

                connection.query(mySql2, mySqlData2, function (error, results, fields) {
                    //console.log('查询2', results)
                    returnData.allPageNum = results
                    //console.log('合并后', returnData)
                    resolve(returnData)
                    connection.release();
                    if (error) throw reject(error);
                })

                if (error) throw reject(error);
            });

        });  
    });
    return promise  
}

var deleteUser = (id) => {
    //删除用户
    let mySql1 = 'delete from user where id=?'
    let mySqlData1 = [id]
    let promise = new Promise((resolve, reject) => {
        pool.getConnection(function(err, connection) {

            connection.query(mySql1, mySqlData1, function (error, results, fields) {
                console.log('查询1', results)
                resolve(1)
                connection.release();
                if (error) throw reject(error);
            });

        });  
    });
    return promise  
}

var reqBookDetails = (id) => {
    //查找书籍的详细信息
    let returnData = {}
    let mySql1 = 'SELECT *\
    from book\
    where id like ?'
    let mySqlData1 = [id]
    let promise = new Promise((resolve, reject) => {
        pool.getConnection(function(err, connection) {

            connection.query(mySql1, mySqlData1, function (error, results, fields) {
                //console.log('查询1', results)
                resolve(results)
                connection.release()
                if (error) throw reject(error);
            });

        });  
    });
    return promise  
}

var insertBookDetails = (info) => {
    //插入书籍详细信息
    let returnData = {}
    let mySql1 = 'insert into book (author, book_name, cover, book.describe, book_type)\
                    values(?, ?, ?, ?, ?)'
    let mySqlData1 = [info.author, info.book_name, info.cover, info.describe, info.book_type]
    let promise = new Promise((resolve, reject) => {
        pool.getConnection(function(err, connection) {

            connection.query(mySql1, mySqlData1, function (error, results, fields) {
                //console.log('查询1', results.insertId)
                resolve(results.insertId)
                connection.release()
                if (error) throw reject(error);
            });

        });  
    });
    return promise  
}

var updateBookDetails = (info, id) => {
    //更新书籍的详细信息
    let mySql1 = 'update  book set author=?, book_name=?, cover=?, book.describe=?, book_type=?\
                    where id=?'
    let mySqlData1 = [info.author, info.book_name, info.cover, info.describe, info.book_type, id]
    let promise = new Promise((resolve, reject) => {
        pool.getConnection(function(err, connection) {

            connection.query(mySql1, mySqlData1, function (error, results, fields) {
                //console.log('查询1', results)
                resolve(1)
                connection.release()
                if (error) throw reject(error);
            });

        });  
    });
    return promise  
}

var reqChapterId = (bookId) => {
    //获取最大的章节id
    let mySql1 = 'SELECT max(chapter_id) maxId from book_chapter where book_id = ?'
    let mySqlData1 = [bookId]
    let promise = new Promise((resolve, reject) => {
        pool.getConnection(function(err, connection) {

            connection.query(mySql1, mySqlData1, function (error, results, fields) {
                //console.log('查询1', results)
                resolve(results[0].maxId)
                connection.release()
                if (error) throw reject(error);
            });

        });  
    });
    return promise  
}

var insertChapterContant = (info) => {
    //插入章节详细信息
    //console.log(info)
    let mySql1 = 'insert into book_chapter (chapter_id, chapter_name, chapter_content, word_number, update_date, book_id)\
                    values(?, ?, ?, ?, ?, ?)'
    let mySqlData1 = [info.chapterId, info.chapterName, info.chapterContant, info.wordNumber, info.updateDate, info.bookId]
    let promise = new Promise((resolve, reject) => {
        pool.getConnection(function(err, connection) {

            connection.query(mySql1, mySqlData1, function (error, results, fields) {
                //console.log('查询1', results)
                resolve(1)
                connection.release()
                if (error) throw reject(error);
            });

        });  
    });
    return promise  
}

var reqChapterContant = (info) => {
    //请求章节详细信息
    //console.log(info)
    let mySql1 = 'SELECT * from book_chapter where book_id = ? and chapter_id = ?'
    let mySqlData1 = [info.bookId, info.chapterId]
    let promise = new Promise((resolve, reject) => {
        pool.getConnection(function(err, connection) {

            connection.query(mySql1, mySqlData1, function (error, results, fields) {
                //console.log('查询1', results[0])
                resolve(results[0])
                connection.release()
                if (error) throw reject(error);
            });

        });  
    });
    return promise  
}

var updateChapterContent = (info) => {
    //插入章节详细信息
    //console.log(info)
    let mySql1 = 'update book_chapter set chapter_name = ?, chapter_content = ?, word_number = ?, update_date = ?\
                    where chapter_id = ? and book_id = ?'
    let mySqlData1 = [info.chapterName, info.chapterContant, info.wordNumber, info.updateDate, info.chapterId, info.bookId]
    let promise = new Promise((resolve, reject) => {
        pool.getConnection(function(err, connection) {

            connection.query(mySql1, mySqlData1, function (error, results, fields) {
                //console.log('查询1', results)
                resolve(1)
                connection.release()
                if (error) throw reject(error);
            });

        });  
    });
    return promise  
}

var insertManyChapter = (info) => {
    //批量上传章节
    //console.log(info)
    let mySql1 = 'insert into book_chapter (book_id, chapter_id, chapter_name, chapter_content, word_number, update_date)\
                    values ?'
    let mySqlData1 = [info]
    let promise = new Promise((resolve, reject) => {
        pool.getConnection(function(err, connection) {

            connection.query(mySql1, mySqlData1, function (error, results, fields) {
                //console.log('查询1', results)
                resolve(1)
                connection.release()
                if (error) throw reject(error);
            });

        });  
    });
    return promise  
}

module.exports = {      
    getBookInfo: getBookInfo,
    distinctBookInfo: distinctBookInfo,
    searchBookInfo: searchBookInfo,
    deleteBook: deleteBook,
    changeShow: changeShow,
    reqAllBookStatistic: reqAllBookStatistic,
    reqComment: reqComment,
    updateTop: updateTop,
    deleteComment: deleteComment,
    reqUser: reqUser,
    reqUserSubscribe: reqUserSubscribe,
    deleteUser: deleteUser,
    reqChapterInfo: reqChapterInfo,
    setChapterMoney: setChapterMoney,
    distinctChapterInfo: distinctChapterInfo,
    reqBookDetails: reqBookDetails,
    insertBookDetails: insertBookDetails,
    updateBookDetails: updateBookDetails,
    reqChapterId: reqChapterId,
    insertChapterContant: insertChapterContant,
    reqChapterContant: reqChapterContant,
    updateChapterContent: updateChapterContent,
    deleteChapter: deleteChapter,
    insertManyChapter: insertManyChapter
};
