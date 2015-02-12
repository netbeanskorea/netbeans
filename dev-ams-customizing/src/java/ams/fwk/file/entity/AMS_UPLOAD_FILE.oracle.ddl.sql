-- 파일 업로드 테이블
CREATE TABLE AMS_UPLOAD_FILE (
    PROGRAM_ID      VARCHAR2(255) NOT NULL,
    DOC_ID          VARCHAR2(50) NOT NULL,
    TYPE_ID         VARCHAR2(2),
    FILE_ID         VARCHAR2(50) NOT NULL,
    FILE_NAME       VARCHAR2(100),
    FILE_PATH       VARCHAR2(255),    
    FILE_SIZE       NUMBER(15, 5),
    CREATE_USER     VARCHAR2(50),
    CREATE_TIME     VARCHAR2(14),
    CONSTRAINT PK_AMS_UPLOAD_FILE PRIMARY KEY (PROGRAM_ID, DOC_ID, FILE_ID)
);


COMMENT ON TABLE "AMS_UPLOAD_FILE"  IS '파일 업로드 테이블';
COMMENT ON COLUMN "AMS_UPLOAD_FILE"."PROGRAM_ID" IS '파일이 업로드 되는 프로그램 ID';
COMMENT ON COLUMN "AMS_UPLOAD_FILE"."DOC_ID" IS '업로드 단위 식별자(문서 번호 or 업무 아이디)';
COMMENT ON COLUMN "AMS_UPLOAD_FILE"."TYPE_ID" IS '타입 ID';
COMMENT ON COLUMN "AMS_UPLOAD_FILE"."FILE_ID" IS '파일 ID';
COMMENT ON COLUMN "AMS_UPLOAD_FILE"."FILE_NAME" IS '파일 명';
COMMENT ON COLUMN "AMS_UPLOAD_FILE"."FILE_PATH" IS '파일 경로';
COMMENT ON COLUMN "AMS_UPLOAD_FILE"."FILE_SIZE" IS '파일 크기';
COMMENT ON COLUMN "AMS_UPLOAD_FILE"."CREATE_USER" IS '등록자';
COMMENT ON COLUMN "AMS_UPLOAD_FILE"."CREATE_TIME" IS '등록일시';
