<%@ page import="java.util.*"%>
<%@ page import="java.io.*"%>
<%@ page import="org.apache.commons.fileupload.*"%>
<%@ page import="org.apache.commons.fileupload.disk.*"%>
<%@ page import="org.apache.commons.fileupload.servlet.*"%>
<%@ page import="org.apache.poi.ss.usermodel.*"%>
<%@ page import="nexcore.framework.core.util.BaseUtils"%>
<%@page import="org.apache.commons.lang.StringEscapeUtils"%>
<%
    File tmpFile = new File(BaseUtils.getConfiguration("excel.upload.temp.folder"));
    
    if (!tmpFile.exists()) {
    	tmpFile.mkdirs();
    }
    
    DiskFileItemFactory factory = new DiskFileItemFactory();
    factory.setRepository(tmpFile);
    
	ServletFileUpload upload = new ServletFileUpload(factory);
	@SuppressWarnings("unchecked")
	List<FileItem> items = (List<FileItem>) upload.parseRequest(request);

	for (FileItem item : items) {
		if (item.isFormField()) {
			//String name = item.getFieldName();
			//String value = item.getString();
		} else {
			InputStream uploadedStream = item.getInputStream();

			Workbook wb = WorkbookFactory.create(uploadedStream);
			Sheet sheet = wb.getSheetAt(0);

			out.print("[");

			int r = 0;
			List<String> titles = new ArrayList<String>();

			for (Row row : sheet) {
				if (r == 0) {
					for (Cell cell : row) {
						titles.add(cell.getStringCellValue());
					}
				} else {
					if (r > 1)
						out.print(",");

					out.print("{");

					int c = 0;

					for (Cell cell : row) {
						if (c > 0)
							out.print(",");

						String id = titles.get(c);

						/*
						// TODO: convert column title to column id
						if (id.equals("컬럼1"))
							id = "column1";
						*/

						out.print("\"");
						out.print(id/*.replace("\\", "\\\\").replace("\"", "\\\"")*/); // TODO: json encoding
						out.print("\"");
						out.print(":");
						out.print("\"");
						out.print(StringEscapeUtils.escapeJavaScript(cell.getStringCellValue())); // TODO: json encoding
						out.print("\"");

						c++;
					}

					out.print("}");
				}

				r++;
			}

			out.print("]");

			uploadedStream.close();

			//item.delete(); // TODO: file remove
		}
	}
%>
