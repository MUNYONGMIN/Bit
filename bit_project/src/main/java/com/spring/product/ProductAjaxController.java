package com.spring.product;

import java.util.List;

import org.apache.ibatis.annotations.Param;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ProductAjaxController {
	
	@Autowired(required=false)
	private PDService service;
	
	@PostMapping(value = "/startSearch.pr", produces = "application/json;charset=UTF-8")
	public List<ProductVO> startSearch() {		
		List<ProductVO> list = null;
		try {
			list = service.startSearch();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return list;
	}
	@PostMapping(value = "/scrollSearch.pr", produces = "application/json;charset=UTF-8")
	public List<ProductVO> scrollSearch(int pno) {	
		System.out.println("ajax pno : "+pno+"파라미터 pno : "+pno*8);
		List<ProductVO> list = null;
		try {
			list = service.scrollSearch(pno*8);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return list;
	}
	
	@PostMapping(value = "/filterSearch.pr", produces = "application/json;charset=UTF-8")
	public List<ProductVO> filterSearch(ProductVO prVO) {
		System.out.println(prVO.getCategory_l());
		System.out.println(prVO.getCategory_m());
		System.out.println(prVO.getCategory_s());
		List<ProductVO> list = null;
		try {
		
			list = service.filterSearch(prVO);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return list;
	}
}
