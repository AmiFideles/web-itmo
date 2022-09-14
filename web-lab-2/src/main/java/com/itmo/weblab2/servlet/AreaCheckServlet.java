package com.itmo.weblab2.servlet;

import com.itmo.weblab2.model.Hit;
import com.itmo.weblab2.service.Checker;
import com.itmo.weblab2.service.HitResultFactory;
import com.itmo.weblab2.service.Validator;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@WebServlet(name = "areaCheck", value = "/check")
public class AreaCheckServlet extends HttpServlet {
    private HitResultFactory hitResultFactory;
    // TODO нужно ли переопределять метод инит и дестрой?


    @Override
    public void init() throws ServletException {
        this.hitResultFactory = new HitResultFactory(new Checker(), new Validator());
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String xValue = req.getParameter("x");
        String yValue = req.getParameter("y");
        String rValue = req.getParameter("r");
        Hit hit = hitResultFactory.createHit(xValue, yValue, rValue);
    }


}
