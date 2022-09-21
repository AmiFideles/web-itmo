package com.itmo.weblab2.servlet;

import com.itmo.weblab2.model.Hit;
import com.itmo.weblab2.model.ResultStorage;
import com.itmo.weblab2.service.Checker;
import com.itmo.weblab2.service.HitResultFactory;
import com.itmo.weblab2.service.Validator;
import com.itmo.weblab2.service.exceptions.HitCreatingException;
import com.itmo.weblab2.utils.GsonHelper;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

@WebServlet(name = "areaCheck", value = "/check")
public class AreaCheckServlet extends HttpServlet {
    private HitResultFactory hitResultFactory;
    private GsonHelper gsonHelper;

    @Override
    public void init() throws ServletException {
        this.gsonHelper = new GsonHelper();
        this.hitResultFactory = new HitResultFactory(new Checker(), new Validator());
        getServletContext().setAttribute("result", new ResultStorage());
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        PrintWriter writer = resp.getWriter();
        try {
            String xValue = req.getParameter("x");
            String yValue = req.getParameter("y");
            String rValue = req.getParameter("r");
            Hit hit = hitResultFactory.createHit(xValue, yValue, rValue);
            String id = req.getSession().getId();
            ResultStorage result = (ResultStorage) getServletContext().getAttribute("result");
            if (!result.checkId(id)) {
                result.createListHit(id);
            }
            List<Hit> hits = result.getListHitById(id);
            hits.add(hit);
            getServletContext().setAttribute("result", result);
            writer.write(gsonHelper.getJsonFromObject(hit));
        } catch (HitCreatingException e) {
            resp.setStatus(400);
            writer.write(e.getMessage());
        } finally {
            writer.close();
        }
    }

}
