package org.morgan.untilmoraleimproves2.dto;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@JsonAutoDetect(fieldVisibility = JsonAutoDetect.Visibility.ANY, getterVisibility = JsonAutoDetect.Visibility.NONE, setterVisibility = JsonAutoDetect.Visibility.NONE)
public class ChurnPredictionRequest {
    private String gender;
    private Integer SeniorCitizen;
    private String Partner;
    private String Dependents;
    private Integer tenure;
    private String PhoneService;
    private String MultipleLines;
    private String InternetService;
    private String OnlineSecurity;
    private String OnlineBackup;
    private String DeviceProtection;
    private String TechSupport;
    private String StreamingTV;
    private String StreamingMovies;
    private String Contract;
    private String PaperlessBilling;
    private String PaymentMethod;
    private Double MonthlyCharges;
    private Double TotalCharges;
}