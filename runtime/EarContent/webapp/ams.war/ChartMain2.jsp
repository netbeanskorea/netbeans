<%@ page pageEncoding="utf-8"%>
<!doctype html>
<html>
<head>
<title>STAR Chart Sample</title>
<%@include file="/common/common.jsp"%>
<%@include file="/common/chart.jsp"%>
<script>
	/*****************************************************************************************
	 * 화면 이름  : ChartMain.jsp
	 * 화면 설명  : STAR Chart Sample
	 * 작성자        : 박주현
	 * 작성일        : 2013-03-05
	 * 변경이력   :
	 * 버전		성명		반영일자		내용                  
	 *----------------------------------------------------------------------------------------
	 * ver0.1	박주현	2013-03-05	화면 생성
	 ****************************************************************************************/
	 $(function () {
		    $(document).ready(function() {
		        Highcharts.setOptions({
		            global: {
		                useUTC: false
		            }
		        });
		    
		        var chart;
		        // 차트빌드
		        $('#chart').ExtHighcharts({
		            chart: {
		                type: 'spline',	// 차트유형
		                animation: Highcharts.svg, // don't animate in old IE
		                marginRight: 10,
		                events: {
		                    load: function() {
		    
		                        // 실시간 차트 변경 이벤트
		                        var series = this.series[0];
		                        // 1초마다 변경, interval 1000 = 1초.
		                        setInterval(function() {
		                            var x = (new Date()).getTime(), // current time
		                                y = Math.random();
		                            series.addPoint([x, y], true, true);
		                        }, 1000);
		                    }
		                }
		            },
		            title: {
		                text: '제목'
		            },
		            xAxis: {
		                type: 'datetime',
		                tickPixelInterval: 150
		            },
		            yAxis: {
		                title: {
		                    text: 'y축 레이블'
		                },
		                plotLines: [{
		                    value: 0,
		                    width: 1,
		                    color: '#808080'
		                }]
		            },
		            tooltip: {
		                formatter: function() {
		                        return '<b>'+ this.series.name +'</b><br/>'+
		                        Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) +'<br/>'+
		                        Highcharts.numberFormat(this.y, 2);
		                }
		            },
		            legend: {
		                enabled: false
		            },
		            exporting: {
		                enabled: false
		            },
		            series: [{
		                name: 'Random data',
		                data: (function() {
		                    // 차트 데이터 넣는 부분
		                    var data = [],
		                        time = (new Date()).getTime(),
		                        i;
		    
		                    for (i = -19; i <= 0; i++) {
		                        data.push({
		                        	// x값(시간)과, y값
		                            x: time + i * 1000,
		                            y: Math.random()
		                        });
		                    }
		                    return data;
		                })()
		            }]
		        });
		    });
		});
</script>
</head>
<body>
	<div id="container">
		<!-- //headerArea-->
		<%@include file="/common/TopMenu.jsp"%>
		<!-- //headerArea-->

		<div id="wrapper" style="height: 808px;">
			<!-- //leftArea -->
			<%--@include file="../common/LeftMenu.jsp"--%>
			<!-- //leftArea -->
			
			<div id="contents">
				<div id="content">
					<div id="tabs" class="ui-tabs title_lyr">
						<h1>STAR Chart Sample</h1>
						<ul id="tabsheader" style="position: relative;" class="location">
							<li class="tabstyle">[STAR Chart Sample]</li>
						</ul>
						<div id="chart"></div>
					</div>
				</div>
				<!-- //leftArea -->
				<%@include file="/common/Footer.jsp"%>
				<!-- //leftArea -->
			</div>
		</div>
	</div>
</body>
</html>
