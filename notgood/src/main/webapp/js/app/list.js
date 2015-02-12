$a.page({
	init : function(id, param) {
		$a.page.setEventListener();
		$a.page.initGrid();
	},
	setEventListener : function() {
		$('#btn_search').click(function() {
			$('#grid').alopexGrid('dataSet', $a.page.userlist);
		});
		$('#btn_new').click(function() {
			$a.navigate('view.html');
		});
		$('#btn_delete').click(function() {
			$('#grid').alopexGrid('dataDelete', {_state : {selected : true}});
			alert('삭제 성공');
		});
	},
	initGrid : function() {
		$('#grid').alopexGrid({
			rowPadding : 5,
			columnMapping : [
				{
					columnIndex : 0,
					align : 'center',
					width : '10px',
					selectorColumn : true
				}, {
					columnIndex : 1,
					align : 'center',
					key : 'id',
					title : '주민번호',
					width : '30px'
				}, {
					columnIndex : 2,
					align : 'center',
					key : 'name',
					title : '이름',
					width : '30px'
				}, {
					columnIndex : 3,
					align : 'center',
					key : 'team',
					title : '팀',
					width : '100px'
				}, {
					columnIndex : 4,
					align : 'center',
					key : 'email',
					title : '이메일',
					width : '100px'
				}
			],
			on : {
				'cell' : {
					'click' : function(data, eh, e) {
						if(data._index.column != 0) {
							$a.navigate('view.html', data);
						}
					}
				}
			}
		});
	},
	
	userlist: [{
		"name" : "홍길동1",
		"email" : "honggd@gmail.com",
		"team" : "Solution DEV",
		"id" : "860124-1012457"
	}, {
		"name" : "홍길동2",
		"email" : "honggd@gmail.com",
		"team" : "Solution DEV",
		"id" : "860124-1012457"
	}, {
		"name" : "홍길동3",
		"email" : "honggd@gmail.com",
		"team" : "Solution DEV",
		"id" : "860124-1012457"
	}, {
		"name" : "홍길동4",
		"email" : "honggd@gmail.com",
		"team" : "Solution DEV",
		"id" : "860124-1012457"
	}, {
		"name" : "홍길동5",
		"email" : "honggd@gmail.com",
		"team" : "Solution DEV",
		"id" : "860124-1012457"
	}]
});