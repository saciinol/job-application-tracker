import api from './api';

export const analyticsAPI = {
	get: () => api.get('/api/analytics'),
};
