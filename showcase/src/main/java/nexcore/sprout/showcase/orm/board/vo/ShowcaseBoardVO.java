package nexcore.sprout.showcase.orm.board.vo;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

import nexcore.sprout.showcase.common.vo.PageVO;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;


@JsonIgnoreProperties(ignoreUnknown = true)
public class ShowcaseBoardVO extends PageVO {
    
	private String seqNo;

	@NotNull
	@Size(min=1, max=10)
	private String title;
	
	@NotNull
	@Size(min=1)
	private String content;
		
	private String readCnt;
	
	@NotNull
	@Size(min=1)
	private String writer;
	
	private String reqDate;
	
	@Pattern(regexp="^(19[7-9][0-9]|20[0-9]{2})-(0[0-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$")
	private String dueDate;
	
	private String schKind;
	public String getSchKind() {
        return schKind;
    }
    public void setSchKind(String schKind) {
        this.schKind = schKind;
    }
    public String getSchWord() {
        return schWord;
    }
    public void setSchWord(String schWord) {
        this.schWord = schWord;
    }
    private String schWord;
	
	public String getSeqNo() {
		return seqNo;
	}
	public void setSeqNo(String seqNo) {
		this.seqNo = seqNo;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getContent() {
		return content;
	}
	public void setContent(String content) {
		this.content = content;
	}
	public String getReadCnt() {
		return readCnt;
	}
	public void setReadCnt(String readCnt) {
		this.readCnt = readCnt;
	}
	public String getWriter() {
		return writer;
	}
	public void setWriter(String writer) {
		this.writer = writer;
	}
	public String getReqDate() {
		return reqDate;
	}
	public void setReqDate(String reqDate) {
		this.reqDate = reqDate;
	}
	public String getDueDate() {
		return dueDate;
	}
	public void setDueDate(String dueDate) {
		this.dueDate = dueDate;
	}
	@Override
    public String toString() {
        return "BoardVO [seqNo=" + seqNo + ", title=" + title + ", content=" + content + ", readCnt=" + readCnt
            + ", writer=" + writer + ", reqDate=" + reqDate + ", dueDate=" + dueDate + ", schKind=" + schKind
            + ", schWord=" + schWord + "]";
    }
}