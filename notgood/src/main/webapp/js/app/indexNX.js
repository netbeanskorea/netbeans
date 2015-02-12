$a.page({
  init: function(id, param) { 
    $a.page.setEventListener();
  },
  setEventListener : function() {
    //next 버튼 클릭 이벤트 핸들러  
    $('#next').click(function() {
      //TextInput validate 체크 
      if(!$('#name').validate()){
          alert($('#name').getErrorMessage());
      }
      else{
        // 입력받은 이름을 다음 페이지에 전달하면서 화면 이동 
        $a.navigate('todoListNX.html', {'name':$('#name').val()});
      }
    });  
  }
});