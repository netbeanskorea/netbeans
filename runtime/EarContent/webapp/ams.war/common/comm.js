//
// SearchArea Open / Close
//
var isSearchDownOpened = true;
var searchAreaHeight = $('.searchArea').find('form').height();
function SlideDownSearch() {
    if ($('.searchArea').is('.open') == true) {
        searchAreaHeight = $('.searchArea').find('form').height();
		
		$(".searchArea").animate({ 
			height: 26
		}, {
			duration: "slow",
			complete: function() {
				if ($('.popupContent').width() !== null && $('.MSS-grid').attr('id') !== undefined) {
					var gridWidth = $('.popupContent').width();
					var grid = $('.MSS-grid').attr('id');
					$('#' + grid).WidthResize(gridWidth);
				}
			},
			step: function() {
				if ($('.popupContent').width() !== null && $('.MSS-grid').attr('id') !== undefined) {
					var gridWidth = $('.popupContent').width();
					var grid = $('.MSS-grid').attr('id');
					$('#' + grid).WidthResize(gridWidth);
				}
			}
		});
		
        $('.searchArea').removeClass('open').addClass('close');
        isSearchDownOpened = false;
		
    } else if($('.searchArea').is('.close') == true){
		searchAreaHeight = $('.searchArea').find('form').height();
		
        $(".searchArea").animate({ 
			height: searchAreaHeight 
		}, {
			duration: "slow",
			complete: function() {
				if ($('.popupContent').width() !== null && $('.MSS-grid').attr('id') !== undefined) {
					var gridWidth = $('.popupContent').width();
					var grid = $('.MSS-grid').attr('id');
					$('#' + grid).WidthResize(gridWidth);
				}
			},
			step: function() {
				if ($('.popupContent').width() !== null && $('.MSS-grid').attr('id') !== undefined) {
					var gridWidth = $('.popupContent').width();
					var grid = $('.MSS-grid').attr('id');
					$('#' + grid).WidthResize(gridWidth);
				}
			}
		});
		
        $('.searchArea').removeClass('close').addClass('open');
        isSearchDownOpened = true;
    }
}
function depth1_click(a, b) {
	a = a||'';
	b = b||'';
	
	$.Cookie('depth_menu_id', a);
	$.Cookie('depth_menu_nm', b);
	
	$('#depth1_li_' + a).addClass('on').siblings().removeClass('on');
	
	reloadLeft();
}

function reloadLeft() {
	var menuId = $.Cookie('depth_menu_id');
	//var title = $.Cookie('depth_menu_nm');
	var title = $('#depth1_li_'+menuId+' > a').text();//다국어 지원을 위해 상단메뉴코드를 통해 메뉴명을 취득
	
	
	var leftPage = $.Session('LEFT_PAGE');
	if(!(leftPage)) return ;
	var value = leftPage[menuId];
	
	value = value||'';
	title = title||'';
	
    // title
    $("#tit_depth01_text").remove();
    var leftTitle = '<div id="tit_depth01_text" class="tit_depth01_text">' + title + '</div>';
    $('#tit_depth01').append(leftTitle);

    // assign
    $('#snb_list').remove();
    $('#leftMenuArea').append('<div id="snb_list" class="snb_list">' + value + '</div>');
    
    var depth2 = $.Cookie('depth2_menu_id');
	var depth3 = $.Cookie('depth3_menu_id');
	
	var classId = "depth1_li_" + menuId;
	$('#' + classId).removeClass('on');
	$('#' + classId).addClass('on');
		
	if(depth2 != null && (depth3 != null && depth3 != '')){
		$('#' + depth3.substr(0, 5)).parent().addClass('on').siblings().removeClass('on');

		$('#leftMenuArea li ul li').removeClass('on');
	    var depth3_num = parseInt(depth3.substr(6,7), 10);
	    $('#' + depth3.substr(0, 5)).find('li:nth-child('+depth3_num+')').addClass('on');
	}
}

function reloadTop() {
	var topPage = $.Session('TOP_PAGE');
	$('#topmenu').html(topPage);
}
function saveLeft() {
	// left page 모습 유지
    var leftPage = $.Session('LEFT_PAGE');
    var root_id = $.Cookie('depth_menu_id');
	leftPage[root_id] = $('#snb_list').html();
    $.Session('LEFT_PAGE', leftPage);
}


function depth2_click(a, b, intrnlView, popupView) {
	$.Cookie('depth2_menu_id',a);
	$.Cookie('depth2_menu_nm',b);
	$.Cookie('Is_Second','false');
	
    if(b.length > 0){
    	if ($("#" + a).is(':hidden')) {
        $.Cookie('Is_Second','true');
        }
    }
	
    if ($("#" + a).is(':hidden')) {
        $("#" + a).slideDown({
        	complete: function() {
        		saveLeft();
        	},
        	step: function() {
        		saveLeft();
        	}
        });
    } else {
        $("#" + a).slideUp(); 
    }
    
    saveLeft();
    
    if (b.length > 0) {
    	
    	if(intrnlView=='Y' || intrnlView === undefined) {
    		$.Cookie('current_menu_id_ams', a);
//    		window.location.href = contextPath + '/' + b;
    	}
    	if(intrnlView=='N' && popupView=='Y')
    		window.open(b);
    	if(intrnlView=='N' && popupView=='N') {
    		$.NavigatePost(contextPath + '/EXT.jsp', b);
    	}
    }
    
    $('#leftMenuArea li').removeClass('on');
    $('#' + a).parent().addClass('on');
}

function depth3_click(a, b, intrnlView, popupView, role_select, role_update, role_insert, role_delete) {
	var curRole = {
		menu_id: a,
		menu_name: b,
		role_select: role_select,
		role_update: role_update,
		role_insert: role_insert,
		role_delete: role_delete
	};
	
	$.Session('current_Role', curRole);
	
	$.Cookie('Is_Second','false'); 
	$.Cookie('depth3_menu_id',a);
	$.Cookie('depth3_menu_nm',b);
	
    if ($("#" + a).is(':hidden')) {
        $("#" + a).slideDown();
    }
    else {
        $("#" + a).slideUp();
    }
    
    saveLeft();
    
    if (b.length > 0) {
    	// TODO context root가 변경 되었을 시
    	if(intrnlView=='Y' || intrnlView === undefined) {
    		$.Cookie('current_menu_id_ams', a);
    		window.location.href = contextPath + '/' + b;
    	}
    	if(intrnlView=='N' && popupView=='Y')
    		window.open(b);
    	if(intrnlView=='N' && popupView=='N') {
    		$.NavigatePost(contextPath + '/EXT.jsp', b);
    	}
    }
}
