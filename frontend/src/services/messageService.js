import apiClient from './apiClient';

export const messageService = {
    getAllMessages: () => apiClient.get('/api/messages'),
    createMessage: (message) => apiClient.post('/api/messages', message),
    updateMessage: (id, updates) => apiClient.patch(`/api/messages/${id}`, updates),
    deleteMessage: (id) => apiClient.delete(`/api/messages/${id}`),
};