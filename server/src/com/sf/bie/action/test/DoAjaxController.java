package com.sf.bie.action;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
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
	
	@ResponseBody
	@RequestMapping(params="method=test2")
	public String test2(String uname) throws Exception{
		return uname;
	}
	
	/**
	 * 查询专业市场
	 * @param params
	 * @return
	 * @throws Exception
	 */
	@ResponseBody
	@RequestMapping(params="method=queryMaster",method=RequestMethod.POST)
	public String queryMaster(String params) throws Exception{	
		JSONObject json = JSON.parseObject(params);
		JSONObject data = userService.queryMarket(json);
		return JSON.toJSONString(data);
	}
	
	/**
	 * 查询集货详情
	 * @param params
	 * @return
	 * @throws Exception
	 */
	@ResponseBody
	@RequestMapping(params="method=queryJihuoxq",method=RequestMethod.POST)
	public String queryJihuoxq(String params) throws Exception{	
		JSONObject json = JSON.parseObject(params);
		JSONObject data = userService.queryJihuoxq(json);
		return JSON.toJSONString(data);
	}
	
	/***
	 * 保存寄件信息
	 * @param params
	 * @return
	 * @throws Exception
	 */
	@ResponseBody
	@RequestMapping(params="method=saveJjianxx",method=RequestMethod.POST)
	public String saveJjianxx(String params) throws Exception{		
		JSONObject json = JSON.parseObject(params);
		userService.saveJjianxx(json);	
		return "SUCCESS";
				
	}
	
}
