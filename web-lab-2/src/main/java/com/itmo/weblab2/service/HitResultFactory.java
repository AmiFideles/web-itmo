package com.itmo.weblab2.service;

import com.itmo.weblab2.model.Hit;
import com.itmo.weblab2.service.exceptions.HitCreatingException;
import com.itmo.weblab2.service.exceptions.WrongValueException;
import lombok.AllArgsConstructor;

/**
 * будет создавать hit , использовать внутри себя другие сервисы
 */
@AllArgsConstructor
public class HitResultFactory {
    private Checker checker;
    private Validator validator;

    public Hit createHit(String xValue, String yValue, String rValue) throws HitCreatingException {
        double x = parseValue(xValue);
        double y = parseValue(yValue);
        double r = parseValue(rValue);

        try {
            validator.validateValues(x, y, r);
            boolean hitResult = checker.checkHit(x, y, r);
            Hit hit = Hit.builder().xValue(x).yValue(y).rValue(r).result(hitResult).build();
            return hit;
        } catch (WrongValueException e) {
            throw new HitCreatingException(e.getMessage());
        }
    }

    public double parseValue(String inputValue) throws HitCreatingException {
        try {
            return Double.parseDouble(inputValue);
        } catch (Throwable e) {
            throw new HitCreatingException("Cannot parse input value to double");
        }
    }
}
