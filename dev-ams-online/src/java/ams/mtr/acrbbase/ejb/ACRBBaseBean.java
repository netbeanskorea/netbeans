package ams.mtr.acrbbase.ejb;

/**
 * <ul>
 * <li>업무 그룹명 : AMS/모니터링</li>
 * <li>설 명 : </li>
 * <li>작성일 : 2015-02-09 21:34:25</li>
 * <li>작성자 : 강훈기 (hunkee)</li>
 * </ul>
 *
 * @author 강훈기 (hunkee)
 */
public class ACRBBaseBean extends nexcore.framework.coreext.pojo.biz.OnlineBizComponent {

    /**
     * serialVersionUID
     */
    private static final long serialVersionUID = 1L;	// FIXME..

    /**
     * @see nexcore.framework.coreext.pojo.biz.OnlineBizComponent#getFqId()
     */
    @Override
    public String getFqId() {
        return "mtr.ACRBBase";
    }

}
