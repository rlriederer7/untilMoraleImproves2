package org.morgan.untilmoraleimproves2.client;

import org.morgan.untilmoraleimproves2.dto.ChurnPredictionRequest;
import org.morgan.untilmoraleimproves2.dto.ChurnPredictionResponse;
import org.morgan.untilmoraleimproves2.dto.ChurnTrainingResponse;
import org.morgan.untilmoraleimproves2.dto.CoefficientsResponse;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.service.annotation.GetExchange;
import org.springframework.web.service.annotation.HttpExchange;
import org.springframework.web.service.annotation.PostExchange;

@HttpExchange
public interface PredictionClient {
    @PostExchange("/train")
    ChurnTrainingResponse trainModel();

    @PostExchange("/predict")
    ChurnPredictionResponse predictChurn(@RequestBody ChurnPredictionRequest request);

    @GetExchange("/coefficients")
    CoefficientsResponse getCoefficients();
}
