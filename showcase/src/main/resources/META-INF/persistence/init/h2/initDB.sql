--------------------------------------------------------
--  DDL for Table BOARD
--------------------------------------------------------

  CREATE TABLE "BOARD" 
   (	"SEQ_NO" VARCHAR(3 ), 
	"TITLE" VARCHAR(100 ), 
	"CONTENT" VARCHAR(4000 ), 
	"READ_CNT" VARCHAR(3 ), 
	"WRITER" VARCHAR(100), 
	"REQ_DATE" Time, 
	"UPDATE_DATE" Time
   )  ;

Insert into BOARD (SEQ_NO,TITLE,CONTENT,READ_CNT,WRITER,REQ_DATE,UPDATE_DATE) values ('1','title1','내용내용내용','11','작성자1',CURRENT_DATE(),CURRENT_DATE());
Insert into BOARD (SEQ_NO,TITLE,CONTENT,READ_CNT,WRITER,REQ_DATE,UPDATE_DATE) values ('2','title2','내용내용내용','11','작성자2',CURRENT_DATE(),CURRENT_DATE());
Insert into BOARD (SEQ_NO,TITLE,CONTENT,READ_CNT,WRITER,REQ_DATE,UPDATE_DATE) values ('3','title3','내용내용내용','11','작성자3',CURRENT_DATE(),CURRENT_DATE());
Insert into BOARD (SEQ_NO,TITLE,CONTENT,READ_CNT,WRITER,REQ_DATE,UPDATE_DATE) values ('4','title4','내용내용내용','11','작성자4',CURRENT_DATE(),CURRENT_DATE());
Insert into BOARD (SEQ_NO,TITLE,CONTENT,READ_CNT,WRITER,REQ_DATE,UPDATE_DATE) values ('5','title5','내용내용내용','11','작성자5',CURRENT_DATE(),CURRENT_DATE());
Insert into BOARD (SEQ_NO,TITLE,CONTENT,READ_CNT,WRITER,REQ_DATE,UPDATE_DATE) values ('6','title6','내용내용내용','11','작성자6',CURRENT_DATE(),CURRENT_DATE());
Insert into BOARD (SEQ_NO,TITLE,CONTENT,READ_CNT,WRITER,REQ_DATE,UPDATE_DATE) values ('7','title7','내용내용내용','11','작성자7',CURRENT_DATE(),CURRENT_DATE());
Insert into BOARD (SEQ_NO,TITLE,CONTENT,READ_CNT,WRITER,REQ_DATE,UPDATE_DATE) values ('8','title8','내용내용내용','11','작성자8',CURRENT_DATE(),CURRENT_DATE());
Insert into BOARD (SEQ_NO,TITLE,CONTENT,READ_CNT,WRITER,REQ_DATE,UPDATE_DATE) values ('9','title9','내용내용내용','11','작성자9',CURRENT_DATE(),CURRENT_DATE());
Insert into BOARD (SEQ_NO,TITLE,CONTENT,READ_CNT,WRITER,REQ_DATE,UPDATE_DATE) values ('10','title10','내용내용내용','11','작성자10',CURRENT_DATE(),CURRENT_DATE());
Insert into BOARD (SEQ_NO,TITLE,CONTENT,READ_CNT,WRITER,REQ_DATE,UPDATE_DATE) values ('11','title11','내용내용내용','11','작성자11',CURRENT_DATE(),CURRENT_DATE());
Insert into BOARD (SEQ_NO,TITLE,CONTENT,READ_CNT,WRITER,REQ_DATE,UPDATE_DATE) values ('12','title12','내용내용내용','11','작성자12',CURRENT_DATE(),CURRENT_DATE());
Insert into BOARD (SEQ_NO,TITLE,CONTENT,READ_CNT,WRITER,REQ_DATE,UPDATE_DATE) values ('13','title13','내용내용내용','11','작성자13',CURRENT_DATE(),CURRENT_DATE());



--------------------------------------------------------
--  DDL for Table NSF_TRAN_LOG
--------------------------------------------------------

  CREATE TABLE "NSF_TRAN_LOG" 
   (	"LOG_DT" VARCHAR(8), 
	"SEQ_NO" NUMBER(18,0), 
	"GLOB_ID" VARCHAR(40), 
	"MENU_ID" VARCHAR(20), 
	"IPAD" VARCHAR(30), 
	"TRN_CD" VARCHAR(100), 
	"USER_ID" VARCHAR(20), 
	"GROUP_ID" VARCHAR(20), 
	"OS_VER" VARCHAR(100), 
	"AGENT_VER" VARCHAR(100), 
	"SVC_STRN_DTTM" VARCHAR(17), 
	"SVC_END_DTTM" VARCHAR(17), 
	"RSLT_MSG" VARCHAR(200), 
	"RSLT_MSG_CD" VARCHAR(20), 
	"WAS_INSTANCE_ID" VARCHAR(30), 
	"ELAPSE_TIME" VARCHAR(20)
   ) ;
   
--------------------------------------------------------
--  DDL for Index PK_NSF_TRAN_LOG
--------------------------------------------------------
CREATE UNIQUE INDEX "PK_NSF_TRAN_LOG" ON "NSF_TRAN_LOG" ("LOG_DT", "SEQ_NO", "GLOB_ID");
  
  
CREATE SEQUENCE  "SEQ_NSF_TRAN_LOG_00" ;

--------------------------------------------------------
--  DDL for Table NSF_ERR_LOG
--------------------------------------------------------
DROP TABLE IF EXISTS "NSF_ERR_LOG" CASCADE;

  	CREATE TABLE IF NOT EXISTS "NSF_ERR_LOG" 
   	(	
   	"LOG_DT" VARCHAR(8), 
	"SEQ_NO" NUMBER(18,0), 
	"GLOB_ID" VARCHAR(40), 
	"MENU_ID" VARCHAR(20), 
	"IPAD" VARCHAR(20), 
	"TRN_CD" VARCHAR(100), 
	"USER_ID" VARCHAR(30), 
	"GROUP_ID" VARCHAR(20), 
	"OS_VER" VARCHAR(100), 
	"AGENT_VER" VARCHAR(100), 
	"SVC_STRN_DTTM" VARCHAR(17), 
	"SVC_END_DTTM" VARCHAR(17), 
	"RSLT_MSG_CD1" VARCHAR(20), 
	"RSLT_MSG1" VARCHAR(4000), 
	"ERR_PRGM_NM1" VARCHAR(100), 
	"ERR_PRGM_LN1" NUMBER(18,0), 
	"RSLT_MSG_CD2" VARCHAR(20), 
	"RSLT_MSG2" VARCHAR(4000), 
	"ERR_PRGM_NM2" VARCHAR(100), 
	"ERR_PRGM_LN2" NUMBER(18,0), 
	"RSLT_MSG_CD3" VARCHAR(20), 
	"RSLT_MSG3" VARCHAR(4000), 
	"ERR_PRGM_NM3" VARCHAR(100), 
	"ERR_PRGM_LN3" NUMBER(18,0), 
	"RSLT_MSG_CD4" VARCHAR(20), 
	"RSLT_MSG4" VARCHAR(4000), 
	"ERR_PRGM_NM4" VARCHAR(100), 
	"ERR_PRGM_LN4" NUMBER(18,0), 
	"RSLT_MSG_CD5" VARCHAR(20), 
	"RSLT_MSG5" VARCHAR(4000), 
	"ERR_PRGM_NM5" VARCHAR(100), 
	"ERR_PRGM_LN5" NUMBER(18,0), 
	"WAS_INSTANCE_ID" VARCHAR(30), 
	"ELAPSE_TIME" VARCHAR(20)
   	);
 
--------------------------------------------------------
--  DDL for Index PK_NSF_ERR_LOG
--------------------------------------------------------

	CREATE UNIQUE INDEX IF NOT EXISTS "PK_NSF_ERR_LOG" ON "NSF_ERR_LOG" ("LOG_DT", "SEQ_NO", "GLOB_ID");
	
--------------------------------------------------------
--  Constraints for Table NSF_ERR_LOG
--------------------------------------------------------
	
  	ALTER TABLE "NSF_ERR_LOG" ALTER COLUMN "LOG_DT" SET NOT NULL;
  	ALTER TABLE "NSF_ERR_LOG" ALTER COLUMN "SEQ_NO" SET NOT NULL;
  	ALTER TABLE "NSF_ERR_LOG" ALTER COLUMN "GLOB_ID" SET NOT NULL;
  	ALTER TABLE "NSF_ERR_LOG" ADD PRIMARY KEY ("LOG_DT", "SEQ_NO", "GLOB_ID");

   