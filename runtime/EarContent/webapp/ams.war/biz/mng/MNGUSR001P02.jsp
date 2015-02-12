<%@ page pageEncoding="utf-8"%>
<!doctype html>
<html>
<head>
<title>시스템관리- 사용자 관리</title>
<%@include file="/common/common.jsp"%>
<script>
	/*****************************************************************************************
	 * 화면 이름  : MNGUSR001P02.jsp
	 * 화면 설명  : 사용자관리 - 수정
	 * 작성자        : 강훈기
	 * 작성일        : 2013-10-10
	 * 변경이력   :
	 * 버전  성명  반영일자  내용                  
	 *----------------------------------------------------------------------------------------
	 * ver0.1 강훈기 2013-10-10 화면 생성
	 ****************************************************************************************/
	$(function() {
		var USER_ID = $.Page.Data('USER_ID');
		var formData;
		var default_authority = new Array('','','');	// 사용자 그룹 별 권한 default값 부여
		$('#MNGUSR001P02_goSearch').Form();
	
		$('#allcontents').Form({
			init : function() {
				//$('#allcontents').Validate();
			},
			validation : {
			USER_ID : {
				required:true,
				name : '사용자ID'
			},
			USER_NAME : {
				required:true,
				minlength : 1,
				maxlength : 13,
				name : '사용자명'
			},
			USE_FLAG : {
				required:true,
				minlength : 1,
				maxlength : 13,
				name : '사용여부'
			},
			EMP_ID : {
				required:true,
				minlength : 1,
				maxlength : 13,
				name : '사번'
			},
			MOBILE_NO : {
				required:true,
				minlength : 1,
				maxlength : 13,
				name : '휴대전화번호'
			},
			CORP_CD  : {
				required:true,
				minlength : 1,
				maxlength : 13,
				name : '지사'
			},
			DEPT_CD  : {
				required:true,
				minlength : 1,
				maxlength : 13,
				name : '본부'
			},
			TEAM_CD  : {
				required:true,
				minlength : 1,
				maxlength : 13,
				name : '팀'
			},
			EMAIL : {
				email : true,
				name : '이메일'
			}
			}
		});
		
		$('#MNGUSR001P02_uploadFile').Form();
		
		$.Page({
			init : function() {
				$.Service({
					transaction : 'abm.USRBBase#pUSR10002',
					request : {
						fields : {
							USER_ID : USER_ID
						}
					},
					response : '#allcontents',
					success : function(ds) {
						// 날짜 설정
		                star.ui.Date.yearRange = '1930:c+2';
						$('#BRTHDY_DT').Date();
		                
		                $.Service({
							transaction : 'abm.UGRBBase#pUGR10001',
							request : {
								fields : {
									page_size : '10000'
								}
							},
							success : function(ds2) {
								console.log("group selectbox : "+ds2);
								var userGroupRs = ds2.recordSets.AMS_GROUP.nc_list;
								var userGroupRecord = [{value:'', label:'==전체=='}];
								for(var i=0; i<userGroupRs.length; i++) {
									userGroupRecord.push({value:userGroupRs[i].GROUP_ID,label:userGroupRs[i].GROUP_NAME}); 
								}
								$('#'+'<%=DBNamingConstants.GROUP_ID%>').Options(userGroupRecord);
								$('#'+'<%=DBNamingConstants.GROUP_ID%>').Value(ds.fields.<%=DBNamingConstants.GROUP_ID%>);
							}
						});
				
		                $.CodeHelper([ {
							divId : 'd_CORP_CD',
							parentCode : 'C010',
							codeId : '<%=DBNamingConstants.CORP_CD%>',
							style : 'select',
							func : function() {
							},
							type : 'SYS'
						} ],
						function() {
		                	$('#<%=DBNamingConstants.CORP_CD%>').Value(ds.fields.<%=DBNamingConstants.CORP_CD%>);
						});
		                
		                $.CodeHelper([ {
							divId : 'd_DEPT_CD',
							parentCode : 'C011',
							codeId : '<%=DBNamingConstants.DEPT_CD%>',
							style : 'select',
							func : function() {
							},
							type : 'SYS'
						} ],
						function() {
		                	$('#<%=DBNamingConstants.DEPT_CD%>').Value(ds.fields.<%=DBNamingConstants.DEPT_CD%>);
						});
		                
		                $.CodeHelper([ {
							divId : 'd_PART_CD',
							parentCode : 'C012',
							codeId : '<%=DBNamingConstants.PART_CD%>',
							style : 'select',
							func : function() {
							},
							type : 'SYS'
						} ],
						function() {
		                	$('#<%=DBNamingConstants.PART_CD%>').Value(ds.fields.<%=DBNamingConstants.PART_CD%>);
						});
		                
		                $.CodeHelper([ {
							divId : 'd_COUNTRY_CD',
							parentCode : 'C009',
							codeId : '<%=DBNamingConstants.COUNTRY_CD%>',
							style : 'select',
							codeValueId : 'ATTRIBUTE_03',
							func : function() {
							},
							type : 'SYS'
						} ],
						function() {
		                	$('#<%=DBNamingConstants.COUNTRY_CD%>').Value(ds.fields.<%=DBNamingConstants.COUNTRY_CD%>);
						});
		                
		                if(ds.fields.FILE_ID != null) {
		                	$('#imgGdsMid').css("display", "block");
                        	$('#imgGdsMid').attr("src", "json.file?cmd=imgDirectDownload&typeId=IMG&fileName=" + ds.fields.FILE_NAME + "&filePath=" + ds.fields.FILE_PATH+"&fileId="+ds.fields.FILE_ID);
                        	$('#FILE_ID').Value("");
            				$('#FILE_PATH').Value("");
            				$('#FILE_NAME').Value("");
            				$('#FILE_SIZE').Value("");
            				$('#PROGRAM_ID').Value("");
		                }
					}
				});
			}
		});
		/*
		// password 정규표현식
		var reg = /^.*(?=.{8,})(?=.*[a-zA-Z])(?=.*\d).*$/;
		$('#USER_PASSWORD').Password({
			change: function(event) {
				var password = event.target.value;
				var secondpassword = $('#SECOND_PASSWORD').Value();
				if(reg.test(password)==false) {
					alert('비밀번호는 영문 숫자 조합 8글자 이상입니다.');
					$('#USER_PASSWORD').focus().select();
				}
				if(secondpassword !== '' && password !== '' && password === secondpassword){
					alert('비밀번호와 2차 비밀번호는 달라야 합니다.');
					$('#USER_PASSWORD').focus().select();
				}
			}
		});
		
		$('#USER_PASSWORD_CHK').Password({
			change: function(event) {
				var password = $('#USER_PASSWORD').Value();
				var password_chk = event.target.value;
				var userpassword = $('#SECOND_PASSWORD').Value();
				if(password != password_chk) {
					alert('비밀번호가 일치하지 않습니다.');
					$('#USER_PASSWORD_CHK').focus().select();
				}
			}
		});
		
		$('#SECOND_PASSWORD').Password({
			change: function(event) {
				var password = event.target.value;
				var firstpassword = $('#USER_PASSWORD').Value();
				if(reg.test(password)==false) {
					alert('2차 비밀번호는 영문 숫자 조합 8글자 이상입니다.');
					$('#SECOND_PASSWORD').focus().select();
				}
				if(firstpassword !== '' && password !== '' && password === firstpassword){
					alert('비밀번호와 2차 비밀번호는 달라야 합니다.');
					$('#SECOND_PASSWORD').focus().select();
				}
			}
		});
		
		$('#USER_PASSWORD_CHK2').Password({
			change: function(event) {
				var password = $('#SECOND_PASSWORD').Value();
				var password_chk = event.target.value;
				
				if(password != password_chk) {
					alert('2차 비밀번호가 일치하지 않습니다.');
					$('#USER_PASSWORD_CHK2').focus().select();
				}
			}
		});
		*/
/*
		 $('#TEL_NO').keydown(function(event) {
		        // Allow: backspace, delete, tab, escape, and enter
		        if ( event.keyCode == 46 || event.keyCode == 8 || event.keyCode == 9 || event.keyCode == 27 || event.keyCode == 13 || 
		             // Allow: Ctrl+A
		            (event.keyCode == 65 && event.ctrlKey === true) || 
		             // Allow: home, end, left, right
		            (event.keyCode >= 35 && event.keyCode <= 39)|| event.keyCode == 189 ){
		                 // let it happen, don't do anything
		                 return;
		        }
		        else {
		            // Ensure that it is a number and stop the keypress
		            if (event.shiftKey || (event.keyCode < 48 || event.keyCode > 57) && (event.keyCode < 96 || event.keyCode > 105 )) {
		                event.preventDefault(); 
		            }   
		        }
		    });
		 
		 $('#MOBILE_NO').keydown(function(event) {
		        // Allow: backspace, delete, tab, escape, and enter
		        if ( event.keyCode == 46 || event.keyCode == 8 || event.keyCode == 9 || event.keyCode == 27 || event.keyCode == 13 || 
		             // Allow: Ctrl+A
		            (event.keyCode == 65 && event.ctrlKey === true) || 
		             // Allow: home, end, left, right
		            (event.keyCode >= 35 && event.keyCode <= 39)|| event.keyCode == 189 ){
		                 // let it happen, don't do anything
		                 return;
		        }
		        else {
		            // Ensure that it is a number and stop the keypress
		            if (event.shiftKey || (event.keyCode < 48 || event.keyCode > 57) && (event.keyCode < 96 || event.keyCode > 105 )) {
		            	event.preventDefault(); 
		            }
		        }
		    });
		 $('#MOBILE_NO').change(function(event) {
			var rgEx = /[01](0|1|6|7|8|9)[-](\d{4}|\d{3})[-]\d{4}$/g;
			 
			var str = event.target.value;
			str = str.replace('-', '');
			str = str.replace('-', '');
			var DataForm = null;
			var RegPhonNum = null;
			
			if(str.length > 4) {
			   	if( str.length > 3 && str.length < 7 ) { 
			        DataForm = "$1-$2"; 
			        RegPhonNum = /([0-9]{3})([0-9]+)/; 
			    } else if(str.length == 7 ) { 
			        DataForm = "$1-$2"; 
			        RegPhonNum = /([0-9]{3})([0-9]{4})/; 
			    } else if(str.length == 10){ 
			        DataForm = "$1-$2-$3"; 
			        RegPhonNum = /([0-9]{3})([0-9]{3})([0-9]+)/; 
			    } else { 
			        DataForm = "$1-$2-$3"; 
			        RegPhonNum = /([0-9]{3})([0-9]{4})([0-9]+)/; 
			    } 
			
			    while( RegPhonNum.test(str) ) {  
			        str = str.replace(RegPhonNum, DataForm);  
			    } 
			    event.target.value = str;
			}
			
			var OK = rgEx.exec(event.target.value);
			if(!OK) {
				alert('휴대폰 번호를 잘못 입력하였습니다. 확인해 주세요.');
				$(event.target).focus();	 
			}
		 });
		 
		 $('#FAX_NO').keydown(function(event) {
		        // Allow: backspace, delete, tab, escape, and enter
		        if ( event.keyCode == 46 || event.keyCode == 8 || event.keyCode == 9 || event.keyCode == 27 || event.keyCode == 13 || 
		             // Allow: Ctrl+A
		            (event.keyCode == 65 && event.ctrlKey === true) || 
		             // Allow: home, end, left, right
		            (event.keyCode >= 35 && event.keyCode <= 39)|| event.keyCode == 189 ){
		                 // let it happen, don't do anything
		                 return;
		        }
		        else {
		            // Ensure that it is a number and stop the keypress
		            if (event.shiftKey || (event.keyCode < 48 || event.keyCode > 57) && (event.keyCode < 96 || event.keyCode > 105 )) {
		                event.preventDefault(); 
		            }   
		        }
		    });
		 
		 function LPad(digit, size, attatch) {
	            var add = "";
	            digit = digit.toString();

	            if (digit.length < size) {
	                var len = size - digit.length;
	                for (i = 0; i < len; i++) {
	                    add += attatch;
	                }
	            }
	            return add + digit;
	        }
*/		
		$('#duplicateIdChk').Button(
				{
					click : function() {
						var request = {
								fields : {
									USER_ID : $('#USER_ID').Value()
								}
						};
						var userId = $('#USER_ID').Value();
						if(userId == null || userId == "") {
							window.alert("사용자ID를 입력해주세요");
							$('#USER_ID').focus();
							return;
						}
						$.Service({
							transaction : 'abm.USRBBase#pUSR10002',
							request : request,
							success : function(ds) {
								if(ds.fields.USER_ID == null || ds.fields.USER_ID == "") {
									window.alert($('#USER_ID').Value()+"는 사용할 수 있는 ID입니다.");
								} else {
									window.alert($('#USER_ID').Value()+"는 사용 중인 ID입니다. 다른 ID를 입력해주세요.");
									$('#USER_ID').Value("");
								}
							}
						});
					}
				});
		

		$('#ROLE_ID').Select({
			change : function() {
				if ($('#ROLE_ID').Value() == '0') {
					return;
				} else {
					$.Page.GetRole();
				}
			}
		});
	
		//사진 찾아보기 버튼 클릭(2013.02.27 by PSI )=========시작
		if($.browser.msie) {
// 			$('#btnSearch1').Disable();	
		} else {
			$('#btnSearch1').Button({
				click: function() {
					$('#j_file').click();
				}
			});
		}
		
		// file이 선택될시 자동으로 호출되는 서비스를 넣기
		$('#j_file').bind('change', function(e, d) {
			if (!$('#j_file').val()) {
				return;
			}
			$('#MNGUSR001P02_uploadFile').Validate(function() {
				/* var request = {
						fields : {
							type_id : 'IMG'
						}
					} */
				$('#MNGUSR001P02_uploadFile').Service();
			});
		});

		$('#MNGUSR001P02_uploadFile').File({
			success: function(data) {
				//img 태그에 해당 파일 다운로드 url 적용
				$('#imgGdsMid').attr("src", "json.file?cmd=imgDirectDownload&typeId=IMG&fileName=" + data[0].file_name + "&filePath=" + data[0].file_path+"&fileId="+data[0].file_id);
				$('#imgGdsMid').css("display", "block");
				
				$('#FILE_ID').val(data[0].file_id);
				$('#FILE_PATH').val(data[0].file_path);
				$('#FILE_NAME').val(data[0].file_name);
				$('#FILE_SIZE').val(data[0].file_size);
				$('#PROGRAM_ID').val(data[0].program_id);
			},
			validation: {
				j_file: {
					required: true
				}
			}
		});
		//사진 찾아보기 버튼 클릭(2013.02.27 by PSI )=========끝
		
		//우편번호 조회버튼
		$('#btnZipCD').Button({
			click: function() {
				$.Popup({					
					width : 550,
					height : 495,
					url: 'MNGUSR001P10.jsp',
					center: true,
					close: function(data) {
						if(!data) {
							// TODO:
							return;
						}
						$('#ZIP_CODE').Value(data.ZIPCODE);
						$('#ADDR').Value(data.ADDR);
					}
				});
			}
		});
		
		//지사/팀 조회버튼
		$('#btnTeamCD').Button({
			click: function() {
				$.Popup({					
					width : 1000,
					height : 495,
					url: 'MNGUSR001P12.jsp',
					center: true,
					close: function(data) {
						if(!data) {
							// TODO:
							return;
						}
						
						$('#ORG_01').Value(data.HDQT_NM);
						$('#ORG_02').Value(data.SECTN_NM);
						$('#ORG_03').Value(data.HDQT_TEAM_CD);
						$('#TEAM_CD').Value(data.BRNOFC_TEAM_CD);
						$('#TEAM_NM').Value(data.BRNOFC_TEAM_NM);
					}
				});
			}
		});
		
		$('#btnSave').Button({
			click: function() {
				var request = $('#allcontents').DataSet();
				$.Service({
					transaction : 'abm.USRBBase#pUSR10003',
					request : request,
					success : function(ds) {
						window.alert('[' + ds.message.messageId + '] ' + ds.message.messageName);
						$.Navigate("MNGUSR001.jsp");
					}
				});
			}
		});
		
		//취소
		$('#btnCancel').Button({
			click: function() {
				if(confirm('닫으시겠습니까?'))
					$.Navigate("MNGUSR001.jsp");
			}
		});
	});
	</script>
</head>
<body>
	<!-- IE의 경우 화면에 file 부분이 보여야 한다. 따라서 div로 화면을 그린후 backgroud color와 같은 다른 layer로 덮어 버린다  -->
	<div style="position: absolute; width: 0; height: 0; cursor: ">
		<form name='MNGUSR001P02_uploadFile' id='MNGUSR001P02_uploadFile'
			method="post" enctype="multipart/form-data">
			<input type="file" id="j_file" name="j_file" />
		</form>
	</div>
	<div style="background-color: white; width: 300px; height: 50px; position: absolute;">
	</div>
	<div id="container">
		<!-- //headerArea-->
		<%@include file="/common/TopMenu.jsp"%>
		<!-- //headerArea-->
		<div id="wrapper" class="clearfix">
			<!-- //leftArea -->
			<%@include file="/common/LeftMenu.jsp"%>
			<!-- //leftArea -->
			<div id="contentArea">
				<div class="contTitle">
					<h1>사용자 수정</h1>
				</div>
				<div class="btn_common" id="saveButton">
					<span class="button iconBtn">
						<button id="btnSave" style="display: block;">
							<span class="button-icon ui-icon-func-save"></span> <span
								class="button-text"> 저장</span>
						</button>
					</span>
					<span class="button iconBtn">
						<button id="btnCancel">
							<span class="button-icon ui-icon-func-reset""></span>
							<span class="button-text"><%=BaseUtils.getAmsLabelValue("L0055", locale, "Cancel") %></span>
						</button> 
					</span>
				</div>

				<div id="allcontent" style="display: block;" class="tb_data">
					<form id="allcontents">
						<div>
							<table>
								<colgroup>
									<col width="54" />
									<col width="164" />
									<col width="215" />
									<col width="164" />
									<col width="215" />
									<col width="141" />
								</colgroup>
								<tr>
									<th rowspan="5">계정<br/>정보</th>
									<th><label for="EMP_ID">HIOK_ID</label></th>
									<td colspan="3">
										<input id="EMP_ID" type="text" class="input01" disabled/>
									</td>
									<td rowspan="8"><input type="hidden"
										id="FILE_ID" /> <input type="hidden" id="FILE_PATH" /> <input
										type="hidden" id="FILE_NAME" /> <input type="hidden"
										id="FILE_SIZE" /><input type="hidden" id="PROGRAM_ID" />
										<div class="potoId">
											<img id="imgGdsMid" src=""
												style="display: none;" />
										</div>
										<div class="facilities_buttons">
											<label for="j_file"> <!-- 버튼클릭이벤트로 하면 IE에서 동작하지 않으므로 label로 연결  -->
											<span class="button gridBtn">
												<button id="btnSearch1">
													<span class="button-icon ui-icon-search-search"></span> <span
														class="button-text"> 사진찾기</span>
												</button> </span> </label>
										</div>
									</td>
								</tr>
								<tr>
									<th><label class="required">사용자ID</label>
									</th>
									<td><span id="USER_ID_DIV"></span> <input id="USER_ID" type="text" class="input01 code01" disabled />
									<th><label class="required">사용자명</label>
									</th>
									<td><input id="USER_NAME" type="text" class="input01" />
									</td>
									
								</tr>
								<tr>
									<th><label class="required">사용자 그룹</label></th>
									<td>
										<div id="d_USER_GROUP">
											<select id="<%=DBNamingConstants.GROUP_ID%>" disabled></select>
										</div>
									</td>
									<th><label class="required">사용여부</label>
									</th>
									<td><select id="USE_FLAG">
											<option value="Y">Y</option>
											<option value="N">N</option>
									</select></td>
								</tr>
								<tr id="orgDetail">
									<th id="orgDetail_7"><label class="required">지사</label></th>
									<td id="orgDetail_8" >
										<div id="d_CORP_CD">
										</div>
									</td>
									<th id="orgDetail_7"><label class="required">본부</label></th>
									<td id="orgDetail_8"  >
										<div id="d_DEPT_CD">
										</div>
									</td>
								</tr>
								<tr id="orgDetail">
									<th id="orgDetail_7"><label class="required">팀</label></th>
									<td id="orgDetail_8"  >
										<div id="d_PART_CD">
										</div>
									</td>
									<th id="orgDetail_7"><label class="required">국가코드</label></th>
									<td id="orgDetail_8" >
										<div id="d_COUNTRY_CD">
										</div>
									</td>
								</tr>
								<tr>
									<th rowspan="6">인적<br />사항</th>
									<th>전화번호</th>
									<td><input id="TEL_NO" type="text" class="input01"
										style="ime-mode: disabled" /></td>
									<th><label class="required">휴대폰번호</label>
									</th>
									<td><input id="MOBILE_NO"
										type="text" class="input01" style="ime-mode: disabled"
										maxlength="13" /></td>
								</tr>
								<tr>
									<th>팩스번호</th>
									<td><input id="FAX_NO" type="text" class="input01"
										style="ime-mode: disabled" /></td>
									<th>이메일</th>
									<td><input id="EMAIL"
										type="email" class="input01 num02" /></td>
								</tr>
								<tr>
									<th>우편번호</th>
									<td colspan="3" ><input id="ZIP_CODE"
										type="text" class="input01" readonly="readonly" />
										<span class="button gridBtn">
											<button id="btnZipCD">
												<span class="button-icon ui-icon-search-search"></span> <span
													class="button-text"> 찾기</span>
											</button> </span>
									</td>
								</tr>
								<tr>
									<th>주소</th>
									<td colspan="4" ><input id="ADDR"
										type="text" class="input01 addr" readonly="readonly" /></td>
								</tr>
								<tr>
									<th>주소상세</th>
									<td colspan="4" ><input id="ADDR_DETAIL"
										type="text" class="input01 addr" /></td>
								</tr>
								<tr>
									<th>생일</th>
									<td colspan="4" ><input id="BRTHDY_DT"
										type="text" /></td>
								</tr>
							</table>
						</div>
					</form>
				</div>
			</div>
		</div>
		<!-- //footerArea -->
		<%@include file="/common/Footer.jsp"%>
		<!-- //footerArea -->
	</div>
</body>
</html>




