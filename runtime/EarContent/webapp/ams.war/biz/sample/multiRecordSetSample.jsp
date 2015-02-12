<%@ page pageEncoding="utf-8"%>
<!doctype html>
<html>
<head>
<%@include file="../../common/common.jsp"%>
<title>공지사항 상세</title>
<script>
	/*****************************************************************************************
	 * 화면 이름  : NoticeView.jsp
	 * 화면 설명  : 공지사항 상세
	 * 작성자        : 백인하
	 * 작성일        : 2012-11-12
	 * 변경이력   : 
	 * 버전		성명		반영일자		내용                  
	 *----------------------------------------------------------------------------------------
	 * ver0.1	백인하	2012-11-12	화면 생성
	 ****************************************************************************************/
	$(function() {
		$('#sampleForm').Form();
		$.Page({
            init: function() {
                  $.Service({
                        transaction: 'api.APIBBase#pAPI00301',
                        request: {
	                     	 fields: {
	                     	 },
                       	 	recordSets: {}
                        },
                        success: function(ds) {
                        	// 폼에 Data 연결
                        	$('#sampleForm').Fields(ds.fields);
                        	
                        	// 그리드에 Data 연결
                       		$('#ACTRESS_LIST').RecordSet(ds.recordSets.ACTRESS_DATA);
                        	
                        	// Select Box 연결
                        	var userGroupRecord = [{value:'', label:'==전체=='}];
    						for(var i=0; i<ds.recordSets.FCB_DATA.nc_list.length; i++) {
    							userGroupRecord.push({value:ds.recordSets.FCB_DATA.nc_list[i].EMP_ID,label:ds.recordSets.FCB_DATA.nc_list[i].NAME}); 
    						}
                        	$('#FCB_DATA').Options(userGroupRecord);
                        	
                        	var userGroupRecord2 = [{value:'', label:'==전체=='}];
    						for(var i=0; i<ds.recordSets.LAD_DATA.nc_list.length; i++) {
    							userGroupRecord2.push({value:ds.recordSets.LAD_DATA.nc_list[i].EMP_ID,label:ds.recordSets.LAD_DATA.nc_list[i].NAME}); 
    						}
                        	$('#LAD_DATA').Options(userGroupRecord2);
                        }
                  });
            }
		});
		
		$('#ACTRESS_LIST').Grid({
			columns: [
				{
					id: 'EMP_ID',
					title: '이름',
					sortable: true,
					align: 'center',
					width: 100
				}, {
					id: 'NAME',
					title: '사번',
					width: 438
				}, {
					id: 'TEAM_NAME',
					title: '팀명',
					width: 100
				}
			],
			gridview: true,
			height: 100
		});
		
		$('#FCB_DATA').Select();
		
		$('#LAD_DATA').Select();
	});
</script>
</head>
<body>
	<div id="container">
		<!-- //headerArea-->
		<%@include file="../../common/TopMenu.jsp"%>
		<!-- //headerArea-->

		<div id="wrapper" class="clearfix">
			<!-- //leftArea -->
			<%@include file="../../common/LeftMenu.jsp"%>
			<!-- //leftArea -->
			<div id="contentArea">
				<div class="contTitle">
					<h1>게시판 상세</h1>
				</div>
				<form id="sampleForm">
					<input id="PRJ_NAME" type="text"/>
					<input id="PRJ_PM" type="text"/>
				</form>
				<div class="tb_basic">
					<table id="ACTRESS_LIST"></table>
				</div>
				<div class="tb_basic">
					<select id="FCB_DATA"></select>
				</div>
				<div class="tb_basic">
					<select id="LAD_DATA"></select>
				</div>
			</div>
		</div>
		<!-- //leftArea -->
		<%@include file="/common/Footer.jsp"%>
		<!-- //leftArea -->
	</div>
</body>
</html>