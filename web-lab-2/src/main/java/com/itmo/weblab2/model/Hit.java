package com.itmo.weblab2.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Hit {
    private double xValue;
    private double yValue;
    private double rValue;
    private boolean result;



}
