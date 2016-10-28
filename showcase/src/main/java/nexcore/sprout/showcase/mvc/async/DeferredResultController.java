package nexcore.sprout.showcase.mvc.async;

import java.util.Queue;
import java.util.concurrent.ConcurrentLinkedQueue;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.context.request.async.DeferredResult;
import org.springframework.web.servlet.ModelAndView;

@Controller
@RequestMapping("/async")
public class DeferredResultController {

	private final Queue<DeferredResult<String>> responseBodyQueue = new ConcurrentLinkedQueue<DeferredResult<String>>();

	private final Queue<DeferredResult<ModelAndView>> mavQueue = new ConcurrentLinkedQueue<DeferredResult<ModelAndView>>();

	private final Queue<DeferredResult<String>> exceptionQueue = new ConcurrentLinkedQueue<DeferredResult<String>>();

	int responseBodyQueueCnt = 0;
	@RequestMapping("/deferred-result/response-body")
	public @ResponseBody DeferredResult<String> deferredResult() {
		DeferredResult<String> result = new DeferredResult<String>(30000);
		this.responseBodyQueue.add(result);
		return result;
	}

	@RequestMapping("/deferred-result/model-and-view")
	public DeferredResult<ModelAndView> deferredResultWithView() {
		DeferredResult<ModelAndView> result = new DeferredResult<ModelAndView>(30000);
		this.mavQueue.add(result);
		//result.setResult(new ModelAndView("views/html", "javaBean", new JavaBean("bar", "apple")));
		return result;
	}

	@RequestMapping("/deferred-result/exception")
	public @ResponseBody DeferredResult<String> deferredResultWithException() {
		DeferredResult<String> result = new DeferredResult<String>(30000);
		this.exceptionQueue.add(result);
		//result.setErrorResult(new IllegalStateException("DeferredResult error11111"));
		return result;
	}
	
	@RequestMapping("/deferred-result/processQueues")
	public @ResponseBody String deferredProcessQueues() {
		processQueues();
		return "processQueues : Ok";
	}
	
	
	@RequestMapping("/deferred-result/timeout-value")
	public @ResponseBody DeferredResult<String> deferredResultWithTimeoutValue() {

		// Provide a default result in case of timeout and override the timeout value
		// set in src/main/webapp/WEB-INF/spring/appServlet/servlet-context.xml

		return new DeferredResult<String>(1000L, "Deferred result after timeout");
	}

	@Scheduled(fixedDelay=1000)
	public void processQueues() {
		//System.out.println("processQueues =========================>> " + responseBodyQueueCnt);
		
		for (DeferredResult<String> result : this.responseBodyQueue) {
			responseBodyQueueCnt++;
			result.setResult("Deferred result : " +responseBodyQueueCnt);
			
			this.responseBodyQueue.remove(result);
		}
		for (DeferredResult<String> result : this.exceptionQueue) {
			result.setErrorResult(new IllegalStateException("DeferredResult error"));
			this.exceptionQueue.remove(result);
		}
		for (DeferredResult<ModelAndView> result : this.mavQueue) {
			result.setResult(new ModelAndView("views/html", "javaBean", new JavaBean("bar", "apple")));
			this.mavQueue.remove(result);
		}
	}

	@ExceptionHandler
	@ResponseBody
	public String handleException(IllegalStateException ex) {
		return "Handled exception: " + ex.getMessage();
	}

}
