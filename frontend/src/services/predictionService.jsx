import apiClient from './apiClient';

export const predictionService = {
    predictCustomer: (churnPredictionRequest) => apiClient.post('/api/churn/predict', churnPredictionRequest)
};