package com.itmo.weblab2.servlet;

import com.itmo.weblab2.model.ResultStorage;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@WebServlet(value = "/clear")
public class ClearTableServlet extends HttpServlet {

    @Override
    public void init() throws ServletException {
        ResultStorage result = (ResultStorage) getServletContext().getAttribute("result");
        if (result == null){
            result = new ResultStorage();
            getServletContext().setAttribute("result", result);
        }
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        ResultStorage result = (ResultStorage) getServletContext().getAttribute("result");
        String id = req.getSession().getId();
        if (result.checkId(id)){
            result.clearListHit(id);
        }
        getServletContext().setAttribute("result", result);

    }
}
