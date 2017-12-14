package com.sf.bie.action;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.fastjson.JSON;
import com.sf.bie.common.BaseController;
import com.sf.bie.domain.User;
import com.sf.bie.service.IUserService;
import com.sf.bie.service.impl.UserService;

@Controller
@RequestMapping("doajax.do")
public class DoAjaxController extends BaseController{
	
	@Autowired
	@Qualifier(UserService.SERVICE_BEANNAME)
	private IUserService userService;
	
	@RequestMapping(params="method=test1",method=RequestMethod.GET)
	public @ResponseBody String test1(String uname) throws Exception{
		List<User> lstUser = userService.selectUser();
		return JSON.toJSONString(lstUser);
	}
	
}
