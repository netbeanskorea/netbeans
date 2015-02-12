<%@ page pageEncoding="utf-8"%>
<!doctype html>
<html>
<head>
<title></title>
<%@include file="/common/common.jsp"%>
<script>
	$(function() {
		$('#test').Form();
		var notice = null;
		$.Page({
			init: function() {
				notice = $.Page.Data();
				
				// 타이틀 설정
				$('title').html(notice.TITLE);
				$('#content').width(notice.POP_UP_WSIZE);
				$('#content').height(notice.POP_UP_HSIZE);
				
				// 공지사항 화면 연결
				// contents 정보를 get방식으로 넘긴다.
				// 보안상 문제가 된다고 지적되면 값 넘기는걸 다시 만들어야 함.
				$('#extPage').attr('src', notice.NOTICE_HTML_FILE + '?' + $.param({title: notice.TITLE}) + '&' +  $.param({contents: notice.CONTENTS}) + '&' + $.param({<%=DBNamingConstants.FILE_SEQ_NO%>: notice.<%=DBNamingConstants.FILE_SEQ_NO%>}));
			}
		});
		
		// FIXME 늘어난 다음에 줄어드는거 하면 사이즈 조절이 이상함...
		// 내부 iframe size가 늘어난 상태여서 #body height가 오동작 하는 듯
		$(window).resize(function() {
			$('#content').height($('#body').height() - $('#foot').height());
		});
		
		//$('#extPage').load(function() {
// 			  $(this).height($(this).contents().find('body')[0].scrollHeight+15+"px");
		//	  $(this).width(parseInt(notice.POP_UP_WSIZE) + 'px');
		//});
		
		// 오늘 하루 표시 안함을 할때 Cookie로 사용
		// 브라우저별 Cookie 사용 갯수가 제한되어 있으므로 최대한 아껴 써야 한다.
		// 그래서 Cookie값을 JSON으로 저장하고 사용한다.
		$('#notshow').click(function(event) {
			var showInfo = $.Cookie('ams_notice_show_info');
			
			if(showInfo===null || showInfo===undefined) {
				showInfo = '{}';
			}
			
			var showInfoObj = JSON.parse(showInfo);
			
			showInfoObj[notice.NOTICE_SEQ_NO + '_' + notice.NOTICE_DT] = true;
			
			$.Cookie('ams_notice_show_info', JSON.stringify(showInfoObj), 1);
			
			$.Page.Close();
		});
		
		$('#btnCancel').Button({
			click : function() {
				$.Page.Close();
			}
		});
	});
</script>
<style>
html,body{height:100%;overflow: hidden;}
body{margin:0}
#body{min-height:100%}
#content{padding-bottom:1.9em; overflow: hidden;}
#foot{margin-top:-1.9em;height:1.9em}
</style>
<body>
	<div id="container">
		<div id="wrapper" class="popup clearfix">
			<div id="contentArea">
				<div class="contTitle">
					<h2>공지사항</h2>
				</div>
				<div id="body">
					<div id="content">
						<iframe src="" id="extPage" style="width:100%; height:100%;border:0;" scrolling="no"></iframe>
					</div>
				</div>
				<div  id="foot" class="btn_common">
					<label for="notshow">오늘하루 표시안함</label>
					<input id="notshow" type="checkbox" />
					<span class="button iconBtn">
						<button id="btnCancel">
							<span class="button-icon ui-icon-func-cancelRequest"></span> <span
								class="button-text">닫기</span>
						</button> 
					</span>
				</div>
			</div>
		</div>
	</div>
</body>
</html>
