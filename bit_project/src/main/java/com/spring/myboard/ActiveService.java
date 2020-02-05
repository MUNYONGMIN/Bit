package com.spring.myboard;

import java.util.ArrayList;

public interface ActiveService {
	public ActiveVO getLastconnection(String nickname) throws Exception;
	public int getReviewCount(String nickname) throws Exception;
	public int getRCommentCount(String nickname) throws Exception;
	public int getScrapCount(String nickname) throws Exception;
	public int getBoardCount(String nickname) throws Exception;
	public ActiveVO getWriteDate(String nickname) throws Exception;
	public ArrayList<BoardVO> getBoard1(BoardVO vo) throws Exception;
}
