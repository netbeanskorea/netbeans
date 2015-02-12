/*
 * Copyright (c) 2006 SK C&C. All rights reserved.
 * 
 * This software is the confidential and proprietary information of SK C&C. You
 * shall not disclose such Confidential Information and shall use it only in
 * accordance with the terms of the license agreement you entered into with SK
 * C&C.
 */
 
package ams.asm.fwkbbase.ejb;

/**
 * <ul>
 * <li>업무 그룹명 : AMS/FWK업무</li>
 * <li>설 명 : </li>
 * <li>작성일 : 2013-07-09 11:41:35</li>
 * </ul>
 *
 * @author 박세일 (ParkSeIl)
 */
public interface FWKBBaseHome extends javax.ejb.EJBHome {

	 /**
	  *
	  * @return
	  * @throws javax.ejb.CreateException
	  * @throws java.rmi.RemoteException
	  */
	 public FWKBBase create() throws javax.ejb.CreateException,
	         java.rmi.RemoteException;

}