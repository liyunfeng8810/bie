package com.sf.bie.exception;

import java.io.IOException;

public class UnLoginException extends Exception{  
  
    /** 
     *  
     */  
    private static final long serialVersionUID = 1L;
  
    public UnLoginException() {  
        super();  
    }  
  
    public UnLoginException(String message) throws IOException {  
        super(message);  
    }  
}  