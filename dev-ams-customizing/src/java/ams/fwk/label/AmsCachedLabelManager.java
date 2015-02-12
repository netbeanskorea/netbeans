package ams.fwk.label;

import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.Observable;
import java.util.Observer;

import nexcore.framework.core.cache.ICache;
import nexcore.framework.core.cache.ICacheManager;
import nexcore.framework.core.label.ILabel;
import nexcore.framework.core.label.ILabelManager;
import nexcore.framework.core.label.internal.Label;
import nexcore.framework.core.prototype.AbsFwkService;
import nexcore.framework.core.prototype.IHealthCheckResult;
import nexcore.framework.core.util.BaseUtils;
import nexcore.framework.integration.db.ISqlManager;

public class AmsCachedLabelManager extends AbsFwkService implements ILabelManager, Observer {
	
	protected ISqlManager         sm;
	protected ICacheManager       icm;
	protected String cacheName        = "amsLabel";
	protected boolean preload = true;
	
	public void setCacheManager(ICacheManager cm) {
		this.icm = cm;
	}
	
	public void setSqlManager(ISqlManager sm) {
		this.sm = sm;
	}
	
	public void setCacheName(String cacheName) {
		this.cacheName = cacheName;
	}

	public void setPreload(String  preload) {
		this.preload = preload=="true"?true:false;
	}

	public void init() {
		refresh();
		icm.addObserver(this);

		super.init();
	}
	 
	public Locale getDefaultLocale() {
	        return BaseUtils.getDefaultLocale();
	 }
	
	@Override
	public void refresh() {
		 if (preload) { // read all again
	            readLabels();
	        } else { // remove all
	            getCache().removeAll();
	        }

	}

	@Override
	public void refresh(String key) {
		StringBuffer sb = new StringBuffer("refreshing label with key=" + key + "... ");
        Map labelBundle = getLabelBundleFromDb(key);
        if(labelBundle == null || labelBundle.size() < 1){
            sb.append("label not found in db. deleting from cache... ");
            getCache().remove(key);
        }else{
            sb.append("found one in db. updating cache... ");
            getCache().put(key, labelBundle);
        }
        sb.append("done.");
        if(log.isDebugEnabled()){
            log.debug(sb.toString());
        }

	}

    protected void readLabels() {
        StringBuffer sb = new StringBuffer("reading labels from db... ");
        ICache cache = getCache();
        List tmpBundle = sm.queryForList("ams.label.getLabelBundles");
        sb.append("number of DB records = " + tmpBundle.size() + ", transferring to cache...");
        for(Iterator it=tmpBundle.iterator();it.hasNext();){
            Map each = (Map)it.next();
            String key = (String) each.get("ID");
            Map labelBundle = (Map)cache.get(key);
            if (labelBundle == null){
                labelBundle = new HashMap();
                cache.put(key, labelBundle);
            }
            Locale locale = BaseUtils.asLocale((String) each.get("LOCALE_ID"));
            labelBundle.put(locale.getLanguage(), fromMaptoLabel(each));
        }
        sb.append("done. (size = " + cache.getElementCount() + ")");
        if(log.isDebugEnabled()){
            log.debug(sb.toString());
        }
    }
	@Override
	public IHealthCheckResult checkHealth() {
		return null;
	}

	@Override
	public void update(Observable o, Object value) {
		String removedCacheName = (String) value;
		//전체 or 지금 사용하는 캐시 remove
		if (removedCacheName == null || removedCacheName.equals(cacheName)) {
			refresh();
		}
	}

	@Override
    public ILabel getLabel(String key) {
        return getLabel(key, getDefaultLocale());
    }

	@Override
    public ILabel getLabel(String key, Locale locale) {
        Map labelBundle = getLabelBundle(key);
        return (ILabel)labelBundle.get(locale.getLanguage());
    }

    protected Map getLabelBundle(String key) {
        ICache cache = getCache();
        Map labelBundle = (Map) cache.get(key);
        if (labelBundle == null || labelBundle.size() < 1) {
            // DB에서 얻어오고 cache에 등록.
            labelBundle = getLabelBundleFromDb(key);
            cache.put(key, labelBundle);
        }
        return labelBundle;
    }
    
    protected ICache getCache() {
        ICache cache = icm.getCache(cacheName);
        if (cache == null) {
            icm.addCache(cacheName);
            cache = icm.getCache(cacheName);
        }
        return cache;
    }
    
    protected Map getLabelBundleFromDb(String key) {
        Map labelBundle = new HashMap();
        List tmpBundle = sm.queryForList("ams.label.getLabelBundleById", key);
        
        for(Iterator it=tmpBundle.iterator();it.hasNext();){
            Map each = (Map)it.next();
            Locale locale = BaseUtils.asLocale((String) each.get("LOCALE_ID"));
            labelBundle.put(locale.getLanguage(), fromMaptoLabel(each));
        }
        return labelBundle;
    }
    
    protected ILabel fromMaptoLabel(Map map) {
        Label label = new Label();
        label.setId((String) map.get("ID"));
        label.setLocaleXd(BaseUtils.asLocale((String) map.get("LOCALE_ID")));
        label.setName((String) map.get("NAME"));
        return label;
    }
}
