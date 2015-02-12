package ams.asm.fwksbase.ejb;

/**
 * <ul>
 * <li>업무 그룹명 : AMS/FWK업무</li>
 * <li>설 명 : </li>
 * <li>작성일 : 2013-07-09 11:41:59</li>
 * <li>작성자 : 박세일 (ParkSeIl)</li>
 * </ul>
 *
 * @author 박세일 (ParkSeIl)
 */
public class FWKSBaseBean extends nexcore.framework.coreext.pojo.biz.SharedBizComponent {

    /**
     * serialVersionUID
     */
    private static final long serialVersionUID = 1L;	// FIXME..

    /**
     * @see nexcore.framework.coreext.pojo.biz.SharedBizComponent#getFqId()
     */
    @Override
    public String getFqId() {
        return "asm.FWKSBase";
    }

}
