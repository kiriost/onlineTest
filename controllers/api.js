var products = [{
    name: 'iPhone',
    price: 6999
}, {
    name: 'Kindle',
    price: 999
}];

const sql = require('../server');

module.exports = {
    'POST /api/getBookInfo': async (ctx, next) => {
        //返回书籍信息
        let row = ctx.request.body.pageNumber
        let offset = 10
        //console.log('ctx数据', ctx.request.body.pageNumber)
        await sql.getBookInfo(row, offset).then((data) => {
            ctx.response.type = 'application/json';
            ctx.response.body = {
                tableData: data.tableData,
                allPageNum: data.allPageNum
            }
        }).catch((data) => {
            console.dir(data)
        })
    },

    'POST /api/distinctBookInfo': async (ctx, next) => {
        //返回筛选后的书籍信息
        let row = ctx.request.body.pageNumber
        let offset = 10
        let is_show = ctx.request.body.is_show
        //console.log('ctx数据', ctx.request.body)
        await sql.distinctBookInfo(row, is_show, offset).then((data) => {
            ctx.response.type = 'application/json';
            ctx.response.body = {
                tableData: data.tableData,
                allPageNum: data.allPageNum
            }
        }).catch((data) => {
            console.dir(data)
        })
    },

     'POST /api/searchBookInfo': async (ctx, next) => {
        //返回搜索书籍信息
        let row = ctx.request.body.pageNumber
        let offset = 10
        let field = ctx.request.body.field
        //console.log('ctx数据', ctx.request.body)
        await sql.searchBookInfo(row, field, offset).then((data) => {
            ctx.response.type = 'application/json';
            ctx.response.body = {
                tableData: data.tableData,
                allPageNum: data.allPageNum
            }
        }).catch((data) => {
            console.dir(data)
        })
    },

    'POST /api/deleteBook': async (ctx, next) => {
        //删除书籍信息
        //console.log('ctx数据', ctx.request.body)
        await sql.deleteBook(ctx.request.body.id).then((data) => {
            ctx.response.type = 'application/json';
            ctx.response.body = {
                statue: data
            }
        }).catch((data) => {
            console.dir(data)
        })
    },

    'POST /api/reqChapterInfo': async (ctx, next) => {
        //返回章节数据
        let row = ctx.request.body.pageNumber
        let offset = 10
        let field = ctx.request.body.searchTxt
        let bookId = ctx.request.body.bookId
        console.log('ctx数据', ctx.request.body)
        await sql.reqChapterInfo(row, field, offset, bookId).then((data) => {
            ctx.response.type = 'application/json';
            ctx.response.body = {
                tableData: data.tableData,
                allPageNum: data.allPageNum
            }
        }).catch((data) => {
            console.dir(data)
        })
    },

    'POST /api/setChapterMoney': async (ctx, next) => {
        //章节付费免费的更新
        let id = ctx.request.body.id
        let chapter_type = ctx.request.body.chapter_type
        let chapter_money = ctx.request.body.chapter_money
        //console.log('ctx数据', ctx.request.body)
        //console.log('id数据类型', typeof(ctx.request.body.id), typeof(ctx.request.body.chapter_type), typeof(ctx.request.body.chapter_money))
        await sql.setChapterMoney(id, chapter_type, chapter_money).then((data) => {
            ctx.response.type = 'application/json';
            ctx.response.body = {
                statue: data
            }
        }).catch((data) => {
            console.dir(data)
        })
    },

    'POST /api/distinctChapterInfo': async (ctx, next) => {
        //返回章节数据
        let row = ctx.request.body.pageNumber
        let offset = 10
        let chapter_type = ctx.request.body.chapter_type
        let bookId = ctx.request.body.bookId
        console.log('ctx数据', ctx.request.body)
        await sql.distinctChapterInfo(row, chapter_type, offset, bookId).then((data) => {
            ctx.response.type = 'application/json';
            ctx.response.body = {
                tableData: data.tableData,
                allPageNum: data.allPageNum
            }
        }).catch((data) => {
            console.dir(data)
        })
    },

    'POST /api/deleteChapter': async (ctx, next) => {
        //删除书籍信息
        //console.log('ctx数据', ctx.request.body)
        await sql.deleteChapter(ctx.request.body.id).then((data) => {
            ctx.response.type = 'application/json';
            ctx.response.body = {
                statue: data
            }
        }).catch((data) => {
            console.dir(data)
        })
    },

    'POST /api/changeShow': async (ctx, next) => {
        //返回更新书籍状态
        let id = ctx.request.body.id
        let is_show = ctx.request.body.is_show
        //console.log('ctx数据', ctx.request.body)
        //console.log('id数据类型', typeof(ctx.request.body.id))
        await sql.changeShow(id, is_show).then((data) => {
            ctx.response.type = 'application/json';
            ctx.response.body = {
                statue: data
            }
        }).catch((data) => {
            console.dir(data)
        })
    },

    'POST /api/reqAllBookStatistic': async (ctx, next) => {
        //返回书籍统计数据
        let row = ctx.request.body.pageNumber
        let offset = 10
        let field = ctx.request.body.searchTxt
        //console.log('ctx数据', ctx.request.body)
        await sql.reqAllBookStatistic(row, field, offset).then((data) => {
            ctx.response.type = 'application/json';
            ctx.response.body = {
                tableData: data.tableData,
                allPageNum: data.allPageNum
            }
        }).catch((data) => {
            console.dir(data)
        })
    },

    'POST /api/reqComment': async (ctx, next) => {
        //返回评论数据
        let row = ctx.request.body.pageNumber
        let offset = 10
        let field = ctx.request.body.searchTxt
        //console.log('ctx数据', ctx.request.body)
        await sql.reqComment(row, field, offset).then((data) => {
            ctx.response.type = 'application/json';
            ctx.response.body = {
                tableData: data.tableData,
                allPageNum: data.allPageNum
            }
        }).catch((data) => {
            console.dir(data)
        })
    },

    'POST /api/updateTop': async (ctx, next) => {
        //更新评论数据
        let id = ctx.request.body.id
        let type = ctx.request.body.type
        //console.log('ctx数据', ctx.request.body)
        //console.log('id数据类型', typeof(ctx.request.body.id))
        await sql.updateTop(id, type).then((data) => {
            ctx.response.type = 'application/json';
            ctx.response.body = {
                statue: data
            }
        }).catch((data) => {
            console.dir(data)
        })
    },

    'POST /api/deleteComment': async (ctx, next) => {
        //删除评论数据
        let id = ctx.request.body.id
        //console.log('ctx数据', ctx.request.body)
        await sql.deleteComment(id).then((data) => {
            ctx.response.type = 'application/json';
            ctx.response.body = {
                statue: data
            }
        }).catch((data) => {
            console.dir(data)
        })
    },

    'POST /api/reqUser': async (ctx, next) => {
        //返回用户数据
        let row = ctx.request.body.pageNumber
        let offset = 10
        let field = ctx.request.body.searchTxt
        //console.log('ctx数据', ctx.request.body)
        await sql.reqUser(row, field, offset).then((data) => {
            ctx.response.type = 'application/json';
            ctx.response.body = {
                tableData: data.tableData,
                allPageNum: data.allPageNum
            }
        }).catch((data) => {
            console.dir(data)
        })
    },

    'POST /api/reqUserSubscribe': async (ctx, next) => {
        //返回用户订阅书籍数据
        let row = ctx.request.body.pageNumber
        let offset = 10
        let id = ctx.request.body.userId
        //console.log('ctx数据', ctx.request.body)
        await sql.reqUserSubscribe(row, id, offset).then((data) => {
            ctx.response.type = 'application/json';
            ctx.response.body = {
                tableData: data.tableData,
                allPageNum: data.allPageNum
            }
        }).catch((data) => {
            console.dir(data)
        })
    },

    'POST /api/deleteUser': async (ctx, next) => {
        //删除用户数据
        let id = ctx.request.body.id
        console.log('ctx数据', ctx.request.body)
        await sql.deleteUser(id).then((data) => {
            ctx.response.type = 'application/json';
            ctx.response.body = {
                statue: data
            }
        }).catch((data) => {
            console.dir(data)
        })
    },

    'POST /api/reqBookDetails': async (ctx, next) => {
        //返回书籍详情信息
        let id = ctx.request.body.id
        //console.log('ctx数据', ctx.request.body)
        await sql.reqBookDetails(id).then((data) => {
            ctx.response.type = 'application/json';
            ctx.response.body = {
                resultData: data
            }
        }).catch((data) => {
            console.dir(data)
        })
    },

    'POST /api/insertBookDetails': async (ctx, next) => {
        //返回书籍详情信息
        let info = ctx.request.body.info
        //console.log('ctx数据', ctx.request.body)
        await sql.insertBookDetails(info).then((data) => {
            ctx.response.type = 'application/json';
            ctx.response.body = {
                id: data
            }
        }).catch((data) => {
            console.dir(data)
        })
    },

    'POST /api/updateBookDetails': async (ctx, next) => {
        //更新书籍详情信息
        let info = ctx.request.body.info
        let id = ctx.request.body.id
        //console.log('ctx数据', ctx.request.body)
        await sql.updateBookDetails(info, id).then((data) => {
            ctx.response.type = 'application/json';
            ctx.response.body = {
                statue: data
            }
        }).catch((data) => {
            console.dir(data)
        })
    },

    'POST /api/reqChapterId': async (ctx, next) => {
        //取得章节的id
        let bookId = ctx.request.body.bookId
        //console.log('ctx数据', ctx.request.body)
        await sql.reqChapterId(bookId).then((data) => {
            ctx.response.type = 'application/json';
            ctx.response.body = {
                chapter_id: data
            }
        }).catch((data) => {
            console.dir(data)
        })
    },

    'POST /api/insertChapterContant': async (ctx, next) => {
        //插入章节内容
        //console.log('ctx数据', ctx.request.body)
        await sql.insertChapterContant(ctx.request.body).then((data) => {
            ctx.response.type = 'application/json';
            ctx.response.body = {
                statue: data
            }
        }).catch((data) => {
            console.dir(data)
        })
    },

    'POST /api/reqChapterContant': async (ctx, next) => {
        //请求章节内容
        //console.log('ctx数据', ctx.request.body)
        await sql.reqChapterContant(ctx.request.body).then((data) => {
            ctx.response.type = 'application/json';
            ctx.response.body = {
                data: data
            }
        }).catch((data) => {
            console.dir(data)
        })
    },

    'POST /api/updateChapterContent': async (ctx, next) => {
        //更新章节内容
        //console.log('ctx数据', ctx.request.body)
        await sql.updateChapterContent(ctx.request.body).then((data) => {
            ctx.response.type = 'application/json';
            ctx.response.body = {
                statue: data
            }
        }).catch((data) => {
            console.dir(data)
        })
    },

    'POST /api/insertManyChapter': async (ctx, next) => {
        //批量上传
        //console.log('ctx数据', ctx.request.body)
        await sql.insertManyChapter(ctx.request.body.resultInfo).then((data) => {
            ctx.response.type = 'application/json';
            ctx.response.body = {
                statue: data
            }
        }).catch((data) => {
            console.dir(data)
        })
    }
}
