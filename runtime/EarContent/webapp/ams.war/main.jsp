<%@ page pageEncoding="utf-8"%>
<%@ page import="nexcore.framework.core.Constants"%>
<%@ page import="nexcore.framework.core.parameter.WasInstance"%>

<!doctype html>
<html>
<head>
<title>Main</title>
<%@include file="/common/common.jsp"%>
<%@include file="/common/chart.jsp"%>
<script>
	$(window).load(function() {
		//depth1_click($($('#topmenu li')[0]).attr('id').substr(10), $($('#topmenu li')[0]).find('a').text());
		
		// 로그인 공지 사항 처리 2013.10.25 성지호
		var noticeInfo = $.Session('FRT_LOGIN_NOTICE_INFO');
		
		if(noticeInfo!==null && noticeInfo!==undefined) {
			// 로그인 할때만 보여줘야 하니까 로그인 사용한 세션은 바로 삭제해버림
			$.Session('FRT_LOGIN_NOTICE_INFO', null);
					
			console.log(noticeInfo);
			
			// noticeInfo => Array
			var showInfo = $.Cookie('ams_notice_show_info');
			if(showInfo===null || showInfo===undefined) {
				showInfo = '{}';
			}var showInfoObj = JSON.parse(showInfo);
			
			for(var i = 0; i < noticeInfo.length; i++) {
				var notice = noticeInfo[i];
				
				if(showInfoObj[notice.NOTICE_SEQ_NO + '_' + notice.NOTICE_DT]!==true) {
					var WSIZE = parseInt(notice.POP_UP_WSIZE) + 40;
					var HSIZE = parseInt(notice.POP_UP_HSIZE) + 100;
					$.Popup({
						url: contextPath+'/common/notice/NOTICE_POPUP.jsp',
						width: WSIZE,
						height: HSIZE,
						center: true,
						scroll: false,
						data : notice
					});	
				}
			}
		}
	});
	
	$(function () {
	    $(document).ready(function() {
	    	$('#wasInstanceIdSelBox').val("<%=BaseUtils.getCurrentWasInstanceId()%>");
	    	Highcharts.theme = {
	 			   colors: ['#058DC7', '#50B432', '#ED561B', '#DDDF00', '#24CBE5', '#64E572', '#FF9655', '#FFF263', '#6AF9C4'],
	 			   chart: {
	 			      backgroundColor: {
	 			         linearGradient: { x1: 0, y1: 0, x2: 1, y2: 1 },
	 			         stops: [
	 			            [0, 'rgb(255, 255, 255)'],
	 			            [1, 'rgb(240, 240, 255)']
	 			         ]
	 			      },
	 			      borderWidth: 2,
	 			      plotBackgroundColor: 'rgba(255, 255, 255, .9)',
	 			      plotShadow: true,
	 			      plotBorderWidth: 1
	 			   },
	 			   title: {
	 			      style: {
	 			         color: '#000',
	 			         font: 'bold 16px "Trebuchet MS", Verdana, sans-serif'
	 			      }
	 			   },
	 			   subtitle: {
	 			      style: {
	 			         color: '#666666',
	 			         font: 'bold 12px "Trebuchet MS", Verdana, sans-serif'
	 			      }
	 			   },
	 			   xAxis: {
	 			      gridLineWidth: 1,
	 			      lineColor: '#000',
	 			      tickColor: '#000',
	 			      labels: {
	 			         style: {
	 			            color: '#000',
	 			            font: '11px Trebuchet MS, Verdana, sans-serif'
	 			         }
	 			      },
	 			      title: {
	 			         style: {
	 			            color: '#333',
	 			            fontWeight: 'bold',
	 			            fontSize: '12px',
	 			            fontFamily: 'Trebuchet MS, Verdana, sans-serif'

	 			         }
	 			      }
	 			   },
	 			   yAxis: {
	 			      minorTickInterval: 'auto',
	 			      lineColor: '#000',
	 			      lineWidth: 1,
	 			      tickWidth: 1,
	 			      tickColor: '#000',
	 			      labels: {
	 			         style: {
	 			            color: '#000',
	 			            font: '11px Trebuchet MS, Verdana, sans-serif'
	 			         }
	 			      },
	 			      title: {
	 			         style: {
	 			            color: '#333',
	 			            fontWeight: 'bold',
	 			            fontSize: '12px',
	 			            fontFamily: 'Trebuchet MS, Verdana, sans-serif'
	 			         }
	 			      }
	 			   },
	 			   legend: {
	 			      itemStyle: {
	 			         font: '9pt Trebuchet MS, Verdana, sans-serif',
	 			         color: 'black'

	 			      },
	 			      itemHoverStyle: {
	 			         color: '#039'
	 			      },
	 			      itemHiddenStyle: {
	 			         color: 'gray'
	 			      }
	 			   },
	 			   labels: {
	 			      style: {
	 			         color: '#99b'
	 			      }
	 			   },

	 			   navigation: {
	 			      buttonOptions: {
	 			         theme: {
	 			            stroke: '#CCCCCC'
	 			         }
	 			      }
	 			   }
	 			};
	    	Highcharts.setOptions(Highcharts.theme);

	        Highcharts.setOptions({
	            global: {
	                useUTC: false
	            }
	        });
	    	var charData=null;
	        setInterval(function() {
                $.ajax({
        			url: star.service.monitoring_url,
        			success: function(ops) {
        				console.log(ops);
        				//console.log(ops.FS_MONITORING.dev);
        				//console.log(ops.CPU_MONITORING.length);
        				/* charData = jQuery.extend(true, {}, ops); */
        				charData = JSON.parse(JSON.stringify(ops));
        			},
        			async: false
    			});	  
            }, 4000);
	        
	        
	        
	        var chart;
	        window.wasInsObj =jQuery.parseJSON( '{ "wasInsName": "<%=BaseUtils.getCurrentWasInstanceId()%>" }' );
	        // CPU 차트빌드
	        $('#CPU_CHAT').ExtHighcharts({
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
	                                y = 0;//Math.random();
                                for(var i=0; i<charData.CPU_MONITORING.length; i++) {
                					if(charData.CPU_MONITORING[i] != null && wasInsObj.wasInsName == charData.CPU_MONITORING[i].WAS_INSTANCE_ID) {
                						y=charData.CPU_MONITORING[i].COMBINE_CPU_PERC*100;
                						//console.log(wasInsObj.wasInsName+" CPU : "+charData.CPU_MONITORING[i].COMBINE_CPU_PERC);
                						break;
                					}
                				}
	                            series.addPoint([x, y], true, true);
	                        }, 5000);
	                    }
	                }
	            },
	            title: {
	                text: 'CPU'
	            },
	            xAxis: {
	                type: 'datetime',
	                tickPixelInterval: 150
	            },
	            yAxis: {
	                title: {
	                    text: 'CPU%'
	                },
	                max: 100,
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
	                name: 'CPU Monitoring Data',
	                data: (function() {
	                    // 차트 데이터 넣는 부분
	                    var data = [],
	                        time = (new Date()).getTime(),
	                        i;
	                    for (i = -19; i <= 0; i++) {
                    	  data.push({
    	                        	// x값(시간)과, y값
    	                            x: time+ i * 1000,
    	                            y: 0
    	                        });
	                    }
	                    return data;
	                })()
	            }]
	        });
	        
	        // 차트빌드
	        $('#MEM_CHAT').ExtHighcharts({
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
	                                y = 0;//Math.random();
                                for(var i=0; i<charData.MEM_MONITORING.length; i++) {
                					if(charData.MEM_MONITORING[i] != null && wasInsObj.wasInsName == charData.MEM_MONITORING[i].WAS_INSTANCE_ID) {
                						y=charData.MEM_MONITORING[i].USED_PERC*100;
                						//console.log(wasInsObj.wasInsName+" MEM :"+charData.MEM_MONITORING[i].USED_PERC);
                						break;
                					}
                				}
	                            series.addPoint([x, y], true, true);
	                        }, 5000);
	                    }
	                }
	            },
	            title: {
	                text:'Memory'
	            },
	            xAxis: {
	                type: 'datetime',
	                tickPixelInterval: 150
	            },
	            yAxis: {
	                title: {
	                    text: 'MEM%'
	                },
	                max: 100,
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
	                name: 'Memory Monitoring Data',
	                data: (function() {
	                    // 차트 데이터 넣는 부분
	                    var data = [],
	                        time = (new Date()).getTime(),
	                        i;
	                    for (i = -19; i <= 0; i++) {
                    	  data.push({
    	                        	// x값(시간)과, y값
    	                            x: time+ i * 1000,
    	                            y: 0
    	                        });
	                    }
	                    return data;
	                })()
	            }]
	        });
	        
	        // Create the chart
            $('#fsSystem').ExtHighcharts({
            chart: {
                type: 'column',
                margin: [ 50, 50, 100, 80],
                events: {
                    load: function() {
                        // 실시간 차트 변경 이벤트
                        var series = this.series[0];
                        var xAxis = this.xAxis[0];
                        //console.log(this.xAxis[0].categories);
                        // 1초마다 변경, interval 1000 = 1초.
                        setInterval(function() {
                            var data= [];//Math.random();
                            xAxis.categories = [];
                            jQuery.each(charData.FS_MONITORING, function (key, value) {
            					if(wasInsObj.wasInsName == key) {
            						for(var i=0 ; i < value.length; i++) {
            							xAxis.categories.push(value[i].MOUNT_ON);
            							data.push(parseFloat(value[i].USED_PERC*100));
            							//console.log(value[i].FILE_SYSTEM_NAME+","+(value[i].USED_PERC*100))
            						}
            					}
            				});
                            series.setData(data, true);
                            //console.log(series);
                        }, 10000); 
                    }
                }
            },
            title: {
                text: 'File System Monitoring'
            },
            xAxis: {
                categories: [],
                labels: {
                    rotation: -45,
                    align: 'right',
                    style: {
                        fontSize: '13px',
                        fontFamily: 'Verdana, sans-serif'
                    }
                }
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'File System %'
                }
            },
            legend: {
                enabled: false
            },
            tooltip: {
                pointFormat: 'File System Usage : <b>{point.y:.1f} %</b>',
            },
            series: [{
                name: 'Usage',
                data: [],
                dataLabels: {
                    enabled: true,
                    rotation: -90,
                    color: '#FFFFFF',
                    align: 'right',
                    x: 4,
                    y: 10,
                    style: {
                        fontSize: '13px',
                        fontFamily: 'Verdana, sans-serif',
                        textShadow: '0 0 3px black'
                    }
                }
            }]
        }); 
	        
	        
         // 차트빌드
	        /* $('#TRAN_CHAT').ExtHighcharts({
	            chart: {
	                type: 'spline',	// 차트유형
	                animation: Highcharts.svg, // don't animate in old IE
	                marginRight: 10,
	                events: {
	                    load: function() {
	                        // 실시간 차트 변경 이벤트
	                        var series = this.series[0];
	                        // 1초마다 변경, interval 1000 = 1초.
	                        var dataParam = {'cmd':'TRANS_MONITORING'};
	                         setInterval(function() {
				                $.ajax({
				        			url: star.service.monitoring_url,
				        			data: dataParam,
				        			success: function(ops) {
				        				//console.log(ops);
				        				var x = (new Date()).getTime(), // current time
			                                  y = 0;//Math.random();
		                                for(var i=0; i<ops.TRANS_MONITORING.length; i++) {
		                					if(ops.TRANS_MONITORING[i] != null && wasInsObj.wasInsName == ops.TRANS_MONITORING[i].WAS_INSTANCE_ID) {
		                						y=ops.TRANS_MONITORING[i].CNT;
		                						//console.log(wasInsObj.wasInsName+" MEM :"+charData.MEM_MONITORING[i].USED_PERC);
		                						break;
		                					}
		                				}
			                            series.addPoint([x, y], true, true);
				        			},
				        			async: false
				    			});	  
				            }, 1300);
	                    }
	                }
	            },
	            title: {
	                text:'TPS'
	            },
	            xAxis: {
	                type: 'datetime',
	                tickPixelInterval: 300
	            },
	            yAxis: {
	                title: {
	                    text: 'CNT'
	                },
	                max: 100,
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
	                name: 'Transaction Monitoring Data',
	                data: (function() {
	                    // 차트 데이터 넣는 부분
	                    var data = [],
	                        time = (new Date()).getTime(),
	                        i;
	                    for (i = -19; i <= 0; i++) {
                    	  data.push({
    	                        	// x값(시간)과, y값
    	                            x: time+ i * 1000,
    	                            y: 0
    	                        });
	                    }
	                    return data;
	                })()
	            }]
	        });     */
	        
	        
	    });
	});
</script>
</head>
<body>
	<div id="container">
		<!-- //headerArea-->
		<%@include file="/common/TopMenu.jsp"%>
		<!-- //headerArea-->

		<div id="wrapper" class="clearfix">
			<!-- //leftArea -->
			<%@include file="/common/LeftMenu.jsp"%>
			<!-- //leftArea -->

			<div id="contentArea">
				<div id="content">
					<div  class="contTitle">
						<h1><%=BaseUtils.getAmsLabelValue("L0032", locale, "Main") %></h1>
					</div>
					<br>
					<table >
						<tr>
							<td colspan="3" align="right">WAS 선택 : 
								<select id="wasInstanceIdSelBox" name="wasInstanceIdSelBox"  onchange="wasInsObj.wasInsName=this.value;">
									<option>==========</option>
									<%
									List<WasInstance> wasInstanceList = BaseUtils.getWasInstanceList();
									WasInstance wasInstance = null;
									if(wasInstanceList != null) {
										for(int i=0; i<wasInstanceList.size(); i++) {
											wasInstance = wasInstanceList.get(i);
									%>
									<option value="<%=wasInstance.getWasInstanceId()%>" ><%=wasInstance.getWasInstanceName()%></option>
									<%
										}
									}
									
									%>
								</select>
							</td>
						</tr>
						<%-- <tr>
							<td align="center"><span id="cpuTitle"><%=BaseUtils.getCurrentWasInstanceId()%></span> CPU</td>
							<td width="10%"></td>
							<td align="center"><span id="memTitle"><%=BaseUtils.getCurrentWasInstanceId()%></span> Memory</td>
						</tr> --%>
						<tr>
							<td><div id="CPU_CHAT" style="width: 500px; height: 300px"></div></td>
							<td></td>
							<td><div id="MEM_CHAT" style="width: 500px; height: 300px"></div></td>
						</tr>
						<!-- <tr>
							<td colspan="3" ><div id="TRAN_CHAT" style="width: 1100px; height: 200px"></div></td>
						</tr> -->
						<%-- <tr>
							<td colspan="3" align="center"><span id="fsTitle"><%=BaseUtils.getCurrentWasInstanceId()%></span> File System</td>
						</tr> --%>
						<tr>
							<td colspan="3" ><div id="fsSystem" style="width: 1000px; height: 400px"></div></td>
						</tr>
						
					</table>
				</div>
			</div>
		</div>
		<!-- //footer -->
		<%@include file="/common/Footer.jsp"%>
		<!-- //footer -->
	</div>
</body>
</html>
