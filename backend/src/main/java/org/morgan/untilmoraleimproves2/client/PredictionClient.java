package org.morgan.untilmoraleimproves2.client;

import org.morgan.untilmoraleimproves2.dto.ChurnPredictionRequest;
import org.morgan.untilmoraleimproves2.dto.ChurnPredictionResponse;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.service.annotation.HttpExchange;
import org.springframework.web.service.annotation.PostExchange;

@HttpExchange
public interface PredictionClient {
    @PostExchange("/predict")
    ChurnPredictionResponse predictChurn(@RequestBody ChurnPredictionRequest request);
}
