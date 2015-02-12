<%@ page pageEncoding="utf-8"%>
<script>
var isLeftOpened = true;
var curWidth = '';
var grdwidth = $('#contentArea').width();

function SlideLeft() {
	if(isLeftOpened) {
		$("#leftArea").data('star-width', $('#leftArea').width());

		$("#leftArea").hide("slow");
		
		$('.ui-jqgrid-btable').each(function () {
            if ($(this).closest('.tb_basic').parent().is('td') === true) {
                curWidth = $(this).closest('.tb_basic').width();
            }
        });
		
		$("#controlLeftArea").animate({
			"margin-left": -16
		}, "slow");

		$("#contentArea").animate({
			width: $("#contentArea").width() + $("#leftArea").data('star-width')
		}, {
			duration: "slow",
			complete: function() {
				$('.highcharts-container').parent().each(function() {
					$(this).Build({
						chart: {
							width: null
						//$(this).parent().width()
						}
					});
				});//.show();});
		
				$('.ui-jqgrid-btable').each(function() {
					//$(this).data('star-width', $(this).jqGrid('getGridWidth'));
					if ($(this).closest('.tb_basic').parent().is('td') == false) {
                        grdwidth = $(this).closest('.tb_basic').width() - 1;
                       	$(this).WidthResize(grdwidth);
                    } else if($(this).closest('.tb_basic').parent().is('td') == true){
                    	grdwidth = $(this).closest('td').width();
                    	$(this).WidthResize(grdwidth);
                    }

				    // textarea size auto resize - mearge 부분에서도 한번더
                    var textAreaArray = $(this).find('textarea');
                    for (var i = 0; i < textAreaArray.length; i++) {
                        var $ta = $(textAreaArray[i]);
                        $ta.width($ta.parent().width() - 10);
                    }
				});
			},
			step: function() {
				$('.ui-jqgrid-btable').each(function () {
					if ($(this).closest('.tb_basic').parent().is('td') == false) {
                        grdwidth = $(this).closest('.tb_basic').width() - 1;
                       	$(this).WidthResize(grdwidth);
                    } else if($(this).closest('.tb_basic').parent().is('td') == true){
                    	grdwidth = $(this).closest('td').width();
                    	$(this).WidthResize(grdwidth);
                    }

                    // textarea size auto resize - mearge 부분에서도 한번더
                    var textAreaArray = $(this).find('textarea');
                    for (var i = 0; i < textAreaArray.length; i++) {
                        var $ta = $(textAreaArray[i]);
                        $ta.width($ta.parent().width() - 10);
                    }
                });
			}
		});
		$("#controlLeftArea").addClass('close');

		document.slideLeft.src = "<%= hostIp %>/images/left/btn_left_open.png";
		isLeftOpened = false;
	} else {
		$("#leftArea").data('star-width', $('#leftArea').width());
		$("#leftArea").show("slow");
		$("#controlLeftArea").animate({
			"margin-left": 166
		}, "slow");
		$("#controlLeftArea").removeClass('close');

		$("#contentArea").animate({
			width: $("#contentArea").width() - $('#leftArea').data('star-width')
		}, {
			duration: "fast",
			complete: function() {
				$('.highcharts-container').parent().each(function() {
					$(this).Build({
						chart: {
							width: null
						//$(this).parent().width()
						}
					});
				});//.show();});
				
				$('.ui-jqgrid-btable').each(function() {
					if ($(this).closest('.tb_basic').parent().is('td') == false) {
                        grdwidth = $(this).closest('.tb_basic').width() - 1;
                       	$(this).WidthResize(grdwidth);
                    } else if($(this).closest('.tb_basic').parent().is('td') == true){
                    	grdwidth = curWidth;
                    	$(this).WidthResize(grdwidth);
                    }

				    // textarea size auto resize - mearge 부분에서도 한번더
                    var textAreaArray = $(this).find('textarea');
                    for (var i = 0; i < textAreaArray.length; i++) {
                        var $ta = $(textAreaArray[i]);
                        $ta.width($ta.parent().width() - 10);
                    }
				});
			},
			step: function() {
				$('.ui-jqgrid-btable').each(function () {
					if ($(this).closest('.tb_basic').parent().is('td') == false) {
                        grdwidth = $(this).closest('.tb_basic').width() - 1;
                       	$(this).WidthResize(grdwidth);
                    } else if($(this).closest('.tb_basic').parent().is('td') == true){
                    	grdwidth = curWidth;
                    	$(this).WidthResize(grdwidth);
                    }

                    // textarea size auto resize - mearge 부분에서도 한번더
                    var textAreaArray = $(this).find('textarea');
                    for (var i = 0; i < textAreaArray.length; i++) {
                        var $ta = $(textAreaArray[i]);
                        $ta.width($ta.parent().width() - 10);
                    }
                });
			}
		});

		document.slideLeft.src = "<%=hostIp %>/images/left/btn_left_close.png";
		isLeftOpened = true;
	}
}
</script>

			<div id="leftArea">
				<div class="leftTitle">
					<span id="tit_depth01"><em>커뮤니케이션</em> </span>
				</div>
				<div id="leftMenu" class="leftMenus">
					<div id="leftMenuArea" class="leftMenuList">

					</div>
				</div>
			</div> 

<!-- //controlLeftArea -->
<div id="controlLeftArea" class="btnControlLeftarea">
	<a href="javascript:SlideLeft();"> <img src="<%=hostIp %>/images/left/btn_left_close.png" name="slideLeft" alt="" /> </a>
</div>
<%-- <div id="controlLeftArea" class="btnControlLeftarea">
	<a href="javascript:SlideLeft()"> <img src="${pageContext.request.contextPath}/Resource/image/ui/left/btn_controlLeftarea.png" name="slideLeft" alt="" /> </a>
</div> --%>
<!-- //controlLeftArea -->

