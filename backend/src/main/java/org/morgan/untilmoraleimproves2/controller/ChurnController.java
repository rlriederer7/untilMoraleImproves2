package org.morgan.untilmoraleimproves2.controller;

import org.morgan.untilmoraleimproves2.client.PredictionClient;
import org.morgan.untilmoraleimproves2.dto.ChurnPredictionRequest;
import org.morgan.untilmoraleimproves2.dto.ChurnPredictionResponse;
import org.morgan.untilmoraleimproves2.dto.CoefficientsResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/churn")
public class ChurnController {
    private final PredictionClient predictionClient;

    public ChurnController(PredictionClient predictionClient) {
        this.predictionClient = predictionClient;
    }

    @PostMapping("/predict")
    public ResponseEntity<ChurnPredictionResponse> predictChurn(
            @RequestBody ChurnPredictionRequest request) {
//        System.out.println("Received request: " + request); // Add this
        ChurnPredictionResponse response = predictionClient.predictChurn(request);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/coefficients")
    public ResponseEntity<CoefficientsResponse> getCoefficients() {
        try {
            CoefficientsResponse coefficients = predictionClient.getCoefficients();
            return ResponseEntity.ok(coefficients);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }
}