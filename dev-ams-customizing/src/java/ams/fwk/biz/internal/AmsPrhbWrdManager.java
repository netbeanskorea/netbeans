package ams.fwk.biz.internal;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Observable;

import org.apache.commons.net.ntp.TimeStamp;

import nexcore.framework.core.cache.ICache;
import nexcore.framework.core.cache.ICacheManager;
import nexcore.framework.core.prototype.AbsFwkService;
import nexcore.framework.core.prototype.IHealthCheckResult;
import nexcore.framework.core.util.BaseUtils;
import nexcore.framework.integration.db.ISqlManager;

public class AmsPrhbWrdManager extends AbsFwkService implements  java.util.Observer {

	protected ISqlManager         sm;

	protected ICacheManager       icm;

	protected static final String cacheName  = "amsPrhbWrd";
	
	protected static final String SELECT_ALL = "SELECT_ALL";

	protected String[]            supportedLocales = null;

	protected boolean controlByActiveness = false;

	public void setCacheManager(ICacheManager cm) {
		this.icm = cm;
	}

	public void setControlByActiveness(boolean controlByActiveness){
		this.controlByActiveness = controlByActiveness;
	}

	public void init() {
		refresh();
		icm.addObserver(this);

		super.init();
	}

	protected ICache getCache() {
		ICache cache = icm.getCache(cacheName);
		if (cache == null) {
			icm.addCache(cacheName);
			cache = icm.getCache(cacheName);
		}
		return cache;
	}

	public String[] getSupportedLocales() {
		String supportedLocales = BaseUtils.getConfiguration("locale.supported");
		if (supportedLocales != null) {
			this.supportedLocales = supportedLocales.split(",");
		}
		return this.supportedLocales;
	}

	/**
	 *DB에서 금칙어 목록 조회한다 
	 */
	private List selectPrhbWrdList() {
		List codes = sm.queryForList("ams.prhbwrd.selectAll");
		return codes;
	}

	/**
	 * 
	 * @see nexcore.framework.core.code.ICodeManager#getCodes(java.lang.String)
	 */
	public List<IPrhbWord> getPrhbWrdList() {
		return getCachedPrhbWrdList(controlByActiveness);
	}

	/**
	 * 
	 * @see nexcore.framework.core.code.ICodeManager#getCodes(java.lang.String,
	 *      boolean, boolean)
	 */
	private List<IPrhbWord> getCachedPrhbWrdList(boolean controlByActiveness) {
		// try to take from cache
		List<IPrhbWord> cg = (List) getCache().get(SELECT_ALL);
		if (cg == null) {
			// take from database and put to cache
			cg = getPrhbWrdListBySql();
			getCache().put(SELECT_ALL, cg);
		}
	/**
	 * 향후 금칙어 테이블에 사용여부 Flag가 생성된다면 아래의 내용을 추가하면 된다. 
	 */
//		if (!controlByActiveness) {
//			return cg;
//		}

//		List returnedCg = new ArrayList();
		// controlByActiveness == true 라면 isActive인 코드만을 허용해야 함.
		// TODO - 이상은 - reference를 리턴하지 못해 성능상 단점.. 해결은?
		// for(ICode code : cg){
//		for (Iterator iter = cg.iterator(); iter.hasNext();) {
//			IAmsCode code = (IAmsCode) iter.next();
//			if (!controlByActiveness || code.isActive()) {
//				returnedCg.add(code);
//			}
//		}
		return cg;
	}

	public void setSqlManager(ISqlManager sm) {
		this.sm = sm;
	}

	/**
	 * @param groupId
	 * @return List<ICode>
	 */
	protected List<IPrhbWord> getPrhbWrdListBySql() {
		List<IPrhbWord> wordList = new ArrayList<IPrhbWord>();

		List wordsBundle = selectPrhbWrdList();
		Map prhbWrdMap = null;
		PrhbWord prhbWord = null; 
		// for (Map<String, Object> each : codesBundle) {
		for (Iterator iter = wordsBundle.iterator(); iter.hasNext();) {
			prhbWord = new PrhbWord();
			prhbWrdMap = (Map)iter.next();
			if(prhbWrdMap != null) {
				prhbWord.setseqNo(Integer.parseInt(prhbWrdMap.get("SEQ_NO").toString()));
				prhbWord.setProhibitWord((String)prhbWrdMap.get("PROHIBIT_WORD"));
				prhbWord.setRegUserId((String)prhbWrdMap.get("REG_USER_ID"));
				prhbWord.setRegDate(Timestamp.valueOf(prhbWrdMap.get("REG_DATE").toString()));
				prhbWord.setUpdateUserId((String)prhbWrdMap.get("UPDATE_USER_ID"));
				prhbWord.setUpdateDate(Timestamp.valueOf(prhbWrdMap.get("UPDATE_DATE").toString()));
				prhbWord.setUseFlag((String)prhbWrdMap.get("USE_FLAG"));
				wordList.add(prhbWord);
			}
		}
		return wordList;
	}

	/**
	 * 금칙어 캐쉬를 삭제한다.
	 */
	public void refresh() {
		//	        ICache cache = icm.getCache(cacheName);
		ICache cache = getCache();
		if (cache != null) {
			cache.removeAll();
		}
	}

	/**
	 * 금칙어 캐쉬를 삭제한다.
	 * 
	 * @see nexcore.framework.core.prototype.IRefresh#refresh(java.lang.String)
	 */
	public void refresh(String kindFlag) {
		//	        ICache cache = icm.getCache(cacheName);
		ICache cache = getCache();
		if (cache != null && cache.containsKey(kindFlag)) {
			cache.remove(kindFlag);
		}
	}

	public void update(Observable o, Object value) {
		String removedCacheName = (String) value;
		//전체 or 지금 사용하는 캐시 remove
		if (removedCacheName == null || removedCacheName.equals(cacheName)) {
			refresh();
		}
	}

}
