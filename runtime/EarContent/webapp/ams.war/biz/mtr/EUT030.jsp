<%@ page pageEncoding="utf-8"%>
<!doctype html>
<html>
<head>
<title>I/F Log 상세조회</title>
<%@include file="../common/common.jsp"%>
<script>
	/*****************************************************************************************
	 * 화면 이름  : EUT030.jsp
	 * 화면 설명  : I/F 로그 상세조회
	 * 작성자     : 문태훈
	 * 작성일     : 2013-06-25
	 * 변경이력   :
	 * 버전		성명		반영일자		내용                  
	 *----------------------------------------------------------------------------------------
	 * ver0.1	문태훈	2013-06-25	화면 생성
	 ****************************************************************************************/
	$(function() {
		$('#form').Form();
		
		$.Page({
			init: function() {
				$.Page.Search_List();
			},
			Search_List: function() {
				var request = {
					fields: {
						SEQ: $.Page.Data("SEQ")
					}
				};
				
				$.Service({
					transaction: 'mtr.MTRLOGB#selectBTSLogDetail',
					request: request,
					response: '#form',
					success: function(ds) {
						var date = ds.fields.IF_DT.substring(0,4) +'-'+ ds.fields.IF_DT.substring(4,6) +'-'+ ds.fields.IF_DT.substring(6,8)
							
						var sdate = ds.fields.IF_STRN_DTTM.substring(0,4) +'-'+ ds.fields.IF_STRN_DTTM.substring(4,6) +'-'+ ds.fields.IF_STRN_DTTM.substring(6,8) +' '
							+ds.fields.IF_STRN_DTTM.substring(8,10) +':'+ ds.fields.IF_STRN_DTTM.substring(10,12) +':'+ ds.fields.IF_STRN_DTTM.substring(12,14);

						var edate = ds.fields.IF_END_DTTM.substring(0,4) +'-'+ ds.fields.IF_END_DTTM.substring(4,6) +'-'+ ds.fields.IF_END_DTTM.substring(6,8) +' '
							+ds.fields.IF_END_DTTM.substring(8,10) +':'+ ds.fields.IF_END_DTTM.substring(10,12) +':'+ ds.fields.IF_END_DTTM.substring(12,14);
						
						$('#IF_DT').Value(date);
						$('#IF_STRN_DTTM').Value(sdate);
						$('#IF_END_DTTM').Value(edate);
					}
				});
			}
		});

		$('#btnClose').Button({
			click: function() {
				$.Page.Close();
			}
		});
	});
</script>
</head>
<body>
	<div id="container">
		<div id="wrapper" class="popup clearfix">
			<div id="contentArea" class="type03">
				<div class="contTitle">
					<h2>I/F Log 상세조회</h2>
				</div>
				<div class="tb_data">
					<form id="form">
						<table>
							<colgroup>
								<col width="110" />
								<col width="255" />
								<col width="110" />
								<col width="255" />
							</colgroup>
							<tr>
								<th><label>전송일자</label></th>
								<td>
									<input id="IF_DT" type="text" class="readonly nobd input01 full" readonly="readonly" />
								</td>
								<th><label>전송번호</label></th>
								<td class="nobd">
									<input id="IF_SEQ" type="text" class="readonly nobd input01 full" readonly="readonly" />
								</td>
							</tr>
							<tr>
								<th><label>I/F Name</label></th>
								<td colspan="3" class="nobd">
									<input id="IF_APP_NM" type="text" class="readonly nobd input01 full" readonly="readonly" />
								</td>
							</tr>
							<tr>
								<th><label>Request</label></th>
								<td colspan="3" class="nobd">
									<textarea id="IF_REQS_DESC" class="textarea03" readonly="readonly"></textarea>
								</td>
							</tr>
							<tr>
								<th><label>Response</label></th>
								<td colspan="3" class="nobd">
									<textarea id="IF_RSPNSE_DESC" class="textarea03" readonly="readonly"></textarea>
								</td>
							</tr>
							<tr>
								<th><label>호출일시</label></th>
								<td>
									<input id="IF_STRN_DTTM" type="text" class="readonly nobd input01 full" readonly="readonly" />
								</td>
								<th><label>응답일시</label></th>
								<td class="nobd">
									<input id="IF_END_DTTM" type="text" class="readonly nobd input01 full" readonly="readonly" />
								</td>
							</tr>
							<tr>
								<th><label>성공여부</label></th>
								<td colspan="3" class="nobd">
									<input id="IF_RSLT_CD" type="text" class="readonly nobd input01 full" readonly="readonly" />
								</td>
							</tr>
							<tr>
								<th><label>결과메시지</label></th>
								<td colspan="3" class="nobd">
									<input id="IF_MSG" type="text" class="readonly nobd input01 full" readonly="readonly" />
								</td>
							</tr>
						</table>
					</form>
				</div>

				<div class="btnMain type02">
						<span class="button iconBtn"><button id="btnClose">
							<span class="iconClose"></span><span class="button-text">닫기</span>
						</button> </span>
				</div>
			</div>
		</div>
	</div>
</body>
</html>
