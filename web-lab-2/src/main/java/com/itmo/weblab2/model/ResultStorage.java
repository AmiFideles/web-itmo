package com.itmo.weblab2.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Map;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ResultStorage {
    private Map<String, List<Hit>> resultMap;

    private void addResult(String id, Hit hit){
        List<Hit> hits = resultMap.get(id);
        hits.add(hit);
    }

    private boolean checkId(String id){
        return resultMap.containsKey(id);
    }


}
