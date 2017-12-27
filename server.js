'use strict'
var mysql      = require('mysql');
var pool  = mysql.createPool({
  localAddress : '127.0.0.1',
  user     : '',
  password : '',
  database : 'olexam',
  connectionLimit : 10
  //charset  : 'gbk'
});

var getStudentInfo = () => {
    //得到所有学生的信息
    let promise = new Promise((resolve, reject) => {
        pool.getConnection(function(err, connection) {
          // Use the connection
          connection.query('SELECT * from student', function (error, results, fields) {
            resolve(results)
            // And done with the connection.
            connection.release();
         
            // Handle error after the release.
            if (error) throw reject(error);
         
            // Don't use the connection here, it has been returned to the pool.
          });
        });  
    });
    return promise  
}

var addStudentInfo = (data) => {
    //增加学生信息
    var addStudentSql = 'insert into student (stu_name, stu_pw, stu_sex, stu_id, stu_tel) values (?, ?, ?, ?, ?)'
    var addStudentParams = [data.stu_name, data.stu_pw, data.stu_sex, data.stu_id, data.stu_tel]
    let promise = new Promise((resolve, reject) => {
        pool.getConnection(function(err, connection) {
            connection.query(addStudentSql, addStudentParams, function (error, results, fields) {
                connection.query('SELECT * from student', function (error, results, fields) {
                //插入成功后查询
                resolve(results)                
                if (error) throw reject(error);          
              });
            connection.release();   
            if (error) throw reject(error);
         
          });
        });  
    });
    return promise  
}

var deleteStudentInfo = (data) => {
    //删除学生信息
    var deleteStudentSql = 'delete from student where stu_no = ?'
    var deleteStudentParams = [data]
    let promise = new Promise((resolve, reject) => {
        pool.getConnection(function(err, connection) {
            connection.query(deleteStudentSql, deleteStudentParams, function (error, results, fields) {
                connection.query('SELECT * from student', function (error, results, fields) {
                //插入成功后查询
                resolve(results)                
                if (error) throw reject(error);          
              });
            connection.release();   
            if (error) throw reject(error);
         
          });
        });  
    });
    return promise  
}

var getRoomInfo = () => {
    //得到所有考场的信息
    let promise = new Promise((resolve, reject) => {
        pool.getConnection(function(err, connection) {
          // Use the connection
          connection.query('SELECT * from room', function (error, results, fields) {
            resolve(results)
            // And done with the connection.
            connection.release();
         
            // Handle error after the release.
            if (error) throw reject(error);
         
            // Don't use the connection here, it has been returned to the pool.
          });
        });  
    });
    return promise  
}

var addRoomInfo = (data) => {
    //增加考场信息
    var addRoomSql = 'insert into room (room_size, room_add) values (?, ?)'
    var addRoomParams = [data.room_size, data.room_add]
    let promise = new Promise((resolve, reject) => {
        pool.getConnection(function(err, connection) {
            connection.query(addRoomSql, addRoomParams, function (error, results, fields) {
                connection.query('SELECT * from room', function (error, results, fields) {
                    //插入成功后查询
                    resolve(results)                
                    if (error) throw reject(error);          
              });
            connection.release();   
            if (error) throw reject(error);
         
          });
        });  
    });
    return promise  
}

var deleteRoomInfo = (data) => {
    //删除考场信息
    var deleteRoomSql = 'delete from room where room_no = ?'
    var deleteRoomParams = [data]
    //console.dir(data)
    let promise = new Promise((resolve, reject) => {
        pool.getConnection(function(err, connection) {
            connection.query(deleteRoomSql, deleteRoomParams, function (error, results, fields) {
                connection.query('SELECT * from room', function (error, results, fields) {
                //插入成功后查询
                resolve(results)                
                if (error) throw reject(error);          
              });
            connection.release();   
            if (error) throw reject(error);
         
          });
        });  
    });
    return promise  
}

var addSelectPro = (data) => {
    //增加选择题信息
    var addSelectProSql = 'insert into choice (sub_no,multi,question,cho_a,cho_b,cho_c,cho_d,anwser) values (?, ?, ?, ?, ?, ?, ?, ?)'
    var addSelectPrParams = [data.sub_no, data.multy, data.question, data.cho_a, data.cho_b, data.cho_c, data.cho_d, data.answer]
    let promise = new Promise((resolve, reject) => {
        pool.getConnection(function(err, connection) {
            connection.query(addSelectProSql, addSelectPrParams, function (error, results, fields) {
                resolve(1)
                connection.release();   
                if (error) throw reject(error);
          });
        });  
    });
    return promise  
}

var addJudgePro = (data) => {
    //增加判断题信息
    if (data.answer == "对"){
        data.answer = 'T'
    }else if(data.answer == "错"){
        data.answer = 'F'
    }
    var addJudgeProSql = 'insert into tureorfalse (sub_no,question,anwser) values (?, ?, ?)'
    var addJudgeProParams = [data.sub_no, data.question, data.answer]
    let promise = new Promise((resolve, reject) => {
        pool.getConnection(function(err, connection) {
            connection.query(addJudgeProSql, addJudgeProParams, function (error, results, fields) {
                resolve(1)
                connection.release();   
                if (error) throw reject(error);
            
          });
        });  
    });
    return promise  
}

var getSelectInfo = (data) => {
    //加载数据,两个参数,科目的number和题目number
    //sub_no, cho_no
    //cho_no-1时查询所有，
    var getSelectInfoSql = ''
    var getSelectInfoParams = []
    if(data.cho_no == -1){
        getSelectInfoSql = 'SELECT * from choice where sub_no = ?'
        getSelectInfoParams = [data.sub_no]
    }else if(data.cho_no){
        getSelectInfoSql = 'SELECT * from choice where sub_no = ? and cho_no = ?'
        getSelectInfoParams = [data.sub_no, data.cho_no]
    }
    let promise = new Promise((resolve, reject) => {
        pool.getConnection(function(err, connection) {
            connection.query(getSelectInfoSql, getSelectInfoParams, function (error, results, fields) {
                //console.dir(results)
                resolve(results)
                connection.release();   
                if (error) throw reject(error);
            
          });
        });  
    });
    return promise  
}

var getJudgeInfo = (data) => {
    //加载数据,两个参数,科目的number和题目number
    //sub_no, cho_no
    //cho_no-1时查询所有，
    var getJudgeInfoSql = ''
    var getJudgeInfoParams = []
    if(data.tf_no == -1){
        getJudgeInfoSql = 'SELECT * from tureorfalse where sub_no = ?'
        getJudgeInfoParams = [data.sub_no]
    }else if(data.tf_no){
        getJudgeInfoSql = 'SELECT * from tureorfalse where tf_no = ?'
        getJudgeInfoParams = [data.tf_no]
    }
    let promise = new Promise((resolve, reject) => {
        pool.getConnection(function(err, connection) {
            connection.query(getJudgeInfoSql, getJudgeInfoParams, function (error, results, fields) {
                //console.dir(results)
                resolve(results)
                connection.release();   
                if (error) throw reject(error);
            
          });
        });  
    });
    return promise  
}

var deleteSelectInfo = (data) => {
    //删除选择题数据
    var deleteSelectInfoSql = 'delete from choice where cho_no = ?'
    var deleteSelectInfoParams = [data.cho_no]
    let promise = new Promise((resolve, reject) => {
        pool.getConnection(function(err, connection) {
            connection.query(deleteSelectInfoSql, deleteSelectInfoParams, function (error, results, fields) {
                //console.dir(results)
                resolve(results)
                connection.release();   
                if (error) throw reject(error);
          });
        });  
    });
    return promise  
}

var deleteJudgeInfo = (data) => {
    //删除选择题数据
    var deleteJudgeInfoSql = 'delete from tureorfalse where tf_no = ?'
    var deleteJudgeInfoParams = [data.tf_no]
    let promise = new Promise((resolve, reject) => {
        pool.getConnection(function(err, connection) {
            connection.query(deleteJudgeInfoSql, deleteJudgeInfoParams, function (error, results, fields) {
                //console.dir(results)
                resolve(results)
                connection.release();   
                if (error) throw reject(error);
          });
        });  
    });
    return promise  
}

var getTestResult = (data) => {
    //查询考试结果
    var getTestResultSql = 'select stu_exam.stu_no,  student.stu_name, subject.sub_name, grade, stu_exam.exam_no\
                            from stu_exam, student, subject \
                            where student.stu_no = stu_exam.stu_no \
                                and subject.sub_no in ( \
                                    select sub_no \
                                    from exam \
                                    where stu_exam.exam_no = exam.exam_no \
                                    )'
    let promise = new Promise((resolve, reject) => {
        pool.getConnection(function(err, connection) {
            connection.query(getTestResultSql, function (error, results, fields) {
                console.dir(results)
                resolve(results)
                connection.release();   
                if (error) throw reject(error);
          });
        });  
    });
    return promise  
}

var getAddTestInfo = (data) => {
    //查询安排的考试
    var getAddTestInfoSql = 'select exam.exam_no, exam_name, exam_pw, sub_name, room_add, exam_date, start, over\
                                from exam, subject, room\
                                where exam.sub_no = subject.sub_no and exam.room_no = room.room_no'
    let promise = new Promise((resolve, reject) => {
        pool.getConnection(function(err, connection) {
            connection.query(getAddTestInfoSql, function (error, results, fields) {
                //console.dir(results)
                resolve(results)
                connection.release();   
                if (error) throw reject(error);
          });
        });  
    });
    return promise  
}

var deleteAddTestInfo = (data) => {
    //删除安排的考试
    var deleteAddTestInfoSql = 'delete from exam where exam_no = ?'
    var deleteAddTestInfoParams = [data]
    let promise = new Promise((resolve, reject) => {
        pool.getConnection(function(err, connection) {
            connection.query(deleteAddTestInfoSql, deleteAddTestInfoParams, function (error, results, fields) {
                console.dir(results)
                resolve(results)
                connection.release();   
                if (error) throw reject(error);
          });
        });  
    });
    return promise  
}

var selectList = (aim, nowList, type, exam_no) => {
    //从数组nowList中生成一个数量为aim的数组
    var resultList = []
    for(var i = 0; i < aim; i++){
        resultList[i] = []
        var random = Math.floor(Math.random()*nowList.length)
        resultList[i].push(exam_no)
        if(type){
            resultList[i].push(nowList[random].cho_no)
        }else{
            resultList[i].push(nowList[random].tf_no)
        }
        
        nowList.splice(random, 1)
    }
    return resultList
} 

var insertAddTestInfo = (data) => {
    //创建安排考试
    var aimSelectNum = parseInt(data.selectNumber)
    var aimJudgeNum = parseInt(data.judgeNumber)
    var haveSelectNo = ''
    var haveJudgeNo = ''
    var getSelctNoSql = 'select cho_no from choice where choice.sub_no = ?'
    var getJudgeNoSql = 'select tf_no from tureorfalse where tureorfalse.sub_no = ?'
    var insertAddTestInfoSql = 'insert into exam (exam_name, exam_pw, sub_no, room_no, exam_date, start, over)\
                                            values (?, ?, ?, ?, ?, ?, ?)'
    var insertAddTestInfoParams = [data.exam_name, data.exam_pw, data.sub_no, data.room_no, data.exam_date, data.start, data.over]
    var nowExamNo = ''
    let promise = new Promise((resolve, reject) => {
        pool.getConnection(function(err, connection) {
            connection.query(insertAddTestInfoSql, insertAddTestInfoParams, function (error, results, fields) {
                //console.dir(results)
                resolve(results)
                nowExamNo = results.insertId
                connection.query(getSelctNoSql, [data.sub_no], function (error, results, fields) {
                    //按科目查询所有选择题的编号
                    //console.dir(results)
                    haveSelectNo = selectList(aimSelectNum, results, 1, nowExamNo)
                    //console.log("haveSelectNo", haveSelectNo)
                    connection.query(getJudgeNoSql, [data.sub_no], function (error, results, fields) {
                        //按科目查询所有判断题的编号
                        //console.dir(results)
                        haveJudgeNo = selectList(aimJudgeNum, results, 0, nowExamNo)
                        //console.log('haveJudgeNo', haveJudgeNo)
                        if (error) throw reject(error);
                        connection.query('insert into exam_cho (exam_no, cho_no) values ?', [haveSelectNo], function (error, results, fields) {
                            //插入选择题
                            //console.log('选择题',results)
                            connection.query('insert into exam_tf (exam_no, tf_no) values ?', [haveJudgeNo], function (error, results, fields) {
                                //插入判断题
                                //console.log('判断题',results)
                                if (error) throw reject(error);
                                connection.release()
                            });
                            if (error) throw reject(error);
                        });
                    });

                });
                //connection.release();   
                if (error) throw reject(error);
            });
        });  
    });
    return promise  
}

var stuLogin = (data) => {
    //学生登陆
    var stuLoginSql = 'select stu_pw from student where stu_no=?'
    var stuLoginParams = [data.stu_no]
    let promise = new Promise((resolve, reject) => {
        pool.getConnection(function(err, connection) {
            connection.query(stuLoginSql, stuLoginParams, function (error, results, fields) {
                console.dir(results)
                if(results.length){
                    //有查询结果
                    if (data.stu_pw == results[0].stu_pw){
                    //登录成功
                        console.dir('登陆成功')
                        resolve(1)
                    } else {
                        //考生号或密码错误
                        resolve(0)
                    }
                    connection.release();   
                    if (error) throw reject(error);
                }else{
                    resolve(0)
                }
                
          });
        });  
    });
    return promise  
}

var manageLogin = (data) => {
    //管理员登陆
    var manageLoginSql = 'select admin_pw from administrator where admin_name=?'
    var manageLoginParams = [data.stu_no]
    let promise = new Promise((resolve, reject) => {
        pool.getConnection(function(err, connection) {
            connection.query(manageLoginSql, manageLoginParams, function (error, results, fields) {
                console.dir(results.length)
                if(results.length){
                    //有查询结果
                    if (data.stu_pw == results[0].admin_pw){
                        //登录成功
                        console.dir('登陆成功')
                        resolve(1)
                    } else {
                        //考生号或密码错误
                        resolve(0)
                    }
                    connection.release();   
                    if (error) throw reject(error);
                }else{
                    //账户不存在
                    resolve(0)
                }
                
          });
        });  
    });
    return promise  
}

var register = (data) => {
    //学生注册
    var registerSql = 'insert into student (stu_name, stu_pw, stu_sex, stu_id, stu_tel) values (?, ?, ?, ?, ?)'
    var registerParams = [data.stu_name, data.stu_pw, data.stu_sex, data.stu_id, data.stu_tel]
    let promise = new Promise((resolve, reject) => {
        pool.getConnection(function(err, connection) {
            connection.query(registerSql, registerParams, function (error, results, fields) {
                console.dir(results)
                resolve(results)
                connection.release();   
                if (error) throw reject(error);
            });
        });  
    });
    return promise  
}

var getNowStudentInfo = (data) => {
    //得到当前学生的信息
    let promise = new Promise((resolve, reject) => {
        pool.getConnection(function(err, connection) {
          // Use the connection
          connection.query('SELECT stu_name, stu_sex from student where stu_no = ?',  [data],function (error, results, fields) {
            console.dir(results)
            resolve(results)
            // And done with the connection.
            connection.release();
         
            // Handle error after the release.
            if (error) throw reject(error);
         
            // Don't use the connection here, it has been returned to the pool.
          });
        });  
    });
    return promise  
}


var getMyTestResult = (data) => {
    //查询考试结果
    var getMyTestResultSql = 'select exam.exam_name, subject.sub_name, exam.exam_date, stu_exam.grade \
                             from exam, subject, stu_exam \
                              where stu_no=? and subject.sub_no=exam.sub_no and exam.exam_no=stu_exam.exam_no'
    let promise = new Promise((resolve, reject) => {
        pool.getConnection(function(err, connection) {
            connection.query(getMyTestResultSql, [data], function (error, results, fields) {
                //console.dir(results)
                resolve(results)
                connection.release();   
                if (error) throw reject(error);
          });
        });  
    });
    return promise  
}

var getDoTestPro = (data) => {
    //由exam_no查询考试名
    var getDoTestProSql = 'select exam_name\
                             from exam\
                              where exam_no=?'
    let promise = new Promise((resolve, reject) => {
        pool.getConnection(function(err, connection) {
            connection.query(getDoTestProSql, [data], function (error, results, fields) {
                //console.dir(results)
                resolve(results)
                connection.release();   
                if (error) throw reject(error);
          });
        });  
    });
    return promise  
}

var getDoTestSelect = (data) => {
    //由exam_no查询选择题
    var getDoTestSelectSql = 'select question,cho_a,cho_b,cho_c,cho_d,anwser,multi from choice where cho_no in(\
                                select cho_no from exam_cho where exam_no = ?)'
    let promise = new Promise((resolve, reject) => {
        pool.getConnection(function(err, connection) {
            connection.query(getDoTestSelectSql, [data], function (error, results, fields) {
                //console.dir(results)
                resolve(results)
                connection.release();   
                if (error) throw reject(error);
          });
        });  
    });
    return promise  
}

var getDoTestJudge = (data) => {
    //由exam_no查询判断题
    var getDoTestJudgeSql = 'select question,anwser from tureorfalse where tf_no in(\
                                select tf_no from exam_tf where exam_no = ?)'
    let promise = new Promise((resolve, reject) => {
        pool.getConnection(function(err, connection) {
            connection.query(getDoTestJudgeSql, [data], function (error, results, fields) {
                //console.dir(results)
                resolve(results)
                connection.release();   
                if (error) throw reject(error);
          });
        });  
    });
    return promise  
}

var addTestInfo = (data) => {
    //插入考生成绩
    var addTestInfo = 'insert into stu_exam (stu_no, exam_no, grade) values (?, ?, ?)'
    let promise = new Promise((resolve, reject) => {
        pool.getConnection(function(err, connection) {
            connection.query(addTestInfo, [data.stu_no, data.exam_no, data.grade], function (error, results, fields) {
                console.dir(results)
                resolve(results)
                connection.release();   
                if (error) throw reject(error);
          });
        });  
    });
    return promise  
}

var judgeIsTest = (data) => {
    //查询有无考试
    var judgeIsTest = 'select * from stu_exam where exam_no = ? and stu_no = ?'
    let promise = new Promise((resolve, reject) => {
        pool.getConnection(function(err, connection) {
            connection.query(judgeIsTest, [data.exam_no, data.stu_no], function (error, results, fields) {
                console.dir(results.length)
                if(results.length){
                    //有记录
                    resolve(0)
                }else{
                    //没考过
                    resolve(1)
                }
                connection.release();   
                if (error) throw reject(error);
          });
        });  
    });
    return promise  
}

var deleteTestResultInfo = (data) => {
    //删除学生考试信息
    var deleteTestResultInfo = 'delete from stu_exam where exam_no = ? and stu_no = ?'
    let promise = new Promise((resolve, reject) => {
        pool.getConnection(function(err, connection) {
            connection.query(deleteTestResultInfo, [data.exam_no, data.stu_no], function (error, results, fields) {
                resolve(results)
                connection.release();   
                if (error) throw reject(error);
          });
        });  
    });
    return promise  
}

var modifyPw = (data) => {
    //删除学生考试信息
    var modifyPw = 'select * from administrator'
    var updatePw = 'update administrator set admin_pw=? where admin_name="admin"'
    let promise = new Promise((resolve, reject) => {
        pool.getConnection(function(err, connection) {
            connection.query(modifyPw, function (error, results, fields) {
                if(results[0].admin_pw == data.oldPw){
                    //原密码匹配
                    connection.query(updatePw, [data.newPw], function (error, results, fields) {
                        //更新密码
                        resolve(1)
                        if (error) throw reject(error);
                    });
                }else{
                    //密码不正确
                    resolve(0)
                }
                connection.release();   
                if (error) throw reject(error);
            });
        });  
    });
    return promise  
}



module.exports = {      
    getStudentInfo: getStudentInfo,
    addStudentInfo: addStudentInfo,
    deleteStudentInfo: deleteStudentInfo,
    getRoomInfo: getRoomInfo,
    addRoomInfo: addRoomInfo,
    deleteRoomInfo: deleteRoomInfo,
    addSelectPro: addSelectPro,
    addJudgePro: addJudgePro,
    getSelectInfo: getSelectInfo,
    getJudgeInfo: getJudgeInfo,
    deleteSelectInfo: deleteSelectInfo,
    deleteJudgeInfo: deleteJudgeInfo,
    getTestResult: getTestResult,
    getAddTestInfo: getAddTestInfo,
    deleteAddTestInfo: deleteAddTestInfo,
    insertAddTestInfo: insertAddTestInfo,
    stuLogin: stuLogin,
    manageLogin: manageLogin,
    register: register,
    getNowStudentInfo: getNowStudentInfo,
    getMyTestResult: getMyTestResult,
    getDoTestPro: getDoTestPro,
    getDoTestSelect: getDoTestSelect,
    getDoTestJudge: getDoTestJudge,
    addTestInfo: addTestInfo,
    judgeIsTest: judgeIsTest,
    deleteTestResultInfo: deleteTestResultInfo,
    modifyPw: modifyPw
};
