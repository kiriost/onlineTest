alter table 表名 convert to charset utf8;

use olexam

/*学生表*/

create table student(
 stu_no int not null auto_increment,
 stu_name varchar(20) not null,
 stu_pw varchar(20) not null,
 stu_sex varchar(2) not null check (stu_sex='男' or stu_sex='女'),
 stu_id varchar(20) not null,
 stu_tel varchar(20) null,
 primary key (stu_no)
);

insert into student values (100000,'张三','123456','男','111','13233333333');
insert into student (stu_name,stu_pw,stu_sex,stu_id,stu_tel) values ('李四','123456','男','222','13666666666');
insert into student (stu_name,stu_pw,stu_sex,stu_id,stu_tel) values ('王五','123456','男','333','13555555555');

/*科目表*/

create table subject(
 sub_no int not null auto_increment,
 sub_name varchar(20) not null,
 primary key (sub_no)
);

insert into subject values (1,'test');
insert into subject values (2,'数据库');
insert into subject (sub_name) values ('计算机组成原理');
insert into subject (sub_name) values ('算法设计与分析');
insert into subject (sub_name) values ('无线传感器');
insert into subject (sub_name) values ('计算机操作系统');
insert into subject (sub_name) values ('软件工程');
/*判断题表*/

create table tureorfalse(
 tf_no int not null auto_increment,
 sub_no int not null,
 question varchar(100) not null,
 anwser char(1) not null check (answer='T' or answer='F'),
 primary key (tf_no),
 foreign key (sub_no) references subject (sub_no)
);

insert into tureorfalse values (1,1,'这句话是对的。','T');

/*选择题表*/

create table choice(
 cho_no int not null auto_increment,
 sub_no int not null,
 multi bit not null,	/*0 - 单选; 1 - 多选*/
 question varchar(100) not null,
 cho_a varchar(40) not null,
 cho_b varchar(40) not null,
 cho_c varchar(40) not null,
 cho_d varchar(40) not null,
 anwser varchar(4) not null,
 primary key (cho_no),
 foreign key (sub_no) references subject (sub_no)
);

 insert into choice values (1,1,0,'Which is true?','true','false','maybe','emmmm','A');
 insert into choice (sub_no,multi,question,cho_a,cho_b,cho_c,cho_d,anwser) values (1,1,'Ctrl + A','1','2','3','4','ABCD');

/*考场表*/

create table room(
 room_no int not null auto_increment,
 room_size int not null,
 room_add varchar(10) not null,
 primary key (room_no)
);

 insert into room values (101,50,'1号机房');
 insert into room values (102,50,'2号机房');
 insert into room values (103,100,'3号机房');

/*考试表*/

create table exam(
 exam_no int not null auto_increment,
 exam_name varchar(40) not null,
 sub_no int,
 room_no int,
 exam_date date not null,
 start time not null,
 over time not null,
 primary key (exam_no),
 foreign key (sub_no) references subject (sub_no),
 foreign key (room_no) references room (room_no)
);

insert into exam values (1,'第一次测试',1,101,'2017-12-26','10:00:00','12:00:00');

/*考试判断题表*/

create table exam_tf(
 exam_no int,
 tf_no int,
 primary key (exam_no,tf_no),
 foreign key (exam_no) references exam (exam_no),
 foreign key (tf_no) references tureorfalse (tf_no)
);

insert into exam_tf values (1,1);

/*考试选择题表*/

create table exam_cho(
 exam_no int,
 cho_no int,
 primary key (exam_no,cho_no),
 foreign key (exam_no) references exam (exam_no),
 foreign key (cho_no) references choice (cho_no)
);

insert into exam_cho values (1,1);
insert into exam_cho values (1,2);

/*学生考试表*/

create table stu_exam(
 stu_no int,
 exam_no int,
 grade int default 0,
 primary key (stu_no,exam_no)
);

/*考试1判断题视图*/

create view exam_1_tf as(
 select question,anwser from tureorfalse where tf_no in(
  select tf_no from exam_tf where exam_no = '1'));

/*考试1选择题视图*/

create view exam_1_cho as(
 select question,cho_a,cho_b,cho_c,cho_d,anwser from choice where cho_no in(
  select cho_no from exam_cho where exam_no = '1'));
