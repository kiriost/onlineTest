var products = [{
    name: 'iPhone',
    price: 6999
}, {
    name: 'Kindle',
    price: 999
}];

const sql = require('../server');

module.exports = {
    'GET /api/getStudentInfo': async (ctx, next) => {
        //返回学生信息
        await sql.getStudentInfo().then((data) => {
            ctx.response.type = 'application/json';
            ctx.response.body = {
                tableData: data
            }
        }).catch((data) => {
            console.dir(data)
        })
    },

    'POST /api/addStudentInfo': async (ctx, next) => {
        //添加学生信息
        //console.dir(ctx.request.body.addData.stu_name)
        await sql.addStudentInfo(ctx.request.body.addData).then((data) => {
            console.dir(data)
            ctx.response.type = 'application/json';
            ctx.response.body = {
                tableData: data
            }
        }).catch((data) => {
            console.dir(data)
        })
    },

    'POST /api/deleteStudentInfo': async (ctx, next) => {
        //删除学生信息
        //console.dir(ctx.request.body.stu_no)
        await sql.deleteStudentInfo(ctx.request.body.stu_no).then((data) => {
            console.dir(data)
            ctx.response.type = 'application/json';
            ctx.response.body = {
                tableData: data
            }
        }).catch((data) => {
            console.dir(data)
        })
    },
    'GET /api/getRoomInfo': async (ctx, next) => {
        //返回考场信息
        await sql.getRoomInfo().then((data) => {
            ctx.response.type = 'application/json';
            ctx.response.body = {
                tableData: data
            }
        }).catch((data) => {
            console.dir(data)
        })
    },

    'POST /api/addRoomInfo': async (ctx, next) => {
        //添加考场信息
        //console.dir(ctx.request.body.addData)
        await sql.addRoomInfo(ctx.request.body.addData).then((data) => {
            //console.dir(data)
            ctx.response.type = 'application/json';
            ctx.response.body = {
                tableData: data
            }
        }).catch((data) => {
            console.dir(data)
        })
    },

    'POST /api/deleteRoomInfo': async (ctx, next) => {
        //删除考场信息
        //console.dir(ctx.request.body.room_no)
        await sql.deleteRoomInfo(ctx.request.body.room_no).then((data) => {
            ctx.response.type = 'application/json';
            ctx.response.body = {
                tableData: data
            }
        }).catch((data) => {
            console.dir(data)
        })
    },

    'POST /api/addSelectPro': async (ctx, next) => {
        //增加选择题
        //console.dir(ctx.request.body.room_no)
        await sql.addSelectPro(ctx.request.body).then((data) => {
            ctx.response.type = 'application/json';
            ctx.response.body = {
                statuCode: data
            }
        }).catch((data) => {
            console.dir(data)
        })
    },

    'POST /api/addJudgePro': async (ctx, next) => {
        //增加判断题
        //console.dir(ctx.request.body.room_no)
        await sql.addJudgePro(ctx.request.body).then((data) => {
            ctx.response.type = 'application/json';
            ctx.response.body = {
                statuCode: data
            }
        }).catch((data) => {
            console.dir(data)
        })
    },
    'POST /api/getSelectInfo': async (ctx, next) => {
        //加载数据,两个参数,科目的number和题目number
        //sub_no, cho_no
        //cho_no-1时查询所有，
        //console.dir(ctx.request.body)
        await sql.getSelectInfo(ctx.request.body).then((data) => {
            ctx.response.type = 'application/json';
            ctx.response.body = {
                tableData: data
            }
        }).catch((data) => {
            console.dir(data)
        })
    },
    'POST /api/getJudgeInfo': async (ctx, next) => {
        //加载数据,两个参数,科目的number和题目number
        //sub_no, tf_no
        //tf_no-1时查询所有，
        //console.dir(ctx.request.body)
        await sql.getJudgeInfo(ctx.request.body).then((data) => {
            ctx.response.type = 'application/json';
            ctx.response.body = {
                tableData: data
            }
        }).catch((data) => {
            console.dir(data)
        })
    },
    'POST /api/deleteSelectInfo': async (ctx, next) => {
        //删除当前选择题
        //console.dir(ctx.request.body)
        await sql.deleteSelectInfo(ctx.request.body).then((data) => {
            ctx.response.type = 'application/json';
            ctx.response.body = {
                tableData: data
            }
        }).catch((data) => {
            console.dir(data)
        })
    },
    'POST /api/deleteJudgeInfo': async (ctx, next) => {
        //删除当前判断题
        //console.dir(ctx.request.body)
        await sql.deleteJudgeInfo(ctx.request.body).then((data) => {
            ctx.response.type = 'application/json';
            ctx.response.body = {
                tableData: data
            }
        }).catch((data) => {
            console.dir(data)
        })
    },
    'GET /api/getTestResult': async (ctx, next) => {
        //查询考生考试结果
        //console.dir(ctx.request.body)
        await sql.getTestResult().then((data) => {
            ctx.response.type = 'application/json';
            ctx.response.body = {
                tableData: data
            }
        }).catch((data) => {
            console.dir(data)
        })
    },
    'GET /api/getAddTestInfo': async (ctx, next) => {
        //查询安排的考试
        //console.dir(ctx.request.body)
        await sql.getAddTestInfo().then((data) => {
            ctx.response.type = 'application/json';
            ctx.response.body = {
                tableData: data
            }
        }).catch((data) => {
            console.dir(data)
        })
    },
    'POST /api/deleteAddTestInfo': async (ctx, next) => {
        //删除安排的考试
        console.dir(ctx.request.body)
        await sql.deleteAddTestInfo(ctx.request.body.exam_no).then((data) => {
            ctx.response.type = 'application/json';
            ctx.response.body = {
                tableData: data
            }
        }).catch((data) => {
            console.dir(data)
        })
    },

    'POST /api/insertAddTestInfo': async (ctx, next) => {
        //增加安排的考试
        //console.dir(ctx.request.body.addData)
        await sql.insertAddTestInfo(ctx.request.body.addData).then((data) => {
            ctx.response.type = 'application/json';
            ctx.response.body = {
                tableData: data
            }
        }).catch((data) => {
            console.dir(data)
        })
    },

    'POST /api/stuLogin': async (ctx, next) => {
        //考生登陆
        //console.dir(ctx.request.body)
        await sql.stuLogin(ctx.request.body).then((data) => {
            ctx.response.type = 'application/json';
            ctx.response.body = {
                statue: data
            }
        }).catch((data) => {
            console.dir(data)
        })
    },

    'POST /api/manageLogin': async (ctx, next) => {
        //管理员登陆
        //console.dir(ctx.request.body)
        await sql.manageLogin(ctx.request.body).then((data) => {
            ctx.response.type = 'application/json';
            ctx.response.body = {
                statue: data
            }
        }).catch((data) => {
            console.dir(data)
        })
    },

    'POST /api/register': async (ctx, next) => {
        //注册
        console.dir(ctx.request.body)
        await sql.register(ctx.request.body.addData).then((data) => {
            ctx.response.type = 'application/json';
            ctx.response.body = {
                insertId: data.insertId
            }
        }).catch((data) => {
            console.dir(data)
        })
    },

    'POST /api/getNowStudentInfo': async (ctx, next) => {
        //返回当前学生信息
        //console.dir(ctx.request.body)
        await sql.getNowStudentInfo(ctx.request.body.stu_no).then((data) => {
            ctx.response.type = 'application/json';
            ctx.response.body = {
                tableData: data
            }
        }).catch((data) => {
            console.dir(data)
        })
    },

    'POST /api/getMyTestResult': async (ctx, next) => {
        //返回当前学生考试成绩
        //console.dir(ctx.request.body)
        await sql.getMyTestResult(ctx.request.body.stu_no).then((data) => {
            ctx.response.type = 'application/json';
            ctx.response.body = {
                tableData: data
            }
        }).catch((data) => {
            console.dir(data)
        })
    },

    'POST /api/getDoTestPro': async (ctx, next) => {
        //返回当前考试名
        //console.dir(ctx.request.body)
        await sql.getDoTestPro(ctx.request.body.exam_no).then((data) => {
            ctx.response.type = 'application/json';
            ctx.response.body = {
                project: data
            }
        }).catch((data) => {
            console.dir(data)
        })
    },

    'POST /api/getDoTestSelect': async (ctx, next) => {
        //返回当前选择题列表
        //console.dir(ctx.request.body)
        await sql.getDoTestSelect(ctx.request.body.exam_no).then((data) => {
            ctx.response.type = 'application/json';
            ctx.response.body = {
                tableData: data
            }
        }).catch((data) => {
            console.dir(data)
        })
    },

    'POST /api/getDoTestJudge': async (ctx, next) => {
        //返回当前判断题列表
        //console.dir(ctx.request.body)
        await sql.getDoTestJudge(ctx.request.body.exam_no).then((data) => {
            ctx.response.type = 'application/json';
            ctx.response.body = {
                tableData: data
            }
        }).catch((data) => {
            console.dir(data)
        })
    },

    'POST /api/addTestInfo': async (ctx, next) => {
        //插入考生成绩
        console.dir(ctx.request.body)
        await sql.addTestInfo(ctx.request.body).then((data) => {
            ctx.response.type = 'application/json';
            ctx.response.body = {
                tableData: data
            }
        }).catch((data) => {
            console.dir(data)
        })
    },

    'POST /api/judgeIsTest': async (ctx, next) => {
        //查找有无考试
        console.dir(ctx.request.body)
        await sql.judgeIsTest(ctx.request.body).then((data) => {
            ctx.response.type = 'application/json';
            ctx.response.body = {
                tableData: data
            }
        }).catch((data) => {
            console.dir(data)
        })
    }

}
