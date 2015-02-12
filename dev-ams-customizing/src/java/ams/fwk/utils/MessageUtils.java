package ams.fwk.utils;

import java.util.List;

import nexcore.framework.core.prototype.IMessageCoded;
import nexcore.framework.core.util.BaseUtils;
import ams.fwk.common.TrtmRsltMsg;
import ams.fwk.constants.Constants;

public class MessageUtils {
	
	private final static String RAW_LEVEL_ERROR_ID = "00000000";
	private final static char SLASH = '/';
	/**
	 * 예외객체를 CommonArea 표준전문헤더 메시지 목록으로 변환 최대 입력된 건수까지만 등록한다.
	 */
	public static void addMessage(List<TrtmRsltMsg> list, Throwable exception) {
		addMessage(list, exception, Constants.MSG_CNT);
	}

	/**
	 * 예외객체를 CommonArea 표준전문헤더 메시지 목록으로 변환 최대 입력된 건수까지만 등록한다.
	 */
	public static void addMessage(List<TrtmRsltMsg> list, Throwable exception, int maxCount) {
		//InvocationTargetException은 메시지화 하지 않는다.
		if(!(exception instanceof java.lang.reflect.InvocationTargetException) ){
			// 메시지 건수를 체크한다.
			checkMessageCount(list, maxCount);
			// 메시지 등록
			list.add(getMessage(exception));
		}
		
		Throwable cause = exception.getCause();
		if (cause != null) {
			addMessage(list, cause, maxCount);
		}
	}
	
	private static void checkMessageCount(List<TrtmRsltMsg> list, int maxCount){
		if (list.size() >= maxCount) {
			// throw된 예외인 경우 10번째에 채우기 위해 삭제한다.
			list.remove(maxCount - 1);
		}
	}
	
	private static TrtmRsltMsg getMessage(Throwable exception) {
		String code = null;
		String message = null;
		if (exception instanceof IMessageCoded) {
			IMessageCoded imc = (IMessageCoded) exception;
			code = imc.getMessageId();
			message = BaseUtils.getMessage(code, imc.getMessageParams());
		} else {
			code = RAW_LEVEL_ERROR_ID;
			message = exception.toString();
		}

		int erorOcrnPrrmLine = 0;
		String erorOcrnPrrmNm = null;
		StackTraceElement[] stes = exception.getStackTrace();
		if (stes != null) {
			for (StackTraceElement ste : stes) {
				int index = ste.getClassName().lastIndexOf(".");
				erorOcrnPrrmNm = (index > -1 ? ste.getClassName().substring(index + 1) : ste.getClassName()) + SLASH + ste.getMethodName();
				erorOcrnPrrmLine = ste.getLineNumber();
				break;
			}
		}
		return new TrtmRsltMsg(code, message, erorOcrnPrrmLine, erorOcrnPrrmNm);
	}
}
