<%@ page pageEncoding="utf-8"%>
<!doctype html>
<html>
<head>
<title>Receiver</title>
<%@include file="/common/common.jsp"%>

<script>
	$(function() {
// 		$.Push({
// 			handler : function(msg) {
// 				console.log(msg);
// 				alert('receive msg');
// 				$('#push').append(msg);
// 				for(var i = 0; i < msg.recordSets.PUSH_LIST.nc_list.length; i++) {
// 					$('#push').append(msg.recordSets.PUSH_LIST.nc_list[i].MSG + '<br/>');
// 				}
// 			},
// 			transaction: 'com.COMBBase#pCOM10301'
// 		});
	var dialoghtmlS = '<div id="msg">';4
	var dialoghtmlE = '</div>';
		$('#btn').Button({
			click: function() {
				var $dialog = $(dialoghtmlS + '테스트' + dialoghtmlE);
				$dialog.Dialog().Title('관리자 메시지').Open();
// 				$.Dialog({
// 					title: '관리자 메시지',
// 					url: 'PushDialog.jsp',
// 					data: {
// 						msg: '메시지'
// 					},
// 					width: 300,
// 					height: 100
// 				});
			}
		});
	});

</script>
</head>
<body>
	<div id="push">
	</div>
	<button id="btn">버튼</button>
</body>
</html>