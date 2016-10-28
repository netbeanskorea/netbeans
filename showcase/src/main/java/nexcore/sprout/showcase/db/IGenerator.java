package nexcore.sprout.showcase.db;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import java.text.DecimalFormat;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.naming.Context;
import javax.naming.InitialContext;

import org.apache.commons.lang3.StringUtils;

public class IGenerator {

	 private Connection CONNECTION = null;
	 private String CREATOR;
	 private String TABLE;
	 private Map<String, String> TABLE_INFORMATION;
	 private List<Map<String, String>> COLUMN_INFORMATION;
	 private int MAX_COLUMN_LENGTH;
	 private int MAX_DATA_TYPE_LENGTH;
	 private String NEW_LINE = "\n";
	 private String VARIABLE_MARKER = "#";
	 private int WHITESPACE = 3;
	 private int TAB = 0;
	 private int TAB_SIZE = 4;
	 
	 private String sFrsRegFiledPrefix = "FRS_REGIST_";
	 private String sLasRegFiledPrefix = "LAST_CHNG_";
	 
	 private String sDefaultRegTimeField = "FRS_REGIST_TSTMP";
	 private String sDefaultChgTimeField = "LAST_CHNG_TSTMP";

	 public static void main(String[] args) throws SQLException {
	  long begin = System.currentTimeMillis();
	  System.out.println("### begin ###");
	  IGenerator sg = new IGenerator(getConnectionApp(), "sprout", "BOARD");
	  String insert = sg.generateInsertScript();
	  String select = sg.generateSelectScript();
	  String update = sg.generateUpdateScript();
	  String delete = sg.generateDeleteScript();
	  String resultMap = sg.generateResultMap();
	  String generateWhereScript = sg.generateWhereScript();
	  
	   String tblName = sg.getTableName("board" );
	   
	   System.out.println(tblName );
	 
	  System.out.println("<?xml version=\"1.0\" encoding=\"UTF-8\"?>");
	  System.out.println("<!DOCTYPE sqlMap     PUBLIC \"-//ibatis.apache.org//DTD SQL Map 2.0//EN\"     \"http://ibatis.apache.org/dtd/sql-map-2.dtd\">");
	  System.out.println("<sqlMap>");
	  System.out.println(resultMap);
	  //System.out.println(generateWhereScript);
	  System.out.println(insert);
      System.out.println(select);
	  System.out.println(update);
	  System.out.println(delete);
	  System.out.println("</sqlMap>");
	  long finish = System.currentTimeMillis();
	 
	  DecimalFormat df = new DecimalFormat("#,###");
	  long runningTime = finish - begin;
	  System.out.println(String.format("running time: %s ms", df.format(runningTime)));
	 }

	 private static Connection getConnectionApp() {
		  Connection c = null;
		  try 
		  {
			Class.forName("oracle.jdbc.driver.OracleDriver");
			c = DriverManager.getConnection("jdbc:oracle:thin:@10.250.46.218:1521:xe", "sprout", "sprout");	
		  } catch (Exception  e) {
			e.printStackTrace();
		  }
		 
		  return c;
	 }

	 private static Connection getConnection(String jndiName) {
		 Connection c = null;
		  try 
		  {
			//Context ctx = new InitialContext();
			//javax.sql.DataSource ds = (javax.sql.DataSource) ctx.lookup(jndiName);
			//c = ds.getConnection();  
			c = getConnectionApp();
		  } catch (Exception  e) {
		    e.printStackTrace();
		  }
		 
		  return c;
	 }
	 
	 public  Map<String, String> getTableInfo(){
		 return this.TABLE_INFORMATION;
	 }
	 
	 public IGenerator(String table,String jndiName) throws SQLException {
		  try
		  {
			  this.CONNECTION 			= getConnection(jndiName);
			  this.CREATOR 				= "";
			  this.TABLE 				= table;
			  this.TABLE_INFORMATION 	= getTableInformation();
			  this.COLUMN_INFORMATION 	= getColumnInformation();
			  this.MAX_COLUMN_LENGTH 	= getMaxColumnLength();
			  this.MAX_DATA_TYPE_LENGTH = getMaxDataTypeLength();
			 
			  this.CONNECTION.close();
		  }catch(Exception e){
			  e.printStackTrace();
		  }finally{
			  try{if( this.CONNECTION != null) {this.CONNECTION.close();}}catch(Exception e){}
		  }
	}
	 
	 public IGenerator(Connection connection, String creator, String table) throws SQLException {
		 try
		 {
		      this.CONNECTION = connection;
			  this.CREATOR = creator;
			  this.TABLE = table;
			  this.TABLE_INFORMATION = getTableInformation();
			  this.COLUMN_INFORMATION = getColumnInformation();
			 // this.MAX_COLUMN_LENGTH = getMaxColumnLength();
			 // this.MAX_DATA_TYPE_LENGTH = getMaxDataTypeLength();
			 
			  this.CONNECTION.close();
		 }catch(Exception e){
			  e.printStackTrace();
		 }finally{
			  try{if( this.CONNECTION != null) {this.CONNECTION.close();}}catch(Exception e){}
		 }
	 }
	 
	 @SuppressWarnings("finally")
	private Map<String, String> getTableInformation() throws SQLException {
		  StringBuffer sql = new StringBuffer();
		  sql.append(" SELECT TABLE_NAME  ");
		  sql.append("   FROM user_tab_comments");
		  sql.append("  WHERE TABLE_NAME = ? ");
		  sql.append("    AND TABLE_TYPE= 'TABLE' ");
		  ResultSet rs = null;
		  PreparedStatement ps = null;
		  List<Map<String, String>> list = null;
		 try
		 {
			  ps = CONNECTION.prepareStatement(sql.toString());
			  ps.setString(1, TABLE);
			 
			  rs = ps.executeQuery();
			  list = getList(rs);
			 
		  	  if(list.size() ==0 ) {
				  System.out.println(list.size() + "개의 테이블을 찾았습니다.");
				  throw new Exception();
			  }
		 }catch(Exception e){
			 e.printStackTrace();
		 }finally{
			  try{if(rs !=null) rs.close();}catch(Exception e){};
			  try{if(ps !=null) ps.close();}catch(Exception e){};
			  return list.get(0);
		 }
		  
		  
	 }
	 
	 @SuppressWarnings("finally")
	private List<Map<String, String>> getColumnInformation() throws SQLException {
		  StringBuffer sql = new StringBuffer();
		  // table_name, COLUMN_NAME, column_name, data_type, data_length, nullable, data_default
		  sql.append(" SELECT COLUMN_ID  ");
		  sql.append("      , COLUMN_NAME  ");
		  sql.append("      , ''  as COLUMN_REMARKS ");
		  sql.append("      , DATA_TYPE  ");
		  sql.append("      , '' KEYSEQ ");
		  sql.append("      , NULLABLE  ");
		  sql.append("   from  USER_TAB_COLUMNS ");
		  sql.append("  WHERE TABLE_NAME = ? ");
		  sql.append("  ORDER BY COLUMN_ID");
		  sql.append(" ");
		  ResultSet rs = null;
		  PreparedStatement ps = null;
		  List<Map<String, String>> list = null;
		  try
		  {
		  	  ps = CONNECTION.prepareStatement(sql.toString());
			  ps.setString(1, TABLE);
			  rs = ps.executeQuery();
			  list = getList(rs);
			 
			  System.out.println(list.size() + "개의 컬럼을 찾았습니다.");
		  }catch(Exception e){
			  e.printStackTrace();
		  }	finally {
			  try{if(rs !=null) rs.close();}catch(Exception e){};
			  try{if(ps !=null) ps.close();}catch(Exception e){};
			  return list;
		  }
		  
	 }
	 
	 private List<Map<String, String>> getList(ResultSet rs) throws SQLException {
	  ResultSetMetaData rsmd = rs.getMetaData();
	  List<Map<String, String>> list = new ArrayList<Map<String, String>>();
	  while (rs.next()) {
	   Map<String, String> map = new HashMap<String, String>();
	 
	   for (int i = 1, l = rsmd.getColumnCount(); i <= l; i++) {
		 //  System.out.println(rsmd.getColumnName(i) + " : " +rs.getString(i));
		   map.put(rsmd.getColumnName(i), rs.getString(i));
	   }
	 
	   list.add(map);
	  }
	 
	  return list;
	 }
	 
	 private int getMaxColumnLength() {
	  int maxLength = 0;
	  int thisLength = 0;
	 
	  
	  String colNm = "";
	  for (Map<String, String> map : COLUMN_INFORMATION) {
		  colNm  = (String)map.get("COLUMN_NAME");
		  thisLength = colNm.length();
	   maxLength = thisLength > maxLength ? thisLength : maxLength;
	  }
	 
	  return maxLength;
	 }
	 
	 private int getMaxDataTypeLength() {
	  int maxLength = 0;
	  int thisLength = 0;
	 
	  for (Map<String, String> map : COLUMN_INFORMATION) {
	   thisLength = map.get("DATA_TYPE").length();
	   maxLength = thisLength > maxLength ? thisLength : maxLength;
	  }
	 
	  return maxLength;
	 }
	 
	 public String generateInsertScript() {
	  StringBuffer sql = new StringBuffer();
	  sql.append("INSERT INTO ");
	  sql.append(TABLE_INFORMATION.get("COLUMN_NAME"));
	  sql.append(" (");
	  sql.append(NEW_LINE);
	  int addCount = 0;
	  for (Map<String, String> map : COLUMN_INFORMATION) {
	   addCount++;	
	   sql.append("1".equals(map.get("CONUMN_ID")) ? "       " : "     , ");
	   sql.append(map.get("COLUMN_NAME"));
	   // 칼럼갯수를 5개씩 끊어서 배치한다.
	   if(addCount == 5){
		   sql.append(NEW_LINE);
		   addCount = 0;
	   }
	  }
	  sql.append(") VALUES (");
	  sql.append(NEW_LINE);
	  
	  addCount = 0;
	  for (Map<String, String> map : COLUMN_INFORMATION) {
	   addCount++;	
	   sql.append("0".equals(map.get("COLUMN_ID")) ? "       " : "     , ");
	   
      if(map.get("NULLABLE").equals("N") ){
		   sql.append(getVariableFormat(map.get("COLUMN_NAME")));
	   }else{
		   if(sDefaultRegTimeField.equals(map.get("COLUMN_NAME")) || sDefaultChgTimeField.equals(map.get("COLUMN_NAME")) ){
			   sql.append("TO_CHAR(SYSDATE,'YYYYMMDDHH24MISS')");
		   }else{
			   sql.append(getVariableFormat(map.get("COLUMN_NAME")  + ",jdbcType="+map.get("DATA_TYPE") ));
		   }
	   }
		   
	   
	   if(addCount == 5){
		   sql.append(NEW_LINE);
		   addCount = 0;
	   }
	  }
	 
	  sql.append(")");
	 
	  return applyTab(sql.toString());
	 }
	 
	 public String generateSelectScript() {
	  StringBuffer sql = new StringBuffer();
	  int addCount = 0;
	  for (Map<String, String> map : COLUMN_INFORMATION) {
		   addCount++;	  
		   sql.append("1".equals(map.get("COLUMN_ID")) ? "SELECT " : "     , ");
		   sql.append(map.get("COLUMN_NAME"));
		   
		   // 칼럼갯수를 5개씩 끊어서 배치한다.
		   if(addCount == 5){
			   sql.append(NEW_LINE);
			   addCount = 0;
		   }
	  }
	 
	  sql.append(NEW_LINE);
	  sql.append("  FROM ");
	  sql.append(TABLE_INFORMATION.get("TABLE_NAME"));
	 
	  sql.append(NEW_LINE);
	  sql.append(" WHERE 1 = 1 ");
	  sql.append(NEW_LINE);
	  for (Map<String, String> map : COLUMN_INFORMATION) {
		  
		if(map.get("KEYSEQ") == null) {  
		   sql.append("<isNotEmpty prepend=\"AND\" property=\""+map.get("COLUMN_NAME")+"\"> \n");
		   sql.append("   ");
		   //sql.append("0".equals(map.get("conumn_id")) ? " WHERE " : "   AND ");
		}else{
		   sql.append("   AND ");
		}
	   sql.append(map.get("COLUMN_NAME"));
	   sql.append(repeat(" ", MAX_COLUMN_LENGTH - map.get("COLUMN_NAME").length()));
	   sql.append(" = ");
	   sql.append(getVariableFormat(map.get("COLUMN_NAME")  ));
	   sql.append(NEW_LINE);
	   if(map.get("KEYSEQ") == null) {
		   sql.append("</isNotEmpty>");
		   sql.append(NEW_LINE);
	   }
	  }
	  
	  //System.out.println("select = " + sql.toString());
	  return applyTab(sql.toString());
	 }
	 
	 public String generateWhereScript() {
		  StringBuffer sql = new StringBuffer("");
		  
		  for (Map<String, String> map : COLUMN_INFORMATION) {
			if(map.get("COLUMN_NAME").startsWith(sFrsRegFiledPrefix) || map.get("COLUMN_NAME").startsWith(sLasRegFiledPrefix)) continue;
			if(map.get("KEYSEQ") == null) {  
			   sql.append("<isNotEmpty prepend=\"AND\" property=\""+map.get("COLUMN_NAME")+"\"> \n");
			   sql.append("   ");
			   //sql.append("0".equals(map.get("conumn_id")) ? " WHERE " : "   AND ");
			}else{
			   sql.append("   AND ");
			}
		   sql.append(map.get("COLUMN_NAME"));
		   sql.append(repeat(" ", MAX_COLUMN_LENGTH - map.get("COLUMN_NAME").length()));
		   sql.append(" = ");
		   sql.append(getVariableFormat(map.get("COLUMN_NAME")  ));
		   sql.append(NEW_LINE);
		   if(map.get("KEYSEQ") == null) {
			   sql.append("</isNotEmpty>");
			   sql.append(NEW_LINE);
		   }
		   
		  }
		  return applyTab(sql.toString());
		 }
	 
	 public String generateUpdateScript() {
	  StringBuffer sql = new StringBuffer();
	  
	  sql.append("UPDATE ");
	  sql.append(TABLE_INFORMATION.get("COLUMN_NAME"));
	  sql.append(NEW_LINE);
	  sql.append("   SET " + sDefaultChgTimeField + "= TO_CHAR(SYSDATE,'YYYYMMDDHH24MISS')");
	 
	  sql.append(NEW_LINE);
	 
	  for (Map<String, String> map : COLUMN_INFORMATION) {
		  
	  /* if( sDefaultRegTimeField.equals(map.get("COLUMN_NAME")) 
			   || sDefaultChgTimeField.equals(map.get("COLUMN_NAME"))  
			   || map.get("COLUMN_NAME").startsWith(sFrsRegFiledPrefix)  ) continue;*/
	   
	   if(!sDefaultChgTimeField.equals(map.get("COLUMN_NAME"))) {
		   sql.append("<isNotEmpty property=\""+map.get("COLUMN_NAME")+"\"> \n");
		   sql.append("<![CDATA[	  ");
		   sql.append(NEW_LINE);
	   }
	   
	   sql.append("     , ");
	   //sql.append("0".equals(map.get("conumn_id")) ? "   SET " : "     , ");
	   
	   sql.append(map.get("COLUMN_NAME"));
	   sql.append(repeat(" ", MAX_COLUMN_LENGTH - map.get("COLUMN_NAME").length()));
	   sql.append(" = ");
	   if(sDefaultChgTimeField.equals(map.get("COLUMN_NAME")) ){
		   sql.append("TO_CHAR(SYSDATE,'YYYYMMDDHH24MISS')");
	   }else{
		   sql.append(getVariableFormat(map.get("COLUMN_NAME")));
	   }
	   
	   if(!sDefaultChgTimeField.equals(map.get("COLUMN_NAME"))) {
		   sql.append(NEW_LINE);
		   sql.append("]]>\n</isNotEmpty>");
	   }
	   sql.append(NEW_LINE);
	  }
	  int keyCnt = 0;
	  for (Map<String, String> map : COLUMN_INFORMATION) {
	   if(map.get("KEYSEQ") == null) continue;	  
	   sql.append(keyCnt==0 ? " WHERE " : "   AND ");
	   keyCnt++;
	   sql.append(map.get("COLUMN_NAME"));
	   sql.append(repeat(" ", MAX_COLUMN_LENGTH - map.get("COLUMN_NAME").length()));
	   sql.append(" = ");
	   sql.append(getVariableFormat(map.get("COLUMN_NAME")  ));
	   sql.append(NEW_LINE);
	  }
	  	 
	  return keyCnt==0 ? "" :applyTab(sql.toString());
	 }
	 
	 public String generateDeleteScript() {
	  StringBuffer sql = new StringBuffer();
	  sql.append("DELETE FROM ");
	  sql.append(TABLE_INFORMATION.get("COLUMN_NAME"));
	  sql.append(NEW_LINE);
	  int keyCnt = 0;
	  
	  for (Map<String, String> map : COLUMN_INFORMATION) {
	   if(map.get("KEYSEQ") == null) continue;
	   sql.append(keyCnt==0 ? " WHERE " : "   AND ");
	   keyCnt++;
	   sql.append(map.get("COLUMN_NAME"));
	   sql.append(repeat(" ", MAX_COLUMN_LENGTH - map.get("COLUMN_NAME").length()));
	   sql.append(" = ");
	   sql.append(getVariableFormat(map.get("COLUMN_NAME")  ));
	   sql.append(NEW_LINE);
	  }
	  
	  return keyCnt==0 ? "" :applyTab(sql.toString());
	 }
	 
	 
	 @SuppressWarnings("unused")
	public String generateResultMap() {
		  StringBuffer sql = new StringBuffer();
		  String tableName = TABLE_INFORMATION.get("TABLE_NAME ");
		  
		  sql.append("<resultMap id=\""+tableName+"ListMap\" class=\"java.util.HashMap\">\n");
		  for (Map<String, String> map : COLUMN_INFORMATION) {
			  sql.append("  <result property=\""+(map.get("COLUMN_NAME"))+"\" ");
		      sql.append(repeat(" ", MAX_COLUMN_LENGTH - map.get("COLUMN_NAME").length()));
		      sql.append(" column=\""+(map.get("COLUMN_NAME"))+"\" ");
		      sql.append(repeat(" ", MAX_COLUMN_LENGTH - map.get("COLUMN_NAME").length()));
		      sql.append(" nullValue=\"\"/>\n");
		  } 
		  sql.append("</resultMap>");

		  return applyTab(sql.toString());
	}
	 
	 private String repeat(String character, int times) {
	  return StringUtils.leftPad(character, times)	 ;
	 }
	 
	 private String getVariableFormat(String column) {
	  return VARIABLE_MARKER + column + VARIABLE_MARKER;
	 }
	 
	 private String applyTab(String sql) {
	  StringBuffer sb = new StringBuffer();
	  String[] lines = sql.split(NEW_LINE);
	 
	  for (String line : lines) {
	   sb.append(repeat(" ", TAB * TAB_SIZE) + line + NEW_LINE);
	  }
	 
	  return sb.substring(0, sb.lastIndexOf(NEW_LINE));
	 }
	 
	 @SuppressWarnings("unused")
	private String getDataTypeRemark(Map<String, String> map){
	   StringBuffer sql = new StringBuffer();
	   sql.append(repeat(" ", MAX_COLUMN_LENGTH - map.get("COLUMN_NAME").length() + WHITESPACE));
	   sql.append("/*  ");
	   sql.append(map.get("DATA_TYPE"));
	   sql.append("  */");
	   
	   return sql.toString();
	 }
	 
	 @SuppressWarnings("unused")
	private String getColumnRemark(Map<String, String> map){
	   StringBuffer sql = new StringBuffer();
	   if (!"".equals(map.get("COLUMN_REMARKS"))) {
		    sql.append(repeat(" ", MAX_DATA_TYPE_LENGTH - map.get("DATA_TYPE").length() + WHITESPACE));
		    sql.append(map.get("COLUMN_REMARKS"));
		   }
	   return sql.toString();
	 }
	 
	 
	 public String getTableName(String tableName){
		  String camelTableName = "";
		  tableName = tableName.toLowerCase();
		  
		  if(tableName.indexOf("_") != -1 ){
			  String[] sArray = tableName.split("_");
			  for(int i=0;i<sArray.length;i++){
			       if("t".equals(sArray[i])) continue;
			       if(sArray[i].length() == 1 ) {
			    	   camelTableName +=sArray[i].substring(0,1);
			       }else{
			    	   camelTableName +=sArray[i].substring(0,1).toUpperCase()+sArray[i].substring(1,sArray[i].length());
			       }
			  }
		  }else{
			  camelTableName +=tableName.substring(0,1).toUpperCase()+tableName.substring(1,tableName.length());
		  }
		  
		 return camelTableName;
	 }
	 
	 
	 
	}
	  