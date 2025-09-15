import apiClient from './apiClient';

export const coefficientService = {
    getCoefficients: () => apiClient.get('/api/churn/coefficients')
};