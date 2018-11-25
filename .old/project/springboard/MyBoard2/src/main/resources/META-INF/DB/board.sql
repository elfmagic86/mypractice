drop user kki cascade;

create user kki identified by 1234;
grant connect, resource to kki;

connect kki/1234;

drop table board;
create table board(
    num number not null primary key,    -- �Խù���ȣ
    writer varchar2(50) not null,    -- �ۼ���
    email varchar2(50),    -- �̸���
    subject varchar2(50) not null,    -- ����
    passwd varchar2(50) null,    -- �Խù� ��й�ȣ
    reg_date varchar2(30) not null,    -- �ۼ��Ͻ�
    readcount number default 0,    -- ��ȸ��
    content varchar2(1000) not null,    -- ����
    filename varchar2(100) null   --�����̸�
    --    ref number not null,    -- ���۹�ȣ
--    re_step number not null,    -- ���ۿ����� ���� (��ۼ���)
--    re_level number not null,    -- ��۴ܰ�
--    ip varchar2(50) not null,    -- �ۼ��� IP
--    org_fn varchar2(100), -- �������ϸ�
--    svr_fn varchar2(100) -- �������ϸ�
);

--sequence
create sequence board_seq;
drop sequence board_seq;
select board_seq.nextval from dual;


rollback;
--insert
insert into board values(111111,'2','2','2','2',sysdate,0,'2');

--select 
select * from board order by num desc;
select * from board where reg_date like '%14/04/21' and subject = 'su%';

--delete
DELETE FROM BOARD;

--update
update board set readcount = 1;

--alter
alter table board modify(content varchar(4000));

--rownum�̿��� select
select realrownum, num ,writer, email, subject, passwd, reg_date, readcount, content, filename
from  (  select rownum as realrownum,  num ,writer, email, subject, passwd, reg_date, readcount, content, filename 
             FROM ( select rownum,  num ,writer, email, subject, passwd, reg_date, readcount, content, filename from board order by num desc)
        )
where realrownum between 10 and 20;

--search
select * from board
where content like '%content0%' or subject like '%3t 0%';


---------------------------------------------------------------------------------------------------
            --�亯���̺�
---------------------------------------------------------------------------------------------------
--��ȣ, �ۼ���, ����, �ۼ���,
drop table answer;  
create table answer (
    a_id number primary key not null,
    writer varchar2(20) not null,
    content varchar2(1000) not null,
    reg_date varchar2(30) not null ,
    b_num number not null,
    constraint answer_fk foreign key (b_num) references board(num)   on delete cascade 
);

--sequence
create sequence answer_seq;
drop sequence answer_seq;
select answer_seq.nextval from dual;

rollback;
--insert
select * from board order by num desc;
insert into answer values(answer_seq.nextval,'writer','content',sysdate,4021);
commit;
--select 
select * from answer order by a_id desc;
select * from answer where num=3;

--delete
DELETE FROM answer;

--update
update answer 
set content = '1', reg_date = sysdate;

commit;

------------���忡 �ش��ϴ� ����� ������������. ������ 0
select left.num, count(right.b_num)
from (select num from board where num in (4020,4021,4022,4023) ) left,  answer right  
where left.num = right.b_num(+) 
group by left.num, right.b_num;             
