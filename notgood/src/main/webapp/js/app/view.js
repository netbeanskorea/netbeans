$a.page({
	init : function(id, param) {
		$a.page.bindData(param);
		$a.page.setEventListener();
	},
	bindData : function(param) {
		var data = $.extend({
			'phone_options' : ['02', '031', '032', '033', '041', '042', '043', '044'],
			'mobile_options' : ['010', '011']
		}, param);
		$('#result_area').setData(data);
	},
	setEventListener : function() {
		$('#btn_save').click(function() {
			alert('저장 성공');
		});
		$('#btn_cancel').click(function() {
			$a.back();
		});
	}
});