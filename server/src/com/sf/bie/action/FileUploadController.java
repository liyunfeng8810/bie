package com.sf.bie.action;

import java.io.File;
import java.util.Date;

import javax.servlet.ServletContext;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.context.ServletContextAware;
import org.springframework.web.multipart.commons.CommonsMultipartFile;

import com.sf.bie.common.BaseController;

@Controller
public class FileUploadController extends BaseController implements ServletContextAware {

	private ServletContext servletContext;
	
	@Override
	public void setServletContext(ServletContext context) {
		this.servletContext  = context;
	}
	
	@RequestMapping(value="/upload.do", method = RequestMethod.POST)
	public String handleUploadData(String name,@RequestParam("file") CommonsMultipartFile file){
		if (!file.isEmpty()) {
			   String path = this.servletContext.getRealPath("/tmp/");  //获取本地存储路径
			   System.out.println(path);
			   String fileName = file.getOriginalFilename();
			   String fileType = fileName.substring(fileName.lastIndexOf("."));
			   System.out.println(fileType); 
			   File file2 = new File(path,new Date().getTime() + fileType); //新建一个文件
			   try {
				    file.getFileItem().write(file2); //将上传的文件写入新建的文件中
			   } catch (Exception e) {
				    e.printStackTrace();
			   }
			   return "redirect:upload_ok.jsp";
			}else{
				return "redirect:upload_error.jsp";
			}
	}
}
