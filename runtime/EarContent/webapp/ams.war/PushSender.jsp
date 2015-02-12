<%@ page pageEncoding="utf-8"%>
<!doctype html>
<html>
<head>
<title>Sender</title>
<%@include file="/common/common.jsp"%>

<script>
	$(function() {
		$('#send').Button({
			click: function() {
				var req = $.DataSet();
				req.fields.MSG = $('#msg').Value();
				$.Service({
					transaction: 'com.COMBBase#pCOM10302',
					request: req,
					success: function(ds) {
						alert('성공');
					}
				});
			}
		});
		
	})

</script>
</head>
<body>

<input id="msg" type="text">
<button id="send">눌러요</button>

</body>
</html>