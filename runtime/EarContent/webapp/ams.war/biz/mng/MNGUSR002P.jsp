<%@ page pageEncoding="utf-8"%>
<!doctype html>
<html>
<head>
<title>시스템관리- 사용자관리</title>
<%@include file="../../common/common.jsp"%>
<script>
	/*****************************************************************************************
	 * 화면 이름  : MNGUSR002P.jsp
	 * 화면 설명  : 사용자관리 - 등록
	 * 작성자    	: 이진희
	 * 작성일    	: 2013-01-24
	 * 변경이력   :
	 * 버전  성명  반영일자  내용              	
	 *----------------------------------------------------------------------------------------
	 * ver0.1 이진희 2013-01-24 화면 생성
	 * ver0.2 이진희 2012-02-04 IO 및 기능 추가
	 ****************************************************************************************/
	$(function() {
		var USER_GROUP;
		var USER_CATEGORY_01;
		var USER_CATEGORY_02;
		$('#MNGUSR002P_goSearch').Form();
		
		$.Page({
			init : function() {
				$('#USER_CATEGORY_02').Select({
					blank : {
						value : '',
						label : '==선택=='
					}
				});
				$.Page.Search_List(1);
			},
			Search_List : function(page) {
				var request = $('#MNGUSR002P_goSearch').DataSet();
				request.fields.CODE_ID = 'UT';
				request.fields.USER_ID = $.Page.Data('USER_ID');
				request.fields.Flag = $.Page.Data('Flag');
				$.Service({
					transaction : 'mng.MNGUSRB#selectUser',
					request : request,
					response : '#content',
					success : function(ds) {
						$('#USER_GROUP').Options(ds.recordSets.GROUP_RS);
						$('#USER_GROUP').Value(ds.fields.USER_GROUP);
						USER_GROUP = ds.fields.USER_GROUP;
						USER_CATEGORY_01 = ds.fields.USER_CATEGORY_01;
						USER_CATEGORY_02 = ds.fields.USER_CATEGORY_02;
						$('#USER_GROUP').Select().change();
						if($.Page.Data('Flag') == 'U') {
							$('#btnSearch').Button().click();
						}
					}
				});
			}
		});
		$('#USER_GROUP').Select({
			change : function() {
				var request = $('#MNGUSR002P_goSearch').DataSet();
				request.fields.CODE_ID = $('#USER_GROUP').Value();
				$.Service({
					transaction : 'mng.MNGCODS#selectSelector',
					request : request,
					// response : '#GROUP_RS',
					success : function(ds) {
						$('#USER_CATEGORY_01').Options(ds.recordSets.GROUP_RS);
						$('#USER_CATEGORY_02').Options({});
						if (USER_CATEGORY_01 !== '') {
							$('#USER_CATEGORY_01').Value(USER_CATEGORY_01);
							USER_CATEGORY_01 = '';
							$('#USER_CATEGORY_01').Select().change();
						}
					}
				});
			},
			blank : {
				value : '',
				label : '==선택=='
			}
		});
		$('#USER_CATEGORY_01').Select({
			change : function() {
				var request = $('#MNGUSR002P_goSearch').DataSet();
				request.fields.CODE_ID = $('#USER_CATEGORY_01').Value();
				$.Service({
					transaction : 'mng.MNGCODS#selectSelector',
					request : request,
					// response : '#GROUP_RS',
					success : function(ds) {
						$('#USER_CATEGORY_02').Select({
							value : 'value',
							label : 'label',
							blank : {
								value : '',
								label : '==선택=='
							}
						});
						$('#USER_CATEGORY_02').Options(ds.recordSets.GROUP_RS);
						if (USER_CATEGORY_02 !== '') {
							$('#USER_CATEGORY_02').Value(USER_CATEGORY_02);
							USER_CATEGORY_02 = '';
							$('#USER_CATEGORY_02').Select().change();
						}
					}
				});
			},
			blank : {
				value : '',
				label : '==선택=='
			}
		});
	
		// 저장 버튼 클릭
		$('#btnSave').Button({
			click : function() {
				var request = $('#content').DataSet();
				request.fields.Flag = $.Page.Data('Flag');
				$.Service({
					transaction : 'mng.MNGUSRB#insertUser',
					request : request,
					success : function(ds) {
							window.alert('['
											+ ds.message.messageId
											+ '] '
											+ ds.message.messageName);
					$.Navigate("MNGUSR001.jsp");
					}
				});
			}
		});
		$('#btnSearch').Button({
			click : function() {
				var value = $('#USER_GROUP').Value();
				if (value == "UTA") {
					$('#accountDetail').show();
					$('#orgDetail').show();
					$('#humDetail').show();
					$('#addDetail').hide();
					$('#add2Detail').hide();
					$('#add3Detail').show();
					$('#autDetail').show();
					$('#btnSave').show();
				} else if (value == "UTC") {
					$('#accountDetail').show();
					$('#orgDetail').show();
					$('#humDetail').show();
					$('#addDetail').show();
					$('#add2Detail').hide();
					$('#add3Detail').hide();
					$('#autDetail').show();
					$('#btnSave').show();
				} else if (value == "UTD") {
					$('#accountDetail').show();
					$('#humDetail').show();
					$('#addDetail').hide();
					$('#add2Detail').show();
					$('#add3Detail').hide();
					$('#autDetail').show();
					$('#btnSave').show();
				} else if (value == "UTE") {
					$('#accountDetail').show();
					$('#orgDetail').show();
					$('#humDetail').show();
					$('#addDetail').show();
					$('#add2Detail').hide();
					$('#add3Detail').hide();
					$('#autDetail').show();
					$('#btnSave').show();
				} else if (value == "UTS") {
					$('#accountDetail').show();
					$('#orgDetail').show();
					$('#humDetail').show();
					$('#addDetail').hide();
					$('#add2Detail').hide();
					$('#add3Detail').hide();
					$('#autDetail').show();
					$('#btnSave').show();
				}
			}
		});
		
		$('#TEL_NO').Text({
			mask: '99-999-9999'
		});
	
		$('#MOBILE_NO').Text({
			mask: '999-9999-9999'
		});

		$('#btnApprove').Button({
			click : function() {
				var request = $('#accountDetail').DataSet();
				request.fields.USER_ID = $('#USER_ID').val();
				$.Service({
					transaction : 'mng.MNGUSRB#selectUserDuplicationCheck',
					request : request,
					success : function(ds) {
						window.alert('['
							+ ds.message.messageId
							+ '] '
							+ ds.message.messageName);
					}
				});
			}
		});

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
					<h1>사용자 관리</h1>
				</div>
					<div class="searchArea">
						<form id="MNGUSR002P_goSearch">
							<table class="tb_search">
								<colgroup>
									<col width="130" />
									<col width="220" />
									<col width="130" />
									<col width="220" />
									<col width="130" />
									<col width="220" />
								</colgroup>
								<tr>
									<th><label for="USER_GROUP">사용자그룹</label></th>
									<td><select id="USER_GROUP" class="selectFL"></select></td>
									<th><label for="USER_CATEGORY_01">사용자분류1</label></th>
									<td><select id="USER_CATEGORY_01" class="selectFL">
									</select>
									</td>
									<th><label for="USER_CATEGORY_02">사용자분류2</label></th>
									<td class="nobd"><select id="USER_CATEGORY_02" class="selectFL"></select>
									</td>
								</tr>
							</table>
						</form>
					</div>
					<div class="btn_common" id="saveButton" >
						<span class="button iconBtn">
							<button id="btnSearch">
								<span class="button-icon ui-icon-search-search"></span> <span
									class="button-text"> 확인</span>
							</button> </span> <span class="button iconBtn">
							<button id="btnSave" style="display: none;">
								<span class="button-icon ui-icon-func-save"></span> <span
									class="button-text"> 저장</span>
							</button> </span>
					</div>
					<div id="accountDetail" style="display: none;" class="tb_data">
						<table>
							<colgroup>
								<col width="45" />
								<col width="100" />
								<col width="230" />
								<col width="160" />
								<col width="160" />
								<col width="130" />
							</colgroup>
							<tr>
								<th rowspan="4">계정<br />정보</th>
								<th><label class="required">사용자ID</label></th>
								<td><input id="USER_ID" type="text" class="input01" />
									<span class="button gridBtn">
										<button id="btnApprove">
											<span class="button-icon ui-icon-func-approve"></span> <span
												class="button-text"> 중복확인</span>
										</button> </span>
								</td>
								<th><label class="required">사용자명</label></th>
								<td><input id="USER_NAME" type="text" class="input01" />
								</td>
								<td rowspan="4" class="nobd">
									<div class="potoId">
										<img id="imgGdsMid" src="../Resource/image/ex.png" />
									</div>
									<div class="facilities_buttons">
										<span class="button gridBtn">
											<button id="btnSearch1">
												<span class="button-icon ui-icon-search-search"></span><span
													class="button-text"> 찾아보기</span>
											</button> </span>
									</div>
								</td>
							</tr>
							<tr>
								<th><label class="required">비밀번호</label></th>
								<td><input id="USER_PASSWORD" type="text" class="input01"/>
								</td>
								<th><label class="required">비밀번호확인</label></th>
								<td><input id="USER_PASSWORD_CHK" type="text" class="input01" />
								</td>
							</tr>
							<tr>
								<th><label class="required">사용여부</label></th>
								<td><select id="USE_FLAG" class="selectFL">
										<option value="Y">Y</option>
										<option value="N">N</option>
								</select>
								</td>
								<th><label class="required">2차 비밀번호 사용여부</label></th>
								<td>
									<select id="USE_SECOND_PASSWORD" class="selectFL">
										<option value="Y">Y</option>
										<option value="N">N</option>
									</select>
								</td>
							</tr>
							<tr>
								<th><label class="required">2차 비밀번호</label></th>
								<td><input id="SECOND_PASSWORD" type="text" class="input01" />
								</td>
								<th><label class="required">비밀번호확인</label></th>
								<td><input id="USER_PASSWORD_CHK2" type="text" class="input01" />
								</td>
							</tr>
						</table>
					</div>
					
					<div id="orgDetail" style="display: none;" class="tb_data">
						<table>
							<colgroup>
								<col width="45" />
								<col width="100" />
								<col width="260" />
								<col width="150" />
								<col width="" />
							</colgroup>
							<tr>
								<th rowspan="2">조직<br />정보</th>
								<th>부문</th>
								<td><input id="ORG_01" type="text" class="input01" readonly="readonly" />
								</td>
								<th>본부</th>
								<td class="nobd"><input id="ORG_02" type="text" class="input01" readonly="readonly" />
								</td>
							</tr>
							<tr>
								<th>본부/팀</th>
								<td><input id="ORG_03" type="text" readonly="readonly" class="input01" />
								</td>
								<th><label class="required">지사/팀</label></th>
								<td class="nobd"><input id="DEPT_CODE" type="text" class="input01" readonly="readonly" />
									<span class="button gridBtn">
										<button id="btnFind">
											<span class="button-icon ui-icon-search-search"></span> <span
												class="button-text"> 찾기</span>
										</button> </span>
								</td>
							</tr>
						</table>
					</div>
					
					<div id="humDetail" style="display: none;" class="tb_data">
						<table>
							<colgroup>
								<col width="45" />
								<col width="100" />
								<col width="260" />
								<col width="150" />
								<col width="" />
							</colgroup>
							<tr>
								<th rowspan="5">인적<br />사항</th>
								<th>전화번호</th>
								<td><input id="TEL_NO" type="text" class="input01" />
								</td>
								<th><label class="required">휴대폰번호</label></th>
								<td colspan="2" class="nobd"><input id="MOBILE_NO" type="text" class="input01"/>
								</td>
							</tr>
							<tr>
								<th>팩스번호</th>
								<td><input id="FAX_NO" type="text" class="input01"/>
								</td>
								<th>이메일</th>
								<td colspan="2" class="nobd"><input id="EMAIL" type="text" class="input01" />
								</td>
							</tr>
							<tr>
								<th>우편번호</th>
								<td colspan="4" class="nobd">
									<input id="ZIP_CODE" type="text" class="input01 zipcode" readonly="readonly" /> <span class="button gridBtn">
										<button id="btnFind2">
											<span class="button-icon ui-icon-search-search"></span> <span
												class="button-text"> 찾기</span>
										</button> </span>
								</td>
							</tr>
							<tr>
								<th>주소</th>
								<td colspan="4" class="nobd">
									<input id="ADDR" type="text" class="input01 addr" />
								</td>
							</tr>
							<tr>
								<th>주소상세</th>
								<td colspan="4" class="nobd">
									<input id="ADDR_DETAIL" type="text" class="input01 addr_etc"/>
								</td>
							</tr>
						</table>
					</div>
					
					<div id="addDetail" style="display: none;" class="tb_data">
						<table>
							<colgroup>
								<col width="45" />
								<col width="100" />
								<col width="260" />
								<col width="150" />
								<col width="" />
							</colgroup>
							<tr>
								<th rowspan="2">추가<br />정보</th>
								<th><label class="required">거래처코드</label></th>
								<td><input id="CUST_CODE" type="text" class="input01" readonly="readonly" />
								</td>
								<th><label class="required">배차조직</label></th>
								<td class="nobd">
									<select id="CAR_ASSIGN_ORG" class="selectFL">
											<option value="USE_FLAG001">==선택==</option>
									</select>
								</td>
							</tr>
						</table>
					</div>
					
					<div id="add2Detail" style="display: none;" class="tb_data">
						<table>
							<colgroup>
								<col width="45" />
								<col width="100" />
								<col width="260" />
								<col width="150" />
								<col width="" />
							</colgroup>
							<tr>
								<th rowspan="2">추가<br />정보</th>
								<th><label class="required">거래처코드</label></th>
								<td><input id="CUST_CODE" type="text" class="input01" readonly="readonly" />
								</td>
								<th><label class="required">거래처구분</label></th>
								<td class="nobd">
									<select id="CUST_CATEGORY" class="selectFL">
											<option value="Y">==선택==</option>
									</select>
								</td>
							</tr>
						</table>
					</div>
					
					<div id="add3Detail" style="display: none;" class="tb_data">
						<table>
							<colgroup>
								<col width="45" />
								<col width="100" />
								<col width="260" />
								<col width="150" />
								<col width="" />
							</colgroup>
							<tr>
								<th rowspan="3">추가<br />정보</th>
								<th><label class="required">사번</label></th>
								<td><input id="EMP_ID" type="text" class="input01" />
								</td>
								<th>직위</th>
								<td class="nobd">
									<select id="CAR_ASSIGN_ORG" class="selectFL">
											<option value="Y">==선택==</option>
									</select>
								</td>
							</tr>
								<tr>
								<th>직책</th>
								<td><input id="EMP_ID" type="text" class="input01" readonly="readonly"/>
								</td>
								<th>직무</th>
								<td class="nobd"><input id="EMP_ID2" type="text" class="input01" readonly="readonly" />
								</td>
							</tr>
							<tr>
								<th><label class="required">퇴직여부</label></th>
								<td colspan="3" class="nobd"><select id="CAR_ASSIGN_ORG" class="selectFL">
										<option value="USE_FLAG001">N</option>
								</select>
								</td>
							</tr>
						</table>
					</div>
					
					<div id="autDetail" style="display: none;" class="tb_data">
						<table>
							<colgroup>
								<col width="45" />
								<col width="440" />
								<col width="341" />
							</colgroup>
							<tr>
								<th rowspan="2">권한<br />부여</th>
								<td colspan="5" class="nobd">
									<select id="ROLE_ID" class="selectFL"></select>
								</td>
							</tr>
							<tr>
								<td class="nobd">
									<div class="clearfix">
										<div class="float3_l_44_form">
											<select id="ROLE_ALL" name="ROLE_ALL" class="selectbox03" multiple></select>
										</div>
										<div class="float3_c_10_form">
											<span class="btnImage">
												<button id="insertData" class="btnArrowRight">
													<span class="button-text"></span>
												</button></span> <span class="btnImage">
												<button id="deleteData" class="btnArrowLeft">
													<span class="button-text"></span>
												</button> </span>
										</div>
										<div class="float3_r_44_form">
											<select id="ROLE_SEL" name="ROLE_SEL" class="selectbox03" multiple></select>
										</div>
									</div>
								</td>
								<td class="nobd">
								</td>
							</tr>
						</table>
					</div>
				</div>
			</div>
		<!-- //footerArea -->
		<%@include file="../../common/Footer.jsp"%>
		<!-- //footerArea -->
	</div>
</body>
</html>


