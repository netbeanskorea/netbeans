<%@ page pageEncoding="utf-8"%>
<script src="<%=hostIp %>/lib/ext/tinymce-4.0.12/tinymce.min.js" charset="utf-8"></script>
<script src="<%=hostIp %>/lib/ext/tinymce-4.0.12/themes/modern/theme.min.js" charset="utf-8"></script>
<script src="<%=hostIp %>/lib/ext/tinymce-4.0.12/plugins/image/plugin.min.js" charset="utf-8"></script>
<script>
void 0!==window.tinymce&&star.ui.component({name:"Editor",fields:{image:!1},constructor:function(a){var b={selector:"#"+this.attr("id"),toolbar:"undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent"};a=$.extend(!0,{},this.data("star-option"),a);!0==a.image&&(b.toolbar+=" | image",b.setup=function(a){a.addButton("image",{text:"",icon:"image",tooltip:"Image",onclick:function(){$.ImageBox()}})});a=star.option(star.ui.Editor,a);this.addClass("star-field");
return tinymce.init(b)},methods_check:function(){return this.next().hasClass("mceEditor")},methods:{Field:function(a){return void 0===a?this.html():this.html(a)}}});

if (window.tinymce !== undefined) {
	// Image Upload Popup
	$.ImageBox = function() {
		var option = {
			title: 'Image',
			id: 'star-dialog-image-upload',
			url: 'about:blank',
			data: {},
			modal: true,
			resizable: false,
			draggable: false,
			width: 400,
			height: 150
		};
		
		var dialog = $('<div id="' + option.id + '" class="star-dialog" style="display: none; padding: 0px; overflow: hidden;"></div>').appendTo(window.document.body); 
		var content = '<form id="upload_Form"><div><table class="tb_data"><colgroup><col width="25%"/><col width="30%"/><col width="5%"/><col width="30%"/></colgroup>';
		content += '<tr><th><label>Source</label></th><td colspan="3"><input id="UPLOAD_FILE" type="file" class="input-file" name="UPLOAD_FILE"/></td></tr>';
		content += '</table></div></form>';
		
		dialog.append(content);
		
		// 폼 초기화
		$('#upload_Form').Form();
		
		// File Upload
		$('#upload_Form').File({
			success: function(data) {
            	$('#star-dialog-image-upload').remove();
            	tinymce.editors[0].insertContent('<img src="json.file?cmd=imgDirectDownload&typeId=IMG&fileName=' + data[0].file_name + '&filePath=' + data[0].file_path + '&fileId=' + data[0].file_id + '" style="display: block;"></img>');
			}, 
			error : function (data) {
				console.log(data);
			}
		});
		
		dialog.data('star-dialog-open-data', option.data).dialog({ 
			title: 'Image Upload',
			modal: option.modal, 
			resizable: option.resizable, 
			draggable: option.draggable,
			width: option.width, 
			height: option.height,
			beforeClose: function(event, ui) { 
				if (option.close !== undefined)
					option.close(dialog.data('star-dialog-close-data') || null); 
			}, 
			close: function() { 
				dialog.dialog('destroy').remove(); 
			},
            buttons: [{
                text: '확인',
                click: function (data) {
                	// 확인 버튼 함수
                	$('#upload_Form').Service();
                }
            }, {
                text: '취소',
                click: function (data) {
                   
                    $(this).remove();
                }
            }]
		});
	};
}
</script>