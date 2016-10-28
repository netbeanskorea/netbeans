package nexcore.sprout.showcase.etc;

import nexcore.sprout.foundry.webmvc.interceptors.DuplicatedSubmitChecker;
import nexcore.sprout.showcase.mvc.SomeBean;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.context.ConfigurableWebApplicationContext;

@Controller
public class ShowEtcViewController {
	
	@Autowired ConfigurableWebApplicationContext subContext;
	@Autowired SomeBean someBean;

	@DuplicatedSubmitChecker
	@RequestMapping(value="/etc/dupcheck")
	public @ResponseBody String dupChecker() {
		return "Checker Pass !!!";
	}
	
	
	@RequestMapping(value="/etc/userAgentView")
	public String userAgent() {
		return "etc/useragentView";
	}


	@RequestMapping(value="/etc/springProfileView")
	public @ResponseBody String getProfileTestView() {
		return currentProfile(1) + "=> " +someBean.getProfileName();
	}
	
	@RequestMapping(value="/etc/springChangeProfileView")
	public @ResponseBody String getChangeProfileTestView() {
		setProfile();
		return someBean.getProfileName()  +  "=> " + currentProfile(1);
	}
	
	public void setProfile(){
		String currentProfile = currentProfile(1);
		String toChangeProfile = currentProfile.equals("devProfile") ? "prodProfile" : "devProfile";
        ConfigurableWebApplicationContext rootContext = (ConfigurableWebApplicationContext)subContext.getParent();
         
        // root, sub 싹다 엑티브 프로파일을 바꾼후 리프레쉬 해야 적용됨
        // Refreshing Root WebApplicationContext
        rootContext.getEnvironment().setActiveProfiles(currentProfile(0));
        rootContext.getEnvironment().addActiveProfile(toChangeProfile);
        //rootContext.getEnvironment().setActiveProfiles(toChangeProfile);
        rootContext.refresh();
         
        // Refreshing Spring-servlet WebApplicationContext
        subContext.getEnvironment().setActiveProfiles(currentProfile(0));
        subContext.getEnvironment().addActiveProfile(toChangeProfile);
        //subContext.getEnvironment().setActiveProfiles("dbcp_datasource," +toChangeProfile);
        subContext.refresh();
        
         
    }
     
	
	 /**
     * 현재 프로파일 가져오기
     * @return
     */
    private String currentProfile(int cnt){
        String[] profiles = subContext.getEnvironment().getActiveProfiles();
         
        if( profiles.length==0 ){
            profiles = subContext.getEnvironment().getDefaultProfiles();
        }
//        for(int i=0;i<profiles.length;i++){
//        	 System.out.println( i + "번째Profile ===> " +profiles[i] );;
//        }
        return profiles[cnt];
    }
	
}
