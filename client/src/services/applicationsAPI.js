import api from './api';

export const applicationsAPI = {
	getAll: (params = {}) => api.get(`/applications`, { params }),
	create: (data) => api.post('/applications', data),
	update: (id, data) => api.put(`/applications/${id}`, data),
	delete: (id) => api.delete(`/applications/${id}`),
};
