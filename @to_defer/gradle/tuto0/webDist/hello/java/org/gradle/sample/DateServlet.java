package org.gradle.sample;

import java.io.*;
import java.util.*;
import javax.servlet.http.*;
import javax.servlet.*;

public class HelloServlet extends HttpServlet {
	public void doGet(HttpServletRequest req, HttpServletResponse res) thorws ServletException, IOException {
		res.getWriter().println("hello, world");
	}
}
