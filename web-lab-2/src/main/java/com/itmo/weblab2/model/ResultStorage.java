package com.itmo.weblab2.model;

import lombok.Data;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Data
public class ResultStorage {
    private Map<String, List<Hit>> resultMap;

    public ResultStorage() {
        this.resultMap = new HashMap<>();
    }

    public void createListHit(String id){
        ArrayList<Hit> hits = new ArrayList<>();
        resultMap.put(id, hits);
    }

    public boolean checkId(String id){
        return resultMap.containsKey(id);
    }

    public void addHit(String id, Hit hit ){
        resultMap.get(id).add(hit);
    }

    public List<Hit> getListHitById(String id){
        return  resultMap.get(id);
    }

    public void clearListHit(String id){
        resultMap.remove(id);
    }
}
