package com.kjblink.totoro;


import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;

import org.jdf.requestmon.ServiceTrace;

public class RequestMonFilter implements Filter {
	protected FilterConfig filterConfig = null;
	
	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
		ServiceTrace trace = ServiceTrace.getInstance();
		trace.startTrace((HttpServletRequest)request);
		try {
			chain.doFilter(request, response);
		}finally {
			trace.endTrace((HttpServletRequest)request);
		}
	}
	
	public void destroy() {
		this.filterConfig = null;
	}
	
	public void init(FilterConfig filterConfig) throws ServletException {
	}
}
