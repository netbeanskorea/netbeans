/*
 * Copyright (c) 2004 SK C&C. All rights reserved.
 * 
 * This software is the confidential and proprietary information of SK C&C. You
 * shall not disclose such Confidential Information and shall use it only in
 * accordance wih the terms of the license agreement you entered into with SK
 * C&C.
 */

package ams.fwk.utils;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.PrintWriter;
import java.io.StringWriter;
import java.net.URL;
import java.security.AccessControlException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.Collections;
import java.util.Iterator;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.Properties;
import java.util.Random;
import java.util.Timer;
import java.util.TimerTask;
import java.util.jar.JarFile;

import javax.ejb.EJBHome;
import javax.naming.Context;
import javax.naming.InitialContext;
import javax.naming.NamingException;
import javax.rmi.PortableRemoteObject;
import javax.servlet.ServletContext;

import nexcore.framework.core.Constants;
import nexcore.framework.core.ServiceConstants;
import nexcore.framework.core.cache.ICache;
import nexcore.framework.core.cache.ICacheManager;
import nexcore.framework.core.cc.ICenterCutManager;
import nexcore.framework.core.code.ICode;
import nexcore.framework.core.code.ICodeManager;
import nexcore.framework.core.data.IDataSet;
import nexcore.framework.core.data.IOnlineContext;
import nexcore.framework.core.data.IRecordSet;
import nexcore.framework.core.exception.FwkRuntimeException;
import nexcore.framework.core.ioc.ComponentRegistry;
import nexcore.framework.core.label.ILabel;
import nexcore.framework.core.message.IMessage;
import nexcore.framework.core.message.IMessageManager;
import nexcore.framework.core.parameter.IBizParamManager;
import nexcore.framework.core.parameter.IConfigurationManager;
import nexcore.framework.core.parameter.ILocaleParamManager;
import nexcore.framework.core.parameter.IWasInstanceManager;
import nexcore.framework.core.parameter.WasInstance;
import nexcore.framework.core.util.AppUtils;
import nexcore.framework.core.util.StringUtils;

import org.springframework.util.ResourceUtils;
import org.springframework.web.context.WebApplicationContext;
import org.springframework.web.context.support.WebApplicationContextUtils;

import ams.fwk.biz.internal.AmsPrhbWrdManager;
import ams.fwk.biz.internal.IPrhbWord;
import ams.fwk.code.internal.AmsCode;
import ams.fwk.common.user.IAmsUserInfo;
import ams.fwk.file.AmsFileUploadManager;
import ams.fwk.file.FileResourceManager;
import ams.fwk.file.IAmsFileUploadManager;
import ams.fwk.label.AmsCachedLabelManager;
import ams.fwk.mail.IMailManager;

/**
 * <ul>
 * <li>업무 그룹명 : 금융 프레임워크 </li>
 * <li>서브 업무명 : 공통모듈</li>
 * <li>설 명 : 기본 유틸리티</li>
 * <li>작성일 : 2007. 2.28.</li>
 * <li>작성자 : 김용석,이상은</li>
 * </ul>
 * @version 1.5 2012-01-26 Jihwan Cha, getMessage() 보완
 * @version 1.4 2012-01-04 Jihwan Cha, XIO 경로 조회 메소드 추가
 * @version 1.3 2011-11-18 Jihwan Cha, nullEscape 모드에 따른 메시지 조회 메소드 추가
 * @version 1.2 2011-08-30 Jihwan Cha, getRuntimeMode() 메소드 추가
 * @version 1.1 2011-07-26 Jihwan Cha, 코드 조회 하는 메소드 추가
 */
public final class BaseUtils {

    /**
     * system id.
     */
    private static final String SYSTEM_ID = "system.id";
    
    /**
     * 현재 수행 중인 WAS의 인스턴스 아이디<br>Id of this WAS instance currently used
     * @deprecated use getCurrentWasInstanceId() instead. should become private later.
     */
    public static String WAS_INSTANCE_ID = null;

    static {
        String wInstId = null;
        try {
            wInstId = AppUtils.getProperty(SYSTEM_ID);
        } catch (AccessControlException e) {
            e.printStackTrace();
        }

        if (wInstId == null) {
            wInstId = "localhost";
        }

        WAS_INSTANCE_ID = wInstId;
    }

    /**
     * 객체 생성 방지<br>preventing instantiation
     */
    private BaseUtils() {
        ;
    }

    /**
     * 서블릿엔진에 설치된 IOC 컨테이너의 컴포넌트를 찾아온다.
     * <br>lookup web component from web container registered in servlet 
     * 
     * @param componentId 컴포넌트 아이디
     *        <br> 컴포넌트 인스턴스를 얻지 못하면 Spring의 <tt>BeansException</tt> 을 던진다.
     *        <br> id of the component
     *        <br>throws  spring's <tt>BeansException</tt> if component instance could not be obtained
     * @return 컴포넌트의 객체 인스턴스 <br>object instance of the component identified by componentId
     */
    public static Object lookupWebComponent(String componentId,
                                            ServletContext servletContext) {
        WebApplicationContext applicationContext = WebApplicationContextUtils
                .getRequiredWebApplicationContext(servletContext);
        return applicationContext.getBean(componentId);
    }

    /**
     * 센터컷 관리 컴포넌트를 룩업하여 반환한다.<br>lookup component instance for centercut
     * 
     * @return 센터컷 관리 컴포넌트 인스턴스<br>Component instance for processing centercut
     * @deprecated 해당 컴포넌트는 더이상 쓰이지 않음 <br> Not using that component any more
     */
    public static ICenterCutManager lookupCenterCutManager() {
        return (ICenterCutManager) ComponentRegistry
                .lookup(ServiceConstants.CENTER_CUT);
    }

    /**
     * 주어진 예외의 근본원인을 result객체에 담는다. 
     * 원인이 존재하지 않거나 알려지지 않은 경우 null을 반환한다.
     * <br>return the root cause of the given <tt>java.lang.Throwable</tt> object.
     * 
     * @param e 근본원인을 찾을 예외 객체 <br> <tt>java.lang.Throwable</tt> object to find the root cause
     * @return 주어진 예외의 근본원인
     *      <br>null을 받으면 null을 리턴한다.
     *      <br>root cause of the given <tt>java.lang.Throwable</tt>  object. 
     *      <br> return null if null is given
     */
    public static Throwable getRootCause(Throwable e) {
        if (e == null) {
            return null;
        }
        Throwable result = e;
        while (result.getCause() != null) {
            result = result.getCause();
        }
        return result;
    }

    /**
     * 주어진 문자열을 ","을 기준으로 나누어 <tt>java.util.Collection</tt>객체에 담아 반환한다.
     * <br>divide a given string into a collection based on delimiter ','
     * 
     * @param param 구분 처리 대상 문자열 <br> string to be processed
     * @return Collection object which contains String array. Collection&lt;?&gt;
     */
    public static Collection asCollectionByComma(String param) {
        if (param == null || param.trim().length() == 0) {
            return Collections.EMPTY_LIST;
        }
        
        // String.split(..) returns String[]
        return Arrays.asList(param.replaceAll("\\s", "").split(","));
    }

    /**
     * 주어진 배열의 특정한 위치로부터 특정한 길이만큼을 복사해  새 배열로 얻어 반환한다.
     * <br>Copies and returns a part of the specified array from the specified position
     * with specified length.
     * 
     * @param src 복사될  배열<br>the source array
     * @param srcPos 복사 시작 위치<br>starting position in the source array.
     * @param length 복사할 길이<br>the number of array elements to be copied.
     * @return 복사로 얻어진 배열<br>Copied array object.
     */
    public static byte[] copyByteArray(byte[] src, int srcPos, int length) {
        byte[] b = new byte[length];
        System.arraycopy(src, srcPos, b, 0, length);
        return b;
    }

    /**
     * 프로퍼티 파일을 읽어 <code>java.util.Properties</code> 객체를 생성해 리턴한다.
     * <br>Returns <code>java.util.Properties</code> object from the specified properties file.
     * 
     * @param fileName
     *            파일 경로. 자원 경로 혹은 절대 경로로 주어야 하며 파일을 찾지 못할 경우 런타임 예외를 던진다.
     *            <br>File path as a resource name or absolute path name. It will throw an runtime exception 
     *            if the file could not be found.
     * @return <code>java.util.Properties</code> 객체. <br><code>java.util.Properties</code> object
     */
    public static Properties loadProperties(String fileName) {
        return loadProperties(fileName, null);
    }

    /**
     * 프로퍼티 파일을 읽어 <code>java.util.Properties</code> 객체를 생성해 리턴한다.
     * <br>Returns <code>java.util.Properties</code> object from the specified properties file.
     * 
     * @param fileName
     *            파일 경로. 자원 경로 혹은 절대 경로로 주어야 하며 파일을 찾지 못할 경우 런타임 예외를 던진다.
     *            <br>File path as a resource name or absolute path name. It will throw an runtime exception 
     *            if the file could not be found.
     * @param encoding 
     *            파일을 해석할 인코딩. native2ascii 등으로 변환하지 않은 일반 텍스트 파일을 읽어야 할 때 부여하며
     *            필요 없으면 null을 준다. <br> Encoding characterset. It is needed when you read non-Latin-1
     *            text file. If you have a normal properties file which is already done with native2ascii, 
     *            <code>null</code> should be given.
     * @return
     *      <code>java.util.Properties</code> 객체. <br><code>java.util.Properties</code> object
     */
    public static Properties loadProperties(String fileName,
                                            final String encoding) {
        InputStream in = null;
        try {
            // try to find it as a resource
            URL url = BaseUtils.class.getClassLoader().getResource(fileName);
            if (url != null ){
                if (ResourceUtils.isJarURL(url)){
                    // as a resource in jar
                    URL t = ResourceUtils.extractJarFileURL(url);
                    JarFile jf = new JarFile(t.getPath());
                    in = jf.getInputStream(jf.getEntry(fileName));
                }else{
                    // as a resource in file system
                    in = new FileInputStream(url.getFile());
                }
            }else if (new File(fileName).canRead()){
                // find it as a file
                in = new FileInputStream(new File(fileName));
            }else{
                throw new FwkRuntimeException(
                        "Could not find a file or resource denoted by '" + fileName + "'");
            }

            Properties result = new Properties();
            result.load(in);

            if (encoding != null) {
                for (Iterator it = result.keySet().iterator(); it.hasNext();) {
                    String key = (String) it.next();
                    String value = result.getProperty(key);
                    value = new String(value.toString().getBytes("8859_1"),
                            encoding);
                    result.put(key, value);
                }
            }
            return result;
        } catch (Exception e) {
            // TODO 적당한 예외를 넣어주자
            throw new FwkRuntimeException(
                    "Error occurred loading properties denoted by '" + fileName + "'", e);
        } finally {
            try {
                if (in != null) {
                    in.close();
                }
            } catch (IOException ie) {
                ;
            }
        }
    }

    /**
     * 컴포넌트 IMessageManager로부터 메시지를 얻어온다.
     * <br>Returns a message from IMessageManager component.
     * 
     * @param msgKey
     *            메시지 키.<br>Message key.
     * @return
     *            메시지 문자열. <br> Message as <tt>java.lang.String</tt>.
     */
    public static String getMessage(String msgKey) {
        return getMessage(msgKey, getDefaultLocale(), null);
    }

    /**
     * 컴포넌트 IMessageManagement로 부터 파라미터를 적용한 메시지를 얻어온다.
     * 메시지의 구성 규칙으로 <code>java.text.MessageFormat</code>을 이용한다.
     * <br>Returns a parameterized message from IMessageManager component,
     * using <code>java.text.MessageFormat</code> as a format to construct message.
     * 
     * @param msgKey
     *            메시지 키.<br>Message key.
     * @param params
     *            메시지를 구성하는 데 쓰일 파라미터<br>Parameters used for constructing message.
     * @return 
     *            메시지 문자열. <br> Message as <tt>java.lang.String</tt>.
     */
    public static String getMessage(String msgKey, Object[] params) {
        return getMessage(msgKey, getDefaultLocale(), params);
    }
    
    /**
     * 컴포넌트 IMessageManagement로 부터 파라미터를 적용한 메시지를 얻어온다.
     * 메시지의 구성 규칙으로 <code>java.text.MessageFormat</code>을 이용한다.
     * <br>Returns a parameterized message from IMessageManager component,
     * using <code>java.text.MessageFormat</code> as a format to construct message.
     * 
     * @param msgKey
     *            메시지 키.<br>Message key.
     * @param params
     *            메시지를 구성하는 데 쓰일 파라미터<br>Parameters used for constructing message.
     * @param nullEscape
     *            주어진 키에 대응되는 메시지가 없을 때의 대안동작을 규정하는 문자열.
     *            <br>A string denoting what to do when no message found with the given key. 
     * @return 
     *            메시지 문자열. <br> Message as <tt>java.lang.String</tt>.
     * @since 1.3
     */
    public static String getMessage(String msgKey, Object[] params, String nullEscape) {
        return getMessage(msgKey, getDefaultLocale(), params, nullEscape);
    }
    
    /**
     * 컴포넌트 IMessageManager로부터 메시지를 얻어온다.
     * <br>Returns a message from IMessageManager component.
     * 
     * @param msgKey
     *            메시지 키.<br>Message key.
     * @param locale
     *            로케일 <br> locale.
     * @return 
     *            메시지 문자열. <br> Message as <tt>java.lang.String</tt>.
     */
    public static String getMessage(String msgKey, Locale locale) {
        return getMessage(msgKey, locale, null);
//        IMessageManager manager = (IMessageManager) ComponentRegistry
//                .lookup(ServiceConstants.MESSAGE);
//        return manager.getMessage(msgKey, locale).getName();
    }

    /**
     * 컴포넌트 IMessageManagement로 부터 파라미터를 적용한 메시지를 얻어온다.
     * 메시지의 구성 규칙으로 <code>java.text.MessageFormat</code>을 이용한다.
     * <br>Returns a parameterized message from IMessageManager component,
     * using <code>java.text.MessageFormat</code> as a format to construct message.
     * 
     * @param msgKey
     *            메시지 키.<br>Message key.
     * @param locale
     *            로케일 <br> locale.
     * @param params
     *            메시지를 구성하는 데 쓰일 파라미터<br>Parameters used for constructing message.
     * @return 
     *            메시지 문자열. <br> Message as <tt>java.lang.String</tt>.
     */
    public static String getMessage(String msgKey, Locale locale,
                                    Object[] params) {
        return getMessage(msgKey, locale, params, null);
//        IMessageManager manager = (IMessageManager) ComponentRegistry
//                .lookup(ServiceConstants.MESSAGE);
//        IMessage message = manager.getMessage(msgKey, locale);
//        return (message == null) ? null : message.getName(params);
    }

    /**
     * 컴포넌트 IMessageManagement로 부터 파라미터를 적용한 메시지를 얻어온다.
     * 메시지의 구성 규칙으로 <code>java.text.MessageFormat</code>을 이용한다.
     * <br>Returns a parameterized message from IMessageManager component,
     * using <code>java.text.MessageFormat</code> as a format to construct message.
     * 
     * @param msgKey
     *            메시지 키.<br>Message key.
     * @param locale
     *            로케일 <br> locale.
     * @param params
     *            메시지를 구성하는 데 쓰일 파라미터<br>Parameters used for constructing message.
     * @param nullEscape
     *            주어진 키 및 로케일에 대응되는 메시지가 없을 때의 대안동작을 규정하는 문자열.
     *            <br>A string denoting what to do when no message found with the given key and locale. 
     * @return 
     *            메시지 문자열. <br> Message as <tt>java.lang.String</tt>.
     * @since 1.3
     */
    public static String getMessage(String msgKey, Locale locale,
                                    Object[] params, String nullEscape) {
        IMessageManager manager = (IMessageManager) ComponentRegistry
                .lookup(ServiceConstants.MESSAGE);
        IMessage message = manager.getMessage(msgKey, locale, nullEscape);
        return (message == null) ? null : message.getName(params);
    }

    
    /**
     * 컴포넌트 IMessageManagement를 이용하여 cache에 저장된 메시지 전체를 삭제한다.
     */
    public static void refreshMessage() {
    	IMessageManager manager = (IMessageManager) ComponentRegistry.lookup(ServiceConstants.MESSAGE);
    	manager.refresh();
    }
    
    /**
     * 컴포넌트 IParameterManager 로 부터 파라미터 값을 얻어온다.
     * <br>Returns a parameter from IParameterManager component.
     * 
     * @param groupXd
     *              업무그룹 코드.<br>Business group code.
     * @param key
     *              파라미터 키.<br>Parameter key.   
     * @return
     *              파라미터 값.<br>Parameter value.
     */
    public static String getParameter(String groupXd, String key) {
        IBizParamManager manager = (IBizParamManager) ComponentRegistry
                .lookup(ServiceConstants.PARAMETER);
        return manager.getParam(groupXd, key);
    }

    /**
     * 컴포넌트 ILocaleParamManager 로부터 로케일별 파라미터 값을 얻어온다.
     * <br>Returns a localed parameter from IParameterManager component.
     * 
     * @param key
     *              로케일별 파라미터 키.<br>Localed parameter key.
     * @param locale
     *              로케일.<br>Locale.
     * @return
     *              로케일별 파라미터 값.<br>Localed parameter value.
     */
    public static String getLocaledParameter(String key, Locale locale) {
        ILocaleParamManager manager = (ILocaleParamManager) ComponentRegistry
                .lookup(ServiceConstants.LOCALE_PARAM);
        return manager.getParam(key, locale);
    }

    /**
     * 컴포넌트 ILocaleParamManager 로부터 (기본 로케일에 대응되는) 로케일별 파라미터 값을 얻어온다.
     * <br>Returns a localed parameter from IParameterManager component, with the default locale.
     * 
     * @param key
     *              로케일별 파라미터 키.<br>Localed parameter key.
     * @return
     *              로케일별 파라미터 값.<br>Localed parameter value.
     */
    public static String getLocaledParameter(String key) {
        return getLocaledParameter(key, getDefaultLocale());
    }

    /**
     * 컴포넌트 IConfigurationManager로부터 설정 값을 얻어온다.
     * <br>Returns a configuration value from IConfigurationManager component.
     * 
     * @param key
     *              설정 키.<br>Configuration key.
     * @return
     *              설정 값.<br>Configuration value.
     */
    public static String getConfiguration(String key) {
        try {
            IConfigurationManager manager = (IConfigurationManager) ComponentRegistry
                    .lookup(ServiceConstants.CONFIGURATION);
            return manager.getConfig(key);
        }catch(RuntimeException e) {
            if (e.getClass().getName().endsWith("NoSuchBeanDefinitionException")) {
                // IConfigurationManager 를 설정하지 않고 sqlManager 만 사용하는 곳도 있을 수 있다.
                return null;
            }else {
                throw e;
            }
        }
    }

    /**
     * xsql file 들이 배포되는 기본 위치를 얻는다.
     * <br>Returns the base location where xsql files are deployed.
     *
     * @return
     *              xsql 파일이 배포되는 기본 위치.
     *              <br>The base location where xsql files are deployed.
     */
    public static String getXsqlRootPath(){
        String xsqlPath = getConfiguration(Constants.XSQL_PATH_KEY);
        if (xsqlPath == null || xsqlPath.equals("")){
            xsqlPath = Constants.DEFAULT_XSQL_PATH;
        }
        String path = getConfiguration(Constants.EAR_ROOT_KEY) + "/"
                + xsqlPath;
        return path;
    }

    /**
     * component meta file이 배포되는 기본 위치를 얻는다.
     * <br>Returns the base location where component meta files are deployed.
     *
     * @return
     *              component meta file이 배포되는 기본 위치.
     *              <br>The base location where component meta files are deployed.
     */
    public static String getComponentMetaRootPath(){
        String componentMetaPath = getConfiguration(Constants.COMPONENTMETA_PATH_KEY);
        if (componentMetaPath == null || componentMetaPath.equals("")){
            componentMetaPath = Constants.DEFAULT_COMPONENTMETA_PATH;
        }
        String path = getConfiguration(Constants.EAR_ROOT_KEY) + "/"
                + componentMetaPath;
        return path;
    }

    /**
     * xio file 이 배포되는 기본 위치를 얻는다.
     * <br> Returns the base location where xio files are deployed.
     *
     * @return
     *              xio file이 배포되는 기본 위치.
     *              <br>The base location where xio files are deployed.
     */
    public static String getXioRootPath(){
        String path = getConfiguration(Constants.XIO_PATH_KEY);
        if (path == null || "".equals(path)){
            path = Constants.DEFAULT_XIO_PATH;
        }
        return getConfiguration(Constants.EAR_ROOT_KEY) + "/" + path;
    }

    /**
     * 컴포넌트 ICacheManager부터 주어진 캐시 이름에 해당하는 캐시 객체를 얻는다.
     * <br>Returns <tt>ICache</tt> object with the given cache name
     * from the ICacheManager component.
     * 
     * @param cacheName
     *              캐시 이름.<br>The name of the cache.
     * @return 
     *              이름에 대응되는 캐시  객체<br>The cache object identified by the given name.
     */
    public static ICache getCache(String cacheName) {
        ICacheManager manager = (ICacheManager) ComponentRegistry
                .lookup(ServiceConstants.CACHE);
        return manager.getCache(cacheName);
    }

    /**
     * 컴포넌트 IWasInstanceManager로 부터 특정 WAS 인스턴스 정보를 얻어온다.
     * <br>Returns WAS instance information 
     * from the IWasInstanceManager component.
     * 
     * @param wasInstanceId
     *              WAS 인스턴스 아이디.<br>The id of WAS instance.
     * @return 
     *              해당하는 WAS 인스턴스 정보.
     *              <br>The WAS instance information identified by the given id.
     */
    public static WasInstance getWasInstance(String wasInstanceId) {
        IWasInstanceManager manager = (IWasInstanceManager) ComponentRegistry
                .lookup(ServiceConstants.WAS_INSTANCE);
        return manager.getWasInstance(wasInstanceId);
    }

    /**
     * 컴포넌트 IWasInstanceManager로 부터 모든 WAS 인스턴스 정보를 얻어온다.
     * <br>Returns all WAS instance information 
     * from the IWasInstanceManager component
     * @return 
     *              모든WAS 인스턴스 정보.
     *              <br>The all WAS instance information.
     */
    public static List<WasInstance> getWasInstanceList() {
    	IWasInstanceManager manager = (IWasInstanceManager) ComponentRegistry.lookup(ServiceConstants.WAS_INSTANCE);
    	return manager.getAllWasInstances();
    }
    
    
    /** 
     * 미리 정의된  관계에 따라 주어진 인터페이스 클래스에 대응되는 플러그인 객체를 얻는다.<br>
     * 인터페이스와 그에 대응되는 구현 클래스의 관계는 미리 정의된 자원 파일(config/plugin.properties)에 저장된다.
     * <br>
     * Returns a plugin object mapped from the given interface class, 
     * where the mapping is given as pre-defined resource file(config/plugin.properties).
     * 
     * @param klass 인터페이스 클래스.<br>Interface class.
     * @return 대응되는 플러그인 객체.<br>A mapped plugin object.
     */
    public static Object getPlugin(Class klass) {
        try {
            Properties properties = loadProperties("config/plugin.properties");
            String name = properties.getProperty(klass.getName());
            if (name == null) {
                return null;
            }
            return Class.forName(name).newInstance();
        } catch (IllegalArgumentException e) {
            // config/plugin.properties 파일이 존재하지 않는 경우
            return null;
        } catch (Exception e) {
            return null;
        }
    }

    /**
     * 기본 인코딩 값을 반환한다.
     * <br>Returns the default encoding.
     * 
     * @return 기본 인코딩 값.<br>The default encoding.
     */
    public static String getDefaultEncoding() {
        return getConfiguration("encoding.default");
    }

    /**
     * 기본 로케일 값을 반환한다.
     * <br>Returns the default locale.
     * 
     * @return 기본 로케일 값.<br>The default locale.
     */
    public static Locale getDefaultLocale() {
        return asLocale(getConfiguration("locale.default"));
    }
    
    /**
     * 지원되는 로케일 목록을 반환한다.
     * <br>Returns the supported locale list.
     * @return 로케일 목록<br>The supported locale list.
     */
    public static Locale[] getSupportedLocales(){
    	String value = getConfiguration("locale.supported");
    	if (value != null) {
            String[] array = value.split(",");
            Locale[] locales = new Locale[array.length];
            for(int i=0; i<array.length; i++){
            	locales[i] = asLocale(array[i]);
            }
            return locales;
        }
        return new Locale[]{getDefaultLocale()};
    }

    /**
     * 현재 실행중인 시스템의 WAS 인스턴스 아이디 값을 반환한다.
     * <br>Returns the current WAS instance id.
     * 
     * @return 현재 실행중인 시스템의 WAS 인스턴스 아이디 값
     */
    public static String getCurrentWasInstanceId() {
        return WAS_INSTANCE_ID;
    }

    /**
     * 현재 실행중인 시스템의 framework 홈 디렉토리를 반환한다.
     * <br>Returns the framework home directory of the current system.
     * 
     * @return 
     *              현재 실행중인 시스템의 framework 홈 디렉토리
     *              <br>the framework home directory of the current system.
     */
    public static String getFwkHome() {
        String fwkHome = AppUtils.getProperty("NEXCORE_HOME");
        if (StringUtils.isEmpty(fwkHome)) {
            fwkHome = "/nexcore/";
        }
        return fwkHome;
    }

    /**
     * 주어진 문자열을 <tt>java.util.Locale</tt> 객체로 전환하여 반환한다. 
     * 문자열은 다음중 하나로 구성될 수 있다.
     * <br>Returns the <tt>java.util.Locale</tt> object converted from the given string.
     * String should be given by one of the following:
     * <ul>
     * <li>&lt;language&gt;
     * <li>&lt;language&gt;_&lt;country&gt;
     * <li>&lt;language&gt;_&lt;country&gt;&lt;variant&gt;
     * </ul>
     * 이 때 language, country, variant의 의미는 <tt>java.util.Locale</tt>을 참조한다.
     * <br>where language, country, variant you can refer <tt>java.util.Locale</tt>
     * 
     * @param locale
     *            로케일을 나타내는 문자열 <br>string representing locale
     * @return <tt>java.util.Locale</tt> 객체
     */
    public static Locale asLocale(String locale) {
        if (locale == null && locale.trim().length() < 1) {
            return null;
        }
        int index = locale.indexOf("_");
        if (index > 0) {
            int nextIndex = locale.indexOf("_", index + 1);
            if (nextIndex > index + 1) { // 3-key
                return new Locale(locale.substring(0, index), locale.substring(
                        index + 1, nextIndex), locale.substring(nextIndex + 1));
            } else { // 2-key
                return new Locale(locale.substring(0, index), locale
                        .substring(index + 1));
            }
        }
        // 1-key
        return new Locale(locale);
    }
    
    /**
     * 주어진 문자열 및 문자열 배열을 받아 <tt>java.util.Locale</tt> 객체로 전환하여 반환한다. 
     * 문자열은 다음중 하나로 구성될 수 있다:
     * <br>Returns the <tt>java.util.Locale</tt> object converted from the given string and string array.
     * String should be given by one of the following:
     * <ul>
     * <li>&lt;language&gt;
     * <li>&lt;language&gt;_&lt;country&gt;
     * </ul>
     * language, country의 의미는 <tt>java.util.Locale</tt>을 참조하도록 한다.
     * <br>where language, country you can refer <tt>java.util.Locale</tt>
     * 
     * @param locale
     *              로케일을 나타내는 문자열 <br>string representing locale
     * @param variants
     *              <tt>java.util.Locale</tt>의 variant 참조. 둘 이상일 수 있다는 가정을 가지고 배열로 받음.
     *              <br>same as variant in <tt>java.util.Locale</tt>. 
     *              It has array type assuming variants could be more than one. 
     * @return <tt>java.util.Locale</tt> 객체
     */
    public static Locale asLocale(String languageAndCountry, String[] variants) {
        if (languageAndCountry == null || languageAndCountry.length() < 2) {
            return null;
        }
        int index = languageAndCountry.indexOf("_");
        String language = "";
        String country = "";
        if (index > 0) {
            language = languageAndCountry.substring(0, index);
            country = languageAndCountry.substring(index + 1);
        } else {
            language = languageAndCountry;
        }
        if (language.length() < 2) {
            return null;
        }
        if (variants == null || variants.length == 0) {
            return new Locale(language, country);
        } else {
            StringBuffer buf = new StringBuffer();
            for (int i = 0; i < variants.length; i++) {
                buf.append(variants[i]);
                if (i < variants.length - 1) {
                    buf.append('_');
                }
            }
            return new Locale(language, country, buf.toString());
        }
    }
    
    /**
     * 문자열 배열을 받아 <tt>java.util.Locale</tt> 객체로 전환하여 반환한다. 
     * <br>Returns the <tt>java.util.Locale</tt> object converted from the given string array.
     * language, country 및 variant의 의미는 <tt>java.util.Locale</tt>을 참조하도록 한다.
     * <br>where language, country and variant you can refer <tt>java.util.Locale</tt>
     *
     * @param words 첫번째 배열값이 language, 두번째가 country, 나머지가 variant로 등록된다.
     *              <br>the first value in the array is to be language, second to be country, 
     *              the third to be variant.
     * @return <tt>java.util.Locale</tt> 객체
     */
    public static Locale asLocale(String[] words){
        if (words == null || words[0] == null || words[0].length() < 2){
            return null;
        }
        String language = words[0];
        String country = (words[1] != null)? words[1] : "";
        String variant = "";
        if (words.length > 2){
            StringBuffer buf = new StringBuffer();
            for(int i = 2; i < words.length; i++){
                if (words[i] != null)
                if (i > 2){
                    buf.append('_');
                }
                buf.append(words[i]);
            }
            variant = buf.toString();
        }
        return new Locale(language, country, variant);
    }

    /**
     * 주어진 컬렉션 객체가 비어있는지 여부를 반환한다.
     * <br>Returns whether the given collection is empty.
     * 
     * @param c 컬렉션 객체 <br><tt>java.util.Collection</tt> object.
     * @return 해당 컬렉션 객체가 비어있는지 여부.<br>True if the given collection is empty, false if not.
     */
    public static boolean isEmpty(Collection c) {
        return (c == null || c.isEmpty());
    }

    /**
     * 프레임워크 어플리케이션이 "개발 모드"로 구동중인지 확인한다.
     * <br>Returns whether this application is running "development mode".
     * @return 개발 모드 구동 여부<br>true if this application is running "development mode", false if not.
     */
    public static boolean isDevelopmentMode(){
        String developmentMode = AppUtils.getProperty("system.developmentmode");
        return developmentMode != null && "true".equalsIgnoreCase(developmentMode);
    }
    
    /**
     * 주어진 컬렉션 객체가 원소를 가지는지 여부를 반환한다.
     * <br>Returns whether the given collection has any element.
     * 
     * @param c 컬렉션 객체 <br><tt>java.util.Collection</tt> object.
     * @return 해당 컬렉션 객체가 비어있는지 여부.<br>True if the given collection has any element, false if not.
     */
    public static boolean isNotEmpty(Collection c) {
        return !isEmpty(c);
    }

    /**
     * 주어진 map 객체가 비어있는지 여부를 반환한다.
     * <br>Returns whether the given map is empty.
     * 
     * @param map map 객체.<br><tt>java.util.Map</tt> object.
     * @return 비어있으면 true <br>True if the map is empty.
     */
    public static boolean isEmpty(Map map) {
        return (map == null || map.isEmpty());
    }

    /**
     * 주어진 Map 객체가 하나라도 키-값 쌍을 가지는지 여부를 반환한다.
     * <br>Returns whether the given map has any pair.
     * 
     * @param map map 객체.<br><tt>java.util.Map</tt> object.
     * @return 하나의 값이라도 가지면 true <br>True if the map has any pair.
     */
    public static boolean isNotEmpty(Map map) {
        return !isEmpty(map);
    }

    /**
     * 주어진 배열이 비어있는지 여부를 반환한다.
     * <br>Returns whether the given array is empty. 
     * 
     * @param array    객체 배열.<br>array.
     * @return 배열이 비어있으면 true<br>True if the array is empty.
     */
    public static boolean isEmpty(Object[] array) {
        return (array == null || array.length == 0);
    }
    
    
    /**
     * 주어진 배열이 원소를 가지는지 여부를 반환한다.
     * <br>Returns whether the given array has any element.
     * 
     * @param array     객체 배열.<br>array.
     * @return          배열이 하나의 원소라고 가지면 true<br>True if the array has an element.
     */
    public static boolean isNotEmpty(Object[] array) {
        return !isEmpty(array);
    }

    /**
     * 코드값을 비교한다. 변경영향분석을 위하여 모든 코드값 비교 로직은 이 메소드를 사용하도록 한다. <code><pre>
     *     작성예제 :
     *     String xd = “01”;
     *     if (BaseUtils.compareCode("SKF0101", "01", xd)) {
     *           …   
     *     }
     * </pre></code>
     * 
     * @param codeGroupId
     *            코드그룹아이디,
     * @param codeXd
     *            비교대상 코드 값
     * @param value
     *            비교하고자 하는 코드 값
     * @return 코드값 일치여부를 반환한다.
     * @deprecated 현재 쓰이지 않는 메소드 <br>Currently not used. 
     */
    public static boolean compareCode(String codeGroupId, String codeXd,
                                      String value) {
        // SKF0002 는 Code.java에서 내부적으로 쓰이는 코드이므로 순환을 방지하기 위해 제외
        if (isDevelopmentMode() && ComponentRegistry.isStarted() && !"SKF0002".equals(codeGroupId)) {
            ICodeManager cm = (ICodeManager) ComponentRegistry
                    .lookup(ServiceConstants.CODE);
            if (cm.getCode(codeGroupId, codeXd) == null) { // 찾는 코드가 없으면
                throw new FwkRuntimeException(
                        "No code found with codeGroupId={0}, codeXd={1}",
                        new String[] { codeGroupId, codeXd });
            }
        }
        return codeXd.equals(value);
    }

    /**
     * 코드Xd를 가져온다. 변경영향분석을 위해 코드값을 얻어오는 모든 로직은 이 메소드를 사용한다.
     * 
     * <pre>
     *    작성예제 :
     * <code>
     * log(getCodeXd(&quot;SKF0101&quot;, &quot;01&quot;), message);
     * </code></pre>
     * 
     * @param codeGroupId
     * @param codeXd
     * @return
     * @deprecated 현재 쓰이지 않는 메소드 <br>Currently not used.
     */
    public static String getCodeXd(String codeGroupId, String codeXd) {
        if (isDevelopmentMode() && ComponentRegistry.isStarted()) {
            ICodeManager cm = (ICodeManager) ComponentRegistry
                    .lookup(ServiceConstants.CODE);
            if (cm.getCode(codeGroupId, codeXd) == null) { // 찾는 코드가 없으면
                throw new FwkRuntimeException(
                        "No code found with codeGroupId={0}, codeXd={1}",
                        new String[] { codeGroupId, codeXd });
            }
        }
        return codeXd;
    }


    /**
     * 주어진 작업을 즉시 비동기적으로 실행한다.
     * <br>Execute given runnable task asynchronously, now.
     * 
     * @param runnable
     *            <tt>java.lang.Runnable</tt> object to be executed.
     */
    public static synchronized void invokeLater(final Runnable runnable) {
        invokeLater(0, runnable);
    }

    /**
     * 주어진 작업을 정한 시간 후에 비동기적으로 실행한다.
     * <br>Execute given runnable task asynchronously, after specified delay.
     * 
     * @param timeMilli
     *            작업 실행 전의 대기시간 (밀리초).<br>delay in milliseconds.
     * @param runnable
     *            <tt>java.lang.Runnable</tt> object to be executed.
     */
    public static synchronized void invokeLater(final long timeMilli,
                                                final Runnable runnable) {
        
        // Timer 초기화        
        final Timer timer = new Timer();

        // Task 정의
        final TimerTask task = new TimerTask() {
            public void run() {
                runnable.run();
            }
        };

        // Task 실행 (또는 스케줄링)
        timer.schedule(task, timeMilli);
    }

    /**
     * 실행중인 JVM의 버전을 반환한다.
     * <br>Returns the version of the current JVM.
     * 
     * @return Version of the current JVM.
     */
    public static String getVmVersion() {
        return System.getProperty("java.vm.version");
    }

    /**
     * 실행중인 OS의 이름을 반환한다.
     * <br>Returns the name of the current OS.
     * 
     * @return The name of the current OS.
     */
    public static String getOsName() {
        return System.getProperty("os.name");
    }

    /**
     * 주어진 <tt>java.lang.Throwable</tt>객체의 Stack Trace를 문자열로 반환한다. 
     * <br>Returns string representation of the stack trace of the given <tt>java.lang.Throwable</tt> object.
     * 
     * @param throwable
     *            Exception
     * @return Stack Trace 정보
     */
    public static String getExceptionStackTrace(Throwable throwable) {

        if (throwable == null) {
            return "";
        }

        final StringWriter sw = new StringWriter();
        final PrintWriter pw = new PrintWriter(sw);

        throwable.printStackTrace(pw);
        pw.close();

        return sw.toString();
    }
    
    /** 
     * 주어진 정보들에 해당하는 원격의 EJB Home 객체를 lookup 후 반환한다.
     * <br>Returns EJB remote home object with the given informations.  
     *
     * @param wasInstanceId         WAS Instance Id.
     * @param jndiName              JNDI Name.
     * @param homeClass             EJB home class.
     * @return                      EJBHome object.
     * @throws NamingException
     */
    public static EJBHome getRemoteEjbHome(String wasInstanceId,
                                           String jndiName, Class homeClass)
            throws NamingException {
        
        IWasInstanceManager manager = (IWasInstanceManager) ComponentRegistry
        .lookup(ServiceConstants.WAS_INSTANCE);
        WasInstance was = manager.getWasInstance(wasInstanceId);

        final Properties env = new Properties();
        env.put(Context.INITIAL_CONTEXT_FACTORY, was.getNamingContextFactoryClass());
        env.put(Context.PROVIDER_URL, was.getNamingContextUrl());
        if (StringUtils.isNotEmpty(was.getNamingContextPrincipal())) {
            env.put(Context.SECURITY_PRINCIPAL, was.getNamingContextPrincipal());
        }
        if (StringUtils.isNotEmpty(was.getNamingContextCredential())) {
            env.put(Context.SECURITY_CREDENTIALS, was.getNamingContextCredential());
        }

        final Context context = new InitialContext(env);
        final Object ref = context.lookup(jndiName);
        final EJBHome home = (EJBHome) PortableRemoteObject.narrow(ref, homeClass);

        return home;
    }


    /**
     * Ams에서 사용하는 공통코드에서 부모코드 그룹에 속하고, 속성 조건에 맞는 코드목록을 리턴함.
     * <br>Returns the list of codes in the specified parent code.
     * and the specified attribute has the given value.
     * 
     * @param parentCdId
     *            부모코드그룹ID.<br>Parent Code id.
     * @param attrNo
     *            속성번호.<br>The number N denoting N-th attribute.
     * @param attrValue
     *            속성값.<br>Attribute value for choosing codes.
     * @return 
     *            코드목록.<br>List of codes.
     */
    public static List<AmsCode> getAmsCodes(String parentCdId, int attrNo, String attrValue) {
        ICodeManager cm = (ICodeManager) ComponentRegistry.lookup(ams.fwk.constants.Constants.AMS_CODE);
        List<AmsCode> codes = cm.getCodes(parentCdId, attrNo, attrValue);
        if(codes == null){
            return new ArrayList<AmsCode>(0);
        }
        return codes;
    }

    /**
     * Ams에서 사용하는 공통코드에서 부모코드 그룹에 속하는 코드목록을 리턴함.
     * <br>Returns the list of codes in the specified parent code.
     * @param codeGroupId
     *            부모코드ID.<br>Parent Code id.
     * @return 
     *            코드목록.<br>List of codes.
     */
    public static List<AmsCode> getAmsCodes(String parentCdId) {
        ICodeManager cm = (ICodeManager) ComponentRegistry.lookup(ams.fwk.constants.Constants.AMS_CODE);
        List<AmsCode> codes = cm.getCodes(parentCdId);
        if(codes == null){
            return new ArrayList<AmsCode>(0);
        }
        return codes;
    }
    
    /**
     * Ams에서 사용하는 공통코드에서 부모코드 그룹에 속하는 코드목록을 리턴함. 이때 Locale에 맞는 코드만 리턴
     * <br>Returns the list of codes in the specified parent code.
     * @param parentCdId
     *            부모코드ID.<br>Parent Code id.
     *@param locale            
     * @return 
     *            코드목록.<br>List of codes.
     */
    public static List<AmsCode> getAmsCodes(String parentCdId, Locale locale) {
    	List<AmsCode> codeList  = getAmsCodes(parentCdId);
    	List<AmsCode>	selectedLocaleCodeList = new ArrayList<AmsCode>();
    	//파라미터로 받은 Locale이 Null일 경우는 code전체 return
    	if(locale == null) {
    		locale = BaseUtils.getDefaultLocale();
    	}
    	
    	Locale codeLocale = null;
    	for(AmsCode code : codeList) {
    		codeLocale  = code.getLocale();
    		//저장된Locale이 Null일 경우는 code전체 return
    		if(codeLocale == null) codeLocale = BaseUtils.getDefaultLocale();
    		
    		if(locale.getLanguage().equals(codeLocale.getLanguage())) {
    			selectedLocaleCodeList.add(code);
    		}
    	}
    	return selectedLocaleCodeList;
    }
     /**
     * Ams에서 사용하는 공통코드 중에서 주어진 조건에 부합하는 코드를 반환함.
     * <br>Returns a code with the given parent id and code id.
     * @param parentCdId
     *            부모코드ID.<br>Parent Code id.
     * @param codeXd
     *            코드ID<br>Code id.
     * @return 
     *            <tt>AmsCode</tt> object.
     */
    public static AmsCode getAmsCode(String parentCdId, String codeId) {
        ICodeManager cm = (ICodeManager) ComponentRegistry.lookup(ams.fwk.constants.Constants.AMS_CODE);
        return (AmsCode)cm.getCode(parentCdId, codeId);
    }
    
    /**
     * AMS에서 사용하는 공통코드 중에서 주어진 조건에 부합하는 코드의 값을 반환함.
     * <br>Returns the value of a code with the given parent id and code id.
     * 
     * @param parentCdId
     *              부모 코드ID.<br>Parent Code id.
     * @param codeXd
     *              코드ID<br>Code id.
     * @return
     *              코드값<br>Code value.
     */
    public static String getAmsCodeValue(String parentCdId, String codeId){
        AmsCode code = getAmsCode(parentCdId, codeId);
        if (code != null) {
            return code.getValue();
        } 
        return null;
    }


    /**
     * AMS에서 사용하는 공통코드 중에서 부모코드에 속하는 코드ID 배열을 리턴함.
     * <br>Returns the array of code ids in the specified parent code. 
     * 
     * @param parentCdId
     *              부모 코드ID.<br>Parent Code Id.
     * @return
     *              코드ID 배열.<br>Array of code ids.
     */
    public static String[] getAmsCodeIds(String parentCdId) {
        List<AmsCode> codes = getAmsCodes(parentCdId);
        String[] codeIds = new String[codes.size()];
        AmsCode code = null;
        for (int i = 0; i < codes.size(); i++) {
            code = codes.get(i);
            codeIds[i] = code.getId();
        }
        return codeIds;
    }

    /**
     *  AMS에서 사용하는 공통코드 중에서 부모코드에 속하고, 속성이 조건에 맞는 코드ID 배열을  리턴함.
     * <br>Returns the array of code ids in the specified parent code 
     * and the specified attribute has the given value.
     *  
     * @param parentCdId
     *            부모코드ID.<br>Parent Code id.
     * @param attrNo
     *            속성번호.<br>The number N denoting N-th attribute.
     * @param attrValue
     *            속성값.<br>Attribute value for choosing codes.
     * @return
     *            코드ID 배열.<br>Array of code ids.
     */
    public static String[] getAmsCodeIds(String parentCdId, int attrNo, String attrValue) {
        List<AmsCode> codes = getAmsCodes(parentCdId, attrNo, attrValue);
        String[] codeIds = new String[codes.size()];
        AmsCode code = null;
        for (int i = 0; i < codes.size(); i++) {
            code = codes.get(i);
            codeIds[i] = code.getId();
        }
        return codeIds;
    }
    
    /**
     * 자식 코드가 한개라도 있는 부모코드를 가지고 온다 <br> Get parent code list that has one more child codes
     * Map의 key [  CODE_ID ,CODE_NAME ,PARENT_CODE_ID ,DISPLAY_INDEX, USE_FLAG, CODE_REMARK ,
     * 						ATTRIBUTE_01, ATTRIBUTE_02, ATTRIBUTE_03, ATTRIBUTE_04, ATTRIBUTE_05, ATTRIBUTE_06, 
     * 						ATTRIBUTE_07, ATTRIBUTE_08 , ATTRIBUTE_09, ATTRIBUTE_10 ]
     * @return
     *  	 부모코드List<Map>  <br> List of parent code
     *
     */
    public static List<Map> getAmsParentCodeIdList() {
    	ICodeManager cm = (ICodeManager) ComponentRegistry.lookup(ams.fwk.constants.Constants.AMS_CODE);
    	return cm.getCodeGroupIds();
    }
    
    /**
     * Cache된 AMS 공통코드를 전부 refresh한다.<br>Refresh all cached EMK Code.
     */
    public static void refreshAmsCodeCache() {
    	ICodeManager cm = (ICodeManager) ComponentRegistry.lookup(ams.fwk.constants.Constants.AMS_CODE);
    	cm.refresh();
    }
    
    /**
     * Cache된 AMS 공통코드중 선택된 부모코드의 cache를 refresh한다.<br>Refresh  selected EMK Code Cache.
     * @param parentCdId
     */
    public static void refreshAmsCodeCache(String parentCdId) {
    	ICodeManager cm = (ICodeManager) ComponentRegistry.lookup(ams.fwk.constants.Constants.AMS_CODE);
    	cm.refresh(parentCdId);
    }
    
    
    /**
     * 런타임 모드.<br>Runtime mode.
     */
    private static String RUNTIME_MODE;
    
    /**
     * 런타임 모드를 얻는다.
     * <br>Returns the runtime mode.
     * <p>
     * Runtime mode will be defined as a property in the application.properties, 
     * or as a system property.<br>
     * The property key is <code>nexcore.runtime.mode.<system.id></code>.<br> 
     * The default value is 'L' for local.
     * </p>
     * @return 런타임 모드.<br>Runtime mode.
     */
    public static String getRuntimeMode(){
        if(RUNTIME_MODE == null){
            RUNTIME_MODE = AppUtils.getProperty("nexcore.runtime.mode." + BaseUtils.getCurrentWasInstanceId());
        }
        if(RUNTIME_MODE == null){
            RUNTIME_MODE = "L";
        }
        return RUNTIME_MODE;
    }

    
    /**
     * 코드 그룹에 속하고, 속성 조건에 맞는 코드목록을 리턴함.
     * <br>Returns the list of codes in the specified code group
     * and the specified attribute has the given value.
     * 
     * @param codeGroupId
     *            코드그룹ID.<br>Code group id.
     * @param attrNo
     *            속성번호.<br>The number N denoting N-th attribute.
     * @param attrValue
     *            속성값.<br>Attribute value for choosing codes.
     * @return 
     *            코드목록.<br>List of codes.
     */
    public static List<ICode> getCodes(String codeGroupId, int attrNo, String attrValue) {
        ICodeManager cm = (ICodeManager) ComponentRegistry.lookup(ServiceConstants.CODE);
        List<ICode> codes = cm.getCodes(codeGroupId, attrNo, attrValue);
        if(codes == null){
            return new ArrayList<ICode>(0);
        }
        return codes;
    }

    /**
     * 코드 그룹에 속하는 코드목록을 리턴함.
     * <br>Returns the list of codes in the specified code group.
     * @param codeGroupId
     *            코드그룹ID.<br>Code group id.
     * @return 
     *            코드목록.<br>List of codes.
     */
    public static List<ICode> getCodes(String codeGroupId) {
        ICodeManager cm = (ICodeManager) ComponentRegistry.lookup(ServiceConstants.CODE);
        List<ICode> codes = cm.getCodes(codeGroupId);
        if(codes == null){
            return new ArrayList<ICode>(0);
        }
        return codes;
    }
    
     /**
     * 주어진 조건에 부합하는 코드를 반환함.
     * <br>Returns a code with the given group id and code id.
     * @param codeGroupId
     *            코드그룹ID.<br>Code group id.
     * @param codeXd
     *            코드ID<br>Code id.
     * @return 
     *            <tt>ICode</tt> object.
     */
    public static ICode getCode(String codeGroupId, String codeXd) {
        ICodeManager cm = (ICodeManager) ComponentRegistry.lookup(ServiceConstants.CODE);
        return cm.getCode(codeGroupId, codeXd);
    }
    
    /**
     * 주어진 조건에 부합하는 코드의 값을 반환함.
     * <br>Returns the value of a code with the given group id and code id.
     * 
     * @param codeGroupId
     *              코드그룹ID.<br>Code group id.
     * @param codeXd
     *              코드ID<br>Code id.
     * @return
     *              코드값<br>Code value.
     */
    public static String getCodeValue(String codeGroupId, String codeXd){
        ICode code = getCode(codeGroupId, codeXd);
        if (code != null) {
            return code.getValue();
        } 
        return null;
    }

    /**
     * 주어진 조건에 부합하는 코드의 값을 반환함.
     * <br>Returns the value of a code with the given group id and code id.
     * 
     * @param codeGroupId
     *              코드그룹ID.<br>Code group id.
     * @param codeXd
     *              코드ID<br>Code id.
     * @param locale
     *              로케일<br>Locale.
     * @return
     *              코드값<br>Code value.
     */
    public static String getCodeValue(String codeGroupId, String codeXd, Locale locale){
    	ICode code = getCode(codeGroupId, codeXd);
        if (code != null) {
            return code.getValue(locale);
        } 
        return null;
    }

    /**
     * 코드 그룹에 속하는 코드ID 배열을 리턴함.
     * <br>Returns the array of code ids in the specified code group. 
     * 
     * @param codeGroupId
     *              코드그룹ID.<br>Code group id.
     * @return
     *              코드ID 배열.<br>Array of code ids.
     */
    public static String[] getCodeIds(String codeGroupId) {
        List<ICode> codes = BaseUtils.getCodes(codeGroupId);
        String[] codeIds = new String[codes.size()];
        ICode code = null;
        for (int i = 0; i < codes.size(); i++) {
            code = codes.get(i);
            codeIds[i] = code.getId();
        }
        return codeIds;
    }

    /**
     * 코드 그룹에 속하고, 속성이 조건에 맞는 코드ID 배열을  리턴함.
     * <br>Returns the array of code ids in the specified code group
     * and the specified attribute has the given value.
     *  
     * @param codeGroupId
     *            코드그룹ID.<br>Code group id.
     * @param attrNo
     *            속성번호.<br>The number N denoting N-th attribute.
     * @param attrValue
     *            속성값.<br>Attribute value for choosing codes.
     * @return
     *            코드ID 배열.<br>Array of code ids.
     */
    public static String[] getCodeIds(String codeGroupId, int attrNo, String attrValue) {
        List<ICode> codes = BaseUtils.getCodes(codeGroupId, attrNo, attrValue);
        String[] codeIds = new String[codes.size()];
        ICode code = null;
        for (int i = 0; i < codes.size(); i++) {
            code = codes.get(i);
            codeIds[i] = code.getId();
        }
        return codeIds;
    }
    
    /**
     * FWK에서 지정한 File Upload Temp path를 반환한다.
     * @return
     */
    public static String getFileUploadTempPath() {
    	return BaseUtils.getConfiguration("file.upload.temp.folder");
    }
    
    /**
     *FWK에서 지정한 File Upload path를 반환한다.
     * @return
     */
    public static String getFileUploadPath() {
    	return BaseUtils.getConfiguration("file.upload.root.folder");
    }
    
    /**
     * FWK에서 지정한 File Max Size를 반환한다.
     * @return
     */
    public static Long getFileMaxSize() {
    	return FileResourceManager.getFileUploadMaxSize();
    }
    
    /**
     * 물리적으로 저장된 파일의 정보를 DB에 저장한다.
     * @param ds
     * @param onlineCtx
     */
    public static void fileUpload(IDataSet ds, IOnlineContext onlineCtx) {
    	String programId = ds.getField("PROGRAM_ID");
        String seqNo = ((IAmsUserInfo)onlineCtx.getUserInfo()).getFileSeqNo();
        IDataSet fileDS = (IDataSet) ds.clone();
        IAmsFileUploadManager fum = (IAmsFileUploadManager) ComponentLocator.getFileUploadManager();
        fum.createUpload(seqNo, programId, fileDS, onlineCtx);
    }
    
    /**
     * 물리적으로 저장된 파일의 정보를 DB에 저장할 때 기존 파일 그룹에 새로운 파일을 추가할 수 있도록 메소드 추가함. 
     * @param fileSeqNo
     * @param ds
     * @param onlineCtx
     */
    public static void fileUpload(String fileSeqNo, IDataSet ds, IOnlineContext onlineCtx) {
    	String programId = ds.getField("PROGRAM_ID");
    	IDataSet fileDS = (IDataSet) ds.clone();
    	IAmsFileUploadManager fum = (IAmsFileUploadManager) ComponentLocator.getFileUploadManager();
        fum.createUpload(fileSeqNo, programId, fileDS, onlineCtx);
    }
    
    /**
     * 파일별로 각각의 SeqNo로 저장을 해야하는 경우 사용하는 메소드
     * UI로부터 eachSeqNoFlag가 'Y'로 오는 경우는 파일별로 SeqNo를 생성하여 AmsUserInfo의 fileSeqNoList에 add한다. 
     * 해당 메소드를 쓸 때는 개발자가 파일에 대한 각각의 SeqNo가 생성됨을 인지하고 있어야 한다.  
     * @param ds
     * @param onlineCtx
     * @return List<String> SeqNo List를 반환한다. (AmsUserInfo에 있는 FileSeqNoList와 동일함.
     */
    public static List<String> fileUploadByFileSeqNoList( IDataSet ds, IOnlineContext onlineCtx) {
    	String programId = ds.getField("PROGRAM_ID");
    	IDataSet fileDS = (IDataSet) ds.clone();
    	AmsFileUploadManager fum = (AmsFileUploadManager) ComponentLocator.getFileUploadManager();
    	List<String> seqNoList = ((IAmsUserInfo)onlineCtx.getUserInfo()).getFileSeqNoList();
    	IRecordSet rs = fileDS.getRecordSet(ams.fwk.constants.Constants.FILE_LIST);
    	for(int i=0; i < seqNoList.size(); i++) {//seqNoList는 RecordSet에 저장되어 있는 파일숫자 만큼 구성되어 있기 때문에 seqNoList로 for문 구성 
    		fum.createUpload(seqNoList.get(i), programId, rs.getRecord(i), onlineCtx);
    	}
    	return seqNoList;
    }
    
    /**
     * DB에 저장된 파일정보를 fileId를 가지고 조회한다.
     * @param fileId
     * @return
     */
    public static Map getUploadedFileInfoById(String fileId) {
    	AmsFileUploadManager fum = (AmsFileUploadManager) ComponentLocator.getFileUploadManager();
    	Map fileMap = fum.getUploadedFileInfoById(fileId);
    	return fileMap;
    }
    
    /**
     * FILE ID를 가지고 DB에 저장되어 있는 파일정보를 삭제한다.
     * @param fileId
     */
    public static int deleteUploadedFile(String fileId) {
    	AmsFileUploadManager fum = (AmsFileUploadManager) ComponentLocator.getFileUploadManager();
    	return fum.deleteUpload(fileId);
    }
    
    /**
     * Password 생성 (8자리 무작위)
     * @return
     */
    public static String createPassword() {
    	char[] charaters = "QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm1234567890".toCharArray();
		StringBuilder sb = new StringBuilder("");
        Random rn = new Random();
        for( int i = 0 ; i < ams.fwk.constants.Constants.RESET_PASSWORD_LENGTH ; i++ ){
            sb.append( charaters[ rn.nextInt( charaters.length ) ] );
        }
        return sb.toString();
    }
    
    /**
     * 파라미터 value가 금칙어 해당 하는지 체크한다. 
     * @param word
     * @return
     * 	금칙어와 일치하면 True
     *     금칙어와 일치하지 않으면 false
     */
    public static boolean checkPrhbWrd(String word) {
    	//파라미터가 null 또는 empty String이면 return함.
    	if(StringUtils.isEmpty(word)) {
    		return false;
    	}
    	boolean exist = false;
    	AmsPrhbWrdManager manager  = (AmsPrhbWrdManager) ComponentRegistry.lookup(ams.fwk.constants.Constants.BIZ_PRHB_WRD);
    	List<IPrhbWord> wordList = manager.getPrhbWrdList();
    	String fixWord = StringUtils.replaceAll(StringUtils.replaceAll(word, " ", ""), "	", "");//공백 및 탭 제거
    	fixWord  = fixWord.toUpperCase();
    	for(IPrhbWord prhbWord : wordList) {
    		if(fixWord.equals(prhbWord.getProhibitWord())) {
    			exist = true;
    			break;
    		}
    	}
    	return exist;
    }
    
    /**
     * DataSet안의 지정된 keyName의 value들이 금칙어 인지 확인한다.
     * @param requestData
     * @param inputNames
     * @return List
     */
    public static List<String> checkPrhbWrdByReq(IDataSet requestData, String[] keyNames) {
    	List<String> invalidWordList = new ArrayList<String>();
    	if(keyNames != null && keyNames.length > 0) {//inputNames 이 NULL이 아닐 경우
    		for(String inputName : keyNames) {
    			if(checkPrhbWrd(requestData.getField(inputName))) {
    				invalidWordList.add(requestData.getField(inputName));
    			}
    		}
    	} else {//inputNames 이 NULL일 경우
    		Iterator<String> iter = requestData.getFieldKeys();
    		String keyName = "";
    		while(iter.hasNext()) {
    			keyName = iter.next();
    			if(checkPrhbWrd(requestData.getField(keyName))) {
    				invalidWordList.add(requestData.getField(keyName));
    			}
    		}
    	}
    	return invalidWordList;
    }
    
    /**
     * 금칙어 목록을 반환한다. 
     * @return
     */
    public static List<IPrhbWord> getPrhbWrdList() {
    	AmsPrhbWrdManager manager  = (AmsPrhbWrdManager) ComponentRegistry.lookup(ams.fwk.constants.Constants.BIZ_PRHB_WRD);
    	return manager.getPrhbWrdList();
    }
 
    /**
     * 금칙어 캐쉬를 refresh한다.
     */
    public static void refreshPrhbWrdCache() {
    	AmsPrhbWrdManager manager  = (AmsPrhbWrdManager) ComponentRegistry.lookup(ams.fwk.constants.Constants.BIZ_PRHB_WRD);
    	manager.refresh();
    }
    
    /**
     * Label ID에 따른 Label 정보를 return한다. 
     * @param key
     * @return
     */
    public static ILabel getAmsLabel(String key) {
    	AmsCachedLabelManager manager = (AmsCachedLabelManager)ComponentRegistry.lookup(ams.fwk.constants.Constants.AMS_LABEL);
    	return manager.getLabel(key);
    }
    
    /**
     * Label ID에 따른 Label 정보를 return한다. 
     * @param key
     * @param localeId
     * @return
     */
    public static ILabel getAmsLabel(String key, String localeId) {
    	AmsCachedLabelManager manager = (AmsCachedLabelManager)ComponentRegistry.lookup(ams.fwk.constants.Constants.AMS_LABEL);
    	Locale locale =BaseUtils.asLocale(localeId);
    	return manager.getLabel(key, locale);
    }
    
    /**
     * Label ID에 따른 Label 정보를 return한다. 
     * @param key
     * @param locale
     * @return
     */
    public static String getAmsLabelValue(String key, Locale locale, String defaultStr) {
    	AmsCachedLabelManager manager = (AmsCachedLabelManager)ComponentRegistry.lookup(ams.fwk.constants.Constants.AMS_LABEL);
    	ILabel label = manager.getLabel(key, locale);
    	if(label == null) {
    		return defaultStr;
    	}
    	return label.getName();
    }
    
    
    /**
     * Cache에 저장된 Label정보를 refresh하고 reload한다. 
     */
    public static void refreshAmsLabel()	 {
    	AmsCachedLabelManager manager = (AmsCachedLabelManager)ComponentRegistry.lookup(ams.fwk.constants.Constants.AMS_LABEL);
    	manager.refresh();
    }
    
    
    /**
     * 입력받은 길이만큼의 0~9까지 난수를 생성하여 return한다. 
     * @param size
     * @return
     */
    public static String makeRandomNum(int length) {
    	StringBuffer randomNum = new StringBuffer();
		int num = 0;
    	for(int i=0; i < length; i++) {
    		num = (int)(Math.random()*10);
    		randomNum.append(num+"");
    	}
    	return randomNum.toString();
    }
    
    /**
     * 사용중인 DB가 오라클 DB여부를 알려준다.
     * @return
     */
    public static boolean isOracle() {
    	if("oracle".equals(AppUtils.getProperty("dbms.kind"))){
    		return true;
    	} else {
    		return false;
    	}
    }
    
    /**
     * 현재 연동되어 있는 DB의 종류를 소문자로 return한다. 
     * @return
     */
    public static String getDbKind() {
    	return AppUtils.getProperty("dbms.kind");
    }
    
    /**
     * 메일전송
     * @param from
     * @param to
     * @param cc
     * @param bcc
     * @param subject
     * @param html
     * @param encoding
     */
    public static void sendMail(String from, List to, List cc, List bcc, String subject, String html, String encoding) {
    	IMailManager manager = ComponentLocator.getMailManager();
    	manager.sendHtml(from, to, cc, bcc, subject, html, encoding);
    }
    
    /**
     * 메일전송
     * @param from
     * @param to
     * @param cc
     * @param bcc
     * @param subject
     * @param html
     */
    public static void sendMail(String from, List to, List cc, List bcc, String subject, String html) {
    	IMailManager manager = ComponentLocator.getMailManager();
    	manager.sendHtml(from, to, cc, bcc, subject, html);
    }
    
    /**
     * 지정한 temp 파일양식이 있는 경우에 사용하는 메일전송 메소드
     * @param from
     * @param to
     * @param cc
     * @param bcc
     * @param subject
     * @param encoding
     * @param useTemplate
     * @param params
     * @param templateFile
     */
    public static void sendMail(String from, List to, List cc, List bcc, String subject, String encoding, boolean useTemplate, Map params, String templateFile) {
    	IMailManager manager = ComponentLocator.getMailManager();
    	manager.sendHtml(from, to, cc, bcc, subject, "", encoding, useTemplate, params, templateFile);
    }
}
