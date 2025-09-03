package org.morgan.untilmoraleimproves2.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Map;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CoefficientsResponse {
    private Double intercept;
    private Map<String, Double> coefficients;

    @JsonProperty("feature_ranking")
    private List<FeatureImportance> featureRanking;
}
