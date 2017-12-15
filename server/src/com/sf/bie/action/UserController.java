package com.sf.bie.action;

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
            return "/index";  
        }  
        return "login";  
    }  
	
    @RequestMapping(value = "/toLogin.do", method = RequestMethod.GET)  
    public String toLogin(HttpServletRequest request){  
        if(request.getSession().getAttribute("userToken")!=null){  
            return "/index";
        }  
        return "login";
    }  
	      
    @RequestMapping(value = "/login.do", method = RequestMethod.POST)  
    @ResponseBody  
    public Map<String, Object> login(@RequestParam(required=true,value="loginName") String loginName, 
    		@RequestParam(required=true,value="pwd") String pwd,HttpServletRequest request){  
        //ResultUtil result = new ResultUtil();  
        try{     
            if(null != loginName && loginName.equals("admin") && null != pwd && pwd.equals("admin") ){  
                //TODO 登陆成功,保存session  
                HttpSession session =request.getSession();  
                  
                //UserToken userToken =new UserToken("admin","admin", "bucketName");  
                  
                //session.setAttribute("userToken",userToken);  
                  
                //设置超时无效  
                //session.setMaxInactiveInterval(20);  
                  
            }else{  
                //result.setSuccess(false);  
                //result.setMsg("用户名或密码错误!");  
            }  
              
        } catch (Exception e){  
            //result.setSuccess(false);  
            //result.setMsg("系统内部异常！");  
        }  
        return null;  
    }  
	
	@RequestMapping(value = "/reg.do", method = RequestMethod.POST)
	public String reg(String uname){
		System.out.println("UserController.reg()");
		System.out.println(uname);
		userService.add(uname);
		return "index";
	}
	
	@RequestMapping(value = "/reg2.do", method = RequestMethod.POST)
	public ModelAndView reg2(User user){
		System.out.println("UserController.reg2()");
		System.out.println(user.getUname());
		ModelAndView mav = new ModelAndView("index");
		return mav;
	}
	
	
	@RequestMapping(value = "/reg3.do", method = RequestMethod.POST)
	public String reg3(@RequestParam("uname") String name,HttpServletRequest req,ModelMap map){
		System.out.println("UserController.reg()");
		System.out.println(name);
		req.getSession().setAttribute("c", "ccc");
		map.put("a", "aaa");
		
		return "index";
	}
	
	@RequestMapping(value = "/reg4.do", method = RequestMethod.POST)
	public String reg4(@ModelAttribute("a") String a,HttpServletRequest req,ModelMap map){
		System.out.println("UserController.reg4()");
		System.out.println(a);
		return "redirect:http://www.baidu.com";
	}
	
	@RequestMapping(params="method=reg5")
	public ModelAndView reg5(String uname){
		System.out.println("UserController.reg5()");
		
		ModelAndView mav = new ModelAndView();
		mav.setViewName("index");
		
		User u = new User("老高");
		User u2 = new User("高淇");
		
		mav.addObject(u);
		mav.addObject("uu", u2);
		
		return mav;
	}
}
