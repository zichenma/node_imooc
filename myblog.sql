use myblog;
-- Add:
-- password is reserved keyword should use `password` as col name
-- insert into users(username, `password`, realname) values ("lisi", "123", "Lisisi");

-- Query:
-- select * from users;
-- select id, username from users where username='zhangsan' and `password`='123';
-- select id, username from users where username='zhangsan' or `password`='123';
-- select * from users where password like'%1%';
-- != :
-- select * from users where state <> '1';

-- Sort:
-- select * from users where password like'%1%' order by id desc;

-- Close safe mode: 
-- SET SQL_SAFE_UPDATES = 0;

-- Update:
-- update users set realname = "Lisi2" where username = "lisi";
-- select * from users;

-- Delete (must follow users) :
-- after delete the id will still be increased
-- delete from users where username = "lisi";

-- Add col: 
-- ALTER TABLE `myblog`.`users` 
-- ADD COLUMN `state` INT NOT NULL DEFAULT 1 AFTER `realname`;

-- Delete col: 
-- alter table `myblog`.`users` drop column `state`;

-- soft delete:
-- select * from users where state = '1';
-- update users set state = '0' where username ='lisi';
-- recover data: 
-- update users set state = '1' where username ='lisi';

-- insert into blogs (title, content, createtime, author) values ('title A', 'content A', 1558576427746, 'zhangsan');
-- insert into blogs (title, content, createtime, author) values ('title B', 'content B', 1558576607452, 'lisi');

-- select * from blogs where author="lisi" order by createtime desc;
-- select * from blogs where title like '%A%' order by createtime desc;

-- select * from users;
-- select * from blogs;

-- Check the database version:
-- select version();




