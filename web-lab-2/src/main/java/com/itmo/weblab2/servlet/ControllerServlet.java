package com.itmo.weblab2.servlet;

import com.itmo.weblab2.service.exceptions.HitCreatingException;

import javax.servlet.ServletConfig;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;


@WebServlet(value = "/dispatcher")
public class ControllerServlet extends HttpServlet {

    @Override
    public void init(ServletConfig config) throws ServletException {
        super.init(config);
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        throw new HitCreatingException("кукуха поехала");
/*        if (Boolean.parseBoolean(req.getParameter("clear"))) {
            req.getRequestDispatcher("/clear").forward(req, resp);
        }else{
            req.getRequestDispatcher("/check").forward(req,resp);
        }*/
    }
}
