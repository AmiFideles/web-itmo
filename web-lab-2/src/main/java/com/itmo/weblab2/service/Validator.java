package com.itmo.weblab2.service;

import com.itmo.weblab2.service.exceptions.WrongValueException;

import java.util.List;

/**
 * Проверяет на null введенные данные
 */

public class Validator {
    private final double xMin;
    private final double xMax;
    private final double rMin;
    private final double rMax;
    private final List<Double> yValues;

    public Validator() {
        this.xMin=-5;
        this.xMax=3;

        this.rMin=1;
        this.rMax=3;

        this.yValues = List.of(0D,1D,2D,3D);
    }

    public boolean validateValues(double x, double y, double r) throws WrongValueException {
        return validateXValue(x) && validateYValue(y) && validateRValue(r);
    }

    private boolean validateXValue(Double xValue) throws WrongValueException {
        if (xValue>xMin && xValue<xMax) return true;
        throw new WrongValueException("Wrong x value");
    }

    private boolean validateRValue(Double rValue) throws WrongValueException {
        if (rValue>rMin && rValue<rMax) return true;
        throw new WrongValueException("Wrong r value");
    }

    private boolean validateYValue(Double yValue) throws WrongValueException {
        if (yValues.contains(yValue)) return true;
        throw new WrongValueException("Wrong y value");
    }
}


