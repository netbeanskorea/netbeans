package ams.hsm;

import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.Socket;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import sun.misc.BASE64Decoder;
import sun.misc.BASE64Encoder;

/**
 * @author Administrator
 *
 */
public class HSMNonIssac {
	
	private static final BASE64Encoder base64Encoder = new BASE64Encoder();

	private static final BASE64Decoder base64Decoder = new BASE64Decoder();
	
//	private static final char[] ikey = new char[] {0x00,0x01,0x02,0x03,0x04,0x05,0x06,0x07,0x08,0x09,0x0a,0x0b,0x0c,0x0d,0x0e,0x0f};
//
//	private static final char[] iiv  = new char[] {0xf0,0xe0,0x0d,0x0c,0x0b,0x0a,0x09,0x08,0x07,0x06,0x05,0x04,0x03,0x02,0x01,0x00};
//	
//	private static final int ISSACAPI_SEED = 2;
//	
//	private static final int ISSACAPI_SE_CBC_MODE = 2;

//	private IssacSECONTEXT issac = null;

	private Socket socket = null;
	
	private InputStream inputStream = null;
	
	private OutputStream outputStream = null;
	
	private Log log = LogFactory.getLog(HSMNonIssac.class);
	
	/**
	 * 서버 연결
	 * @param host 서버 주소
	 * @param port 서버 포트
	 * @throws IOException
	 */
	public void connect(String host, int port) throws IOException {
		socket = new Socket(host, port);
		inputStream = socket.getInputStream();
		outputStream = socket.getOutputStream();
//		issac = new IssacSECONTEXT();
	}

	/**
	 * 서버 종료
	 * @throws IOException
	 */
	public void close() throws IOException {
		if (null != socket && !socket.isClosed()) {
			socket.close();
		}
	}
	
	/**
	 * 전송
	 * @param ba 전송할 바이너리
	 * @throws IOException
	 */
	private void send(byte[] ba) throws IOException {
		outputStream.write(ba);
	}
	
	/**
	 * 수신
	 * @param ba 수신할 바이너리
	 * @return 결과 코드 (0 연결 종료, 0 > 연결 오류)
	 * @throws IOException
	 */
	private int recv(byte[] ba) throws IOException {
		int i = 0;
		int j = ba.length;
		while (0 < j) {
			int ret = inputStream.read(ba, i, j);
			if (0 >= ret) {
				return ret;
			}
			i += ret;
			j -= ret;
		}
		return i;
	}
	
	/**
	 * 16 바이트 정렬
	 * @param ba 16 바이트로 정렬할 바이너리
	 * @return 16 바이트로 정렬된 바이너리
	 */
	public byte[] pack16(byte[] ba) {
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

	/**
	 * 암호화
	 * @param application 어플리케이션
	 * @param transaction 트랜젝션
	 * @param transport 구간 암호화
	 * @param record 레코드 갯수
	 * @param column 컬럼 갯수
	 * @param ba 암호화 할 바이너리
	 * @return 암호화 된 바이너리
	 * @throws IOException
	 */
	public byte[] encrypt(int application, int transaction, boolean transport, int record, int column, byte[] ba) throws IOException {
		byte[] ha = new byte[27];
		int length = ha.length + ba.length;
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
		ha[ 9] = (byte) ((0x45             )       );
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
		
		// 데이터
		send(ha);
		send(ba);
		if (0 >= recv(ha)) {
			return null;
		}
		
		if (0x30 != ha[12] || 0x30 != ha[13]) {
			throw new IOException("encrypt exception \"" + new String(ha, 12, 10) + "\"");
		}
		length = ((int)(ha[0] & 0xff) << 24) + ((int)(ha[1] & 0xff) << 16) + ((int)(ha[2] & 0xff) <<  8) + (ha[3] & 0xff);
		byte[] ra = new byte[length - ha.length];
		if (0 >= recv(ra)) {
			return null;
		}
		
		return ra;
	}
	
	/**
	 * 복호화 
	 * @param application 어플리케이션
	 * @param transaction 트랜젝션
	 * @param transport 구간 암호화
	 * @param record 레코드 갯수
	 * @param column 컬럼 갯수
	 * @param ba 복호화 할 바이너리
	 * @return 복호화 된 바이너리
	 * @throws IOException
	 */
	public byte[] decrypt(int application, int transaction, boolean transport, int record, int column, byte[] ba) throws IOException {
		byte[] ha = new byte[27];
		int length = ha.length + ba.length;
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
		ha[ 9] = (byte) ((0x44             )       );
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
		// 데이터
		send(ha);
		send(ba);
		if (0 >= recv(ha)) {
			return null;
		}
		if (0x30 != ha[12] || 0x30 != ha[13]) {
			throw new IOException("decrypt exception \"" + new String(ha, 12, 10) + "\"");
		}
		length = ((int)(ha[0] & 0xff) << 24) + ((int)(ha[1] & 0xff) << 16) + ((int)(ha[2] & 0xff) <<  8) + (ha[3] & 0xff);
		byte[] ra = new byte[length - ha.length];
		if (0 >= recv(ra)) {
			return null;
		}
		return ra;
	}
	
	/**
	 * 암호화
	 * @param application 어플리케이션
	 * @param transaction 트랜젝션
	 * @param record 레코드 갯수
	 * @param column 컬럼 갯수
	 * @param ba 암호화 할 바이너리
	 * @return 암호화 된 바이너리
	 * @throws IOException
	 */
	public byte[] encrypt(int application, int transaction, int record, int column, byte[] ba) throws IOException {
		return encrypt(application, transaction, false, record, column, pack16(ba));
	}
    
    public byte[] encryptIssac(int application, int transaction, int record, int column, byte[] ba) throws IOException {
        return encrypt(application, transaction, false, record, column, pack16(ba));
    }
    
	/**
	 * 복호화
	 * @param application 어플리케이션
	 * @param transaction 트랜젝션
	 * @param record 레코드 갯수
	 * @param column 컬럼 갯수
	 * @param ba 복호화 할 바이너리
	 * @return 복호화 된 바이너리
	 * @throws IOException
	 */
	public byte[] decrypt(int application, int transaction, int record, int column, byte[] ba) throws IOException {
		return decrypt(application, transaction, false, record, column, ba);
	}
	
    public byte[] decryptIssac(int application, int transaction, int record, int column, byte[] ba) throws IOException {
        return decrypt(application, transaction, false, record, column, ba);
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
	public String encryptBase64(int application, int transaction, int record, int column, byte[] ba) throws IOException {
		return base64Encoder.encode(encrypt(application, transaction, record, column, pack16(ba)));
	}
	
    public String encryptIssacBase64(int application, int transaction, int record, int column, byte[] ba) throws IOException {
        return base64Encoder.encode(encrypt(application, transaction, record, column, pack16(ba)));
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
	public byte[] decryptBase64(int application, int transaction, int record, int column, String str) throws IOException {
		byte[] ba = base64Decoder.decodeBuffer(str);
		return decrypt(application, transaction, record, column, ba);
	}

    public byte[] decryptIssacBase64(int application, int transaction, int record, int column, String str) throws IOException {
        byte[] ba = base64Decoder.decodeBuffer(str);
        return decrypt(application, transaction, record, column, ba);
    } 
    
	/**
	 * 암호화 후 구간 암호화
	 * @param application 어플리케이션
	 * @param transaction 트랜젝션
	 * @param record 레코드 갯수
	 * @param column 컬럼 갯수
	 * @param ba 암호화 후 구간 암호화 할 바이너리
	 * @return 암호화 후 구간 암호화 된 바이너리
	 * @throws IOException
	 */
//	public byte[] encryptIssac(int application, int transaction, int record, int column, byte[] ba) throws IOException {
//		issac.Set(ikey, iiv, ISSACAPI_SE_CBC_MODE, ISSACAPI_SEED);
//		byte[] ra = encrypt(application, transaction, true, record, column, issac.Encrypt(pack16(ba)));
//		issac.Delete();
//		return ra;
//	}
	
	/**
	 * 구간 복호화 후 복호화
	 * @param application 어플리케이션
	 * @param transaction 트랜젝션
	 * @param record 레코드 갯수
	 * @param column 컬럼 갯수
	 * @param ba 구간 복호화 후 복호화 할 바이너리
	 * @return 구간 복호화 후 복호화 된 바이너리
	 * @throws IOException
	 */
//	public byte[] decryptIssac(int application, int transaction, int record, int column, byte[] ba) throws IOException {
//		issac.Set(ikey, iiv, ISSACAPI_SE_CBC_MODE, ISSACAPI_SEED);
//		byte[] ra = issac.Decrypt(decrypt(application, transaction, true, record, column, ba));
//		issac.Delete();
//		return ra;
//	}
	
	/**
	 * 암호화 후 구간 암호화, base64 인코딩
	 * @param application 어플리케이션
	 * @param transaction 트랜젝션
	 * @param record 레코드 갯수
	 * @param column 컬럼 갯수
	 * @param ba 암호화 후 구간 암호화, base64 인코딩 할 바이너리
	 * @return 암호화 후 구간 암호화, base64 인코딩 된 문자열
	 * @throws IOException
	 */
//	public String encryptIssacBase64(int application, int transaction, int record, int column, byte[] ba) throws IOException {
//		return base64Encoder.encode(encryptIssac(application, transaction, record, column, pack16(ba)));
//	}

	/**
	 * base64 디코딩 후 복호화, 구간 복호화
	 * @param application 어플리케이션
	 * @param transaction 트랜젝션
	 * @param record 레코드 갯수
	 * @param column 컬럼 갯수
	 * @param str base64 디코딩 후 복호화, 구간 복호화 할 문자열
	 * @return base64 디코딩 후 복호화, 구간 복호화 된 바이너리
	 * @throws IOException
	 */
//	public byte[] decryptIssacBase64(int application, int transaction, int record, int column, String str) throws IOException {
//		byte[] ba = base64Decoder.decodeBuffer(str);
//		return decryptIssac(application, transaction, record, column, ba);
//	}

    public static void main(String[]args) {
    	HSMNonIssac hsm = new HSMNonIssac();
    	String plan = "ParkSeil";
    	try {
			hsm.connect("168.154.220.204",8301);
			String encryptStr = hsm.encryptBase64(1, 1, 1, 1, plan.getBytes());
			String decryptStr = new String(hsm.decryptBase64(1, 1, 1, 1, encryptStr));
			hsm.close();
			System.out.println("암호화 실시 : ["+plan+"] => ["+encryptStr+"]");
			System.out.println("복호화 실시 : ["+plan+"] => ["+decryptStr+"]");
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
    }
}
