package ams.fwk.code.internal;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.Observable;

import org.apache.commons.lang.StringUtils;

import nexcore.framework.core.cache.ICache;
import nexcore.framework.core.cache.ICacheManager;

import nexcore.framework.core.code.ICode;
import nexcore.framework.core.code.ICodeManager;
import nexcore.framework.core.prototype.AbsFwkService;
import nexcore.framework.core.prototype.IHealthCheckResult;
import nexcore.framework.core.util.BaseUtils;
import nexcore.framework.integration.db.ISqlManager;

public class AmsCachedCodeManager  extends AbsFwkService implements ICodeManager, java.util.Observer {

	protected ISqlManager         sm;

	protected ICacheManager       icm;

	protected static final String cacheName        = "amsCode";

	protected String[]            supportedLocales = null;

	protected boolean controlByDate = false;

	protected boolean controlByActiveness = false;

	public void setCacheManager(ICacheManager cm) {
		this.icm = cm;
	}

	public void setControlByDate(boolean controlByDate){
		this.controlByDate = controlByDate;
	}

	public void setControlByActiveness(boolean controlByActiveness){
		this.controlByActiveness = controlByActiveness;
	}

	public void init() {
		refresh();
		icm.addObserver(this);

		super.init();
	}

	protected ICache getCodeGroups() {
		return getCache();
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
		String supportedLocales = BaseUtils
		.getConfiguration("locale.supported");
		if (supportedLocales != null) {
			this.supportedLocales = supportedLocales.split(",");
		}
		return this.supportedLocales;
	}

	/**
	 *자식노드가 한 개라도 있는 부모코드 목록을 취득한다.  
	 */
	public List getCodeGroupIds() {
		List codes = sm.queryForList("core.code.getParentCodes");
		return codes;
	}

	/**
	 * 부모코드를 통해 하위코드들을 조회한다.
	 * @see nexcore.framework.core.code.ICodeManager#getCodes(java.lang.String)
	 */
	public List getCodes(String parentCdId) {
		return getCodes(parentCdId, controlByDate, controlByActiveness);
	}

	/**
	 * 
	 * @see nexcore.framework.core.code.ICodeManager#getCodes(java.lang.String, int, java.lang.String)
	 */
	public List getCodes(String parentCdId, int attrNo, String attrValue) {

		List allCodes = getCodes(parentCdId, controlByDate, controlByActiveness);
		List condCodes = new ArrayList();
		ICode code = null;

		if (null != allCodes && null != attrValue) {

			//코드아이템의 속성값이 동일한 코드목록만 리턴
			for (Iterator iter = allCodes.iterator(); iter.hasNext();) {
				code = (ICode) iter.next();
				if (attrValue.equals(code.getAttributeValue(attrNo))) {
					condCodes.add(code);
				}
			}

		} else if (null == attrValue) {
			condCodes = allCodes;
		}

		return condCodes;
	}

	/**
	 * 
	 * @see nexcore.framework.core.code.ICodeManager#getCodes(java.lang.String,
	 *      boolean, boolean)
	 */
	public List getCodes(String parentCdId, boolean controlByDate, boolean controlByActiveness) {
		// try to take from cache
		List cg = (List) getCodeGroups().get(parentCdId);
		if (cg == null) {
			// take from database and put to cache
			cg = getCodeGroupBySql(parentCdId);
			getCodeGroups().put(parentCdId, cg);
		}

		if (!controlByDate && !controlByActiveness) {
			return cg;
		}

		List returnedCg = new ArrayList();
		// controlByDate == true 라면 date 제한에 따라 usable인 코드만을 허용해야 함.
		// controlByActiveness == true 라면 isActive인 코드만을 허용해야 함.
		// TODO - 이상은 - reference를 리턴하지 못해 성능상 단점.. 해결은?
		// for(ICode code : cg){
		for (Iterator iter = cg.iterator(); iter.hasNext();) {
			ICode code = (ICode) iter.next();
			if ((!controlByDate || code.isUsableByDate())	&& (!controlByActiveness || code.isActive())) {
				returnedCg.add(code);
			}
		}
		return returnedCg;
	}

	public ICode getCode(String parentCdId, String codeId) {
		return getCode(parentCdId, codeId, controlByDate, controlByActiveness);
	}

	/**
	 * @see nexcore.framework.core.code.ICodeManager#getCode(java.lang.String,
	 *      java.lang.String, boolean, boolean)
	 */
	public ICode getCode(String parentCdId, String codeId, boolean controlByDate, boolean controlByActiveness) {
		if (codeId == null || codeId.equals("")){
			return null;
		}
		List cg = getCodes(parentCdId, controlByDate, controlByActiveness);
		Iterator all = cg.iterator();
		while (all.hasNext()) {
			ICode c = (ICode) all.next();
			if (codeId.equals(c.getId())) {
				return c;
			}
		}
		// 없다.
		return null;
	}

	public void setSqlManager(ISqlManager sm) {
		this.sm = sm;
	}

	/**
	 * @param groupId
	 * @return List<ICode>
	 */
	protected List getCodeGroupBySql(String parentCdId) {
		List codes = new ArrayList();
		// Map<String,Object> param
		Map param = new HashMap();
		param.put("PARENT_CODE_ID", parentCdId);
		// List<Map> codesBundle
		List codesBundle = sm.queryForList("core.code.getCodes", param);
		// for (Map<String, Object> each : codesBundle) {
		Map each = null;
		String codeId = "";
		Locale locale  = null;
		for (Iterator iter = codesBundle.iterator(); iter.hasNext();) {
			// Map<String, Object> each
			AmsCode code  = new AmsCode();
			each = (Map) iter.next();
			codeId = (String) each.get("CODE_ID");
			locale = BaseUtils.asLocale((String) each.get("LOCALE_ID"));
			code.setId(codeId);
			code.setGroupId(parentCdId);
			code.setValue(locale, (String) each.get("CODE_NAME"));
			for (int i = 0; i <=10; i++) {
				String num = "ATTRIBUTE_" + StringUtils.right("0" + i, 2);
				code.setAttributes((String) each.get(num));
			}
			Number displayIndex = (Number) each.get("DISPLAY_INDEX");
			code.setDisplayIndex((displayIndex == null) ? 0 : displayIndex.intValue());
			code.setUseAbleFlagXd(("Y").equals((String) each.get("USE_FLAG"))?"1":"0");
			codes.add(code);
		}
		return codes;
	}

	/**
	 * @see nexcore.framework.core.prototype.IHealthCheckable#checkHealth()
	 */
	public IHealthCheckResult checkHealth() {
		return null;
	}

	/**
	 * @see nexcore.framework.core.prototype.IRefresh#refresh()
	 */
	public void refresh() {
		//	        ICache cache = icm.getCache(cacheName);
		ICache cache = getCache();
		if (cache != null) {
			cache.removeAll();
		}
	}

	/**
	 * 주어진 group id에 해당하는 캐시된 코드들을 삭제한다.
	 * 
	 * @see nexcore.framework.core.prototype.IRefresh#refresh(java.lang.String)
	 */
	public void refresh(String parentCdId) {
		//	        ICache cache = icm.getCache(cacheName);
		ICache cache = getCache();
		if (cache != null && cache.containsKey(parentCdId)) {
			cache.remove(parentCdId);
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
