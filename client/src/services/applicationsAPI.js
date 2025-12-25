import api from './api';

export const applicationsAPI = {
	getAll: (params) => api.get('/api/applications', { params }),
	create: (data) => api.post('/api/applications', data),
	update: (id, data) => api.put(`/api/applications/${id}`, data),
	delete: (id) => api.delete(`/api/applications/${id}`),
};
