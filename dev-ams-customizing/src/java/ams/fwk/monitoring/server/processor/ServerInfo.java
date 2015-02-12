package ams.fwk.monitoring.server.processor;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import nexcore.framework.core.exception.FwkRuntimeException;

import org.hyperic.sigar.CpuInfo;
import org.hyperic.sigar.CpuPerc;
import org.hyperic.sigar.FileSystem;
import org.hyperic.sigar.FileSystemUsage;
import org.hyperic.sigar.Mem;
import org.hyperic.sigar.NfsFileSystem;
import org.hyperic.sigar.Sigar;
import org.hyperic.sigar.SigarException;
import org.hyperic.sigar.Swap;
import org.hyperic.sigar.cmd.SigarCommandBase;

import ams.fwk.constants.DBNamingConstants;

/**
 * 서버 상태정보를 취득하기 위한 내부클래스 
 * @author 박세일
 *
 */
public class ServerInfo extends SigarCommandBase {
	@Override
	public void output(String[] arg0) throws SigarException {//별도의 CPU정보출력이 필요할 경우는 사용한다.
	}
	
	/**
	 * CPU전체의 퍼센트율을 담은 객체를 return한다. 
	 * @return
	 */
	public CpuPerc getCpuPerc() {
		CpuPerc cpuPerc = null;
		try {
			cpuPerc = this.sigar.getCpuPerc();
		} catch (SigarException e) {
			throw new FwkRuntimeException("SKFS1005", e);
		}
		return cpuPerc;
	}
	
	/**
	 * CPU에 대한 상세정보를 보여준다. 
	 * @return
	 */
	public CpuInfo getCpuDetailInfo() {
		CpuInfo cpuInfo = null;
		try {
			CpuInfo[] cpuInfoList = this.sigar.getCpuInfoList();
			cpuInfo = cpuInfoList[0];//CPU는 반드시는 1개 이상은 있다. 
		} catch (SigarException e) {
			throw new FwkRuntimeException("SKFS1005", e);
		}
		return cpuInfo;
	}
	
	public Map getMemPerc() {
		Map memInfoMap = new HashMap();
		 try {
			Mem mem   = this.sigar.getMem();
			Swap swap = this.sigar.getSwap();
			long actualFree = mem.getActualFree();
			long actualUsed = mem.getActualUsed();
			long total = mem.getTotal();
			
			memInfoMap.put(DBNamingConstants.TOTAL_MEM, total);
			memInfoMap.put(DBNamingConstants.USED_MEM, actualUsed);
			memInfoMap.put(DBNamingConstants.FREE_MEM, actualFree);
			
		} catch (SigarException e) {
			throw new FwkRuntimeException("SKFS1005", e);
		}
		 return memInfoMap;
	}
	
	public List getFileSystemInfo() {
        FileSystem[] fslist = null;
        FileSystemUsage usage = null;
        long used, avail, total, pct = 0;
        List fileSystemList = new ArrayList();
        Map fsInfoMap = null;
		try {
			fslist = this.proxy.getFileSystemList();
			 for (int i=0; i<fslist.length; i++) {
				 fsInfoMap = new HashMap();
				 if(fslist[i] instanceof NfsFileSystem) {
					 NfsFileSystem nfs = (NfsFileSystem)fslist[i];
		                if (!nfs.ping()) {
//		                    nfs.getUnreachableMessage();
		                    return null;
		                }
				 }
				 usage = this.sigar.getFileSystemUsage(fslist[i].getDirName());
				 fsInfoMap.put(DBNamingConstants.FILE_SYSTEM_NAME, fslist[i].getDevName());
				 fsInfoMap.put(DBNamingConstants.USED, formatSize(usage.getTotal() - usage.getFree()));
				 fsInfoMap.put(DBNamingConstants.AVAIL, formatSize(usage.getAvail()));
				 fsInfoMap.put(DBNamingConstants.FS_SIZE,formatSize(usage.getTotal()));
				 fsInfoMap.put(DBNamingConstants.USED_PERC,  usage.getUsePercent());
				 fsInfoMap.put(DBNamingConstants.MOUNT_ON,  fslist[i].getDirName());
				 fsInfoMap.put(DBNamingConstants.TYPE,  (fslist[i].getSysTypeName()+"/"+fslist[i].getTypeName()));
				 fileSystemList.add(fsInfoMap);
			 }
		} catch (SigarException e) {
			//e.g. on win32 D:\ fails with "Device not ready"
            //if there is no cd in the drive.
            used = avail = total = pct = 0;
		}
		return fileSystemList;
	}
	
    private String formatSize(long size) {
        return Sigar.formatSize(size * 1024);
    }
    
//    public static void main(String[]args) {
//    	List fsList = new ServerInfo().getFileSystemInfo();
//    	if(fsList != null) {
//    		for(Object obj : fsList) {
//    			if(obj instanceof Map) {
//    				Map fsInfoMap = (Map)obj;
//    				System.out.println(fsInfoMap.get("USED_PERC"));
//    			}
//    		}
//    	}
//    }
}
