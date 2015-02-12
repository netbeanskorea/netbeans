(function(window, $,hostIp) {

	var star = $.star || window.star;
	
	// Projects Namespace 생성
	var AMS = window.AMS = {};
	
	// Mobile 기기 접속 여부 체크
	window.isMobile = $.mobile ? true : false;
	
	var prefix = hostIp; // TODO bizcommon.jsp 에 있는 거랑 맞춰야 함. (자동화 시킬것)
	
	//window.contextPath = '';
	
	/*if (runtimeMode == 'R' || runtimeMode == 'D' ) {
		 contextPath = '';
		//alert(runtimeMode);
	} else { 
		 contextPath = '/ams';
		//alert(runtimeMode);
	}*/
	window.contextPath = '/ams';
	
	// Service Initialize Start
	// Sample Service 여부 설정
	star.service.sample = false;
	if (star.service.sample === true) {
		// Sample Service 함수 import 
		document.write('<script src="'+prefix+'/_sample/_.js"></script>');
	}
	
	// Service 기본 정보 설정
	star.service.platform = 'j2ee';
	star.service.block = false;
	star.service.service_url = contextPath + '/json.jmd';
	star.service.login_url = contextPath + '/login.jmd';
	star.service.logout_url = contextPath + '/logout.jmd';
	star.service.content_url = contextPath + '/standard.cmd';
	star.service.monitoring_url = contextPath + '/json.mot';
	
	$.FindPassword = function(setting) {
		var t = star.service.service_url;
		star.service.service_url =  contextPath + '/findPassword.jmd';
		$.Service(setting);
		star.service.service_url = t;
	};
	
	$.AcraMonitoring = function(setting){
		var t = star.service.service_url;
		star.service.service_url =  contextPath + '/acraMonitoring.jmd';
		$.Service(setting);
		star.service.service_url = t;
	}

	// 거래 실패 ( 서버에서 로직상 실패 ) 시 핸들러 정의 ( 개발코드에서 오버라이드 가능 )  
	star.service.fail = function(ds) {
		window.alert('FAIL: [' +ds.message.messageId+'] ' + ds.message.messageName);
	}
	
	// 에러 핸들러 정의 ( 개발코드에서 오버라이드 가능 )
	star.service.error = function(ds, xhr, status, error) {
		window.alert('error');
		console.log('Service Error');
		console.log('ds : ' , ds);
		console.log('xhr : ' , xhr);
		console.log('status : ' , status);
		console.log('error : ' , error);
	};
	
	// 거래 시간 측정
	var startTime = null;
	var endTime = null;
	// 거래 시간 측정
	
	// Service 호출 전 핸들러
	star.service.pre_process = function(setting) {
		console.log(setting.request);
		setting.request.fields = setting.request.fields||{};
		setting.request.fields.__CURR_MENU_ID__ = $.cookie('current_menu_id_ams');
		setting.request.fields.__USER_AGENT__ = navigator.userAgent;
		
		// 거래 시간 측정
		var time = new Date();
		startTime = time.getTime();
		// 거래 시간 측정
		
		//USER AGENT 서버 전송
		setting.request.fields = setting.request.fields||{};
		setting.request.fields.__USER_AGENT__ = navigator.userAgent;
	};
	// Service 호출 후 핸들러
	star.service.post_process = function(setting) {
	};
	// Service 결과 Response 후 최초 호출 핸들러 ( success, fail )
	star.service.call_pre_process = function(response, status, xhr) {
		// 거래 시간 측정
		var time = new Date();
		endTime = time.getTime();
		console.log('거래 시간 : ' + (endTime - startTime) + ' milliseconds');
		
		AmsSessionLoading(response);
		
		// 거래 시간 측정
	};
	// Service 결과 Response 후 최후 호출 핸들러  ( success, fail ) 
	star.service.call_post_process = function(response, status, xhr) {
		console.log(response);
	};
	// Service 결과 Response 후 최초 호출 핸들러 ( error )
	star.service.call_error_pre_process = function(xhr, status, error) {
	};
	// Service 결과 Response 후 최후 호출 핸들러 ( error )
	star.service.call_error_post_process = function(xhr, status, error) {
	};
	// [주의] 위 핸들러들은 Service가 ajax 방식이기 때문에 pre -> call_pre -> call_post -> post 를 보장 할 수 없다.
	// Service Initialize End

	// Placeholder Initialize Start
	star.ui.IPlaceholder.use = true;
	star.ui.IPlaceholder.init = true;
	// Placeholder Initialize End
	
	// Grid Initialize Start
	star.ui.Grid.click_delay = 100;
	// Grid Initialize End
	
	// Pager Initialize Start
	star.ui.Pager.item_normal = '<a href="javascript:;" style="text-align:center;" class="pg_normal"><span class="pg_txt">{{page}}</span></a>';
	star.ui.Pager.item_current = '<span class="pg_current"><span class="pg_txt">{{page}}</span></span>';
	star.ui.Pager.block_prev_enabled = star.ui.Pager.block_prev_disabled = '<a style="display: none;"></a>';
	star.ui.Pager.block_next_enabled = star.ui.Pager.block_next_disabled = '<a style="display: none;"></a>';
	star.ui.Pager.total_prev_enabled = star.ui.Pager.total_prev_disabled = '<a href="javascript:;" class="paging_box pg_first"><img src="'+prefix+'/images/common/pager_first.png" alt="" title="맨 앞으로 이동"/></a>';
	star.ui.Pager.total_next_enabled = star.ui.Pager.total_next_disabled = '<a href="javascript:;" class="paging_box pg_last"><img src="'+prefix+'/images/common/pager_last.png" alt="" title="맨 뒤로 이동" /></a>';
	star.ui.Pager.page_prev_enabled = star.ui.Pager.page_prev_disabled = '<a href="javascript:;" class="paging_box pg_pre"><img src="'+prefix+'/images/common/pager_pre.png" alt="" title="이전 페이지로 이동" /></a>';
	star.ui.Pager.page_next_enabled = star.ui.Pager.page_next_disabled = '<a href="javascript:;" class="paging_box pg_next"><img src="'+prefix+'/images/common/pager_next.png" alt="" title="다음 페이지로 이동" /></a>';
	star.ui.Pager.space = ' ';
	star.ui.Pager.pageInfo = true;
	star.ui.Pager.page_size = 20;
	// Page Initialize End
	
	// Date / Month Initialize Start
	star.ui.Date.image = prefix+'/lib/ext/jquery.ui.monthpicker/images/calendar.png';
	star.ui.Month.image_url = prefix+'/lib/ext/jquery.ui.monthpicker/images/calendar.png';
	star.ui.Date.yearRange = '2003:c+2';
	// Date / Month Initialize End

	// File Initialize Start
	star.ui.File.url = contextPath + '/json.file';
	// File Initialize End
	
	// Utils Start
	/**
	 * 운영 모드에서 오른쪽마우스, 개발자 도구 금지
	 */
	var mode = true;
	if (mode === true) {
		document.oncontextmenu = function(){
			return false
		};
		/*document.onselectstart = function(){
			return false
		};*/
		document.onkeydown=function(e){
			// IE8을 위한 조건문.
			if(e == null)
				e = window.event;
			
			// IE를 위한 조건문.
			var target;
			if(e.target == null)
				target = e.srcElement;
			else
				target = e.target;
			// F12 개발자 도구
			/*if(e.keyCode === 123){
				return false;
			}*/
			if(e.keyCode == 8) {
				var targetNode = target.nodeName;
				var readonly = target.readOnly;
				var disabled = target.disabled;
				var type = target.type;
				if(!(((targetNode=="INPUT"&&(type=="text"||type=="password"))||targetNode=="TEXTAREA")&&(!readonly&&!disabled))) {
					alert('허용하지 않는 기능입니다.');
					
					if(e.preventDefault)
						// FF
						e.preventDefault();
					else
						//IE
					    e.returnValue = false;
				}
			}
		};
	}
	
	/**
	 * Number Check 
	 */
	function isNum(value) {
		return (!isNaN(parseFloat(value)) && isFinite(value));
	};
	
	// CrptoJS가 리턴값 처리를 어떻게 해야 할지 잘 모르겠어서 BASE64만 따로 구현
	var keyString = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

	var uTF8Encode = function(string) {
		string = string.replace(/\x0d\x0a/g, "\x0a");
		var output = "";
		for (var n = 0; n < string.length; n++) {
			var c = string.charCodeAt(n);
			if (c < 128) {
				output += String.fromCharCode(c);
			} else if ((c > 127) && (c < 2048)) {
				output += String.fromCharCode((c >> 6) | 192);
				output += String.fromCharCode((c & 63) | 128);
			} else {
				output += String.fromCharCode((c >> 12) | 224);
				output += String.fromCharCode(((c >> 6) & 63) | 128);
				output += String.fromCharCode((c & 63) | 128);
			}
		}
		return output;
	};
	
	var uTF8Decode = function(input) {
		var string = "";
		var i = 0;
		var c = c1 = c2 = 0;
		while ( i < input.length ) {
			c = input.charCodeAt(i);
			if (c < 128) {
				string += String.fromCharCode(c);
				i++;
			} else if ((c > 191) && (c < 224)) {
				c2 = input.charCodeAt(i+1);
				string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
				i += 2;
			} else {
				c2 = input.charCodeAt(i+1);
				c3 = input.charCodeAt(i+2);
				string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
				i += 3;
			}
		}
		return string;
	};
	
	$.base64Encode = function(input) {
		var output = "";
		var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
		var i = 0;
		input = uTF8Encode(input);
		while (i < input.length) {
			chr1 = input.charCodeAt(i++);
			chr2 = input.charCodeAt(i++);
			chr3 = input.charCodeAt(i++);
			enc1 = chr1 >> 2;
			enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
			enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
			enc4 = chr3 & 63;
			if (isNaN(chr2)) {
				enc3 = enc4 = 64;
			} else if (isNaN(chr3)) {
				enc4 = 64;
			}
			output = output + keyString.charAt(enc1) + keyString.charAt(enc2) + keyString.charAt(enc3) + keyString.charAt(enc4);
		}
		return output;
	};
	$.base64Decode = function(input) {
		var output = "";
		var chr1, chr2, chr3;
		var enc1, enc2, enc3, enc4;
		var i = 0;
		input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
		while (i < input.length) {
			enc1 = keyString.indexOf(input.charAt(i++));
			enc2 = keyString.indexOf(input.charAt(i++));
			enc3 = keyString.indexOf(input.charAt(i++));
			enc4 = keyString.indexOf(input.charAt(i++));
			chr1 = (enc1 << 2) | (enc2 >> 4);
			chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
			chr3 = ((enc3 & 3) << 6) | enc4;
			output = output + String.fromCharCode(chr1);
			if (enc3 != 64) {
				output = output + String.fromCharCode(chr2);
			}
			if (enc4 != 64) {
				output = output + String.fromCharCode(chr3);
			}
		}
		output = uTF8Decode(output);
		return output;
	};
	
	/**
	 * Navigate 할때 GET으로 값 노출 안시키고자 할때 사용
	 */
	var paramValue = null;
	$.PostData = function() {
		if(!paramValue) {
			paramValue = $.Session('STAR_POST_PARAM');
			$.Session('STAR_POST_PARAM', null);
		}
		return paramValue;
	};
	$.PostData();
	
	$.NavigatePost = function(url, param) {
		$.Session('STAR_POST_PARAM', param);
		
		window.location.href = url;
	};
	
	// Utils End
	
	// Project Extend Start
	/**
	 * Form 안 값들 name을 id로 변경
	 * - 서버로 값을 전달할때 name으로 전달한다.
	 */
	$(function() {
		$('form input, form select, form textarea, form radio').each(function() {
			var self = $(this);

			self.attr('name', self.attr('id'));
		});
	});
	// Project Extend Start
	
	// Excel Utils Start
	var excelImportUrl = contextPath + '/common/excel-import.jsp';
	star.define('ExcelImportForm', function(options) {
		if (!this.is('form')) {
			return star.callSuper(this, arguments);
		}

		options = $.extend(options, {url: excelImportUrl});
		
		this.File(options);
		
		return this;
	});
	
	star.define('ExcelExportForm', function(options) {
		if (!this.is('form')) {
			return star.callSuper(this, arguments);
		}
		
		this.addClass('star-excel-form');
		this.attr('action', star.service.content_url);
		this.attr('name', this.attr('id'));
		this.attr('method', 'post');
		
		return this;
	});
	
	star.define('ExcelExport', function() {
		if( !this.hasClass('star-excel-form')) {
			return star.callSuper(this, arguments);
		}
		
		this.submit();
	});
	// Excel Utils End
	
	// Grid Project Extend Start
	// Grid Validation
	star.ui.Grid.gridvalidation = {
			msg: {
				required: '반드시 입력해야 합니다.',
				email: '이메일 주소를 올바로 입력하세요.',
				url: 'URL을 올바로 입력하세요.',
				date: '날짜가 잘못 입력됐습니다.',
				dateISO: 'ISO 형식에 맞는 날짜로 입력하세요.',
				number: '숫자만 입력하세요.',
				digits: '숫자(digits)만 입력하세요.',
				maxlength: $.validator.format('{0}글자 이상은 입력할 수 없습니다.'),
				minlength: $.validator.format('적어도 {0}글자는 입력해야 합니다.'),
				rangelength: $.validator.format('{0}글자 이상 {1}글자 이하로 입력해 주세요.'),
				range: $.validator.format('{0}에서 {1} 사이의 값을 입력하세요.'),
				max: $.validator.format('{0} 이하로 입력해 주세요.'),
				min: $.validator.format('{0} 이상으로 입력해 주세요.')
			},
			showError: function (msg, $obj) {
				alert(msg);
				$obj.focus();
			}
		};
	
	/**
	 * grid 안 Input box, textarea가 있을시 아래 function을 focusout으로 잡으면 된다.
	 */
	function gridValidation(event) {
		var validInfo = event.data[0];
		var grid = $('#' + event.data[1]);
		var value = $(this).val();
		var lastValue = $(this).data('lastvalue');
		
		if(lastValue==value && event.data[2]===undefined) {
			return ;
		}
		$(this).data('lastvalue', value);
		
		grid.attr('vaild-check', 'true');
		for(var valid in validInfo) {
			switch(valid) {
			case 'required':
				if(validInfo.required) {
					if(value.length===0) {
						grid.attr('vaild-check', 'false');
						star.ui.Grid.gridvalidation.showError(star.ui.Grid.gridvalidation.msg.required, $(this));
						return ;
					}
				}
				break;
			case 'minlength':
				if(validInfo.minlength!==undefined) {
					var min = parseInt(validInfo.minlength);
					if (isNaN(min)) {
						grid.attr('vaild-check', 'false');
						star.ui.Grid.gridvalidation.showError('minlength는 양의 정수만 입력 가능합니다.', $(this));
						return ;
					}
					if(value.length < min) {
						grid.attr('vaild-check', 'false');
						star.ui.Grid.gridvalidation.showError(star.ui.Grid.gridvalidation.msg.minlength(min), $(this));
						return ;
					}
				}
				break;
			case 'maxlength':
				if(validInfo.maxlength!==undefined) {
					var max = parseInt(validInfo.maxlength);
					if (isNaN(max)) {
						grid.attr('vaild-check', 'false');
						star.ui.Grid.gridvalidation.showError('maxlength는 양의 정수만 입력 가능합니다.', $(this));
						return ;
					}
					if(value.length > max) {
						grid.attr('vaild-check', 'false');
						star.ui.Grid.gridvalidation.showError(star.ui.Grid.gridvalidation.msg.maxlength(max), $(this));
						return ;
					}
				}
				break;
			case 'rangelength' :
				if(validInfo.rangelength!==undefined) {
					var min = parseInt(validInfo.rangelength[0]);
					var max = parseInt(validInfo.rangelength[1]);
					if((value.length < min || value.length > max)) {
						grid.attr('vaild-check', 'false');
						star.ui.Grid.gridvalidation.showError(star.ui.Grid.gridvalidation.msg.rangelength(min,max), $(this));
						return ;
					}
				}
				break;
			case 'email':
				if(validInfo.email) {
					var req = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
					if(req.test(value) === false) {
						grid.attr('vaild-check', 'false');
						star.ui.Grid.gridvalidation.showError(star.ui.Grid.gridvalidation.msg.email, $(this));
						return ;
					}
				}
				break;
				/* date는 일단 보류
			case 'date':
				if(validInfo.date) {
					if(!(isNum(value))) {
						alert(star.ui.Grid.gridvalidation.msg.number);
						grid.attr('vaild-check', 'false');
						return ;
					}
				}
				break;
				*/
			case 'number':
				if(validInfo.number) {
					if(!(isNum(value))) {
						grid.attr('vaild-check', 'false');
						star.ui.Grid.gridvalidation.showError(star.ui.Grid.gridvalidation.msg.number, $(this));
						return ;
					}
				}
				break;
			case 'range':
				if(validInfo.range!==undefined) {
					if(isNum(value)) {
						if((parseFloat(value) < parseFloat(validInfo.range[0])) || (parseFloat(value) > parseFloat(validInfo.range[1]))) {
							grid.attr('vaild-check', 'false');
							star.ui.Grid.gridvalidation.showError(star.ui.Grid.gridvalidation.msg.range(validInfo.range[0], validInfo.range[1]), $(this));
							return ;
						}
						
					} else {
						grid.attr('vaild-check', 'false');
						star.ui.Grid.gridvalidation.showError(star.ui.Grid.gridvalidation.msg.number, $(this));
						return ;
					}
				}
				break;
			case 'max' :
				if(validInfo.max!==undefined) {
					if(isNum(value)) {
						if(parseFloat(value) > parseFloat(validInfo.max)) {
							grid.attr('vaild-check', 'false');
							star.ui.Grid.gridvalidation.showError(star.ui.Grid.gridvalidation.msg.max(validInfo.max), $(this));
							return ;
						}
					} else {
						grid.attr('vaild-check', 'false');
						star.ui.Grid.gridvalidation.showError(star.ui.Grid.gridvalidation.msg.number, $(this));
						return ;
					}
				}
				break;
			case 'min' :
				if(validInfo.min!==undefined) {
					if(isNum(value)) {
						if(parseFloat(value) < parseFloat(validInfo.min)) {
							grid.attr('vaild-check', 'false');
							star.ui.Grid.gridvalidation.showError(star.ui.Grid.gridvalidation.msg.min(validInfo.min), $(this));
							return ;
						}
					} else {
						grid.attr('vaild-check', 'false');
						star.ui.Grid.gridvalidation.showError(star.ui.Grid.gridvalidation.msg.number, $(this));
						return ;
					}
				}
				break;
			case 'custom':
				if(validInfo.custom!==true && validInfo.custom_func !== undefined) {
					if(validInfo.custom_func(value)===false) {
						grid.attr('vaild-check', 'false');
						$(this).focus();
						return ;
					}
				}
				break;
			}
		}
	};
	
	// Grid Formatter
	/*
	 * $('#grid').Grid({
	 *   columns: [
	 *     {
	 *       id: 'column1',
	 *       formatter: AMS.GridTextFormatter,
	 *       unformatter: AMS.GridTextUnformatter
	 *     },
	 *     {
	 *       id: 'column2',
	 *       formatter: AMS.GridCheckBoxFormatterFactory('y'),
	 *       unformatter: AMS.GridCheckBoxUnformatterFactory('y')
	 *     }
	 *   ],
	 *   formatter: AMS.GridTextFormatter,
	 *   unformatter: AMS.GridTextUnformatter
	 * });
	 */
	/**
	 * Grid 안에 Input Text 삽입
	 */
	AMS.GridTextFormatter = function(value) {
		return $('<div/>').append($('<input type="text"/>').attr('value', value)).html();
	};

	AMS.GridTextUnformatter = function(cell) {
		return cell.children().val();
	};
	
	function gridDateFormatter(cellvalue, options, rowObject) {
		cellvalue = cellvalue||'';
		if(cellvalue.length==8)
			return cellvalue.substring(0, 4) + '-' + cellvalue.substring(4, 6) + '-' + cellvalue.substring(6, 8); 
		return cellvalue;
	}
	
	function gridDateUnformatter(cellvalue, options, cell) {
		if(cellvalue.length==10)
			return cellvalue.substring(0, 4) + cellvalue.substring(5, 7) + cellvalue.substring(8, 10);
		return cellvalue;
	}
	/**
	 * Grid 안에 Input Number Text 삽입
	 */
	AMS.GridNumberFormatter = function(value) {
		return $('<div/>').append($('<input type="text" class="AMS-number"/>').attr('value', value)).html();
	};
	
	/**
	 * Grid 안에 Input Number(',' 사용) Text 삽입 
	 */
	AMS.GridNumberTextFormatter = function(value, option) {
		if(isNum(value)) {
			return $.NumberFormat({
				value: value,
				precision: ','
			});
		} else
			return value;
	};

	AMS.GridNumberUnformatter = AMS.GridTextUnformatter;

	/**
	 * Grid 안에 Input Radio 삽입
	 */
	AMS.GridRadioFormatter = function(value, option) {
		return $('<div/>').append($('<input type="radio"/>').attr('name', option.grid + '_' + option.column).attr('value', value)).html();
	};
	
	AMS.GridRadioFormatterFactory = function(initValue) {
		return function(value, option) {
			if(value == initValue) {
				return $('<div/>').append($('<input type="radio"/>').attr('name', option.grid + '_' + option.column).attr('value', initValue).attr('checked', 'checked')).html();
			} else {
				return $('<div/>').append($('<input type="radio"/>').attr('name', option.grid + '_' + option.column).attr('value', initValue)).html();
			}
		}
	}

	AMS.GridRowRadioFormatter = function(value, option) {
		return $('<div/>').append($('<input id="radio" name="radio" type="radio"/>').attr('value', option.row)).html();
	};

	AMS.GridRadioUnformatter = function(cell) {
		var radioObj = cell.children();
		
		if(radioObj.is(':checked')) {
			return radioObj.val();
		} else {
			return '';
		}
	};
	
	/**
	 * Grid 안에 Select Box 삽입
	 */
	AMS.GridSelectFormatter = function(value, option) {
		return $('<div/>').append($('<select id="select" name="select" />').attr('data-value', value).prop('disabled', 'disabled')).html();
	};
	
	AMS.GridSelectUnformatter = function(cell) {
		var selectbox = cell.children();
		selectbox.removeAttr("disabled");
		return cell;
	};
	
	/**
	 * Grid 안에 Check Box 삽입
	 */
	AMS.GridCheckBoxFormatterFactory = function(y) {
		return function(value, data) {
			if (value == y)
				return '<input type="checkbox" checked/>';
			else
				return '<input type="checkbox"/>';
		};
	};

	AMS.GridCheckBoxUnformatterFactory = function(y, n) {
		return function(cell) {
			return cell.children().is(':checked') ? y : n;
		};
	};

	/**	
	 * Grid 안에 TD 영역을 꽉 채월을 시 ... 으로 표시되게 만듬
	 */
	AMS.HideValueformatter = function(cellvalue, options, rowObject) {
		return '<div style="text-overflow: ellipsis; white-space: nowrap; overflow: hidden;">' + cellvalue + '</div>';
	};

	AMS.HideValueUnformatter = function(cellvalue, options, cell) {
		return $(cell).children().text();
	};
	
	/**
	 * onSortCol 동작 시 아래 함수를 사용 하여 Sort Icon을 화면에 보여줌 
	 */ 
	var nowsort = false;
	var gridSortIcon = function(index, iCol, sortorder) {
		var grid = $(this);
		var id = grid.attr('id');
		var cols = grid.jqGrid('getGridParam', 'colModel');
		var header = grid.closest('.ui-jqgrid').find('.ui-jqgrid-htable');

		for( var i = 0, l = cols.length; i < l; i++) {
			var col = cols[i];

			if(col.name !== index && col.sortable === true)
				header.find('#' + id + '_' + col.name + ' .s-ico').show();
		}
	};
	
	/**
	 * Service호출시 file이 있는 경우에는 type_id를 넣도록 수정 (2013.09.03 by PSI)
	 */
	star.define('Service', function() {
		if(!this.hasClass('star-file')) {
			return star.callSuper(this, arguments);
		}
		
		var pathArray = window.location.pathname.split('/');
		var path = '';
		for( var i = 1; i < pathArray.length; i++) {
			path += '/' + pathArray[i];
		}
		path = path.substring(0, path.length - 4);
		
		this.append('<input type="hidden" id="program_id" name="program_id" value="' + path + '" />');
		
		var fileArr = this.find('[type="file"]'); //.val().split('.').pop().toLowerCase();
		for(var i = 0; i < fileArr.length; i++) {
			var ext = $(fileArr[i]).val().split('.').pop().toLowerCase();
			if($.inArray(ext, ['gif','png','jpg','jpeg']) != -1) {
				this.append('<input type="hidden" id="type_id" name="type_id" value="IMG" />');
			} else {
				this.append('<input type="hidden" id="type_id" name="type_id" value="DAT" />');
			}
		}
		
		return star.callSuper(this, arguments);
	});
	
	/**
	 * File SeqNo를 토대로 파일정보를 DB에서 읽어온다. (2013.09.03 By PSI)
	 */
	star.define('FileDownloadInit', function(fileSeqNo, deleteOption) {
		var FILE_SEQ_NO = fileSeqNo;
		var dataParam = {'cmd':'getFileInfo','FILE_SEQ_NO': FILE_SEQ_NO}
		var listOpen = "<ul class=\"download\">";
        var listItem = "<li><span id='$fileId$'><a href=\"$context$?cmd=download&FILE_ID=$fileId$&FILE_SEQ_NO=$fileSeqNo$\">"
            					+ "$filename$ ($filesize$ Bytes)</a>$deleteImgTag$</span></li>";
        var deleteImgTag = " &nbsp;<img alt='Delete File' src='$ResourceContext$/images/icon/ico_comment_del.png' onclick='$.FileDelete(\"$fileId$\", \"$filePath$\")' />";
        var listClose = "</ul>";
		var tempStr = "";
		var div=this;
		$.ajax({
			url: star.ui.File.url,
			data: dataParam,
			success: function(ops) {
				console.log(ops);
				tempStr = listOpen;
				for(var i=0; i<ops.length; i++) {
					if(deleteOption == "N") {
						tempStr += listItem.replace("$deleteImgTag$", "");
					}else {
						tempStr += listItem.replace("$deleteImgTag$", deleteImgTag);
					}
					
					tempStr = tempStr.replace("$context$", star.ui.File.url);
					tempStr = tempStr.replace("$ResourceContext$", prefix);
					tempStr = tempStr.replace("$fileSeqNo$", ops[i].SEQ_NO);
					tempStr = tempStr.split("$fileId$").join(ops[i].FILE_ID);
					tempStr = tempStr.replace("$filename$", ops[i].FILE_NAME);
					tempStr = tempStr.replace("$filePath$", ops[i].FILE_PATH);
					tempStr = tempStr.replace("$filesize$", ops[i].FILE_SIZE);
				}
				tempStr += listClose;
	            div.html(tempStr);
			},
			error:function (data, status, e) {
				console.log("[While make file download script, Error occured] :"+e);
			},
			async: false
		}).done(function(msg) {
		});
	});
	
	/**
	 * File SeqNo List를 토대로 파일정보를 DB에서 읽어온다. (2014.02.10 By PSI)
	 */
	$.FileDownloadAll =  function(fileSeqNoList) {
		var dataParam;
		var arrWindowPop = Array(); 
		for(var i=0; i<fileSeqNoList.length; i++) {
			dataParam = {'cmd':'download', 'FILE_SEQ_NO':fileSeqNoList[i].fileSeqNo, 'FILE_ID': fileSeqNoList[i].fileId};
			console.log(dataParam);

			var childWindow = window.open(star.ui.File.url+"?cmd=download&FILE_ID="+fileSeqNoList[i].fileId+"&FILE_SEQ_NO="+fileSeqNoList[i].fileSeqNo,
								"fileDownloadPopup"+i,
								"width=1,height=1,top=2500,left=1700,statusbar=no,scrollbars=no,toolbar=no"
					);
			
			arrWindowPop.push(childWindow);
		}
		//팝업창들에 대해 자동창닫기 설정
		for(var i=0; i<arrWindowPop.length; i++) {
			arrWindowPop[i].setTimeout('self.close()', 10000);
		}
	}
	
	
	/**
	 * Upload한 File을 삭제할 수 있는 구문 추가(2013.06.03 by PSI)
	 */
	$.FileDelete =  function(fileId, filePath) {
		if(!confirm("삭제하시겠습니까?")) {
			return;
		}
		
		$.ajax({
			url: star.ui.File.url,
			data: {'FILE_ID' : fileId, 'FILE_PATH':filePath, 'cmd':'delete'},
			success: function(ops) {
				alert("삭제하였습니다.");
				$('#'+fileId).html('');
			},
			async: false
		})
	};
	
	/**
	 * 
	 */
	$.ServerMonitoring = function() {
		$.ajax({
			url: star.service.monitoring_url,
			success: function(ops) {
				console.log(ops);
				console.log(ops.CPU_MONITORING[0].COMBINE_CPU_PERC);
			},
			async: false
		})
	}
	
	/**
	 * Grid Component 사용시 프로젝트 기능 추가
	 */
	star.define('Grid', function(option) {
		var self = this;
		var optionClick = undefined;
		var optionLoad = undefined;
		var frozen = false;

		this.addClass('AMS-grid');
		
		this.data('AMS-option', option);
		var parentWidth = this.parent().width();

		var codehelper = [];
		for ( var i = 0; i < option.columns.length; i++) {
			var column = option.columns[i];

			if (column.frozen === true)
				frozen = true;
			
			if( typeof column.width === typeof '') {
				if(column.width[column.width.length - 1] === '%') {
					column.width = (parentWidth * parseFloat(column.width.substr(0, column.width.length - 1))) / 100;
				}
			}
			
			if( column.formatter === 'date') {
				column.formatter = gridDateFormatter;
				column.unformat = gridDateUnformatter;
			}
			if( column.codeHelper !== undefined ) {
				codehelper.push(column.codeHelper);
				
				if(column.codeHelper.func) {
					this.on('codehelper' + (codehelper.length - 1), (function(code) {
						return function(parentEvent, events) {
							var $target = $(events.target);
							if($target.hasClass('star-codehelper')) {
								code.func.apply(events.target, [events]);
							}
						}
					})(column.codeHelper));
				}
				column.formatter = (function(index) { 
					return function(value, data) {
						var codeList = self.data('star-codehelper');			
						var code = codehelper[index];
						var $div = $('<div/>');
						switch(code.style) {
							case 'select':
								var $j = $('<select id="' + code.codeId + '" name="' + code.codeId + '" class="star-codehelper" data-e="'+index+'" starValidLabel="' + code.codeName + '"/>');
								if(code.blank == false){
									$j.Select({
										value: code.codeValueId||'CODE_ID',
										label: code.codeNameId||'CODE_NAME',
										options: codeList[index]
									});
								} else {
									$j.Select({
										value: code.codeValueId||'CODE_ID',
										label: code.codeNameId||'CODE_NAME',
										blank: {
											value: code.blankValue||'',
											label: code.blankLabel||'==선택=='
										},
										options: codeList[index]
									});
								}
								
								$j.Value(value);
								return $div.append($j).html();
							case 'radio':
								for(var j = 0; j < codeList[index].length; j++) {
									$div.append('<input id="' + code.codeId + '" name="' + code.codeId + '" class="star-codehelper" type="radio" value="'+codeList[index][j].CODE_ID+'" data-e="'+index+'">'+ codeList[index][j].CODE_NAME +'</input>');
								}
								$div.find('input').Radio().Value(value);
								return $div.append($j).html();
							case 'checkbox':
								for(var j = 0; j < codeList[index].length; j++) {
									var checkBoxCode = code.codeId + j;
									if(value===codeList[index][j].CODE_ID)
										$div.append('<input id="' + checkBoxCode + '" name="' + checkBoxCode + '" class="star-codehelper" type="checkbox" data-e="'+index+'" checked>'+ codeList[index][j].CODE_NAME +'</input>');
									else
										$div.append('<input id="' + checkBoxCode + '" name="' + checkBoxCode + '" class="star-codehelper" type="checkbox" data-e="'+index+'">'+ codeList[index][j].CODE_NAME +'</input>');
									$div.find('input').CheckBox();
								}
								return $div.append($j).html();
						}
					}
				})(codehelper.length - 1);
				column.unformat = function(cellvalue, options, cell){
					return $(cell).children().val();
				}
			}
		}
		if(codehelper.length!==0) {
			$.CodeHelperGrid.apply(this, [codehelper]);
			this.on('change', 'select', function(event) {
				var $target = $(event.target);
				
				var eventNum = $target.attr('data-e');
				
				var $grid = $(this).closest('table');
				var rowid = $(this).closest('tr').attr('id');
				if ($grid.Column(rowid, 'Flag') == 'R')
					$grid.Column(rowid, 'Flag', 'U');
				else if ($grid.Column(rowid, 'Flag') == 'C')
					$grid.Column(rowid, 'Flag', 'C');
				
				if(eventNum) {
					self.trigger('codehelper' + eventNum, [event]);
				}
			});
			this.on('click', 'input',function(event) {
				var $target = $(event.target);
				
				var eventNum = $target.attr('data-e');
				
				if(eventNum) {
					self.trigger('codehelper' + eventNum, [event]);
				}
			});
		}
		
		if (option.formatter)
			for ( var i = 0; i < option.columns.length; i++)
				option.columns[i].formatter = option.formatter;

		if (option.unformatter)
			for ( var i = 0; i < option.columns.length; i++)
				option.columns[i].unformatter = option.unformatter;

		// 개발자 click method 실행을 중간에 가로채 앞뒤로 공통 기능을 넣는다.
		if (option.click !== undefined)
			optionClick = option.click;
		
		option.click = function(rowid, status, e) {
			
			if (optionClick !== undefined)
				optionClick.apply(this, arguments);
		};
		
		// 개발자 loadComplete 실행을 중간에 가로채 앞뒤로 공통 기능을 넣는다.
		if (option.loadComplete !== undefined)
			optionLoad = option.loadComplete;

		option.loadComplete = function(data) {
			// Number Formatter 와 연계 되는 부분
			self.find('.AMS-number').each(function() {
				$(this).Number();
			});
			
			$(this).AMSGridLoadComplete(data);
			
			$(this).WidthResize();

			if (optionLoad !== undefined)
				optionLoad.apply(this, arguments);
			
			fixPositionsOfFrozenDivs.apply(this, arguments);
		};

		// onSortCol이 function일시 해당 function이 sort기능을 대신하게 변경
		if(option.onSortCol !== undefined) {
			option.super_onSortCol = option.onSortCol; 
			option.onSortCol = function(index, iCol, sortorder) {
				gridSortIcon.apply(this, arguments);
				
				var gridParam = $(this).jqGrid('getGridParam');
				
				gridParam.sortname = "";
				$(this).jqGrid('setGridParam', gridParam);
				
				return option.super_onSortCol.apply(this, arguments);
			}
		} else {
			option.onSortCol = gridSortIcon;
		}
		
		option.resizeStop = (function(_this) {
			return function(newwidth, index) {
				fixPositionsOfFrozenDivs.apply(_this, arguments);
			}
		}(this[0]));
		
		if(option.grouping === true) {
			option.groupingView.groupSummary = [true];
			option.groupingView.groupColumnShow = [false];
			option.groupingView.groupText = ['<div data-role="gridsub"> {0} </div>'];
			option.groupingView.groupCollapse = false;
		}
		
		// STAR Grid Call
		star.callSuper(this, arguments);
		
		/* Footer를 위로 올리는 로직 (제거 - 2013.08.19) 
		if((option.footerrow === true || option.footer === true) && option.grouping!=true){
			this.closest('.ui-jqgrid-view').find('.ui-jqgrid-sdiv').css({
	            "border-bottom-style":"solid",
	            "border-bottom-color":"#a6c9e2",
	            "border-bottom-width":"0.1px"
	        }).insertBefore(this.closest('div.ui-jqgrid-bdiv'));
		}*/
		
		// Frozen Column이 있을시 setFrozenColumns를 자동으로 호출 
		if (frozen === true) {
			var AMSOption = this.data('AMS-option');
			this.jqGrid('setFrozenColumns');
			AMSOption.AMSFrozen = true;
			this.data('AMS-option', AMSOption);
			fixPositionsOfFrozenDivs.apply(this[0], arguments);
		}

		return this;
	});
	
	/**
	* 그리드 loadcomple에 넣어주면 Flag를 R로 바꿔준다.
	* 추가로 editmode의 select box에 들어 있는 value -> label 작업을 해준다. 
	*/
    star.define('AMSGridLoadComplete', function (data) {
        var grid = $(this).attr('id');
        var firstrow = $('#' + grid + ' tr#1');
        var firstloading = false;

        if (firstrow.attr('id') !== undefined) {
            if ($('#' + grid).Column(firstrow.attr('id'), 'Flag') == '') {
                firstloading = true;
            }
        }
        if (nowsort && !firstloading) {
            return;
        }
        $('#' + grid + ' tr').each(function () {
            var rowid = $(this).attr('id');
            if ($(this).attr('id') !== undefined) {
                $('#' + grid).Column(rowid, 'Flag', 'R'); //조회된 모든 행의 flag를 R로 셋팅
            }
        });
    });
	
	// Frozengrid 사용시 tr의 간격을 강제로 맞춰 준다.
	var fixPositionsOfFrozenDivs = function () {	// http://stackoverflow.com/questions/8686616/how-can-i-get-jqgrid-frozen-columns-to-work-with-word-wrap-on
        var $rows;
        if (typeof this.grid.fbDiv !== "undefined") {
            $rows = $('>div>table.ui-jqgrid-btable>tbody>tr', this.grid.bDiv);
            $('>table.ui-jqgrid-btable>tbody>tr', this.grid.fbDiv).each(function (i) {
                var rowHight = $($rows[i]).height(), rowHightFrozen = $(this).height();
                if ($(this).hasClass("jqgrow")) {
                    $(this).height(rowHight);
                    rowHightFrozen = $(this).height();
                    if (rowHight !== rowHightFrozen) {
                        $(this).height(rowHight + (rowHight - rowHightFrozen));
                    }
                }
            });
            $(this.grid.fbDiv).height(this.grid.bDiv.clientHeight);
            $(this.grid.fbDiv).css($(this.grid.bDiv).position());
        }
        if (typeof this.grid.fhDiv !== "undefined") {
            $rows = $('>div>table.ui-jqgrid-htable>thead>tr', this.grid.hDiv);
            $('>table.ui-jqgrid-htable>thead>tr', this.grid.fhDiv).each(function (i) {
                var rowHight = $($rows[i]).height(), rowHightFrozen = $(this).height();
                $(this).height(rowHight);
                rowHightFrozen = $(this).height();
                if (rowHight !== rowHightFrozen) {
                    $(this).height(rowHight + (rowHight - rowHightFrozen));
                }
            });
            $(this.grid.fhDiv).height(this.grid.hDiv.clientHeight);
            $(this.grid.fhDiv).css($(this.grid.hDiv).position());
        }
        if(typeof this.grid.fbDiv !== "undefined" && typeof this.grid.fhDiv !== "undefined" && typeof this.grid.sDiv !== 'undefined') {	// 성지호 custom - footer가 있을때 frozen grid 관련
        	// 기존 sDiv -> fsDiv로 copy
        	//<div class="ui-jqgrid-sdiv" style="width: 809px; border-bottom-style: solid; border-bottom-color: rgb(166, 201, 226); border-bottom-width: 0.1px;"><div class="ui-jqgrid-hbox"><table role="grid" style="width:1165px" class="ui-jqgrid-ftable" cellspacing="0" cellpadding="0" border="0"><tbody><tr role="row" class="ui-widget-content footrow footrow-ltr"><td role="gridcell" style="text-align:left;width: 170px;" aria-describedby="EUB001RS_bhq_nm" title="합계">합계</td><td role="gridcell" style="text-align:right;width: 90px;" aria-describedby="EUB001RS_sales_qty" title="0">0</td><td role="gridcell" style="text-align:center;display:none;width: 60px;" aria-describedby="EUB001RS_bhq_cd" title="">&nbsp;</td><td role="gridcell" style="text-align:right;width: 70px;" aria-describedby="EUB001RS_m_diff_ratio" title="0">0</td><td role="gridcell" style="text-align:right;width: 70px;" aria-describedby="EUB001RS_y_diff_ratio" title="0">0</td><td role="gridcell" style="text-align:right;width: 70px;" aria-describedby="EUB001RS_goal_ratio">&nbsp;</td><td role="gridcell" style="text-align:right;width: 90px;" aria-describedby="EUB001RS_sales_amt" title="0">0</td><td role="gridcell" style="text-align:right;width: 90px;" aria-describedby="EUB001RS_sales_bond" title="0">0</td><td role="gridcell" style="text-align:right;width: 90px;" aria-describedby="EUB001RS_support_amt" title="0">0</td><td role="gridcell" style="text-align:right;width: 90px;" aria-describedby="EUB001RS_limit_over_amt" title="0">0</td><td role="gridcell" style="text-align:right;width: 60px;" aria-describedby="EUB001RS_limit_over_cnt" title="0">0</td><td role="gridcell" style="text-align:right;width: 90px;" aria-describedby="EUB001RS_matured_amt" title="0">0</td><td role="gridcell" style="text-align:right;width: 60px;" aria-describedby="EUB001RS_matured_cnt" title="0">0</td><td role="gridcell" style="text-align:right;width: 60px;" aria-describedby="EUB001RS_tr_cnt" title="0">0</td></tr></tbody></table></div></div>
        	var $sDiv = $(this.grid.sDiv);
        	var $fsDiv = $sDiv.clone();
        	$fsDiv.addClass('ui-jqgrid-fsdiv');
        	$(this.grid.fhDiv).after($fsDiv);
        	
        	// fsDiv에 table의 td삭제
        	var $fbDiv = $(this.grid.fbDiv);
        	var frozenTdCnt = $fbDiv.find('tr:eq(0) > td').length;
        	
        	var $fsDivTd = $fsDiv.find('td');
        	var $fsDivTdCnt = $fsDivTd.length;
        	for(var i = frozenTdCnt;i < $fsDivTdCnt; i++) {
        		$fsDivTd.eq(i).remove();
        	}
        	
        	//fsDiv에  table에 style 적용
        	// <table id="EUB001RS_frozen" class="AMS-grid star-recordset star-clearable ui-jqgrid-btable" role="grid" aria-multiselectable="false" aria-labelledby="gbox_EUB001RS" style="width: 1px;"><tbody><tr class="jqgfirstrow" role="row" style="height:auto"><td role="gridcell" style="height:0px;width:170px;"></td><td role="gridcell" style="height:0px;width:90px;"></td></tr><tr role="row" id="1" tabindex="-1" class="ui-widget-content jqgrow ui-row-ltr" style="height: 31px;"><td role="gridcell" style="text-align:left;" title="특수제품사업부" aria-describedby="EUB001RS_bhq_nm">특수제품사업부</td><td role="gridcell" style="text-align:right;" title="0" aria-describedby="EUB001RS_sales_qty">0</td></tr><tr role="row" id="2" tabindex="-1" class="ui-widget-content jqgrow ui-row-ltr" style="height: 31px;"><td role="gridcell" style="text-align:left;" title="Retail사업부" aria-describedby="EUB001RS_bhq_nm">Retail사업부</td><td role="gridcell" style="text-align:right;" title="0" aria-describedby="EUB001RS_sales_qty">0</td></tr><tr role="row" id="3" tabindex="-1" class="ui-widget-content jqgrow ui-row-ltr" style="height: 31px;"><td role="gridcell" style="text-align:left;" title="Wholesale 중부사업부" aria-describedby="EUB001RS_bhq_nm">Wholesale 중부사업부</td><td role="gridcell" style="text-align:right;" title="0" aria-describedby="EUB001RS_sales_qty">0</td></tr><tr role="row" id="4" tabindex="-1" class="ui-widget-content jqgrow ui-row-ltr" style="height: 31px;"><td role="gridcell" style="text-align:left;" title="Wholesale 남부사업부" aria-describedby="EUB001RS_bhq_nm">Wholesale 남부사업부</td><td role="gridcell" style="text-align:right;" title="0" aria-describedby="EUB001RS_sales_qty">0</td></tr></tbody></table>
        	// <table role="grid" style="width:1165px" class="ui-jqgrid-ftable"><tbody><tr role="row" class="ui-widget-content footrow footrow-ltr"><td role="gridcell" style="text-align:left;width: 170px;" aria-describedby="EUB001RS_bhq_nm" title="합계">합계</td><td role="gridcell" style="text-align:right;width: 90px;" aria-describedby="EUB001RS_sales_qty" title="0">0</td></tr></tbody></table>
        	var $fsDivTable = $fsDiv.find('table');
        	$fsDivTable.attr('tabindex', '0');
        	$fsDivTable.width(1);
        	
        	//position 설정
        	//position: absolute; left: 0px; top: 0px; height: 68px;"
        	//position: ??????
        	//position: absolute; left: 0px; top: 99px; overflow-y: hidden; height: 124px;
        	var fsDiv = $fsDiv[0];
        	fsDiv.style.width = '';
        	fsDiv.style.position = 'absolute';
        	fsDiv.style.left = '0px';
        	fsDiv.style.top = $sDiv.position().top + 'px';
        	fsDiv.style.height = $sDiv.height() + 'px';
        	fsDiv.style.overflowY = 'hidden';
        	
        }
    };
	
	//Grid Resize를 위해 재정의
	star.define('WidthResize', function(width) {
		star.callSuper(this, arguments);
		
		var hdiv = this.closest('.tb_basic').find('.ui-jqgrid-hdiv');
		var bdiv = this.closest('.tb_basic').find('.ui-jqgrid-bdiv');
		var sdiv = this.closest('.tb_basic').find('.ui-jqgrid-sdiv');
				
		hdiv.width(hdiv.parent().width() +1); //ui-jqgrid-hdiv width 조정
		bdiv.width(bdiv.parent().width() +1); //ui-jqgrid-bdiv width 조정
		sdiv.width(sdiv.parent().width() +1); //ui-jqgrid-sdiv width 조정
	});
	
	/**
	 * Grid 를 새로 그릴때 사용한다.
	 * 인자가 없으면 현재 Grid의 Option을 반환
	 */
	star.define('GridReload', function(options) {
		if (!this.hasClass('AMS-grid')) {
			return star.callSuper(this, arguments);
		}
		
		var gridOptions = this.data('star-option');
		if(!(options)) {
			return gridOptions;
		}
		
		this.jqGrid('GridUnload');
		
		return $('#' + this.attr('id')).Grid(options);
	});
	
	/**
	 * Gird 특정 Row에 class를 추가 한다.
	 */
	star.define('RowCSS', function(rowid, className){
		if (!this.hasClass('AMS-grid')) {
			return star.callSuper(this, arguments);
		}
		
		return this.find('[id="' + rowid + '"]').addClass(className);
	});
	
	/**
	 * Coulmn 숨기기 
	 */
	star.define('ColumnHide', function(column, fixWidth) {
		if (!this.hasClass('AMS-grid')) {
			return star.callSuper(this, arguments);
		}
		
		var columns = undefined;
		// 배열 체크
		if(!(Object.prototype.toString.call(column)=='[object Array]'))
			columns = [column];
		else 
			columns = column;
		
		for(var i = 0; i < columns.length; i++) {
			if(fixWidth && fixWidth===true) {
				var width = this.jqGrid('getGridParam', 'width'); // get current width
				
				this.jqGrid('hideCol', columns[i]);
				
				this.jqGrid('setGridWidth', width, true);
			} else {
				this.jqGrid('hideCol', columns[i]);
			}
		}
			
		return this;
	});
	
	/**
	 * 숨긴 컬럼 복원
	 */
	star.define('ColumnShow', function(column, fixWidth) {
		if (!this.hasClass('AMS-grid')) {
			return star.callSuper(this, arguments);
		}
		
		var columns = undefined;
		// 배열 체크
		if(!(Object.prototype.toString.call(column)=='[object Array]'))
			columns = [column];
		else 
			columns = column;
		
		for(var i = 0; i < columns.length; i++) {
			if(fixWidth && fixWidth===true) {
				var width = this.jqGrid('getGridParam', 'width'); // get current width
				
				this.jqGrid('showCol', columns[i]);
				
				this.jqGrid('setGridWidth', width, true);
			} else {
				this.jqGrid('showCol', columns[i]);
			}
		}
			
		return this;
	});
	
	/**
	 * 마지막으로 클릭된 행을 객체로 변경해 반환
	 */
	star.define('SelectRow', function(row) {
		if (!this.hasClass('AMS-grid'))
			return star.callSuper(this, arguments);

		if (row === undefined) {
			row = this.jqGrid('getGridParam', 'selrow');

			if (!row)
				return null;

			return this.Record(row);
		} else
			return this.Select(row);
	});
	
	/**
	 * multiselect 사용시 check된 행을 배열로 반환 
	 */
	star.define('SelectRowId', function() {
		if (!this.hasClass('AMS-grid'))
			return star.callSuper(this, arguments);

		return this.jqGrid('getGridParam', 'selarrrow').slice();
	});
	
	/**
	 * radio를 사용한 grid에서 선택된 radio 행의 Row ID를 반환
	 */
	star.define('SelectRadioRowId', function(columnname) {
		if (!this.hasClass('AMS-grid'))
			return star.callSuper(this, arguments);
		
		return this.find('input[name="' + this.attr('id') + '_' + columnname + '"][type="radio"]:checked').closest('tr').attr('id');
	});
	
	/**
	 * Grid Column Merge
	 */
	star.define('ColMerge', function(column1, column2, rs) {
		if (!this.hasClass('AMS-grid'))
			return star.callSuper(this, arguments);

		var id = this.attr('id');
		var trs = this.find('tr[role="row"]');

		if (rs === undefined) {
			trs.each(function() {
				var tr = $(this);
				var td1 = tr.children('[aria-describedby="' + id + '_' + column1 + '"]');
				var td2 = tr.children('[aria-describedby="' + id + '_' + column2 + '"]');

				if (td1.html() === td2.html()) {
					td1.attr('colspan', 2);
					td2.hide();
				}
			});
		} else {
			for ( var i = 0, l = rs.nc_list.length; i < l; i++) {
				var record = rs.nc_list[i];

				if (record[column1] == record[column2]) {
					var tr = trs.eq(i);

					tr.children('[aria-describedby="' + id + '_' + column1 + '"]').attr('colspan', 2);
					tr.children('[aria-describedby="' + id + '_' + column2 + '"]').hide();
				}
			}
		}
	});
	
	/**
	 * Grid Column Merge
	 */
	star.define('ColsMerge', function() {
		if (!this.hasClass('AMS-grid'))
			return star.callSuper(this, arguments);

		var columns = arguments;

		var id = this.attr('id');
		var trs = this.find('tr[role="row"]');

		trs.each(function() {
			var tr = $(this);
			var tds = [];

			for ( var i = 0; i < columns.length; i++)
				tds.push(tr.children('[aria-describedby="' + id + '_' + columns[i] + '"]'));

			var v = tds[0].html();
			var m = true;

			for ( var i = 1; i < columns.length; i++) {
				if (v != tds[i].html()) {
					m = false;
					break;
				}
			}

			if (m === true) {
				tds[0].attr('colspan', columns.length);

				for ( var i = 1; i < columns.length; i++)
					tds[i].hide();
			}
		});
	});
	
	/**
	 * column1에 값을 기준으로 merge한다(remove기반)
	 * column2가 있을시 2를 기준으로 1을 merge한다.
	 */
	star.define('RowMerge', function(column1, column2) {
		if (!this.hasClass('AMS-grid'))
			return star.callSuper(this, arguments);
		
		// RecordSet, Record를 따로 동작시키기 위해 class 추가
		this.addClass('AMS-grid-merge');
		
		// Merge되는 column 정보 저장
		var mergeCol = this.data('star-merge-column')||{};
		mergeCol[column1] = {};
		this.data('star-merge-column', mergeCol);

		// column1에 대해서 중복된 값을 기준으로 merge
		if(column2===undefined) {
			var tds = this.find('tr[role="row"] > td[aria-describedby="' + this.attr('id') + '_' + column1 + '"]');
			 RowMergeSub(tds);
		} else {
			// column1 테이블을 merge하는데 column2로 들어온 값의 rowspan을 참고 하여 merge한다.
			var tds1 = this.find('tr[role="row"] > td[aria-describedby="' + this.attr('id') + '_' + column1 + '"]');
			var tds2 = this.find('tr[role="row"] > td[aria-describedby="' + this.attr('id') + '_' + column2 + '"]');
			var count = tds2.length;
			
			for ( var i = 0; i < count; i ++) {
				var td2 = tds2.eq(i);
				var tds2Rowspan = td2.attr('rowspan');
				
				if(tds2Rowspan!==undefined) {
					RowMergeSub(tds1.splice(0, tds2Rowspan));
				} 
			}
		}
	});
	
	/**
	 *  RowMerge된 상태에서 Cell을 Edit할 경우
	 */
	star.define('CellEdit', function(col_nm) {
		var flag = 0;
		
		// grid 이름
		var grid = $(this);
		var grid_nm = $(this).attr('id');
		
		//선택된 cell
		var selectCell = (event.target || event.srcElement);
		
		// row 정보
		var row = $(selectCell, this.rows).closest("tr.jqgrow");
		
		// column 정보
		var col = $(row).find('[aria-describedby="' + grid_nm + '_' + col_nm +'"]');
		
		// 선택된 셀만 edit 할수 있게 제한
		if ($(selectCell).attr('aria-describedby') !== (grid_nm + '_' + col_nm))
			return;
		
		var col_val = $(col).text();
			
		// column 정보
		var col_val = $(selectCell).text();
		
		// 선택된 셀 수정
		if ($(col).attr('flag') === undefined || $(col).attr('flag') === '0') {
			col.empty();
			
			$(col).attr('title', col_val);
			col.append($('<input type="text"/>').attr('value', col_val)).html();
			col.append(col_val);
			col.find('input').focus();
			$(col).attr('flag', 1);
			
			return col_val;
		} else if ($(col).attr('flag') === '1'){
			col_val = col.find('input').val();
			col.empty();
			col.append(col_val);
			$(col).attr('title', col_val);
			$(col).attr('flag', 0);
			
			return col_val;
		}
	});
	
	
	// 넘어오는 tr array에 대해서 merge작업 수행
	function RowMergeSub(tds) {
		var count = tds.length - 1;
		var rowspan = 1;

		for ( var i = 0; i < count; i += rowspan) {
			var td = $(tds[i]);
			var value = td.html();

			rowspan = 1;

			for ( var j = i + 1; j <= count; j++) {
				var td2 = $(tds[j]);

				if (value == td2.html()) {
					rowspan++;
					td2.remove();

					if (j === count && rowspan > 1)
						td.attr('rowspan', rowspan);
				} else {
					if (rowspan > 1)
						td.attr('rowspan', rowspan);
					break;
				}
			}
		}
	}
	
	/**
	 * RowMerge된 상태에서의 Record 조회
	 * grid : jQuery Grid 객체 ex) $('#GRID')
	 * row : jQuery tr 객체
	 * rowid : jqgrid rowid
	 * rowObj : row id array
	 */
	function RowMergeRecord(grid, row, rowid, rowObj) {
		var record = {};
		
		var gridId = grid.attr('id');
		var gridIdCutLen = gridId.length + 1;
		
		// unformatter로 값을 돌려주기 위해 설정
		var unformatter = {};
		var unformat = {};
		for(var col in rowObj) {
			var colPropArr = $(grid).jqGrid('getColProp', col);
			if(colPropArr.unformat)
				unformat[col] =  colPropArr.unformat;
			else if(colPropArr.unformatter) {
				unformatter[col] =  colPropArr.unformatter;
			}
		}
		
		// RowMerge를 할때 해당 컬럼 정보를 저장해 놓은 데이터 부분
		var mergeColumns = grid.data('star-merge-column');
		
		// 행의 열별로 값을 변환한다
		row.find('td[role="gridcell"]').each(function() {
			var td = $(this);
			var cellId = td.attr('aria-describedby').substr(gridIdCutLen);
			// unformatter가 있으면 동작시킴
			if(unformatter[cellId])
				record[cellId] = unformatter[cellId](td);
			else if(unformat[cellId])
				record[cellId] = unformat[cellId](td.text(), $(grid).jqGrid('getColProp', cellId), this);
			else {
				var value = td.html();
				if('&nbsp;' == value || 'undefined' == value) value = '';
				record[cellId] = value;
			}
		});
		
		// RowMerge가 remove형식으로 되기 때문에 없어진 값에 대해 보정 처리
		for(var mCol in mergeColumns) {
			if(record[mCol]) {
				mergeColumns[mCol].value  = record[mCol];
			} else {
				if(mergeColumns[mCol].value)
					record[mCol] = mergeColumns[mCol].value;
			}
		}
		
		// 다음 행에서 사용하기 위해 값 보전
		grid.data('star-merge-column', mergeColumns);
		
		return record;
	}
	
	/**
	 * RowMerge된 상태에서의 RecordSet 조회
	 * grid : jQuery Grid 객체 ex) $('#GRID')
	 * rowObj : row id array
	 */
	function RowMergeRecordSet(grid, rowObj) {
		var recordSets = {
			nc_list: []
		};
		
		// RowMergeRecord를 계속 호출한다.
		grid.find('.jqgrow').each(function() {
			var id = $(this).attr('id');
			recordSets.nc_list.push(RowMergeRecord(grid, $(this), id, rowObj));
		});
		
		return recordSets;
	}
	
	/**
	 * Grid 행 추가 - 특정행 뒤에 추가
	 */
	star.define('AddRowAfter', function(value, srcrowid) {
		if (!this.hasClass('AMS-grid'))
			return star.callSuper(this, arguments);
		
		if(value===undefined || srcrowid===undefined) {
			alert('Usage: AddRowAfter(value, srcrowid)');
			return ;
		}
	
		var rowId = 'sga_' + $.jgrid.randId();
		
		var result = this.jqGrid('addRowData', rowId, value, 'after', srcrowid); // return Boolean
		
		if(result===false)
			return undefined;
		
		return rowId;
	});
	
	/**
	 * Grid 행 추가 - 특정행 앞에 추가
	 */
	star.define('AddRowBefore', function(value, srcrowid) {
		if (!this.hasClass('AMS-grid'))
			return star.callSuper(this, arguments);
		
		if(value===undefined || srcrowid===undefined) {
			alert('Usage: AddRowBefore(value, srcrowid)');
			return ;
		}
	
		var rowId = 'sga_' + $.jgrid.randId();
		
		var result = this.jqGrid('addRowData', rowId, value, 'before', srcrowid); // return Boolean
		
		if(result===false)
			return undefined;
		
		return rowId;
	});
	
	// Grid안의 SelectBox를 초기화 한다.
	// ARG1 : 호출할 Servce, transaction 명
	// ARG2 : Request dataset 
	// ARG3 : Selectbox가 속해있는 Column ID
	// response의 레코드셋 명은 GROUP_RS로 되어 있어야 한다.
	// GROUP_RS안의 record는 value, label 필드를 가지고 있어야 한다.
	// ARG4 : 기본 레코드셋 명, 레코드 필드명을 사용하지 않을때 임으로 지정해서 사용
	star.define('AMSSelectBoxInit', function(servicename, req, colname, reader){
		if (!this.hasClass('AMS-grid'))
			return star.callSuper(this, arguments);
		
		if(servicename===undefined || req===undefined || colname===undefined) {
			alert('Usage: AMSSelectBoxInit(ServiceName, req, Colname[, reader]');
			return ;
		}
		
		// reader 값을 설정한다
		reader = reader||{};
		reader = $.extend({rsname: 'CODE_LIST', value: 'value', label: 'label'}, reader);
		
		var grid = this;
		
		$.Service({
			transaction: servicename,
			request: req,
			success: function(ds) {
				
				var commcd = {};
				var rsname = reader.rsname;
				var value = reader.value;
				var label = reader.label;
				var rs= ds.recordSets[rsname].nc_list;
				
				for(var i = 0; i < rs.length; i++) {
					commcd[rs[i][value]] = rs[i][label]; 
				}

				// 기존 컬럼 프로퍼티를 가져와서 selectbox의 value 부분만 교체한다.
				var colPropArr = grid.jqGrid('getColProp', colname);
				if(colPropArr.editoptions===undefined) colPropArr.editoptions = {};
				colPropArr.editoptions.value = commcd;
				
				grid.ColProp(colname, colPropArr.editoptions);
			}
		});
		return this;
	});
	
	// selectboxvalue 형태 
	// {
	//	 value : label,
	// 	 value : label ...
	// }
	star.define('EMKSelectBoxInitNoTR', function(colname, selectboxvalue){
		if (!this.hasClass('EMK-grid'))
			return star.callSuper(this, arguments);
		
		var grid = this;
		
		
		// 기존 컬럼 프로퍼티를 가져와서 selectbox의 value 부분만 교체한다.
		var colPropArr = grid.jqGrid('getColProp', colname);
		if(colPropArr.editoptions===undefined) colPropArr.editoptions = {};
		colPropArr.editoptions.value = selectboxvalue;
				
		grid.ColProp(colname, colPropArr.editoptions);
		
		return this;
	});
	
	/**
	 * Summary 행 추가
	 */
	star.define('Summary', function(column, span, hide) {
		if (!this.hasClass('AMS-grid'))
			return star.callSuper(this, arguments);

		if (hide === undefined)
			hide = span;

		var tr = this.find('> tbody > tr:last');

		if (tr.length !== 1)
			return;

		tr.addClass('AMS-summary');

		var td = tr.children('[aria-describedby="' + this.attr('id') + '_' + column + '"]');

		td.attr('colspan', span);

		for ( var i = 1; i < hide; i++)
			td = td.next().hide();
	});
	
	/*
	 * var footer = $.RecordSetColumnsSum(response.recordSets.rs1, [ 'sumcolumn1', 'sumcolumn2', 'sumcolumn3' ]);
	 */
	$.RecordSetColumnsSum = function(rs, columns) {
		var sums = {};

		for ( var j = 0; j < columns.length; j++)
			sums[columns[j]] = 0;

		for ( var i = 0, l = rs.nc_list.length; i < l; i++) {
			var record = rs.nc_list[i];

			for ( var j = 0; j < columns.length; j++) {
				var column = columns[j];
					sums[column] += Number(record[column].toString().replace(',', ''));
				
				/*if (isNum(record[column]) == true){				
						sums[column] += Number(record[column]);
				}else{
						sums[column] += Number(record[column].replace(',', ''));
				}*/
			}
		}
		return sums;
	};

	/*
		$('#grid').Footer($.RecordSetSummary(response.recordSets.rs1, {column1: 'sum', column2: 'avg'}));
	 */
	$.RecordSetSummary = function(rs, columns) {
		var result = {};
		var l = rs.nc_list.length;

		for ( var k in columns)
			result[k] = 0;

		for ( var i = 0; i < l; i++) {
			var record = rs.nc_list[i];

			for ( var k in columns) {
				/*
				switch (columns[k]) {
					case 'sum':
						break;
					case 'avg':
						break;
				}
				*/

				result[k] += Number(record[k].replace(',', ''));
			}
		}

		for ( var k in columns) {
			switch (columns[k]) {
				case 'avg':
					result[k] = l === 0 ? 0 : result[k] / l;
					break;
				case 'avg1':
					result[k] = l === 0 ? 0 : Math.round(result[k] / l, 1);
					break;
			}
		}

		return result;
	};
	
	/**
	 * Header Group 추가 
	 */
	star.define('HeaderGroup', function(headers, headersetFlag, test) {
		if (!this.hasClass('AMS-grid'))
			return star.callSuper(this, arguments);
		
		
		var AMSOption = this.data('AMS-option');
		
		if(AMSOption.AMSFrozen && AMSOption.AMSFrozen == true) {
			this.jqGrid('destroyFrozenColumns');
		}

		this.jqGrid('setGroupHeaders', {
            useColSpanStyle: true,
            groupHeaders: headers
		});
		
		if(AMSOption.AMSFrozen && AMSOption.AMSFrozen == true) {
			this.jqGrid('setFrozenColumns');
			// frozen grid 되는 마지막 column의 옆이 groupheader이면 tr을 하나더 복사하는 bug가 있다.
			// frozencolumn을 한뒤 해당 조건일 경우 보정 작업을 해줘야 한다.
			var araiLabel = this.attr('aria-labelledby');
			var $frozenTable = $('.frozen-div.ui-state-default.ui-jqgrid-hdiv').find('[aria-labelledby="'+araiLabel+'"]');
			var $firstRow = $frozenTable.find('.jqg-first-row-header');
			var firstRowCnt = $firstRow.find('th').length;
			
			var $nextRow = $firstRow;
			// colspan 처리
			while($nextRow.length != 0) {
				$nextRow = $nextRow.next();
				var $nextRowTd = $nextRow.find('th');
				var nextRowCnt = 0;
				for(var i = 0; i < $nextRowTd.length; i++) {
					var $td = $($nextRowTd[i]);
					var colspan = $td.attr('colspan')||"1";
					nextRowCnt += parseInt(colspan);
					if(firstRowCnt == nextRowCnt) {
						for(var j = i + 1; j < $nextRowTd.length; j++)
							$($nextRowTd[j]).remove();
						
						break;
					}
				}
			}
			
			$nextRow = $firstRow;
			// rowspan 처리
			while($nextRow.length != 0) {
				$nextRow = $nextRow.next();
				var $nextRowTd = $nextRow.find('th');
				var nextRowCnt = 0;
				for(var i = 0; i < $nextRowTd.length; i++) {
					var $td = $($nextRowTd[i]);
					var rowspan = $td.attr('rowspan')||"1";
					if(rowspan!="1") {
						var rowspanCnt = parseInt(rowspan);
						var $nextNextRow = $nextRow;
						for(var j = 0; j < rowspanCnt; j ++) {
							$nextNextRow = $nextNextRow.next();
							$nextNextRow.find('th:eq(' + i + ')').remove();
						}
					}
				}
			}
		}
		if(test) return ;
		
		var starData = this.data('star-data');
		starData = starData||{};
		starData.callCnt = starData.callCnt||0;
		starData.rowspan = starData.rowspan||{};
		starData.groupHeaders = starData.groupHeaders||[];
		starData.callCnt++;
		
		if(!headersetFlag)
			starData.groupHeaders.push(headers);
		
		if(starData.callCnt==1) {
			var GRIDHeader = $('.ui-jqgrid-htable[aria-labelledby="gbox_'+ this.attr('id') + '"]');
			var thArray = GRIDHeader.find('tr').find('th[rowspan]');
			for(var i = 0; i < thArray.length; i++) {
				var $th = $(thArray[i]);
				var rowspan = $th.attr('rowspan');
				starData.rowspan[$th.attr('id')] = rowspan||2;
			}
		} else {
			var GRIDHeader = $('.ui-jqgrid-htable[aria-labelledby="gbox_'+ this.attr('id') + '"]');
			var thArray = GRIDHeader.find('tr').find('th[rowspan]');
			for(var i = 0; i < thArray.length; i++) {
				var $th = $(thArray[i]);
				var rowspan = (starData.rowspan[$th.attr('id')]||2) + 1;
				$th.attr('rowspan', rowspan);
				starData.rowspan[$th.attr('id')]++;
			}
		}
		
		this.data('star-data', starData);
		
		// frozen grid header 사이즈 조절
		fixPositionsOfFrozenDivs.apply(this[0], arguments);
		fixPositionsOfFrozenDivs.apply(this[0], arguments);
	});
	
	/**
	 * Header Label 변경
	 */
	star.define('HeaderSet', function(column, data, addclass, property) {
		if (!this.hasClass('AMS-grid'))
			return star.callSuper(this, arguments);

		var starData = this.data('star-data');
		
		if(starData && starData.groupHeaders) {
			this.jqGrid('destroyGroupHeader');
			
			star.callSuper(this, arguments);
			
			for(var i = 0; i < starData.groupHeaders.length; i++)
				this.HeaderGroup(starData.groupHeaders[i], true);
		} else 
			star.callSuper(this, arguments);		
	});
	
	/**
	 * Header 병합
	 */
	star.define('HeaderMerge', function(headers) {
		if (!this.hasClass('AMS-grid'))
			return star.callSuper(this, arguments);
		
		var GRIDHeader = $('.ui-jqgrid-htable[aria-labelledby="gbox_'+this.attr('id')+'"]');
		var headerTr = $(GRIDHeader.find('tr[role="rowheader"]')[0]);
		var cloneHeaderTr = headerTr.clone();

		headerTr.find('th').find('div').text('').height(0);

		headerTr.find('th').text('').height(0);
		cloneHeaderTr.attr('role', '');
		for(var i = 0; i < headers.length; i++) {
			var headerId = headers[i].startColumnName;
			var headerMergeCnt = headers[i].numberOfColumns;
			var $headerIds = cloneHeaderTr.find('[id="'+this.attr('id')+'_'+headerId+'"]').attr('colspan', headerMergeCnt).css({'text-align' : 'center', 'width' : ''});
			
			for(var j = 0; j < headerMergeCnt - 1; j++) {
				$headerIds.next().remove();
			}
		}
		GRIDHeader.append(cloneHeaderTr);
		
		// frozen grid header 사이즈 조절
		fixPositionsOfFrozenDivs.apply(this[0], arguments);
	});
	// Grid Project Extend End
	
	// Button Extension
	star.define('Button', function(options){
		star.callSuper(this, arguments);
		
		if(options == undefined)
			return false;
		
		var role = '';
		var btn_role = $.Session('current_Role');
		
		if(options.role == undefined)
			role = 'all';
		else
			role = options.role;
		
		
		switch(role) {
		case 'update':
			if(btn_role.role_update == 'N') {
				$(this).Disable();
				$(this).Hide();
			}
			break;
		case 'insert':
			if(btn_role.role_insert == 'N') {
				$(this).Disable();
				$(this).Hide();
			}
			break;
		case 'delete':
			if(btn_role.role_delete == 'N') {
				$(this).Disable();
				$(this).Hide();
			}
			break;
		default:
			return;
		}
	});
	
	star.define('Value', function(value) {
		
		if(!this.is('p, span')){
			var a = star.callSuper(this, arguments);
			// FIXME mobile select 적용
			if(value !== undefined && isMobile && this.is('select')) {
				this.selectmenu('refresh');
			}
			
			return a;

		}
		if(value) {
			$(this).attr('title', value);
			return $(this).text(value);
		} else
			return $(this).text();
		
	});

	star.define('Fields', function(val) {

		if(val === undefined) {
			var value = star.callSuper(this, arguments);

			this.find('p, span').each(function() {
				var c = $(this);
				var id = c.attr('id');

				value[id] = c.text();
			});

			return value;
		} else {
			star.callSuper(this, arguments);

			this.find('p, span').each(function() {
				$(this).attr('title', val[$(this).attr('id')]);
				$(this).Value(val[$(this).attr('id')]);
			});

			return this;
		}
	});


	// Record / RecordSet Project Extend Start
	/**
	 * [ Grid 관련 확장 기능만 들어가 있음 ]
	 * Record를 가져오는 로직상 완벽한 record복원이 되지 않음
	 * 그렇다고 RecordSet을 호출후 rowid에 해당하는 record를 반환해 주자니
	 * 성능상 문제가 있음 
	 */
	star.define('Record', function(rowid, value) {
		if (!this.hasClass('AMS-grid-merge')) {
			return star.callSuper(this, arguments);
		}
		
		if(value==undefined) {
			var row = this.find('tr[id="'+ rowid +'"]');			
			var rowObj = this.jqGrid('getRowData', $(this.find('tr')[1]).attr('id'));	// 첫번째 row 값
			
			var record = RowMergeRecord(this, row, rowid, rowObj);
			var mergeColumns = this.data('star-merge-column');
			
			// RowMergeRecord를 부르게 되면 remove된 컬럼에 대해 복원 처리를 해준다.
			// 하지만 이 복원된 값은 잘못된 값이므로
			// record의 경우는 remove된 컬럼에 대해서 복원 처리를 하지 않도록 해준다.
			for(var mCol in mergeColumns) {
				delete record[mCol];
			}
			
			return record;
		} else {
			return star.callSuper(this, arguments);
		}
	});
	
	/**
	 * [ Grid 관련 확장 기능만 들어가 있음 ]
	 * Grid 안 Selectbox를 사용 할시 Value - Label 값 전환
	 * Grid 에 Mearge된 부분이 있을시 값 반환시 값이 비는 부분을 보정 처리
	 */
	star.define('RecordSet', function(data) {
		if (!this.hasClass('AMS-grid')) {
			return star.callSuper(this, arguments);
		}
		if (!this.hasClass('AMS-grid')) {
			if (this.hasClass('star-pager')) {
				if(data.nc_totalRecordCount== 0) {
					data.nc_totalRecordCount = 1;
					var ret = star.callSuper(this, arguments);
					data.nc_totalRecordCount = 0;
					return ret;
				}
			}
			return star.callSuper(this, arguments);
		}
		
		if(data!==undefined) {
			var recordSet = data;
			var rowObj = recordSet.nc_list[0];
			
			var selectColums = getSelectColumList(rowObj, this);
			// grid에 select column이 있을 때
			if(selectColums.length > 0) {
				for(var i = 0; i < recordSet.nc_list.length; i++) {
					var record = recordSet.nc_list[i];
					
					for(var j = 0; j < selectColums.length; j++) {
						var value = record[selectColums[j].name];
						var label = convertValueToLabel(value, selectColums[j].options);
						
						record[selectColums[j].name] = label;
					}
				}
			}
			
			var AMSOption = this.data('AMS-option');
			
			var ret = star.callSuper(this, arguments);
			
			if(AMSOption.grouping===true) {
				this.find('[data-role="gridsub"]').closest('tr').hide();
				var jqfooter = this.find('.jqfoot');
				for(var jqfooter_last_index = jqfooter.length - 1; jqfooter_last_index > 0; jqfooter_last_index--) {
					var moveJqFooter = jqfooter.eq(jqfooter_last_index);
					var locJqFooter = jqfooter.eq(jqfooter_last_index - 1);
					  
					moveJqFooter.insertBefore(locJqFooter);
				}
				jqfooter.eq(0).insertBefore(this.find('tbody > tr:eq(1)'));
			}
			
			return ret;
		}
	
		var recordSet = star.callSuper(this, arguments);
		
		if(data===undefined && recordSet.nc_list.length > 0) {
			var rowObj = recordSet.nc_list[0];
			
			// RowMerge된 상태의 Grid
			if(this.hasClass('AMS-grid-merge')) {
				recordSet = RowMergeRecordSet(this, rowObj);
			}
			
			var selectColums = getSelectColumList(rowObj, this);
			
			// grid에 select column이 있을 때
			if(selectColums.length > 0) {
				for(var i = 0; i < recordSet.nc_list.length; i++) {
					var record = recordSet.nc_list[i];
					
					for(var j = 0; j < selectColums.length; j++) {
						var label = record[selectColums[j].name];
						var value = convertLabelToValue(label, selectColums[j].options);
						
						record[selectColums[j].name] = value;
					}
				}
			}
		}
		
		return recordSet;
	});
	
	/**
	 * RecordSet 처리에 사용
	 */
	function convertLabelToValue(label, options) {
		if(options===undefined) {
			return '';
		}
		var VALUE = '';
		for(var value in options.value) {
			if(options.value[value]===label) {
				VALUE = value;
				break;
			}
		}
		
		return VALUE;
	}
	
	/**
	 * RecordSet 처리에 사용
	 */
	function convertValueToLabel(value, options) {
		if(options===undefined) {
			return '';
		}
		var LABEL = options.value[value];
		
		return LABEL||value;
	}

	/**
	 * RecordSet 처리에 사용
	 */
	function getSelectColumList(rowObj, grid) {
		var selectColums = [];
		for(var col in rowObj) {
			var colPropArr = $(grid).jqGrid('getColProp', col);
			if(colPropArr.edittype==='select') {
				selectColums.push({
					name: col,
					options: colPropArr.editoptions
				});
			}
		}
		return selectColums;
	}

	/**
	 * RecordSet 처리에 사용
	 */
	function getSelectColumList(rowObj, grid) {
		var selectColums = [];
		for(var col in rowObj) {
			var colPropArr = $(grid).jqGrid('getColProp', col);
			if(colPropArr.edittype==='select') {
				selectColums.push({
					name: col,
					options: colPropArr.editoptions
				});
			}
		}
		return selectColums;
	}
	// Record Project Extend End
	
	// Form Project Extend Start
	star.ui.Form.validation_error = 'alert';
	$(function() {
		var defaults = {};
		
		defaults.onkeyup = false;
		defaults.onclick = false;
		defaults.onfocusout = false;
		defaults.showErrors = function(errorMap, errorList) {
			if (this.numberOfInvalids()) {
				var jElement = $(errorList[0].element);
				jElement.focus();
				if(jElement.data('starValidMsg')) {
					window.alert(jElement.data('starValidMsg'));
				} else {
					window.alert(jElement.attr('starValidLabel') + errorList[0].message);
				}
			}
		};

		$.validator.setDefaults(defaults);

		$.extend($.validator.messages, {
			required: ': 반드시 입력해야 합니다.',
			remote: ': 수정 바랍니다.',
			email: ': 이메일 주소를 올바로 입력하세요.',
			url: ': URL을 올바로 입력하세요.',
			date: ': 날짜가 잘못 입력됐습니다.',
			dateISO: ': ISO 형식에 맞는 날짜로 입력하세요.',
			number: ': 숫자만 입력하세요.',
			digits: ': 숫자(digits)만 입력하세요.',
			creditcard: ': 올바른 신용카드 번호를 입력하세요.',
			maxlength: $.validator.format(': {0}글자 이상은 입력할 수 없습니다.'),
			minlength: $.validator.format(': 적어도 {0}글자는 입력해야 합니다.'),
			rangelength: $.validator.format(': {0}글자 이상 {1}글자 이하로 입력해 주세요.'),
			range: $.validator.format(': {0}에서 {1} 사이의 값을 입력하세요.'),
			max: $.validator.format(': {0} 이하로 입력해 주세요.'),
			min: $.validator.format(': {0} 이상으로 입력해 주세요.')
		});
	});
	
	star.define('Form', function(option) {
		if(!this.is('form')) {
			return star.callSuper(this, arguments);
		}
		
		if(option!=undefined && option.validation!==undefined) {
			for(var inp in option.validation) {
				var jInp = $('#' + inp);
				jInp.attr('starValidLabel', option.validation[inp].name||inp);
				if(option.validation[inp].msg) {
					jInp.data('starValidMsg', option.validation[inp].msg);
					delete option.validation[inp].msg;
				}
				if(option.validation[inp].name) delete option.validation[inp].name;
			}
		}
		
		return star.callSuper(this, arguments);
	});
	// Form Project Extend End
	
	// Date / Month Project Extend Start
	/**
	 * Date / Month 값 바인딩 전 연산
	 */
	var dateCalcFunc = function(option) {
		var dayCalcList = option.split(',');
		var exType = false;
		var exChecker = 0;
		var today = new Date();
		
		// 2글자나 3글자가 아니면 날이 입력 된거
		if(dayCalcList.length==1 && !(option.length==2 || option.length==3)) {
			return null;
		}
		
		for(var i = 0; i < dayCalcList.length; i++) {
			if(dayCalcList[i]=='FDM' || dayCalcList[i]=='LDM' || dayCalcList[i]=='FDW' || dayCalcList[i]=='LDW') {
				exType = true;
				exChecker++;
				continue;
			}
			var type = dayCalcList[i].charAt(dayCalcList[i].length - 1);
			var num  = parseInt(dayCalcList[i].substring(0, dayCalcList[i].length - 1));
			switch(type) {
			case 'Y':
				today.setFullYear(today.getFullYear() + num);
				break;
			case 'M':
				today.setMonth(today.getMonth() + num);
				break;
			case 'W':
				today.setDate(today.getDate() + (num * 7));
				break;
			case 'D':
				today.setDate(today.getDate() + num);
				break;
			default:
				alert('Date Component Parse Error');
				return undefined;
			}
		}
		if(exChecker > 1) {
			alert('FDM, LDM, FDW, LDW는 하나만 사용해야 합니다.');
			return undefined;
		}
		if(exType==true) {
			for(var i = 0; i < dayCalcList.length; i++) {
				switch(dayCalcList[i]) {
				case 'FDM':
					today.setDate(1);
					break;
				case 'LDM':
					var month = today.getMonth() + 1;
					if( month==1 || month==3 || month==5 || month==7 || month==8 || month==10 || month==12 ) {
						today.setDate(31);
					} else if( month==2 ) {
						// 윤년 적용 안됨.. 너무 힘듬.
						today.setDate(28);
					} else {
						today.setDate(30);
					}
					break;
				case 'FDW':
					var day = today.getDay();
					today.setDate(today.getDate() - day);
					break;
				case 'LDW':
					var day = today.getDay();
					today.setDate(today.getDate() + (6 - day));
					break;
				}
			}
		}
		
		return today;
	}

	/**
	 * 인자값을 받아서 해당 일로 값 바인딩
	 */
	star.define('Date', function(option) {
		option = option || {};

		star.callSuper(this, arguments);
		
		if(typeof option == 'string') {
			var today = dateCalcFunc(option);
			
			if(today==null) {
				option = {
					defaultValue: option
				};
			} else {
			
				if(today==undefined) return ;
				
				var todayY = today.getFullYear();
				var todayM = today.getMonth() + 1;
				var todayD = today.getDate();
				option = {
					defaultValue: todayY + '-' + (todayM < 10 ? '0' : '') + todayM + '-' + (todayD < 10 ? '0' : '') + todayD
				};
			}
		}

		if (!option.defaultValue) {
			var today = new Date();
			var todayY = today.getFullYear();
			var todayM = today.getMonth() + 1;
			var todayD = today.getDate();

			option.defaultValue = todayY + '-' + (todayM < 10 ? '0' : '') + todayM + '-' + (todayD < 10 ? '0' : '') + todayD;
		}

		switch (option.defaultValue.length) {
			case 8:
				option.defaultValue = option.defaultValue.substr(0, 4) + '-' + option.defaultValue.substr(4, 2) + '-' + option.defaultValue.substr(6, 2);
				break;
			case 10:
				break;
			default:
				break;
		}

		return this.Value(option.defaultValue).attr('readonly', 'readonly').css('background-color', '#eee');
	});
	
// 	GridEdit 변경시 동작
	function RowEditChange(event) {
		var editobj_id = $(this).attr('id');
		var editobj_name = $(this).attr('name');
		if(editobj_id===undefined || editobj_name===undefined) return true;
		var rowid = editobj_id.substr(0, editobj_id.length - editobj_name.length - 1);
		
		// select box 일대의 이벤트 처리
		if(event.type==='change') {
			if ($('#' + event.data).Column(rowid, 'Flag') === 'R') { // flag를 R인 경우만 클릭시에 flag를 U로 변경
				$('#' + event.data).Column(rowid, 'Flag', 'U'); 
			}
		}
		
		var keycode = event.keyCode;
		// backspace
		if( keycode == 8 ||
			keycode == 32 ||
			keycode == 46 ||
			(keycode >= 48 && keycode <= 57) ||
			(keycode >= 65 && keycode <= 90) ||
			(keycode >= 96 && keycode <= 111) || 
			keycode == 188 ||
			keycode == 190 ||
			keycode == 191 ||
			keycode == 192 ||
			keycode == 219 ||
			keycode == 220 ||
			keycode == 221 ||
			keycode == 222 ||
			keycode == 229) {
			if ($('#' + event.data).Column(rowid, 'Flag') === 'R') { // flag를 R인 경우만 클릭시에 flag를 U로 변경
				$('#' + event.data).Column(rowid, 'Flag', 'U'); 
			}
		}
		
		return true;
	}
	
	// Row를 Edit 모드로 변경한다.
	// Arg1 : Row ID
	// Arg2 : []
	//    Flag 'C' : editmode를 true로 만들 column id list
	//    Flag 'R,U,D' : editmode를 false로 만들 column id list
	star.define('AMSRowEdit', function(row, focusColid, column, changefunc){
		if (!this.hasClass('AMS-grid'))
			return star.callSuper(this, arguments);
		
		if(Object.prototype.toString.call(focusColid)=='[object Array]') {
			if(typeof column == 'function') {
				changefunc = column;
			}
			column = focusColid;
			focusColid = undefined;
		}
		
		column = column||[];
		if (this.Column(row, 'Flag') === 'C') {
			for(var i = 0; i < column.length; i++)
				this.ColProp(column[i], {editable:true});
		} else {
			for(var i = 0; i < column.length; i++)
				this.ColProp(column[i],{editable:false});
		}
		
		this.jqGrid('editRow',row, 
				{ 
		    keys : true, 
		    url: 'clientArray'
		});
		
		changefunc = changefunc||RowEditChange;
		var editRow = this.find('[id="'+row+'"]');
		
		if(changefunc) {
			editRow.find('input').change(gridName, RowEditChange);
			editRow.find('select').change(gridName, changefunc);
			editRow.find('.hasDatepicker').change(gridName, changefunc);
			editRow.find('.hasMonthpicker').change(gridName, changefunc);
		}
		var gridName = $(this).attr('id');
		editRow.find('input').bind('keydown', gridName, RowEditChange);
		editRow.find('select').change(gridName, RowEditChange);
		editRow.find('.hasDatepicker').change(gridName, RowEditChange);
		editRow.find('.hasMonthpicker').change(gridName, RowEditChange);

		var td0Arr = this.find('tr#1 > td');
		for(var i = 0; i < td0Arr.length; i++) {
			var colid = $(td0Arr[i]).attr('aria-describedby').substr(gridName.length + 1);
			var colPropArr = this.jqGrid('getColProp', colid);
			if(colPropArr.editvalid!==undefined && !(colPropArr.edittype == 'date' || colPropArr.edittype == 'month')) {
				var cellInput = editRow.find('[aria-describedby="' + gridName +'_' + colid + '"]').find('input');
				cellInput.focusout([colPropArr.editvalid, gridName], gridValidation);
				$(this).attr('vaild-check', 'true');
			}
		}
		
		// DataPicker bug fix
		var dateMonthPicker = this.find('div').find('input');
		if(dateMonthPicker.hasClass('hasDatepicker')) {
			dateMonthPicker.datepicker('option', 'showOn', 'focus');
		} else {
			dateMonthPicker.monthpicker('option', 'showOn', 'focus');
		}

		if(focusColid) {
			if(typeof focusColid == 'object') {	// e.target으로 온경우
				var child = focusColid.target.children;

				// DatePicker 용
				if($(child).find('input').length!=0)
					child = $(child).find('input');
				
				if(child)
					$(child).focus();
			} else {
				var cellcontent = $(this.jqGrid('getCell', row, focusColid));
				$('#' + cellcontent.attr('id')).focus();
			}
		}
		
        return this;
	});
	

	/**
	 * 인자값을 받아서 해당 일로 값 바인딩
	 */
	star.define('Month', function(option) {
		option = option || {};

		if (option.change !== undefined)
			this.change(option.change);
		
		$(this).find('.hasMonthpicker').each(function() {
			$(this).Disable();
		});
		
		star.callSuper(this, arguments);
		
		if(typeof option == 'string') {
			var today = dateCalcFunc(option);
			
			if(today==null) {
				option = {
					defaultValue: option
				};
			} else {
			
				if(today==undefined) return ;
			
				var todayY = today.getFullYear();
				var todayM = today.getMonth() + 1;
				option = {
					defaultValue: todayY + '-' + (todayM < 10 ? '0' : '') + todayM
				};
			}
		}

		if (!option.defaultValue) {
			var today = new Date();
			var todayY = today.getFullYear();
			var todayM = today.getMonth() + 1;

			option.defaultValue = todayY + '-' + (todayM < 10 ? '0' : '') + todayM;
		}

		switch (option.defaultValue.length) {
			case 6:
				option.defaultValue = option.defaultValue.substr(0, 4) + '-' + option.defaultValue.substr(4, 2);
				break;
			case 7:
				break;
			default:
				break;
		}

		return this.Value(option.defaultValue).attr('readonly', 'readonly').css('background-color', '#eee');
	});
	
	/**
	 *  Month와 Date 두자리로 맞추기
	 */
	$.LeadingZero = function(num) {
		if (num < 10)
			return '0' + num;
		else
			return num;
	};
	
	/**
	 *  전년도 동요일 계산
	 */
	$.LastYearDay = function(day) {
		if (day === undefined)
			return false;
		
		var msDay = 24 * 60 * 60 * 1000;
		var curTime = new Date();
		var curYear = day.split('-')[0];
		var curMonth = day.split('-')[1] - 1;
		var curDate = day.split('-')[2];
		
		curTime.setYear(curYear);
		curTime.setMonth(curMonth);
		curTime.setDate(curDate);
		
		var curDay = curTime.getDay();
		
		var lastYearTime = curTime;
		lastYearTime.setYear(curYear - 1);
		var lastYearDay = lastYearTime.getDay();

		if (curDay > lastYearDay) {
			var tmpDay = curDay - lastYearDay;
			lastYearTime.setTime(lastYearTime.getTime() + tmpDay * msDay);
		} else {
			tmpDay = lastYearDay - curDay;
			lastYearTime.setTime(lastYearTime.getTime() - tmpDay * msDay);
		}
		
		return lastYearTime;
	};
	/**
	 * 2013-10-10 성지호.
	 * 박대리님 요청으로 Date 값 처리 (input field) 에 대해서 '-'를 자동으로 삽입 / 삭제함.
	 */
	star.define('Value', function(val) {
		if (!(this.hasClass('hasDatepicker') || this.hasClass('hasMonthpicker'))) {
			return star.callSuper(this, arguments);
		}
		
		if(val) {
			if(val.length===8) {
				val = val.substring(0, 4) + '-' + val.substring(4, 6) + '-' + val.substring(6, 8);
			} else if(val.length===6) {
				val = val.substring(0, 4) + '-' + val.substring(4, 6);
			}
			return star.callSuper(this, arguments);
		}
		
		var value = star.callSuper(this, arguments);
		
		return (typeof value === 'string') ? value.replace(/-/gi, '') : value;
	});
	star.define('Fields', function(val) {
		if (!(this.hasClass('hasDatepicker') || this.hasClass('hasMonthpicker'))) {
			return star.callSuper(this, arguments);
		}
		
		if(val) {
			return star.callSuper(this, arguments);
		}
		
		var value = star.callSuper(this, arguments);
		
		var datePickerArr = this.find('.hasDatepicker');
		for(var i = 0; i < datePickerArr.length; i++) {
			var jObj = $(datePickerArr[i]);
			var id = jObj.attr('id');
			value[id] = jObj.Value();
		}
		
		var monthPickerArr = this.find('.hasMonthpicker');
		for(var i = 0; i < monthPickerArr.length; i++) {
			var jObj = $(monthPickerArr[i]);
			var id = jObj.attr('id');
			value[id] = jObj.Value();
		}
		
		return value;
	});
	// Date / Month Project Extend End
	
	// Memory Management Start
	function purge(d) {
		var a = d.attributes, i, l, n;
		if (a) {
			for (i = a.length - 1; i >= 0; i -= 1) {
				n = a[i].name;
				if (typeof d[n] === 'function') {
					d[n] = null;
				}        
			}    
		}    
		a = d.childNodes;
		if (a) {
			l = a.length;
			for (i = 0; i < l; i += 1) {
				purge(d.childNodes[i]);
			}    
		}
	}
	
	$(window).unload(purge(document));
	// Memory Management End
	
	// Project Common function Start
	var AmsSessionLoading = function(response) {
		var oldTimeStamp = $.Session('MenuTimeStamp');
		var newTimeStamp = response.__MENU_TIMESTAMP__;
		
		if(!newTimeStamp) return ;
		
		if(oldTimeStamp!=newTimeStamp && response.__MENU_INFO__!==undefined) {
			console.log( response.__MENU_INFO__);
			MenuLoading(response.__MENU_INFO__);
			$('#Star_topPage').html($.Session('TOP_PAGE'));
			reloadTop();
			reloadLeft();
		}
		
		$.Session('AMSRoleInfo', response.__ROLE_INFO__);
		$.Session('MenuTimeStamp', newTimeStamp);
		$.Session('PrdGrdInfo', response.__PRD_GRD_INFO__);//사용자별 상품등급정보 Star UI Session에 담음.(2013.09.09 by PSI)
		
		
		//if(response.__MENU_INFO__) delete response.__MENU_INFO__;
		if(response.__ROLE_INFO__) delete response.__ROLE_INFO__;
		if(response.__MENU_TIMESTAMP__) delete response.__MENU_TIMESTAMP__;
		if(response.__PRD_GRD_INFO__) delete response.__PRD_GRD_INFO__;
		
		
		// 로그인 공지 사항 처리 2013.10.25 성지호
		// 최초 로그인시 값이 넘어오는데 response에 바로 붙어 오는지 dataset에 붙어오는지 정의 되지 않아서
		// 이 부분에서 1차 처리를 한다. dataset에 붙어오게 되면 index.jsp에서 1차 처리를 하면 된다.
		if(response.__NOTICE_INFO__) {
			// index.jsp 에서 처리하면 NavigatePost로 넘겨주려고 했는데 여기에 정의하다 보니
			// Session에 넣어놓고 main.jsp 에서 해당 Session의 정보를 읽어 들여서 처리 하도록 만듬.
			
			/*
			// Test Value
			response.__NOTICE_INFO__ = [{
				NOTICE_SEQ_NO: '1',
				NOTICE_DT: '20131025',
				TITLE: '공지사항 테스트',
				CONTENTS: '테스트 공지사항입니다.',
				REG_USER_ID: 'admin',
				REG_DATE: '20131024',
				UPDATE_USER_ID: 'admin',
				UPDATE_DATE: '20131024',
				VIEW_START_DT: '20131025',
				VIEW_END_DT: '20131031',
				TARGET_GROUP_ID: 'A01',
				USE_YN: 'Y',
				NOTICE_HTML_FILE: 'NOTICE_sjh.jsp',
				POP_UP_SIZE: '400',
				width: 400,
				height : 400
			},{
				NOTICE_SEQ_NO: '2',
				NOTICE_DT: '20131025',
				TITLE: '공지사항 테스트',
				CONTENTS: '테스트 공지사항입니다.',
				REG_USER_ID: 'admin',
				REG_DATE: '20131024',
				UPDATE_USER_ID: 'admin',
				UPDATE_DATE: '20131024',
				VIEW_START_DT: '20131025',
				VIEW_END_DT: '20131031',
				TARGET_GROUP_ID: 'A01',
				USE_YN: 'Y',
				NOTICE_HTML_FILE: 'NOTICE_sjh.jsp',
				POP_UP_SIZE: '400',
				width: 400,
				height : 400
			},{
				NOTICE_SEQ_NO: '3',
				NOTICE_DT: '20131025',
				TITLE: '공지사항 테스트',
				CONTENTS: '테스트 공지사항입니다.',
				REG_USER_ID: 'admin',
				REG_DATE: '20131024',
				UPDATE_USER_ID: 'admin',
				UPDATE_DATE: '20131024',
				VIEW_START_DT: '20131025',
				VIEW_END_DT: '20131031',
				TARGET_GROUP_ID: 'A01',
				USE_YN: 'Y',
				NOTICE_HTML_FILE: 'NOTICE_sjh.jsp',
				POP_UP_SIZE: '400',
				width: 400,
				height : 600
			}];
			// Test Value
			*/
			$.Session('FRT_LOGIN_NOTICE_INFO', response.__NOTICE_INFO__);
			delete response.__NOTICE_INFO__;
		}
	};
	
	var MenuLoading = function(menuList) {
		var rootObject = [];
		for(var i = 0; i < menuList.length; i++) {
			if(menuList[i].PARENT_MENU_ID==='ROOT' && menuList[i].ROLE_SELECT==='Y')  {
				rootObject.push(menuList[i].MENU_ID);
			}
		}
		var barCount1 = rootObject.length;				
		var barCount2 = 0;
		var topPage = '<ul class="gnb_menus">';
		for(var i = 0; i < menuList.length; i++) {
			if(menuList[i].PARENT_MENU_ID==='ROOT' && menuList[i].ROLE_SELECT==='Y') {
				// TOP MENU에 들어갈 거
				topPage += '<li id=\"depth1_li_' + menuList[i].MENU_ID + '\">'; // class=\"on\">';
				topPage += '<a href=\"javascript:depth1_click(\''+menuList[i].MENU_ID+'\', \''+ menuList[i].MENU_NAME +'\');\">' + menuList[i].MENU_NAME + '</a>';
				topPage += '</li>';
				if(barCount1!==(barCount2+1)) {
					/*topPage += '<li class=\"bar\"></li>';*/
					barCount2++;
				}
			}
		}
		topPage += '</ul>';
		
		$.Session('TOP_PAGE', topPage);
		
		var leftPage = {};
		
		for(var i = 0; i < rootObject.length; i++) {
			var leftMenu = '<ul class=\"first\">';
			for(var j = 0; j < menuList.length; j++) {
				if(rootObject[i]===menuList[j].PARENT_MENU_ID && menuList[j].ROLE_SELECT ==='Y') {
					leftMenu += '<li>';
					leftMenu += '<a href=\"javascript:void(0);\" onclick=\"javascript:depth2_click(\''+menuList[j].MENU_ID+'\', \''+menuList[j].PAGE_URI+'\', \'' + menuList[j].INTRNL_VIEW + '\', \'' + menuList[j].POPUP_VIEW + '\'); \"><span>' + menuList[j].MENU_NAME + '</span></a>';
					leftMenu += '<ul class=\"second\" id=\"' + menuList[j].MENU_ID + '\">';
					
					var leftMenuId = menuList[j].MENU_ID;
					for(var k = 0; k < menuList.length; k++) {
						if(leftMenuId===menuList[k].PARENT_MENU_ID && menuList[k].ROLE_SELECT ==='Y') {
							leftMenu += '<li>';
							leftMenu += '<a href=\"javascript:void(0);\" onclick=\"javascript:depth3_click(\''+menuList[k].MENU_ID+'\', \''+menuList[k].PAGE_URI+'\', \'' + menuList[k].INTRNL_VIEW + '\', \'' + menuList[k].POPUP_VIEW + '\', \'' + menuList[k].ROLE_SELECT + '\', \'' + menuList[k].ROLE_UPDATE + '\', \'' + menuList[k].ROLE_INSERT + '\', \'' + menuList[k].ROLE_DELETE + '\');\"><span>' + menuList[k].MENU_NAME + '</span></a>';
							leftMenu += '</li>';
						}
					}
					
					leftMenu += '</ul>';
					leftMenu += '</li>';
				}
			}
			leftMenu += '</ul>';
			leftPage[rootObject[i]] = leftMenu;
		}
		$.Session('LEFT_PAGE', leftPage);
	};
	$.MenuReloading = function(location) {
		var request = {USER_ID: ''};
		
		$.Service({
			transaction: 'abm.MNUBBase#pMNU10007',
			request: request,
			success: function(ds) {
				reloadTop();
				if(location !== undefined && location !== ''){
					location.href = contextPath+'/biz/' + location;
				}
			}
		});
	};
	/**
	 * CodeHelper 추가 (2013.10.04. 성지호)
	 */
	$.CodeHelper = function (options, callback) {
		
		// div에 대해서 input, select 객체 리턴
		if(options===undefined) {
			return $.find('.star-codehelper');
		}
		if(typeof options === 'string') {
			return $('#' + options).find('.star-codehelper');
		}
		
		var request = $.DataSet();
		
		request.recordSets.CODE_LIST = {
			nc_list: []
		};
		// 넘어온 Code 값을 서버에 전송할 객체로 값 설정
		for(var i = 0; i < options.length; i++) {
			if (options[i]){
				request.recordSets.CODE_LIST.nc_list.push({
					PARENT_CODE: options[i].parentCode,
					INDEX: i,
					TYPE: options[i].type||'SYS'
				});
			}
		}
		
		$.Service({
			transaction: 'abm.CODBBase#pCOD10006',
			request: request,
			success: function(ds) {
				var codeList = {};
				for(var i = 0; i < ds.recordSets.CODE_LIST.nc_list.length; i++) {
					codeList[ds.recordSets.CODE_LIST.nc_list[i].INDEX] = codeList[ds.recordSets.CODE_LIST.nc_list[i].INDEX]||[];
					codeList[ds.recordSets.CODE_LIST.nc_list[i].INDEX].push(ds.recordSets.CODE_LIST.nc_list[i]);
				}
				
				for(var i = 0; i < options.length; i++) {
					if (options[i]){
						var code = options[i];
						var jDiv = $('#' + code.divId);
						switch(code.style) {
							case 'select':
								jDiv.html('<select id="' + code.codeId + '" name="' + code.codeId + '" class="star-codehelper" />');
								if(code.blank == false) {
									$('#' + code.codeId).Select({
										value: code.codeValueId||'CODE_ID',
										label: code.codeNameId||'CODE_NAME',
										options: codeList[i],
										change: code.func
									});
								} else {
									$('#' + code.codeId).Select({
										value: code.codeValueId||'CODE_ID',
										label: code.codeNameId||'CODE_NAME',
										blank: {
											value: code.blankValue||'',
											label: code.blankLabel||'==선택=='
										},
										options: codeList[i],
										change: code.func
									});
								} 
								break;
							case 'radio':
								jDiv.html('');
								for(var j = 0; j < codeList[i].length; j++) {
									jDiv.append('<input id="' + code.codeId + '" name="' + code.codeId + '" class="star-codehelper" type="radio" value="'+codeList[i][j][code.codeValueId||'CODE_ID']+'">'+ codeList[i][j][code.codeNameId||'CODE_NAME'] +'</input>');
								}
								$('#' + code.codeId).Radio({
									change: code.func
								});
								break;
							case 'checkbox':
								jDiv.html('');
								for(var j = 0; j < codeList[i].length; j++) {
									var checkBoxCode = code.codeId + j;
									jDiv.append('<input id="' + checkBoxCode + '" name="' + checkBoxCode + '" class="star-codehelper" type="checkbox" >'+ codeList[i][j][code.codeNameId||'CODE_NAME'] +'</input>');
									$('#' + checkBoxCode).CheckBox({
										click: code.func
									});
								}
								break;
						}
					}
				}
				
				if(callback)
					callback();
			}
			
		});

		return true;
	};
	
	$.CodeHelperGrid = function (options) {
		var request = $.DataSet();
		
		request.recordSets.CODE_LIST = {
			nc_list: []
		};
		// 넘어온 Code 값을 서버에 전송할 객체로 값 설정
		for(var i = 0; i < options.length; i++) {
			if (options[i]){
				request.recordSets.CODE_LIST.nc_list.push({
					PARENT_CODE: options[i].parentCode,
					INDEX: i,
					TYPE: options[i].type||'SYS'
				});
			}
		}
		var $this = this;
		
		$.Service({
			transaction: 'abm.CODBBase#pCOD10006',
			request: request,
			success: function(ds) {
				var codeList = {};
				for(var i = 0; i < ds.recordSets.CODE_LIST.nc_list.length; i++) {
					codeList[ds.recordSets.CODE_LIST.nc_list[i].INDEX] = codeList[ds.recordSets.CODE_LIST.nc_list[i].INDEX]||[];
					codeList[ds.recordSets.CODE_LIST.nc_list[i].INDEX].push(ds.recordSets.CODE_LIST.nc_list[i]);
				}
				
				$this.data('star-codehelper', codeList);
			}
		});

		return true;
	};
	
/*	var dialoghtmlS = '<div id="msg">';
	var dialoghtmlE = '</div>';
	$.Push({
		handler : function(msg) {
			//console.log(msg);
			try {
				for(var i = 0; i < msg.recordSets.PUSH_LIST.nc_list.length; i++) {
					var $dialog = $(dialoghtmlS + msg.recordSets.PUSH_LIST.nc_list[i].MSG + dialoghtmlE);
					$dialog.Dialog().Title('관리자 메시지').Open();
				}
			} catch(e) {
				
			}
			
		},
		transaction: 'com.COMBBase#pCOM10301'
	});
*/	// Project Common function End
	
})(window, jQuery,hostIp);