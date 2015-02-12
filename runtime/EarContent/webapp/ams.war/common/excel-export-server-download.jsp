<%@ page contentType="application/vnd.ms-excel;charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="java.net.*"%>
<%@ page import="java.io.*"%>
<%@ page import="java.util.*"%>
<%@ page import="nexcore.framework.core.util.DateUtils"%>
<%@ page import="nexcore.framework.core.util.StringUtils"%>
<%@ page import="nexcore.framework.core.data.IDataSet"%>
<%@ page import="nexcore.framework.core.data.IRecordSet"%>
<%@ page import="nexcore.framework.core.data.IRecord"%>
<%@ page import="nexcore.framework.online.channel.util.WebUtils"%>
<%@ page import="org.apache.poi.hssf.usermodel.*"%>
<%@ page import="org.apache.poi.hssf.util.*"%>
<%@ page import="org.apache.poi.poifs.filesystem.POIFSFileSystem"%>
<%
	
	//String _sheet = request.getParameter("sheet_name");
	String headerStr = "_HEADER"; 
	String _filename = request.getParameter("file_name");
    String disposition = getDisposition(_filename, getBrowser(request));
	IDataSet ds = WebUtils.getResultDataSet(request);
	/*
		if (ds == null) {
			System.out.println("ERROR: DataSet == null");
			return;
		}
	*/
	Iterator<String> iter = ds.getRecordSetIds();
	//List<String>excelDataIdList = new ArrayList<String>();
	out.clear();
	out = pageContext.pushBody();
	
	//1.엑셀 파일 생성
	HSSFWorkbook wb = new HSSFWorkbook();
	
	while(iter.hasNext()) {
		String recordSetId = iter.next();
		if(recordSetId.lastIndexOf(headerStr) == -1) {
			//excelDataIdList.add(recordSetId);
			makeExcel(request, response, wb, disposition, recordSetId, ds.getRecordSet(recordSetId+headerStr),  ds.getRecordSet(recordSetId));
		}
	}
	wb.write(response.getOutputStream());
%>

<%!
private void makeExcel(HttpServletRequest request, HttpServletResponse response, HSSFWorkbook wb, String disposition, String sheetId, IRecordSet schema, IRecordSet data) {
	//IRecordSet schema = ds.getRecordSet("EXCEL_HEADER");
	//IRecordSet data = ds.getRecordSet("EXCEL_DATA");
	String _id = "id";
	String _title = "TITLE";
	String contentTitle = request.getParameter("title");
	String contentCondition = request.getParameter("condition");
	String contentTitle2 = request.getParameter("title2");

	
	response.setContentType("application/octet-stream; charset=" + response.getCharacterEncoding());	
	response.setHeader("Content-disposition", disposition);
	
	//2. Sheet 생성
	HSSFSheet sheet = wb.createSheet(sheetId);

	//3. 관련 변수 선언
	HSSFRow row = null;
	HSSFCell cell = null;
	HSSFCellStyle style = null;
	HSSFFont font = null;

	//4. row 생성
	row = sheet.createRow(0);
	// row.setHeightInPoints(140); //지정한 수치만큼 높이 지정 가능
	
	// title, condition이 있을 경우 추가
	if (StringUtils.isNotEmpty(contentTitle)) {
		cell = row.createCell(0);
		cell.setCellValue(contentTitle);
		
		if (StringUtils.isNotEmpty(contentCondition)) {
			cell = row.createCell(2);
			cell.setCellValue(contentCondition);
		}
		
		row = sheet.createRow(sheet.getLastRowNum() + 1);
	}
	
	if (StringUtils.isNotEmpty(contentTitle2)) {		
		cell = row.createCell(0);
		cell.setCellValue(contentTitle2);
		
		row = sheet.createRow(sheet.getLastRowNum() + 1);
	}

	//5. style 생성
	style = wb.createCellStyle();
	style.setWrapText(true);
	// Align
	style.setAlignment(HSSFCellStyle.ALIGN_CENTER);
	style.setVerticalAlignment(HSSFCellStyle.VERTICAL_TOP);
	// Layout Line
	style.setBorderBottom(HSSFCellStyle.BORDER_THIN);
	style.setBottomBorderColor(HSSFColor.BLACK.index);
	style.setBorderLeft(HSSFCellStyle.BORDER_THIN);
	style.setLeftBorderColor(HSSFColor.BLACK.index);
	style.setBorderRight(HSSFCellStyle.BORDER_THIN);
	style.setRightBorderColor(HSSFColor.BLACK.index);
	style.setBorderTop(HSSFCellStyle.BORDER_THIN);
	style.setTopBorderColor(HSSFColor.BLACK.index);
	// Fill
	style.setFillForegroundColor(HSSFColor.GREY_80_PERCENT.index);
	style.setFillPattern(HSSFCellStyle.SOLID_FOREGROUND);
	// font
	font = wb.createFont();
	font.setFontHeightInPoints((short) 10);
	font.setColor(HSSFColor.WHITE.index);
	style.setFont(font);
	
	//6. Header Data Set
	for (int c = 0, length = schema.getRecordCount(); c < length; c++) {
		cell = row.createCell(c);
		cell.setCellValue(new HSSFRichTextString(schema.get(c, _title)));
		cell.setCellStyle(style);
	}
	
	//Field style 생성 - 앞서 style과 동일 적용시에는 추가 생성 필요 없음
	style = wb.createCellStyle();
	style.setWrapText(true);
	// Align
	style.setAlignment(HSSFCellStyle.ALIGN_LEFT);
	style.setVerticalAlignment(HSSFCellStyle.VERTICAL_TOP);
	// Layout Line
	style.setBorderBottom(HSSFCellStyle.BORDER_THIN);
	style.setBottomBorderColor(HSSFColor.BLACK.index);
	style.setBorderLeft(HSSFCellStyle.BORDER_THIN);
	style.setLeftBorderColor(HSSFColor.BLACK.index);
	style.setBorderRight(HSSFCellStyle.BORDER_THIN);
	style.setRightBorderColor(HSSFColor.BLACK.index);
	style.setBorderTop(HSSFCellStyle.BORDER_THIN);
	style.setTopBorderColor(HSSFColor.BLACK.index);
	// Fill
	style.setFillForegroundColor(HSSFColor.WHITE.index);
	style.setFillPattern(HSSFCellStyle.SOLID_FOREGROUND);

	//7. Field Data Set
	for (int r = 0, rows = data.getRecordCount(); r < rows; r++) {
		//header 다음에 row 생성
		row = sheet.createRow(sheet.getLastRowNum() + 1); //
		//row.setHeightInPoints(20);

		//8. Field Data 
		for (int c = 0, cols = schema.getRecordCount(); c < cols; c++) {
			//adjust column width to fit the content
			//sheet.autoSizeColumn((short) c);
			//sheet.setColumnWidth(c, (sheet.getColumnWidth(c)) + 512);

			cell = row.createCell(c);
			cell.setCellValue(new HSSFRichTextString(data.get(r, schema.get(c, _id))));
			cell.setCellStyle(style);
		}
	}
}

private String getBrowser(HttpServletRequest request) {
    String header = request.getHeader("User-Agent");
    if (header.indexOf("MSIE") > -1) {
        return "MSIE";
    } else if (header.indexOf("Chrome") > -1) {
        return "Chrome";
    } else if (header.indexOf("Opera") > -1) {
        return "Opera";
    }
    return "Firefox";
}

private String getDisposition(String filename, String browser) throws Exception {
	String dispositionPrefix = "attachment;filename=";
	String encodedFilename = null;
	if (browser.equals("MSIE")) {
	    encodedFilename = URLEncoder.encode(filename, "UTF-8").replaceAll("\\+", "%20");
	} else if (browser.equals("Firefox")) {
	    encodedFilename = "\"" + new String(filename.getBytes("UTF-8"), "8859_1") + "\"";
	} else if (browser.equals("Opera")) {
	    encodedFilename = "\"" + new String(filename.getBytes("UTF-8"), "8859_1") + "\"";
	} else if (browser.equals("Chrome")) {
	    StringBuffer sb = new StringBuffer();
	    for (int i = 0; i < filename.length(); i++) {
	        char c = filename.charAt(i);
	        if (c > '~') {
	            sb.append(URLEncoder.encode("" + c, "UTF-8"));
	        } else {
	            sb.append(c);
	        }
	    }
	    encodedFilename = sb.toString();
	} else {
	    throw new RuntimeException("Not supported browser");
	}
	return dispositionPrefix + encodedFilename;
}

%>