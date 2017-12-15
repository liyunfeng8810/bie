package com.sf.bie.action;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.sf.bie.common.BaseController;
import com.sf.bie.domain.User;
import com.sf.bie.service.IUserService;
import com.sf.bie.service.impl.UserService;

@Controller
public class UserController  extends BaseController{

	@Autowired
	@Qualifier(UserService.SERVICE_BEANNAME)
	private IUserService userService;
	
	@RequestMapping(value = "/", method = RequestMethod.GET)  
    public String welcome(HttpServletRequest request){  
        if(request.getSession().getAttribute("userToken")!=null){  
            return INDEX;  
        }  
        return LOGIN;
    }  
	
    @RequestMapping(value = "/toLogin.do", method = RequestMethod.GET)  
    @ResponseBody
    public String toLogin(HttpServletRequest request){  
        if(request.getSession().getAttribute("userToken")==null){
            return LOGIN;
        }  
        return INDEX;
    }  
	      
    @RequestMapping(value = "/login.do", method = RequestMethod.POST)
    @ResponseBody  
    public Map<String, Object> login(
    		@RequestParam(required=true,value="email") String email, 
    		@RequestParam(required=true,value="pwd") String pwd,
    		HttpServletRequest request){  
    	Map<String, Object> maps = new HashMap<>();
    	maps.put("result",FAIL);//验证失败
        maps.put("msg","登录失败");
        try{     
                //TODO 登陆成功,保存session  
                HttpSession session =request.getSession();
                User user  = userService.getLoginUser(email, pwd);
                if(null == user){//没有找到用户
                	return maps;
                }
                session.setAttribute("userToken",user);
                //设置超时无效 
                session.setMaxInactiveInterval(20);
            	
                maps.put("result",SUCCESS);
                maps.put("msg","登录成功");
        } catch (Exception e){  
        	 maps.put("result",ERROR);  
             maps.put("msg","系统错误");
        }  
        return maps;  
    }  
    
    @RequestMapping(value = "/logout.do", method = RequestMethod.POST)
    @ResponseBody  
    public Map<String, Object> logout(HttpServletRequest request){  
    	Map<String, Object> maps = new HashMap<>();
        try{     
                //TODO 登陆成功,保存session  
                HttpSession session =request.getSession();
                session.removeAttribute("userToken");
            	
                maps.put("result",SUCCESS);
                maps.put("msg","登出成功");
        } catch (Exception e){  
        	 maps.put("result",ERROR);
             maps.put("msg","系统错误"); 
        }  
        return maps;  
    } 
	
	@RequestMapping(value = "/reg.do", method = RequestMethod.POST)
	@ResponseBody
	public String reg(
			@RequestParam(required=true,value="email") String email, 
			@RequestParam(required=true,value="uname") String uname,
    		@RequestParam(required=true,value="pwd") String pwd){
		User user = new User();
		user.setUname(uname);
		user.setEmail(email);
		user.setPwd(pwd);
		userService.addUser(user);
		return LOGIN;
	}
	
	@RequestMapping(value = "/reg2.do", method = RequestMethod.POST)
	public ModelAndView reg2(User user){
		System.out.println("UserController.reg2()");
		System.out.println(user.getUname());
		ModelAndView mav = new ModelAndView(INDEX);
		return mav;
	}
	
	
	@RequestMapping(value = "/reg3.do", method = RequestMethod.POST)
	public String reg3(@RequestParam("uname") String name,HttpServletRequest req,ModelMap map){
		req.getSession().setAttribute("c", "ccc");
		map.put("a", "aaa");
		return INDEX;
	}
	
	@RequestMapping(value = "/reg4.do", method = RequestMethod.POST)
	public String reg4(@ModelAttribute("a") String a,HttpServletRequest req,ModelMap map){
		return "redirect:http://www.baidu.com";
	}
	
	@RequestMapping(params="method=reg5")
	public ModelAndView reg5(String uname){
		System.out.println("UserController.reg5()");
		
		ModelAndView mav = new ModelAndView();
		mav.setViewName(INDEX);
		
		User u = new User("老高");
		User u2 = new User("高淇");
		
		mav.addObject(u);
		mav.addObject("uu", u2);
		
		return mav;
	}
}
