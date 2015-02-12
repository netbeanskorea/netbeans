var _http = null;  // http 통신을 담당하는 클래스 오브젝트 

/**
 * 
 * @param params    각 서비스에 필요한 params (json type)
 * @param successCallback 요청 성공시 호출되는 콜백함수
 * @param errorCallback   요청 실패시 호츨되는 콜백함수
 */
function httpSend(params, successCallback, errorCallback){
  _http = new Http();
  
  // HTTP 통신 시 프로그래스 바 로딩 (UI interaction을 막기위해서)
  var progress_option = {
      //"message" : "Loading",
      "cancelable" : false,
      "color" : "grey"
  };
  platformUIComponent.showProgressDialog(progress_option);
  

  // alopex framework HTTP 요청함수 인자 생성 
  var entity = {
      "url" : "/service",
      "method" : "POST",
      "onBody" : true,
      "content" : typeof params === "string" ? params : JSON.stringify(params)
    };
  
  // 헤더값 설정 
  _http.setTimeout(30000); // HTTP timeout 값 설정 

  // HTTP request
  _http.request(entity, _httpSuccessCallback(successCallback), _httpErrorCallback(errorCallback)); 
}

/**
 * 각 화면에 정의된 success 콜백함수 실행 전 처리
 * 기능 : 프로그래스바 언로드, JSON parsing 처
 * @param http
 */
function _httpSuccessCallback(callback) {
  return function(http) {
    // 프로그래스 바 언로드 
    platformUIComponent.dismissProgressDialog();
  
    // HTTP 요청 응답 데이터 받기 
    var httpResponse;
    if(typeof http.response === 'undefined') {
      httpResponse = http;
    } else {
      httpResponse = http.response;
    }
    httpResponse = httpResponse.replace(/(\n\r|\r\n|\n|\\n\\r|\\r\\n|\\n)/gi,'\n'); // 아이폰 JSON parsing 에러로 인한 처리 
    var responseObj = JSON.parse(httpResponse);
    
    // 서버 오류 시 처리 
    if(false) {
      _httpErrorMsgProcess(responseObj);
      return ;
    }
    
    // success callback 실행 
    callback ? callback(responseObj) : "";
  };
}



/**
 * 각 화면에 정의된 error 콜백함수 실행 전 처리 
 * 기능 : 에러 메세지를 출력하고, 유저가 정의한 에러콜백을 호출한다.
 * @param errorObj (json type)
 */
function _httpErrorCallback(callback) { 
  return function(errorObj) {
    _httpErrorMsgProcess(errorObj);
    platformUIComponent.dismissProgressDialog();
  };
}

/**
 * 에러메세지 처리해 주는 함수 
 * @param errorObj (json type) 에러 정보를 가지고 있는 오브젝트 
 */
function _httpErrorMsgProcess(errorObj) {
  if( errorObj.resultMessage ) {
    alert("서버 처리 중 오류가 발생하였습니다\n\n" + errorObj.resultMessage);
  } else {
    alert("서버와 통신중 오류가 발생하였습니다");
  }
}
