package nexcore.sprout.showcase.mvc.fileupload;

import java.io.File;
import java.io.IOException;

import nexcore.sprout.foundry.webmvc.view.DownloadView;
import nexcore.sprout.showcase.mvc.extensions.ajax.AjaxUtils;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.multipart.MultipartFile;

@Controller
@RequestMapping("/fileupload")
public class FileUploadController {

	@ModelAttribute
	public void ajaxAttribute(WebRequest request, Model model) {
		model.addAttribute("ajaxRequest", AjaxUtils.isAjaxRequest(request));
	}

	@RequestMapping(method=RequestMethod.GET)
	public String fileUploadForm() {
		return "webmvc/fileupload";
	}

	@RequestMapping(value="/processUpload", method=RequestMethod.POST)
	public @ResponseBody String processUpload(@RequestParam("file") MultipartFile file, Model model) throws IOException {
		
		String destFilePath = "C:\\Showcasefile";
		File destParentFile = new File(destFilePath);
	    if(!destParentFile.exists()) {//부모경로가 존재하지 않을 경우에는 생성
	        destParentFile.mkdirs();
	    }
	    
		File dest = new File (destFilePath, file.getOriginalFilename());
		file.transferTo(dest);
		return "uploaded successfully : " + destFilePath;
	}
	
	
	@RequestMapping(value="/processUploadControl", method=RequestMethod.POST)
	public @ResponseBody String processUploadControl(@RequestBody MultipartFile file, Model model) throws IOException {
		
		String destFilePath = "C:\\Showcasefile2";
		File destParentFile = new File(destFilePath);
	    if(!destParentFile.exists()) {//부모경로가 존재하지 않을 경우에는 생성
	        destParentFile.mkdirs();
	    }
	    
		File dest = new File (destFilePath, file.getOriginalFilename());
		file.transferTo(dest);
		return "uploaded successfully : " + destFilePath;
	}
	
	
		@RequestMapping("/download")
	    public DownloadView download(@RequestParam("fileName") String fileName,Model model) throws Exception {
	        File file = new File("C:\\Showcasefile2",fileName);
	        return new DownloadView(file, fileName);
	    }
	
}
