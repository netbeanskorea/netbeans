/**
 * 업로드할 파일을 선택한 후에 필요한 작업을 수행한다.  
 *
 * @param element input(file)
 * @param max 업로드 가능한 최대 파일 사이즈
 * @param type 유형
 */
function createUpload(element, max, type) {

	/*IE 버그로 인한 입력값 정확성 체크 */
	var re = /^[a-z]:\\(.){0,300}$/i;
	if (element.value != "" && !element.value.match(re)) {
		alert("올바른 파일명이 아닙니다.파일을 다시 입력해 주시기 바랍니다.");
		element.focus();
		return;
	} else if (element.value == "") {
		return;
	}
	
    var liNode = element.parentNode;
    var ulNode = liNode.parentNode;
    
    /* 업로드 불가능한 확장자 체크 */
    var extensionRex = "(exe|cmd|bat|sh|jsp|asp|php|js|xml|ini|config|sql)";
    if (jprivate_getFileExtension(element.value).match(extensionRex)) {
        alert("해당 확장자는 첨부할 수 없습니다. 파일을 다시 입력해 주시기 바랍니다.");
        element.style.display = "none";
        var upload = document.createElement("span");
        upload.innerHTML = "<input type=\"file\" id=\"j_file\" name=\"j_file\" onchange=\"createUpload(this, " + max + ", '" + type + "');\"/>";
        ulNode.appendChild(upload);
        return;
    }
    
    /* 선택한 파일을 텍스트로 보이도록 함 */
    element.style.display = "none";
    var textSpan = document.createElement("span");
    var text = element.value + " <a onclick=\"deleteUpload(this, " + max + ", '" + type + "')\">" +
    		         "<img src=\"/ams/Resource/image/ui/button/btn_replydel.gif\" valign=\"middle\" style=\"cursor: pointer;\"></a>";
    /*if (type == "N/A") {
        textSpan.innerHTML = text + "<input type=\"hidden\" id=\"type_id\" name=\"type_id\" value=\"\"/>";;
    } else {*/
        textSpan.innerHTML = text + "<input type=\"hidden\" id=\"type_id\" name=\"type_id\" value=\"" + type + "\"/>";
    //}
    liNode.appendChild(textSpan);

    jprivate_adjustCount(ulNode, max, type, true);
}

/**
 * 파일을 삭제하는 작업을 수행한다.  
 *
 * @param element a 태그
 * @param max 업로드 가능한 최대 파일 사이즈
 * @param type 유형
 * @param fileName 파일 이름 (이미 업로드 된 파일에만 해당)
 * @param filePath 파일 경로 (이미 업로드 된 파일에만 해당)
 */
function deleteUpload(element, max, type, fileName, filePath) {
    var liNode = element.parentNode.parentNode;
    var ulNode = liNode.parentNode;

    /* UI에서 삭제 */
    ulNode.removeChild(liNode);
    
    jprivate_adjustCount(ulNode, max, type, false);

    /* 삭제할 파일 정보 기록 */
    if (fileName) {
        var Forms;
        for (var n = 0; n < document.getElementsByTagName("form").length; n++) {
            if(document.forms[n].className.indexOf("star-clearable star-file") != -1) {
                Forms = document.forms[n];
            }
        }
        var input = document.createElement("input");
        input.name = "j_file_delete";
        input.type = "hidden";
        input.value = fileName;
        Forms.appendChild(input);
        
        input = document.createElement("input");
        input.name = "j_file_path_delete";
        input.type = "hidden";
        input.value = filePath;
        Forms.appendChild(input);
    }
}

function jprivate_adjustCount(ulNode, max, type, flag) {
    /* 총 업로드 파일 수 수정 */
    var allSpan = ulNode.getElementsByTagName("span");
    var name = "file_count";
    if (type != "N/A") {
        name += ("_" + type);
    }
    
    var Forms;
    for (var n = 0; n < document.getElementsByTagName("form").length; n++) {
        if(document.forms[n].className.indexOf("star-clearable star-file") != -1) {
            Forms = document.forms[n];
        }
    }
    
    var fileCount = Forms[name];
    fileCount.value = allSpan.length;

    /* 새로운 파일 입력 박스 생성 */
    if ((flag && allSpan.length < max) || (!flag && allSpan.length == (max - 1))) {
        var upload = document.createElement("li");    
        upload.innerHTML = "<input type=\"file\" id=\"j_file\" name=\"j_file\" onchange=\"createUpload(this, " + max + ", '" + type + "');\"/>";
        ulNode.appendChild(upload);
    }
}

function jprivate_getFileExtension(strFileName) {
    var index = strFileName.lastIndexOf(".");
    var fileExtension = strFileName.substring(index + 1).toLowerCase();
    
    return fileExtension;
}
