package com.spring.chat;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
public class ChatController {
	
	@RequestMapping(value = "/index.ct", method = { RequestMethod.GET , RequestMethod.POST })
	public String index(Model model) {
		return "index";
	}
	
	@RequestMapping(value = "/chatstart.ct", method = { RequestMethod.GET , RequestMethod.POST })
	public String chatstart(Model model) {
		return "chat";
	}
	
}
