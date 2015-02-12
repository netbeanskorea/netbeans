package ams.fwk.utils;

import java.io.IOException;
import java.nio.ByteBuffer;

import nexcore.framework.core.util.ByteArrayWrap;
import sun.misc.BASE64Decoder;
import sun.misc.BASE64Encoder;
import ams.fwk.outbound.tcp.HSMRuntimeException;
import ams.fwk.outbound.tcp.internal.OutboundConnection;
import ams.fwk.outbound.tcp.internal.OutboundConnectionFactory;

import com.star.nexcore.foundation.util.StringUtils;

public final class HSMUtils {
	private static final String TARGET_NAME = "HSM_PUSH1";
	private static final BASE64Encoder base64Encoder = new BASE64Encoder();
	private static final BASE64Decoder base64Decoder = new BASE64Decoder();
	
	private static OutboundConnection getConnection() {
		OutboundConnection conn = OutboundConnectionFactory.get(TARGET_NAME);
		return conn;
	}
	
	/**
	 * 암호화 후 base64 인코딩
	 * @param application 어플리케이션
	 * @param transaction 트랜젝션
	 * @param record 레코드 갯수
	 * @param column 컬럼 갯수
	 * @param ba 암호화 후 base64 인코딩 할 바이너리
	 * @return 암호화 후 base64 인코딩 된 문자열
	 * @throws IOException
	 */
	public static String encryptBase64ByHSM(int application, int transaction, int record, int column, String plainText) {
		OutboundConnection conn = null;
		byte[] receive  = null;
		try {
			if(StringUtils.isEmpty(plainText)) {
				throw new HSMRuntimeException("M1000002", new String[]{"plainText"});
			}
			conn = getConnection();
			byte[] flat = makeFlat(true, application, transaction, false, record, column, pack16(plainText.getBytes()));
			receive = conn.call(new ByteArrayWrap(flat), -1);
		} catch(Exception e) {
			if(conn != null) {
				OutboundConnectionFactory.destroy(conn);
			}
			throw new HSMRuntimeException("SKFS1005", new String[] { e.getMessage() }, e);
		} finally {
			if(conn != null) {
				OutboundConnectionFactory.release(conn);
			}
		}
		return base64Encoder.encode(receive);
	}
	
	/**
	 * base64 디코딩 후 복호화 
	 * @param application 어플리케이션
	 * @param transaction 트랜젝션
	 * @param record 레코드 갯수
	 * @param column 컬럼 갯수
	 * @param str base64 디코딩 후 복호화 할 텍스트
	 * @return 디코딩 후 복호화 된 바이너리
	 * @throws IOException
	 */
	public static String decryptBase64ByHSM(int application, int transaction, int record, int column, String encryptedText)  {
		OutboundConnection conn = null;
		byte[] flat = null;
		byte[] receive = null;
		try {
			if(StringUtils.isEmpty(encryptedText)) {
				throw new HSMRuntimeException("M1000002", new String[]{"encryptedText"});
			}
			conn = getConnection();
			flat = makeFlat(false, application, transaction, false, record, column, base64Decoder.decodeBuffer(encryptedText));
			receive = conn.call(new ByteArrayWrap(flat), -1);
		} catch(Exception e) {
			if(conn != null) {
				OutboundConnectionFactory.destroy(conn);
			}
			throw new HSMRuntimeException("SKFS1005", new String[] { e.getMessage() }, e);
		} finally {
			if(conn != null) {
				OutboundConnectionFactory.release(conn);
			}
		}
		return new String(receive).trim();
	}
	
	private static  byte[] makeFlat(boolean isEncrypt, int application, int transaction, boolean transport, int record, int column,byte[] text) {
		byte[] ha = new byte[27];
		int length = ha.length + text.length;
		// 총길이
		ha[ 0] = (byte) ((length      >> 24) & 0xff);
		ha[ 1] = (byte) ((length      >> 16) & 0xff);
		ha[ 2] = (byte) ((length      >>  8) & 0xff);
		ha[ 3] = (byte) ((length           ) & 0xff);
		// 어플리케이션 코드
		ha[ 4] = (byte) ((application      ) & 0xff);
		// 트랜젝션 번호
		ha[ 5] = (byte) ((transaction >> 24) & 0xff);
		ha[ 6] = (byte) ((transaction >> 16) & 0xff);
		ha[ 7] = (byte) ((transaction >>  8) & 0xff);
		ha[ 8] = (byte) ((transaction      ) & 0xff);
		
		// 명령어 (0x44 D, 0x45 E)
		if(isEncrypt) {
			ha[ 9] = (byte) ((0x45             )       );
		} else {
			ha[ 9] = (byte) ((0x44             )       );
		}
		// 구간 암호화 구분 (0x59 Y, 0x4E N)
		ha[10] = (byte) ((transport ? 0x59 : 0x4E) );
		// 송수신 구분  (0x51 Q, 0x41 A)
		ha[11] = (byte) ((0x51             )       ); 
		// 처리 결과 (0x30 0)
		ha[12] = (byte) ((0x30             )       );
		ha[13] = (byte) ((0x30             )       );
		// 암호화 처리 결과 코드
		ha[14] = (byte) ((0x00             )       );
		ha[15] = (byte) ((0x00             )       );
		ha[16] = (byte) ((0x00             )       );
		ha[17] = (byte) ((0x00             )       );
		// 암호화 처리 에러 코드
		ha[18] = (byte) ((0x00             )       );
		ha[19] = (byte) ((0x00             )       );
		ha[20] = (byte) ((0x00             )       );
		ha[21] = (byte) ((0x00             )       );
		// 레코드 수
		ha[22] = (byte) ((record      >> 24) & 0xff);
		ha[23] = (byte) ((record      >> 16) & 0xff);
		ha[24] = (byte) ((record      >>  8) & 0xff);
		ha[25] = (byte) ((record           ) & 0xff);
		// 컬럼 수
		ha[26] = (byte) ((column           ) & 0xff);
		
		ByteBuffer bb = ByteBuffer.allocate(length);
		bb.put(ha, 0, ha.length);
		bb.put(text, 0, text.length);
		
		return bb.array();
	}
	/**
	 * 16 바이트 정렬
	 * @param ba 16 바이트로 정렬할 바이너리
	 * @return 16 바이트로 정렬된 바이너리
	 */
	private static byte[] pack16(byte[] ba) {
		if (0 == (ba.length % 16)) {
			return ba;
		}
		byte[] ra = new byte[(((ba.length / 16) + 1) * 16)];
		System.arraycopy(ba, 0, ra, 0, ba.length);
		for (int i = ba.length; i < ra.length; i++) {
			ra[i] = 0x20;
		}
		return ra;
	}
}
