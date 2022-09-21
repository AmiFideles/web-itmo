package com.itmo.weblab2.utils;

import com.google.gson.Gson;

public class GsonHelper {
    private Gson gson;

    public GsonHelper() {
        this.gson = new Gson();
    }

    public String getJsonFromObject(Object object){
        return gson.toJson(object);
    }
}
