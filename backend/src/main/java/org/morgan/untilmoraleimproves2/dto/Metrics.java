package org.morgan.untilmoraleimproves2.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Metrics {
    private Double accuracy;
    private String classification_report;
}
