import apiClient from './apiClient';

export const retrainService = {
    retrainModel: () => apiClient.post('/api/churn/train')
};