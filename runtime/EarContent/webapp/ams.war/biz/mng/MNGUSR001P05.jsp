<%@ page pageEncoding="utf-8"%>
<!doctype html>
<html>
<head>
<title>내정보관리</title>
<%@include file="../../common/common.jsp"%>
<%
if(userInfo.getSecondPasswordPass() == false ) {
%>
	<script>
		$.Navigate('MNGUSR001P04.jsp');
	</script>
<%
} else {
	userInfo.setSecondPasswordPass(false);
%>
<script>
    /*****************************************************************************************
     * 화면 이름  : MNGUSR005P.jsp
     * 화면 설명  : 내정보변경
     * 작성자        : 이진희
     * 작성일        : 2013-01-24
     * 변경이력   :
     * 버전  성명  반영일자  내용                  
     *----------------------------------------------------------------------------------------
     * ver0.1 이진희 2013-01-24 화면 생성
     * ver0.2 이진희 2012-02-04 IO 및 기능 추가
     ****************************************************************************************/
	$.Page.Data('USER_ID', '<%=loginId %>');
	$(function() {
    	var oldMobileNo = '';
        $('#MNGUSR001P05_goSearch').Form();
        var USER_GROUP;
        var USER_CATEGORY_01;
        var USER_CATEGORY_02;
   
    	$('#allcontents').Form({
			init : function() {
				$('#allcontents').Validate();
			},
			validation : {
			USER_ID : {
				required:true,
				minlength : 1,
				maxlength : 13,
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
			TEAM_CD : {
				required:true,
				minlength : 1,
				maxlength : 13,
				name : '지사/팀'
			},
			CAR_ASSIGN_ORG : {
				required:true,
				minlength : 1,
				maxlength : 13,
				name : '배차조직'
			},
			LOC_CD : {
				required:true,
				minlength : 1,
				maxlength : 13,
				name : '거래처 코드'
			},
			LOC_CD1 : {
				required:true,
				minlength : 1,
				maxlength : 13,
				name : '대리점 코드'
			},
			LOC_CD2 : {
				required:true,
				minlength : 1,
				maxlength : 13,
				name : '에이전트 코드'
			},
			EMAIL : {
				email : true,
				name : '이메일'
			}
			}
	});
        
        $.Page({
            init : function() {
                $.Page.Search_List(1);
                $('#btnApprove').hide();
                
                // ROLE_ID에 select 맵핑해주고, ROLE_SEL에 Mapping_rs를 맵핑
                // MAPPING_RS는 유저에게 부여된 권한을 조회
                $.Service({			
        			transaction: 'mng.MNGUSRB#selectUserMapping',
        			request: {
        				fields : {
        					// UT코드는 임직원/사업장/대리점/고객사/벤더/기타/고객 선택
        					CODE_ID : 'UT',
        					USER_ID : $.Page.Data('USER_ID')
        				},
        				recordSets:{}
        			},
        			success: function(ds) {
        				$('#ROLE_ID').Select({
                    		value : 'value',
                    		label : 'label',
                    		blank : {
                                value : '',
                                label : '==선택=='
                            }
                    	});
        				$('#CAR_ASSIGN_ORG').Select({
        					value : 'CD',
							label : 'CD_NM',
							blank : {
								value : '',
								label : '==선택=='
							}
						});
						$('#CAR_ASSIGN_ORG').Options(ds.recordSets.CD_CLAS);
        				$('#ROLE_ID').Options(ds.recordSets.GROUP_RS);

        				//사용자 ID에 부여된 권한 불러오기
        				//단, 임직원인 경우 APPROVAL_AUTH이 있는 경우와 없는 경우로 상황을 나누어서 처리
        				var MAPPING_RS_ARR = ds.recordSets.MAPPING_RS;
        				var MAPPING_RS2 = [];
        				$('#APPROVAL_AUTH').Value('N');
        				
        				for(var i = 0; i < MAPPING_RS_ARR.nc_list.length; i++) {
							if(MAPPING_RS_ARR.nc_list[i].value === 'A0002'){
								$('#APPROVAL_AUTH').Value('Y');
							}else{
								var temp = {
										value : MAPPING_RS_ARR.nc_list[i].value,
										label : MAPPING_RS_ARR.nc_list[i].label
									};
								MAPPING_RS2.push(temp);
							}
						}
						$('#ROLE_SEL').Options(MAPPING_RS2);
						$.Page.GetRole();
        			}
        		});
            }, 

            Search_List : function(page) {
                var request = $('#MNGUSR001P05_goSearch').DataSet();
                request.fields.USER_ID = $.Page.Data('USER_ID');
                $.Service({
                    transaction : 'mng.MNGUSRB#selectUser',
                    request : request,
                    response : '#content',
                    success : function(ds) {
                        USER_GROUP = ds.fields.USER_GROUP;
                        USER_CATEGORY_01 = ds.fields.USER_CATEGORY_01;
                        USER_CATEGORY_02 = ds.fields.USER_CATEGORY_02;
                        
                        $.CodeHelper([{
                            divId: 'd_USER_GROUP',
                            parentCode: 'UT',
                            codeId: 'USER_GROUP',
                            style: 'select',
                            func: function() {
                            },
                            type: 'SYS'
                   		  }, {
                           divId: 'd_USER_CATEGORY_01',
                           parentCode: USER_GROUP,
                           codeId: 'USER_CATEGORY_01',
                           style: 'select',
                           func: function() {
                           },
                            type: 'SYS'
                    	 }, {
                            divId: 'd_USER_CATEGORY_02',
                            parentCode: USER_CATEGORY_01,
                            codeId: 'USER_CATEGORY_02',
                            style: 'select',
                            func: function() {
                            $('#btnSearch').Button().click();
                            },
                            type: 'SYS'
                     }
                     ], function() {
                    	$('#USER_GROUP').Value(USER_GROUP).Disable();
                    	$('#USER_CATEGORY_01').Value(USER_CATEGORY_01).Disable();
                    	$('#USER_CATEGORY_02').Value(USER_CATEGORY_02).Disable();
                    	$('#btnSearch').Button().click();
                     });
                        oldMobileNo = ds.fields.MOBILE_NO;
                        $('#TEAM_CD').focusout();
                        $('#LOC_CD').focusout();
                        $('#LOC_CD1').focusout();
                        $('#LOC_CD2').focusout();
                        console.log(ds.fields);
                        if(ds.fields.FILE_ID != null) {
                        	$('#imgGdsMid').attr("src", "../common/downloadIdPicture.jsp?typeId=IMG&fileName=" + ds.fields.FILE_NAME + "&filePath=" + ds.fields.FILE_PATH+"&fileId="+ds.fields.FILE_ID);
                    	}
                    }
                });
            },
            GetRole: function() {
				var request = {
						fields :{
							USER_GROUP : $('#ROLE_ID').Value()
						}
				}
				
				// ROLE_SEL : 권한이 부여된 목록, ROLE_ALL : 전체 권한 리스트(ROLE_SEL목록에 있는 부분 제외)
				// ROLE_ID(select box)의 내용이 바뀔 때 마다 동작하며 부여할 수 있는 권한 들을 조회해온다.
				$.Service({
					transaction: 'mng.MNGUSRB#selectUserRoleList',
					request: request,					
					success: function(ds) {
						var ROLE_LIST_ARR = ds.recordSets.ROLE_LIST;
						var ROLE_RS = [];
						for(var j = 0; j < ROLE_LIST_ARR.nc_list.length; j++) {
							var options = $('#ROLE_SEL').children();
							var checker = false;
							if($('#USER_GROUP').Value() === 'UTA' && ROLE_LIST_ARR.nc_list[j].value === 'A0002'){
								checker = true;
							}
							for(var i = 0; i < options.length; i++) {
								if(options[i].value === ROLE_LIST_ARR.nc_list[j].value) {
									checker = true;
									break;
								}
							}
							if(!checker) ROLE_RS.push(ROLE_LIST_ARR.nc_list[j]);
						}
						$('#ROLE_ALL').Options(ROLE_RS);
					}
				});
			}			
        });
        
        // USER_GROUP 셀렉트가 변경될 때마다 USER_CATEGORY_01의 value들을 변경
        $('#USER_GROUP').Select({
            blank : {
                value : '',
                label : '==선택=='
            }
        });
     // USER_CATEGORY_01 셀렉트가 변경될 때마다 USER_CATEGORY_02의 value들을 변경
        $('#USER_CATEGORY_01').Select({
            blank : {
                value : '',
                label : '==선택=='
            }
        });
        
        $('#USER_CATEGORY_02').Select({            
            blank : {
                value : '',
                label : '==선택=='
            } 
        });
        
     	// password 정규표현식
     	/*
		var reg = /^.*(?=.{8,})(?=.*[a-zA-Z])(?=.*\d).*$/;
		$('#USER_PASSWORD').Password({
			change: function(event) {
				var password = event.target.value;
				
				if(reg.test(password)==false) {
					alert('비밀번호는 영문 숫자 조합 8글자 이상입니다.');
					$(event.target).focus();
				}
			}
		});
		
		$('#USER_PASSWORD_CHK').Password({
			change: function(event) {
				var password = $('#USER_PASSWORD').Value();
				var password_chk = event.target.value;
				
				if(password != password_chk) {
					alert('비밀번호가 일치하지 않습니다.');
					$(event.target).focus();
				}
			}
		});
		
		$('#SECOND_PASSWORD').Password({
			change: function(event) {
				var password = event.target.value;
				
				if(reg.test(password)==false) {
					alert('2차 비밀번호는 영문 숫자 조합 8글자 이상입니다.');
					$(event.target).focus();
				}
			}
		});
		
		$('#USER_PASSWORD_CHK2').Password({
			change: function(event) {
				var password = $('#SECOND_PASSWORD').Value();
				var password_chk = event.target.value;
				
				if(password != password_chk) {
					alert('2차 비밀번호가 일치하지 않습니다.');
					$(event.target).focus();
				}
			}
		});
        
      	*/
       // 저장 버튼 클릭
        $('#btnSave').Button({
            click : function() {
                $('#allcontents').Validate(function() {
	                var request = $('#content').DataSet();
					
					// 휴대폰 번호 체크
					var rgEx = /[01](0|1|6|7|8|9)[-](\d{4}|\d{3})[-]\d{4}$/g;
					var mobileNo = request.fields.MOBILE_NO;
					if(!rgEx.exec(mobileNo)) {
						alert('휴대폰번호가 잘못 입력되었습니다.');
						$('#MOBILE_NO').focus();
						return;
					}
				
					request.fields.OLD_MOBILE_NO = oldMobileNo;
	                $.Service({
	                    transaction : 'mng.MNGUSRB#updateUser',
	                    request : request,
	                    success : function(ds) {
                            window.alert('['+ ds.message.messageId+ '] '+ ds.message.messageName);
                            var request2 = {
               					fields : {
               						USER_ID : $.Page.Data('USER_ID')
               					},
               					recordSets : {
               						USER_ROLE_LIST : {
               							nc_list : []
               						}
               					}
                			};
                			
                			var options = $('#ROLE_SEL').children();		// 저장할 권한들을 입력으로 넣기위함
                			for(var i = 0; i < options.length; i++) {		// 각각의 권한마다 USER_ID를 붙여줌
               					var temp = {value : options[i].value, USER_ID : $.Page.Data('USER_ID')};
               					request2.recordSets.USER_ROLE_LIST.nc_list.push(temp);
               				}
                			
                			// 임직원이고 결제권한이 있는 경우 권한처리
                			if($('#USER_GROUP').Value() === 'UTA' && $('#APPROVAL_AUTH').Value() =='Y'){
  								var temp2 = {
  									value : 'A0002',
  									USER_ID : $('#USER_ID').Value()
  								};
  								request2.recordSets.USER_ROLE_LIST.nc_list.push(temp2);
  							} 	
                            // 권한리스트 
                            $.Service({
               					transaction: 'mng.MNGUSRB#saveUserMapping',
               					request: request2,
               					success: function(ds) {
               						$.Navigate("MNGUSR001.jsp");
               					}
                            });
	                    }
	                });
                });
            }
		});
          
        
      	$('#btnSearch').Button({
            click : function() {
                var value = $('#USER_GROUP').Value();
                $('#ROLE_ID').Value(value);
                $.Page.GetRole();
    			if (value == "UTA") {
    				$('#allcontent').show();
    				$('#saveButton').show();
    				
    				$('#orgDetail').show();
    				$('#orgDetail_1').show();
    				$('#orgDetail_2').show();
    				$('#orgDetail_3').show();
    				$('#orgDetail_4').show();
    				$('#orgDetail_5').show();
    				$('#orgDetail_6').show();
    				$('#orgDetail_7').show();
    				$('#orgDetail_8').show();
    				
    				$('#empId').show();
    				$('#empId_2').show();
    				$('#addInfo').show();
    				$('#addInfo_2').show();
    				$('#customerCode').hide();
    				$('#customerCode_2').hide();
    				$('#pcode').hide();
    				$('#pcode_2').hide();
    				$('#runOrg').hide();
    				$('#runOrg_2').hide();
    				$('#dCode').hide();
    				$('#dCode_2').hide();
    				$('#agentCode').hide();
    				$('#agentCode_2').hide();
    				$('#addInfo2_1').show();
    				$('#addInfo2_2').show();
    				$('#addInfo3_1').show();
    				$('#addInfo3_2').show();
    				$('#addInfo4_1').show();
    				$('#addInfo4_2').show();
    				$('#addtionalInfo').hide();
    				$('#addtionalInfo_2').hide();
    				$('#addtionalInfo_3').show();
    			} else if (value == "UTC") {
    				$('#allcontent').show();
    				$('#saveButton').show();
    				
    				$('#orgDetail').show();
    				$('#orgDetail_1').show();
    				$('#orgDetail_2').show();
    				$('#orgDetail_3').show();
    				$('#orgDetail_4').show();
    				$('#orgDetail_5').show();
    				$('#orgDetail_6').show();
    				$('#orgDetail_7').show();
    				$('#orgDetail_8').show();
    				
    				$('#empId').hide();
    				$('#empId_2').hide();
    				$('#addInfo').hide();
    				$('#addInfo_2').hide();
    				$('#customerCode').show();
    				$('#customerCode_2').show();
    				$('#pcode').hide();
    				$('#pcode_2').hide();
    				$('#runOrg').show();
    				$('#runOrg_2').show();
    				$('#dCode').hide();
    				$('#dCode_2').hide();
    				$('#agentCode').hide();
    				$('#agentCode_2').hide();
    				$('#addInfo2_1').hide();
    				$('#addInfo2_2').hide();
    				$('#addInfo3_1').hide();
    				$('#addInfo3_2').hide();
    				$('#addInfo4_1').hide();
    				$('#addInfo4_2').hide();
    				$('#addtionalInfo').show();
    				$('#addtionalInfo_2').hide();
    				$('#addtionalInfo_3').hide();
    			} else if (value == "UTD") {
    				$('#allcontent').show();
    				$('#saveButton').show();
    				
    				$('#orgDetail').show();
    				$('#orgDetail_1').show();
    				$('#orgDetail_2').show();
    				$('#orgDetail_3').show();
    				$('#orgDetail_4').show();
    				$('#orgDetail_5').show();
    				$('#orgDetail_6').show();
    				$('#orgDetail_7').show();
    				$('#orgDetail_8').show();
    				
    				$('#empId').hide();
    				$('#empId_2').hide();
    				$('#addInfo').hide();
    				$('#addInfo_2').hide();
    				$('#customerCode').hide();
    				$('#customerCode_2').hide();
    				$('#pcode').hide();
    				$('#pcode_2').hide();
    				$('#runOrg').hide();
    				$('#runOrg_2').hide();
    				$('#dCode').show();
    				$('#dCode_2').show();
    				$('#dCode_2').attr('colspan',1);
    				$('#dCode_2').removeClass('nobd');
    				$('#agentCode').show();
    				$('#agentCode_2').show();
    				$('#addInfo2_1').hide();
    				$('#addInfo2_2').hide();
    				$('#addInfo3_1').hide();
    				$('#addInfo3_2').hide();
    				$('#addInfo4_1').hide();
    				$('#addInfo4_2').hide();
    				$('#addtionalInfo').show();
    				$('#addtionalInfo_2').hide();
    				$('#addtionalInfo_3').hide();
    			} else if (value == "UTE") {
    				$('#allcontent').show();
    				$('#saveButton').show();
    				
    				$('#orgDetail').show();
    				$('#orgDetail_1').show();
    				$('#orgDetail_2').show();
    				$('#orgDetail_3').show();
    				$('#orgDetail_4').show();
    				$('#orgDetail_5').show();
    				$('#orgDetail_6').show();
    				$('#orgDetail_7').show();
    				$('#orgDetail_8').show();
    				
    				$('#empId').show();
    				$('#empId_2').show();
    				$('#addInfo').hide();
    				$('#addInfo_2').hide();
    				$('#customerCode').hide();
    				$('#customerCode_2').hide();
    				$('#pcode').hide();
    				$('#pcode_2').hide();
    				$('#runOrg').hide();
    				$('#runOrg_2').hide();
    				$('#dCode').show();
    				$('#dCode_2').show();
    				$('#dCode_2').attr('colspan',2);
    				$('#dCode_2').addClass('nobd');
    				$('#agentCode').hide();
    				$('#agentCode_2').hide();
    				$('#addInfo2_1').hide();
    				$('#addInfo2_2').hide();
    				$('#addInfo3_1').hide();
    				$('#addInfo3_2').hide();
    				$('#addInfo4_1').hide();
    				$('#addInfo4_2').hide();
    				$('#addtionalInfo').show();
    				$('#addtionalInfo_2').hide();
    				$('#addtionalInfo_3').hide();
    			} else if (value == "UTS") {
    				$('#allcontent').show();
    				$('#saveButton').show();
    				
    				$('#orgDetail').show();
    				$('#orgDetail_1').show();
    				$('#orgDetail_2').show();
    				$('#orgDetail_3').show();
    				$('#orgDetail_4').show();
    				$('#orgDetail_5').show();
    				$('#orgDetail_6').show();
    				$('#orgDetail_7').show();
    				$('#orgDetail_8').show();
    				
    				$('#empId').hide();
    				$('#empId_2').hide();
    				$('#addInfo').hide();
    				$('#addInfo_2').hide();
    				$('#customerCode').show();
    				$('#customerCode_2').show();
    				$('#pcode').show();
    				$('#pcode_2').show();
    				$('#runOrg').show();
    				$('#runOrg_2').show();
    				$('#dCode').hide();
    				$('#dCode_2').hide();
    				$('#agentCode').hide();
    				$('#agentCode_2').hide();
    				$('#addInfo2_1').hide();
    				$('#addInfo2_2').hide();
    				$('#addInfo3_1').hide();
    				$('#addInfo3_2').hide();
    				$('#addInfo4_1').hide();
    				$('#addInfo4_2').hide();
    				$('#addtionalInfo').hide();
    				$('#addtionalInfo_2').show();
    				$('#addtionalInfo_3').hide();
    			} else if (value == "UTV") {
    				$('#allcontent').show();
    				$('#saveButton').show();
    				
    				$('#orgDetail').show();
    				$('#orgDetail_1').show();
    				$('#orgDetail_2').show();
    				$('#orgDetail_3').show();
    				$('#orgDetail_4').show();
    				$('#orgDetail_5').show();
    				$('#orgDetail_6').show();
    				$('#orgDetail_7').show();
    				$('#orgDetail_8').show();
    				
    				$('#empId').hide();
    				$('#empId_2').hide();
    				$('#addInfo').hide();
    				$('#addInfo_2').hide();
    				$('#customerCode').hide();
    				$('#customerCode_2').hide();
    				$('#pcode').hide();
    				$('#pcode_2').hide();
    				$('#runOrg').hide();
    				$('#runOrg_2').hide();
    				$('#dCode').hide();
    				$('#dCode_2').hide();
    				$('#agentCode').hide();
    				$('#agentCode_2').hide();
    				$('#addInfo2_1').hide();
    				$('#addInfo2_2').hide();
    				$('#addInfo3_1').hide();
    				$('#addInfo3_2').hide();
    				$('#addInfo4_1').hide();
    				$('#addInfo4_2').hide();
    				$('#addtionalInfo').hide();
    				$('#addtionalInfo_2').hide();
    				$('#addtionalInfo_3').hide();
    			} else 
    				{
    				$('#orgDetail').show();
    				$('#orgDetail_1').show();
    				$('#orgDetail_2').show();
    				$('#orgDetail_3').show();
    				$('#orgDetail_4').show();
    				$('#orgDetail_5').show();
    				$('#orgDetail_6').show();
    				$('#orgDetail_7').show();
    				$('#orgDetail_8').show();
    				
    				$('#empId').hide();
    				$('#empId_2').hide();
    				$('#addInfo').hide();
    				$('#addInfo_2').hide();
    				$('#customerCode').hide();
    				$('#customerCode_2').hide();
    				$('#pcode').hide();
    				$('#pcode_2').hide();
    				$('#runOrg').hide();
    				$('#runOrg_2').hide();
    				$('#dCode').hide();
    				$('#dCode_2').hide();
    				$('#agentCode').hide();
    				$('#agentCode_2').hide();
    				$('#addInfo2_1').hide();
    				$('#addInfo2_2').hide();
    				$('#addInfo3_1').hide();
    				$('#addInfo3_2').hide();
    				$('#addInfo4_1').hide();
    				$('#addInfo4_2').hide();
    				$('#addtionalInfo').hide();
    				$('#addtionalInfo_2').hide();
    				$('#addtionalInfo_3').hide();
    				}
    		}
    	});
        
        $("#TEL_NO").keydown(function(event) {
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
	 
	 	$("#MOBILE_NO").keydown(function(event) {
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
	 
	 	$("#FAX_NO").keydown(function(event) {
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

	 	//ID 중복기능 : 입력한 사용자 ID가 이미 등록이 된 ID인지 비교
        $('#btnApprove').Button(
            {
                click : function() {
                    var request = $('#accountDetail').DataSet();
                    request.fields.USER_ID = $('#USER_ID').val();
                    $.Service({
                        transaction : 'mng.MNGUSRB#selectDuplicationCheck',
                        request : request,
                        success : function(ds) {
                            window.alert('['+ ds.message.messageId+ '] '+ ds.message.messageName);
                        }
                    });

                }

            });
        
    	 // + 버튼 클릭 
		$('#insertData').Button({
					click : function() {
						var seloptions = $('#ROLE_ALL').children(':selected');
							for (var j = 0; j < seloptions.length; j++) {
								var label = seloptions[j].innerText;
								var value = seloptions[j].value;	
								 $("#ROLE_SEL").append("<option value='" + value + "'>" + label + "</option>");
								 $('#ROLE_ALL').children(':selected').remove();
						}
					}
		});
		
		// - 버튼 클릭 
		$('#deleteData').Button({
			click: function() {
				// 현재 선택된 Label 
				var label = $('#ROLE_SEL').Label();
				// 현재 선택된 Value 
				var value = $('#ROLE_SEL').Value();
				
				$('#ROLE_SEL').children(':selected').remove();
				// 오른쪽에서 제거시 왼쪽에 값은 서버에서 가져와서 다시 갱신한다.
				$.Page.GetRole();
			}
		});
        
        $('#ROLE_ID').Select({
			change: function() {
				if($('#ROLE_ID').Value() == '0') {
					return;
				} else {
					$.Page.GetRole();
				}
			}
		});	
		
      //사진 찾아보기 버튼 클릭(2013.02.27 by PSI )=========시작
		$('#j_file').bind('change', function(e, d) {
			if (!$('#j_file').val()) {
				return;
			}
			$('#MNGUSR001P05_uploadFile').Validate(function() {
				/* var request = {
						fields : {
							type_id : 'IMG'
						}
					} */
				$('#MNGUSR001P05_uploadFile').Service();
			});
		});
		
		$('#MNGUSR001P05_uploadFile').File({
			success: function(data) {
				console.log(data);
				//img 태그에 해당 파일 다운로드 url 적용
				$('#imgGdsMid').attr("src", "../common/downloadIdPicture.jsp?typeId=IMG&fileName=" + data[0].file_name + "&filePath=" + data[0].file_path+"&fileId="+data[0].file_id);
				$('#imgGdsMid').css("display", "block");
				
				$('#FILE_ID').val(data[0].file_id);
				$('#FILE_PATH').val(data[0].file_path);
				$('#FILE_NAME').val(data[0].file_name);
				$('#FILE_SIZE').val(data[0].file_size);
				$('#PROGRAM_ID').val(data[0].program_id);
				//alert( "file Id : " + $('#file_id').val());
				//console.log($('#imgGdsMid'));
			},
			validation: {
				j_file: {
					required: true
				}
			}
		});
		//사진 찾아보기 버튼 클릭(2013.02.27 by PSI )=========끝
		
		//패스워드 변경 버튼 클릭시
		$('#CHG_PASSWORD').Button({
			click: function() {
				$.Popup({					
					width : 600,
					height : 410,
					url: 'MNGUSR001P06.jsp',
					center: true,
					close: function(data) {
						if(!data) {
							// TODO:
							return;
						}
					}
				});
			}
		});
		
		//2차 패스워드 변경 버튼 클릭시
		$('#CHG_PASSWORD2').Button({
			click: function() {
				
			if($('#USER_GROUP').Value()==='UTA'){				
				$.Popup({					
					width : 600,
					height : 410,
					url: 'MNGUSR001P07.jsp',
					center: true,
					close: function(data) {
						if(!data) {
							// TODO:
							return;
						}
					}
				});
			} else{
				$.Popup({					
					width : 600,
					height : 410,
					url: 'MNGUSR001P08.jsp',
					data : {
						USER_ID : $('#USER_ID').Value()
					},
					center: true,
					close: function(data) {
						if(!data) {
							// TODO:
							return;
						}
					}
				});
			}
			}
		});
		
		//우편번호 찾기버튼
		$('#btnZipCD').Button({
			click: function() {
				$.Popup({					
					width : 550,
					height : 500,
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
		
		//지사/팀 찾기버튼
		$('#btnTeamCD').Button({
			click: function() {
				$.Popup({					
					width : 600,
					height : 410,
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
		
		//지사/팀 포커스아웃
		$('#TEAM_CD').focusout(function(){
			if($('#TEAM_CD').Value() == '') return;
			var request = {
					fields : {
						TEAM_CD : $('#TEAM_CD').Value()
					},
					recordSets : {}
			}
			$.Service({
				transaction : 'mng.MNGUSRB#selectOrgCode',
				request : request,
				success : function(ds) {
					if(ds.recordSets.ORG_LIST.nc_recordCount == 1) {
						$('#ORG_01').Value(ds.recordSets.ORG_LIST.nc_list[0].HDQT_NM);
						$('#ORG_02').Value(ds.recordSets.ORG_LIST.nc_list[0].SECTN_NM);
						$('#ORG_03').Value(ds.recordSets.ORG_LIST.nc_list[0].HDQT_TEAM_CD);
						$('#TEAM_CD').Value(ds.recordSets.ORG_LIST.nc_list[0].BRNOFC_TEAM_CD);
						$('#TEAM_NM').Value(ds.recordSets.ORG_LIST.nc_list[0].BRNOFC_TEAM_NM);
					} else {
						$('#ORG_01').Value('');
						$('#ORG_02').Value('');
						$('#ORG_03').Value('');
						$('#TEAM_CD').Value('');
						$('#TEAM_NM').Value('');
						$.Popup({					
							width : 600,
							height : 410,
							url: 'MNGUSR001P12.jsp',
							center: true,
							data : {
								'TEAM_CD' : request.fields.TEAM_CD
							},
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
				}
			});
		});
		
		//거래처 찾기버튼
		$('#btnLocCD').Button({
			click: function() {
				$.Popup({					
					width : 600,
					height : 410,
					url: 'MNGUSR001P11.jsp',
					center: true,
					close: function(data) {
						if(!data) {
							// TODO:
							return;
						}
						$('#LOC_CD').Value(data.LOCATION_ID);
						$('#LOC_NM').Value(data.LOCATION_NM);
					}
				});
			}
		});
		
		// 거래처 포커스아웃
		$('#LOC_CD').focusout(function(){
			if($('#LOC_CD').Value() == '') return;
			var request = {
					fields : {
						LOC_CD : $('#LOC_CD').Value()
					},
					recordSets : {}
			}
			$.Service({
				transaction : 'mng.MNGUSRB#selectTlocCode',
				request : request,
				success : function(ds) {
					if(ds.recordSets.LOC_LIST.nc_recordCount == 1) {
						$('#LOC_CD').Value(ds.recordSets.LOC_LIST.nc_list[0].LOCATION_ID);
						$('#LOC_NM').Value(ds.recordSets.LOC_LIST.nc_list[0].LOCATION_NM);
					} else {
						$('#LOC_CD').Value('');
						$('#LOC_NM').Value('');
						$.Popup({					
							width : 600,
							height : 410,
							url: 'MNGUSR001P11.jsp',
							center: true,
							data : {
								'LOC_CD' : request.fields.LOC_CD
							},
							close: function(data) {
								if(!data) {
									// TODO:
									return;
								}
								$('#LOC_CD').Value(data.LOCATION_ID);
								$('#LOC_NM').Value(data.LOCATION_NM);
							}
						});
					}
				}
			});
		});
		
		//대리점 찾기버튼
		$('#btnLocCD1').Button({
			click: function() {
				$.Popup({					
					width : 600,
					height : 410,
					url: 'MNGUSR001P11.jsp',
					center: true,
					close: function(data) {
						if(!data) {
							// TODO:
							return;
						}
						$('#LOC_CD1').Value(data.LOCATION_ID);
						$('#LOC_NM1').Value(data.LOCATION_NM);
					}
				});
			}
		});
		
		// 대리점 포커스아웃
		$('#LOC_CD1').focusout(function(){
			if($('#LOC_CD1').Value() == '') return;
			var request = {
					fields : {
						LOC_CD : $('#LOC_CD1').Value()
					},
					recordSets : {}
			}
			$.Service({
				transaction : 'mng.MNGUSRB#selectTlocCode',
				request : request,
				success : function(ds) {
					if(ds.recordSets.LOC_LIST.nc_recordCount == 1) {
						$('#LOC_CD1').Value(ds.recordSets.LOC_LIST.nc_list[0].LOCATION_ID);
						$('#LOC_NM1').Value(ds.recordSets.LOC_LIST.nc_list[0].LOCATION_NM);
					} else {
						$('#LOC_CD1').Value('');
						$('#LOC_NM1').Value('');
						$.Popup({					
							width : 600,
							height : 410,
							url: 'MNGUSR001P11.jsp',
							center: true,
							data : {
								'LOC_CD' : request.fields.LOC_CD
							},
							close: function(data) {
								if(!data) {
									// TODO:
									return;
								}
								$('#LOC_CD1').Value(data.LOCATION_ID);
								$('#LOC_NM1').Value(data.LOCATION_NM);
							}
						});
					}
				}
			});
		});
		
		//에이전트 찾기버튼
		$('#btnLocCD2').Button({
			click: function() {
				$.Popup({					
					width : 600,
					height : 410,
					url: 'MNGUSR001P11.jsp',
					center: true,
					close: function(data) {
						if(!data) {
							// TODO:
							return;
						}
						$('#LOC_CD2').Value(data.LOCATION_ID);
						$('#LOC_NM2').Value(data.LOCATION_NM);
					}
				});
			}
		});
		
		// 에이전트 포커스아웃
		$('#LOC_CD2').focusout(function(){
			if($('#LOC_CD2').Value() == '') return;
			var request = {
					fields : {
						LOC_CD : $('#LOC_CD2').Value()
					},
					recordSets : {}
			}
			$.Service({
				transaction : 'mng.MNGUSRB#selectTlocCode',
				request : request,
				success : function(ds) {
					if(ds.recordSets.LOC_LIST.nc_recordCount == 1) {
						$('#LOC_CD2').Value(ds.recordSets.LOC_LIST.nc_list[0].LOCATION_ID);
						$('#LOC_NM2').Value(ds.recordSets.LOC_LIST.nc_list[0].LOCATION_NM);
					} else {
						$('#LOC_CD2').Value('');
						$('#LOC_NM2').Value('');
						$.Popup({					
							width : 600,
							height : 410,
							url: 'MNGUSR001P11.jsp',
							center: true,
							data : {
								'LOC_CD' : request.fields.LOC_CD
							},
							close: function(data) {
								if(!data) {
									// TODO:
									return;
								}
								$('#LOC_CD2').Value(data.LOCATION_ID);
								$('#LOC_NM2').Value(data.LOCATION_NM);
							}
						});
					}
				}
			});
		});
		
    });
</script>
</head>
<body>
	<div style="position: absolute; width: 0; height: 0; cursor: ">
	<form name='MNGUSR001P05_uploadFile' id='MNGUSR001P05_uploadFile'
		method="post" enctype="multipart/form-data">
		<input type="file" id="j_file" name="j_file"
			style="display: block; visibility: hidden; width: 0; height: 0;">
		<input type="hidden" id="program_id" name="program_id" value="MNGUSR">
		<input type="hidden" id="type_id" name="type_id" value="IMG">
	</form>
	</div>
	<div
		style="background-color: white; width: 300px; height: 50px; position: absolute;">
	</div>
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
					<h1>내정보 변경</h1>
				</div>
				<div class="searchArea">
					<form id="MNGUSR001P05_goSearch">
						<table class="tb_search">
							<colgroup>
								<col width="100" />
								<col width="160" />
								<col width="100" />
								<col width="160" />
								<col width="100" />
								<col width="160" />
								<col width="0" />
							</colgroup>
							<tr>
								<th><label for="USER_GROUP">사용자그룹</label></th>
								<td><div id="d_USER_GROUP"><select id="USER_GROUP" class="selectbox05"></select></div>
								</td>
								<th><label for="USER_CATEGORY_01">사용자분류1</label></th>
								<td><div id="d_USER_CATEGORY_01"><select id="USER_CATEGORY_01" class="selectbox05"></select></div>
								</td>
								<th><label for="USER_CATEGORY_02">사용자분류2</label></th>
								<td><div id="d_USER_CATEGORY_02"><select id="USER_CATEGORY_02" class="selectbox05"></select></div>
								</td>
								<td class="searchBtn">
									<button id="btnSearch" class="btnSearch">
										<span class="button-text">Search</span>
									</button>
								</td>
							</tr>
						</table>
					</form>
				</div>
				<div class="btn_common" id="saveButton">
					<span class="button iconBtn">
						<button id="btnSave">
							<span class="button-icon ui-icon-func-save"></span> <span
								class="button-text"> 저장</span>
						</button> </span>
				</div>
				<div id="allcontent" class="tb_data" style="display: none;">
					<form id="allcontents">
						<table>
							<colgroup>
							<col width="45" />
							<col width="100" />
							<col width="236" />
							<col width="120" />
							<col width="200" />
							<col width="130" />
							</colgroup>
							<tr>
								<th rowspan="3">계정<br/>정보</th>
								<th><label class="required">사용자ID</label></th>
								<td>
									<input id="USER_ID" type="text" class="input01" readonly="readonly" />
									<span class="button gridBtn">
										<button id="btnApprove" style="display: none;">
											<span class="button-icon ui-icon-func-approve"></span> <span
												class="button-text"> 중복확인</span>
										</button> </span>
								</td>
								<th><label class="required">사용자명</label></th>
								<td><input id="USER_NAME" type="text" maxlength="10" class="input01" /></td>
								<td rowspan="4" class="nobd">
									<input type="hidden" id="FILE_ID" /> <input type="hidden" id="FILE_PATH" />
									<input type="hidden" id="FILE_NAME" /> <input type="hidden" id="FILE_SIZE" />
									<input type="hidden" id="PROGRAM_ID" />
									<div class="potoId">
										<img id="imgGdsMid" src="" />
									</div>
									<div class="facilities_buttons">
										<label for="j_file"> <!-- 버튼클릭이벤트로 하면 IE에서 동작하지 않으므로 label로 연결  -->		
										<span class="button gridBtn">
											<button id="btnSearch1">
												<span class="button-icon ui-icon-search-search"></span><span
													class="button-text"> 찾아보기</span>
											</button> </span></label>
									</div>
								</td>
							</tr>
							<tr>
								<th><label class="required">비밀번호</label></th>
								<td>
									<span class="button gridBtn">
										<button id="CHG_PASSWORD">
											<span class="button-icon ui-icon-func-Todo"></span><span
												class="button-text">변경하기</span>
										</button>
									</span>
								</td>
								<th><label class="required">2차 비밀번호</label></th>
								<td>
									<span class="button gridBtn">
										<button id="CHG_PASSWORD2">
											<span class="button-icon ui-icon-func-Todo"></span><span
												class="button-text">변경하기</span>
										</button>
									</span>
								</td>
							</tr>
							<tr>
								
								<th><label class="required">사용여부</label></th>
								<td  colspan="3"><select id="USE_FLAG" class="selectFL">
										<option value="Y">Y</option>
										<option value="N">N</option>
								</select>
								</td>
							</tr>
							<tr>
								<th id="orgDetail" rowspan="2">조직<br/>정보</th>
								<th id="orgDetail_1">부문</th>
								<td id="orgDetail_2">
									<input id="ORG_01" type="text" class="input01" readonly="readonly" />
								</td>
								<th id="orgDetail_3">본부</th>
								<td id="orgDetail_4"><input id="ORG_02" type="text" class="input01"  readonly=readonly" />
								</td>
							</tr>
							<tr id="orgDetail">
								<th id="orgDetail_5">본부/팀</th>
								<td id="orgDetail_6">
									<input id="ORG_03" type="text" class="input01" readonly="readonly"/>
								</td>
								<th id="orgDetail_7"><label class="required">지사/팀</label></th>
								<td colspan="2" id="orgDetail_8" class="nobd">
									<input id="TEAM_CD" type="text" class="input01 code01" /> <input id="TEAM_NM" type="text" class="input01 code02" readonly="readonly" />
									<span class="button gridBtn">
											<button id="btnTeamCD">
												<span class="button-icon ui-icon-search-search"></span> <span
													class="button-text"> 찾기</span>
											</button> </span>
								</td>
							</tr>
							<tr>
								<th rowspan="5">인적<br/>사항</th>
								<th>전화번호</th>
								<td><input id="TEL_NO" type="text" maxlength="13" class="input01" />
								</td>
								<th><label class="required">휴대폰번호</label></th>
								<td colspan="2" class="nobd">
									<input id="MOBILE_NO" type="text" maxlength="13" class="input01" />
								</td>
							</tr>
							<tr>
								<th>팩스번호</th>
								<td><input id="FAX_NO" type="text" maxlength="13" class="input01" />
								</td>
								<th>이메일</th>
								<td colspan="2" class="nobd">
								<input id="EMAIL" type="text" maxlength="25" class="input01" />
								</td>
							</tr>
							<tr>
								<th>우편번호</th>
								<td colspan="4" class="nobd">
									<input id="ZIP_CODE" type="text" class="input01" readonly="readonly" /> <span class="button gridBtn">
										<button id="btnZipCD">
											<span class="button-icon ui-icon-search-search"></span> <span
												class="button-text"> 찾기</span>
										</button> </span>
								</td>
							</tr>
							<tr>
								<th>주소</th>
								<td colspan="4" class="nobd">
									<input id="ADDR" type="text" class="input01 addr" readonly />
								</td>
							</tr>
							<tr>
								<th>주소상세</th>
								<td colspan="4" class="nobd">
									<input id="ADDR_DETAIL" type="text" class="input01 addr_etc" />
								</td>
							</tr>
							<tr>
								<th id="addtionalInfo">추가<br/>정보</th>
								<th id="addtionalInfo_2" rowspan="2">추가<br/>정보</th>
								<th id="addtionalInfo_3" rowspan="3">추가<br/>정보</th>
								<th id="empId">사번</th>
								<td id="empId_2"><input id="EMP_ID" type="text" class="input01" readonly/></td>
								<th id="addInfo">직위</th>
								<td id="addInfo_2" colspan="2" class="nobd">
									<select id="EMP_POS1" disabled>
											<option value="Y">==선택==</option>
									</select>
								</td>
								<th id="customerCode">거래처코드</th>
								<td id="customerCode_2">
									<input id="LOC_CD" type="text" class="input01 code01" />
									<input id="LOC_NM" type="text" class="input01 code01" readonly />
									<span class="button gridBtn">
										<button id="btnLocCD">
											<span class="button-icon ui-icon-search-search"></span> <span
												class="button-text"> 찾기</span>
										</button> </span>
								</td>
								<th id="runOrg">배차조직</th>
								<td id="runOrg_2" colspan="2" class="nobd">
									<select id="CAR_ASSIGN_ORG" disabled></select>
								</td>
								<th id="dCode"><label class="required">대리점코드</label></th>
								<td id="dCode_2" colspan="2" class="nobd">
									<input id="LOC_CD1" type="text" class="input01 code01" readonly/>
									<input id="LOC_NM1" type="text" class="input01 code01" readonly/>
									<span class="button gridBtn">
											<button id="btnLocCD1">
												<span class="button-icon ui-icon-search-search"></span> <span
													class="button-text"> 찾기</span>
											</button> </span>
								</td>
								<th id="agentCode">에이전트 코드</th>
								<td id="agentCode_2" colspan="2" class="nobd">
									<input id="LOC_CD2" type="text" class="input01 code01" readonly/>
									<input id="LOC_NM2" class="input01 code01" type="text" readonly />
									<span class="button gridBtn">
											<button id="btnLocCD2">
												<span class="button-icon ui-icon-search-search"></span> <span
													class="button-text"> 찾기</span>
											</button> </span>
								</td>
							</tr>
							<tr>
								<th id="addInfo2_1">직책</th>
								<td id="addInfo2_2"><input id="EMP_POS2" type="text" class="input01" readonly/>
								</td>
								<th id="addInfo3_1">직무</th>
								<td id="addInfo3_2" colspan="2" class="nobd">
									<input id="EMP_POS3" type="text" class="input01" readonly/>
								</td>
							</tr>
							<tr>
								<th id="addInfo4_1">결제권한</th>
								<td id="addInfo4_2" colspan="4" class="nobd">
								<select id="APPROVAL_AUTH">
										<option value="Y">Y</option>
										<option value="N">N</option>
								</select></td>
							</tr>
							<tr>
								<th rowspan="5">권한<br/>부여</th>
								<td colspan="5" class="nobd"><select id="ROLE_ID"></select></td>
							</tr>
							<tr>
								<td colspan="3" class="nobd">
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
								<td colspan="2" class="nobd">
								</td>
							</tr>
						</table>
					</form>
				</div>
			</div>
		</div>
		<!-- //footerArea -->
		<%@include file="../../common/Footer.jsp"%>
		<!-- //footerArea -->
	</div>
</body>
<%
}
%>
</html>




