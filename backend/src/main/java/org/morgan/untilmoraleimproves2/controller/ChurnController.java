package org.morgan.untilmoraleimproves2.controller;

import org.morgan.untilmoraleimproves2.client.PredictionClient;
import org.morgan.untilmoraleimproves2.dto.ChurnPredictionRequest;
import org.morgan.untilmoraleimproves2.dto.ChurnPredictionResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
        System.out.println("Received request: " + request); // Add this
        ChurnPredictionResponse response = predictionClient.predictChurn(request);
        return ResponseEntity.ok(response);
    }
}