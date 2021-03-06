package com.sf.bie.interceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import com.sf.bie.domain.User;


public class UserLoginInterceptor implements HandlerInterceptor {

	@Override
	public void afterCompletion(HttpServletRequest request,	HttpServletResponse response, Object handler, Exception ex)	throws Exception {
		//System.out.println("最后执行！！！一般用于释放资源！！")
		
	}

	@Override
	public void postHandle(HttpServletRequest request,HttpServletResponse response, Object handler,	ModelAndView modelAndView) throws Exception {
		//System.out.println("Action执行之后，生成视图之前执行！！")
	}

	@Override
	public boolean preHandle(HttpServletRequest request,HttpServletResponse response, Object handler) throws Exception {
		//System.out.println("action之前执行！！！")
		request.setCharacterEncoding("UTF-8");
		response.setHeader("Content-type", "textml;charset=UTF-8");
		response.setCharacterEncoding("UTF-8");
		response.setContentType("text/html;charset=utf-8");
		response.setHeader("Access-Control-Allow-Origin","*");
		
		//创建session  
        HttpSession session =request.getSession();
        
        //无需登录，允许访问的地址  
        String[] allowUrls =new String[]{"/toLogin.do","/login.do","/reg.do"};
              
        //获取请求地址  
        String url =request.getRequestURL().toString();
          
        //获得session中的用户  
        User user =(User) session.getAttribute("userToken");  
        for (String strUrl : allowUrls) {  
            if(url.contains(strUrl)){  
                return true;  
            }  
        }  
        if(user ==null){  
        	//throw new UnLoginException("您尚未登录！");
        }  
        //重定向  
        //response.sendRedirect(request.getContextPath()+"/toLogin")
		return true;//继续执行action
	}

}

