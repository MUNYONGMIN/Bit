package com.spring.admin2;

import java.util.List;

import com.spring.product.SettlementVO;
import com.spring.tazo.ShareWatingListVO;

public interface SubscribePaymentService {

	public List<ShareWatingListVO> getShareList();
	public void shareWaitingListAcceptOrDeny(int waiting_num, int chk_num);
	public List<ShareWatingListVO> getShareAcceptList();
	public List<SettlementVO> getSettleList();
	
}