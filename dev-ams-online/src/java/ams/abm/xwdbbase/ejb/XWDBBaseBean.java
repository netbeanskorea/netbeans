package ams.abm.xwdbbase.ejb;

/**
 * <ul>
 * <li>업무 그룹명 : AMS/업무관리</li>
 * <li>설 명 : </li>
 * <li>작성일 : 2014-01-03 17:21:47</li>
 * <li>작성자 : 강훈기 (hunkee)</li>
 * </ul>
 *
 * @author 강훈기 (hunkee)
 */
public class XWDBBaseBean extends nexcore.framework.coreext.pojo.biz.OnlineBizComponent {

    /**
     * serialVersionUID
     */
    private static final long serialVersionUID = 1L;	// FIXME..

    /**
     * @see nexcore.framework.coreext.pojo.biz.OnlineBizComponent#getFqId()
     */
    @Override
    public String getFqId() {
        return "abm.XWDBBase";
    }

}
