<%@ page pageEncoding="utf-8"%>
<!doctype html>
<html>
<head>
<title></title>
<%@include file="/common/common.jsp"%>
<script>
	$(function() {
		$.Page({
			init: function() {
				var title = $.Param('title');
				$('#TITLE').Value(title);
				var contents = $.Param('contents');
				$('#CONTENTS').html(contents);
				var file_seq_no = $.Param('<%=DBNamingConstants.FILE_SEQ_NO%>');
				$('#fileDownloadDiv').FileDownloadInit(file_seq_no, "N");
			}
		});
	});
</script>

<body>
	<div class="tb_data" style="overflow-y:auto;">
		<table>
			<colgroup>
				<col width="80"/>
				<col width="270"/>
			</colgroup>
			<tr>
				<th class="nobd"><label for="TITLE">제목</label></th>
				<td class="nobd"><input id="TITLE" class="input01 num02 nobd" type="text" readonly/></td>
			</tr>
			<tr>
				<td colspan="2" class="nobd">
					<pre id="CONTENTS"></pre>
				</td>
			</tr>
			<tr>
				<th><label for="File">첨부파일</label></th>
				<td>
					<div id="fileDownloadDiv"></div>
				</td>
			</tr>
		</table>
	</div>
</body>
</html>
