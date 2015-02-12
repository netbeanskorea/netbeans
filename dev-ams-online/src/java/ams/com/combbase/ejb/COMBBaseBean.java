package ams.com.combbase.ejb;

/**
 * <ul>
 * <li>업무 그룹명 : AMS/공통업무</li>
 * <li>설 명 : </li>
 * <li>작성일 : 2013-07-09 11:16:24</li>
 * <li>작성자 : 박세일 (ParkSeIl)</li>
 * </ul>
 *
 * @author 박세일 (ParkSeIl)
 */
public class COMBBaseBean extends nexcore.framework.coreext.pojo.biz.OnlineBizComponent {

    /**
     * serialVersionUID
     */
    private static final long serialVersionUID = 1L;	// FIXME..

    /**
     * @see nexcore.framework.coreext.pojo.biz.OnlineBizComponent#getFqId()
     */
    @Override
    public String getFqId() {
        return "com.COMBBase";
    }

}
