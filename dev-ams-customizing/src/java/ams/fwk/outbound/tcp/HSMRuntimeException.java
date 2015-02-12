package ams.fwk.outbound.tcp;

import nexcore.framework.core.exception.SystemRuntimeException;

/**
 * 아웃바운드 예외 클래스
 */
public class HSMRuntimeException extends SystemRuntimeException {

	private static final long serialVersionUID = -5743437229933671142L;

	public HSMRuntimeException(String messageCode) {
		super(messageCode);
	}

	public HSMRuntimeException(String messageCode, String messageParams[]) {
		super(messageCode, messageParams);
	}

	public HSMRuntimeException(String messageCode, Throwable throwable) {
		super(messageCode, throwable);
	}

	public HSMRuntimeException(String messageCode, String messageParams[], Throwable throwable) {
		super(messageCode, messageParams, throwable);
	}

}
