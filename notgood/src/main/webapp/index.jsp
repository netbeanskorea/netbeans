<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Insert title here</title>
<link rel="stylesheet" type="textcss" media="screen"
	href="css/jqgrid/jquery-ui.min.css" />
<link rel="stylesheet" type="textcss" media="screen"
	href="css/jqgrid/ui.jqgrid.css" />
<link rel="stylesheet" type="textcss" media="screen"
	href="css/jqgrid/ui.multiselect.css" />

<script src="js/jqgrid/jquery-1.11.0.min.js" type="text/javascript"></script>
<script src="js/jqgrid/jquery-ui-1.9.1.custom.min.js"
	type="text/javascript"></script>
<script src="js/jqgrid/jquery.layout-latest.js" type="text/javascript"></script>
<script src="js/jqgrid/grid.locale-en.js" type="text/javascript"></script>
<script src="js/jqgrid/ui.multiselect.js" type="text/javascript"></script>
<script src="js/jqgrid/jquery.jqGrid.min.js" type="text/javascript"></script>
<script src="js/jqgrid/jquery.tablednd.js" type="text/javascript"></script>
<script src="js/jqgrid/jquery.contextmenu.js" type="text/javascript"></script>
<script type="text/javascript">
	$(function() {
		$("#list2").jqGrid({
			url : 'test.jsp',
			mtype :'POST',
			datatype : "json",
			colNames : [ 'loc', 'dname', 'deptno' ],
			colModel : [ {
				name : 'loc',
				index : 'loc',
				width : 55
			}, {
				name : 'dname',
				index : 'dname',
				width : 90
			}, {
				name : 'deptno',
				index : 'deptno',
				width : 100
			} ],
			rowNum : 10,
			autowidth : true,
			//			    rowList:[10,20,30],
			gridview : true,
			multiselect : true,
			sortable : true,
			jsonReader : {
				repeatitems : false
			},
			pager : '#pager2',
			sortname : 'loc',
			viewrecords : true,
			sortorder : "desc",
			height : "auto",
			caption : "JSON Example"
		});
		$("#list2").jqGrid('navGrid', '#pager2', {
			edit : false,
			add : false,
			del : false
		});
	});
</script>
</head>
<body>
	<div id="div1"></div>
	<table id="list2"></table>
	<div id="pager2"></div>
</body>
</html>
<%-- <%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Insert title here</title>
 <link rel="stylesheet" type="textcss" media="screen" href="css/jqgrid/jquery-ui.min.css" />
<link rel="stylesheet" type="textcss" media="screen" href="css/jqgrid/ui.jqgrid.css" />
<link rel="stylesheet" type="textcss" media="screen" href="css/jqgrid/ui.multiselect.css" />

<script src="js/jqgrid/jquery-1.11.0.min.js" type="text/javascript"></script>
<script src="js/jqgrid/jquery-ui-1.9.1.custom.min.js" type="text/javascript"></script>
<script src="js/jqgrid/jquery.layout-latest.js" type="text/javascript"></script>
<script src="js/jqgrid/grid.locale-en.js" type="text/javascript"></script>
<script src="js/jqgrid/ui.multiselect.js" type="text/javascript"></script>
<script src="js/jqgrid/jquery.jqGrid.min.js" type="text/javascript"></script>
<script src="js/jqgrid/jquery.tablednd.js" type="text/javascript"></script>
<script src="js/jqgrid/jquery.contextmenu.js" type="text/javascript"></script>
<script type="text/javascript"> 
 $(function() {
      /* $.ajax({
		dataType: "json",
		type:'POST',
		contentType : 'application/json ; charset=UTF-8',
		url:'selectAll', 
		data: JSON.stringify(
				{
					queryId : "selectList"
				}
				), 
		success: function(data) {
//			alert("success");
			console.log(data);
			$('body').append(data);
//			var obj = $.parseJSON(data);
//			alert(obj);
			$.each(data, function(idx, val) {
				$.each(val, function(idx,val) {
					$.each(val, function(idx,val) {
//						alert(idx + " : " + val);
//						$("#div1").append(idx + " : "+val + " , ");
					});
				});
			}); */
			var obj ="";
		    $("#list2").jqGrid({
		    	loadBeforeSend: function (xhr) {
		    	obj = $.ajax({
		    			dataType: "json",
		    			type:'POST',
		    			contentType : 'application/json ; charset=UTF-8',
		    			url:'selectAll', 
		    			data: JSON.stringify(
		    					{
		    						queryId : "selectList"
		    					}
		    					), 
		    			success: function(data) {
		    				return data.responseText;
//		    				alert("success");
// 		    				console.log(data);
// 		    				$('body').append(data);
// //		    				var obj = $.parseJSON(data);
// //		    				alert(obj);
		    				$.each(data, function(idx, val) {
		    					$.each(val, function(idx,val) {
		    						
		    						$("#list2".jqGrid('addRowData', idx+1,val ));
		    						$.each(val, function(idx,val) {
//		    							alert(idx + " : " + val);
//		    							$("#div1").append(idx + " : "+val + " , ");
		    						});
		    					});
		    				});
		    			}
	    	        });
		    	},
//			    url : 'selectAll' ,
//			    mtype: 'POST',
			    /* loadBeforeSend: function(jqXHR) {
			        jqXHR.setRequestHeader("Content-Type", 'application/json; charset=UTF-8');
			    }, */
//			    ajaxGridOptions: { contentType: 'application/json; charset=utf-8' },
			    data : obj,
			    dataType: "json"
,		/* 	    postdata : //JSON.stringify(
						{
							queryId : "selectList"
						}
					//	)
						,  */
			    colNames : ['loc', 'dname', 'deptno'],
			    colModel:[
			           {name:'loc', index:'loc', width:55},
			           {name:'dname', index:'dname', width:90},
			           {name:'deptno', index:'deptno', width:100}
			    ],
			    rowNum:10,
			    autowidth: true,
//			    rowList:[10,20,30],
			    gridview: true,
			    multiselect: true,
			    sortable: true,
			    jsonReader: {
			    	repeatitems: true,
			    	root: "row",
			    },
			    pager:'#pager2',
			    sortname:'loc',
			    viewrecords: true,
			    sortorder:"desc",
			    height: "auto",
			    caption:"JSON Example",
			    loadComplete: function (data) {
			        // future event handling, very last grid event thrown
			        alert("completed");
			        console.log(obj);
			    },
			    loadError: function (xhr, status, error) {
			    	alert("error");
			    	console.log(obj);
			    	return;
			    }
			});
		    /* var gridData = new Array();
		    gridData = obj;
		    for(var i=0; i<=gridData.length; i++)
		    	jQuery("#list2".jqGrid('addRowData', i+1,gridData[i] )) */
		    	
			$("#list2").jqGrid('navGrid','#pager2',
				{
				edit:false,add:false,del:false
				}
			);	 
//		}
//	 }); 
 });
 
</script>
</head>
<body>
<div id="div1"></div>
<table id="list2"></table>
<div id="pager2"></div>
</body>
</html> --%>