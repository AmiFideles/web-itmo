package com.itmo.weblab2.service;

import com.itmo.weblab2.service.exceptions.WrongValueException;

import java.util.Arrays;

/**
 * Проверяет на null введенные данные
 */

public class Validator {
    private final double xMin;
    private final double xMax;
    private final double rMin;
    private final double rMax;
    private final Double[] yValues = {-2d, -1.5d, -1d, -0.5d, 0d,0.5d, 1d, 1.5d,2d};

    public Validator() {
        this.xMin=-3;
        this.xMax=3;

        this.rMin=2;
        this.rMax=5;


    }

    public boolean validateValues(double x, double y, double r) throws WrongValueException {
        return validateXValue(x) && validateYValue(y) && validateRValue(r);
    }

    private boolean validateXValue(Double xValue) throws WrongValueException {
        if (xValue>=xMin && xValue<=xMax) return true;
        throw new WrongValueException("Wrong x value");
    }

    private boolean validateRValue(Double rValue) throws WrongValueException {
        if (rValue>=rMin && rValue<=rMax) return true;
        throw new WrongValueException("Wrong r value");
    }

    private boolean validateYValue(double yValue) throws WrongValueException {
        if (Arrays.asList(yValues).contains(yValue)) return true;
        throw new WrongValueException("Wrong y value");
    }
}


