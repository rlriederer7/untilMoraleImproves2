package org.morgan.untilmoraleimproves2.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class FeatureImportance {
    private String feature;
    private Double coefficient;
    private String impact;
    private Double magnitude;
}
