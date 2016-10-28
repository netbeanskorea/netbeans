package nexcore.sprout.showcase.mvc;

public class SomeBean {

    private String profileName;
    
	public String someMethod() {
        return "Saying Hello World sprout-showcase";
    }
	
	public void setProfileName(String profileName){
		this.profileName =profileName;
	}
	
	
	public String getProfileName(){
		return this.profileName;
	}
}