package ams.abm.mnubbase.ejb;

/**
 * <ul>
 * <li>업무 그룹명 : AMS/업무관리</li>
 * <li>설 명 : </li>
 * <li>작성일 : 2013-07-09 10:41:54</li>
 * <li>작성자 : 박세일 (ParkSeIl)</li>
 * </ul>
 *
 * @author 박세일 (ParkSeIl)
 */
public class MNUBBaseBean extends nexcore.framework.coreext.pojo.biz.OnlineBizComponent {

    /**
     * serialVersionUID
     */
    private static final long serialVersionUID = 1L;	// FIXME..

    /**
     * @see nexcore.framework.coreext.pojo.biz.OnlineBizComponent#getFqId()
     */
    @Override
    public String getFqId() {
        return "abm.MNUBBase";
    }

}
