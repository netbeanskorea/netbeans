package nexcore.sprout.showcase.mvc.views;

import static org.hamcrest.CoreMatchers.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.model;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.view;
import static org.springframework.test.web.servlet.setup.MockMvcBuilders.webAppContextSetup;
import nexcore.sprout.showcase.mvc.AbstractContextControllerTests;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.ResultActions;

@RunWith(SpringJUnit4ClassRunner.class)
public class ViewsControllerTests extends AbstractContextControllerTests {

	private MockMvc mockMvc;

	@Before
	public void setup() throws Exception {
		this.mockMvc = webAppContextSetup(this.wac).alwaysExpect(status().isOk()).build();
	}

	@Test
	public void htmlView() throws Exception {
		this.mockMvc.perform(get("/views/html"))
				.andExpect(view().name(containsString("views/html")))
				.andExpect(model().attribute("foo", "bar"))
				.andExpect(model().attribute("fruit", "apple"))
				.andExpect(model().size(4));
				//noty. fw에서 result와 resultMessage를 추가하므로. 2가 아니라 4임.
				//{foo=bar, fruit=apple, result=0000, resultMessage=ok}
	}

	@Test
	public void viewName() throws Exception {
		this.mockMvc.perform(get("/views/viewName"))
				.andExpect(view().name(containsString("views/viewName")))
				.andExpect(model().attribute("foo", "bar"))
				.andExpect(model().attribute("fruit", "apple"))
				.andExpect(model().size(4));
				//noty. fw에서 result와 resultMessage를 추가하므로. 2가 아니라 4임.
				//{foo=bar, fruit=apple, result=0000, resultMessage=ok}

		//		ResultActions ra = this.mockMvc.perform(get("/views/viewName"));
//		MvcResult result = ra.andReturn();
//		System.out.println(result.getModelAndView().getModel());
		
        
        
		
	}

	@Test
	public void uriTemplate() throws Exception {
		this.mockMvc.perform(get("/views/pathVariables/bar/apple"))
				.andExpect(view().name(containsString("views/html")));
	}
}