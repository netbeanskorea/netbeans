package ams.abm.msgsbase.ejb;

/**
 * <ul>
 * <li>업무 그룹명 : AMS/업무관리</li>
 * <li>설 명 : </li>
 * <li>작성일 : 2013-08-05 16:37:23</li>
 * <li>작성자 : 박세일 (ParkSeIl)</li>
 * </ul>
 *
 * @author 박세일 (ParkSeIl)
 */
public class MSGSBaseBean extends nexcore.framework.coreext.pojo.biz.SharedBizComponent {

    /**
     * serialVersionUID
     */
    private static final long serialVersionUID = 1L;	// FIXME..

    /**
     * @see nexcore.framework.coreext.pojo.biz.SharedBizComponent#getFqId()
     */
    @Override
    public String getFqId() {
        return "abm.MSGSBase";
    }

}
