--------------------------------------------------------
--  DDL for Table BOARD
--------------------------------------------------------

  CREATE TABLE "BOARD" 
   (	"SEQ_NO" VARCHAR2(3 BYTE), 
	"TITLE" VARCHAR2(100 BYTE), 
	"CONTENT" VARCHAR2(4000 BYTE), 
	"READ_CNT" VARCHAR2(3 BYTE), 
	"WRITER" VARCHAR2(100 BYTE), 
	"REQ_DATE" DATE, 
	"UPDATE_DATE" DATE
   )  ;


REM INSERTING into BOARD
SET DEFINE OFF;
Insert into BOARD (SEQ_NO,TITLE,CONTENT,READ_CNT,WRITER,REQ_DATE,UPDATE_DATE) values ('1','title1','내용내용내용','11','작성자1',sysdate,sysdate);
Insert into BOARD (SEQ_NO,TITLE,CONTENT,READ_CNT,WRITER,REQ_DATE,UPDATE_DATE) values ('2','title2','내용내용내용','11','작성자2',sysdate,sysdate);
Insert into BOARD (SEQ_NO,TITLE,CONTENT,READ_CNT,WRITER,REQ_DATE,UPDATE_DATE) values ('3','title3','내용내용내용','11','작성자3',sysdate,sysdate);
Insert into BOARD (SEQ_NO,TITLE,CONTENT,READ_CNT,WRITER,REQ_DATE,UPDATE_DATE) values ('4','title4','내용내용내용','11','작성자4',sysdate,sysdate);
Insert into BOARD (SEQ_NO,TITLE,CONTENT,READ_CNT,WRITER,REQ_DATE,UPDATE_DATE) values ('5','title5','내용내용내용','11','작성자5',sysdate,sysdate);
Insert into BOARD (SEQ_NO,TITLE,CONTENT,READ_CNT,WRITER,REQ_DATE,UPDATE_DATE) values ('6','title6','내용내용내용','11','작성자6',sysdate,sysdate);
Insert into BOARD (SEQ_NO,TITLE,CONTENT,READ_CNT,WRITER,REQ_DATE,UPDATE_DATE) values ('7','title7','내용내용내용','11','작성자7',sysdate,sysdate);
Insert into BOARD (SEQ_NO,TITLE,CONTENT,READ_CNT,WRITER,REQ_DATE,UPDATE_DATE) values ('8','title8','내용내용내용','11','작성자8',sysdate,sysdate);
Insert into BOARD (SEQ_NO,TITLE,CONTENT,READ_CNT,WRITER,REQ_DATE,UPDATE_DATE) values ('9','title9','내용내용내용','11','작성자9',sysdate,sysdate);
Insert into BOARD (SEQ_NO,TITLE,CONTENT,READ_CNT,WRITER,REQ_DATE,UPDATE_DATE) values ('10','title10','내용내용내용','11','작성자10',sysdate,sysdate);
Insert into BOARD (SEQ_NO,TITLE,CONTENT,READ_CNT,WRITER,REQ_DATE,UPDATE_DATE) values ('11','title11','내용내용내용','11','작성자11',sysdate,sysdate);
Insert into BOARD (SEQ_NO,TITLE,CONTENT,READ_CNT,WRITER,REQ_DATE,UPDATE_DATE) values ('12','title12','내용내용내용','11','작성자12',sysdate,sysdate);
Insert into BOARD (SEQ_NO,TITLE,CONTENT,READ_CNT,WRITER,REQ_DATE,UPDATE_DATE) values ('13','title13','내용내용내용','11','작성자13',sysdate,sysdate);
   