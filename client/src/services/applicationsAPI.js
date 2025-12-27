import api from './api';

export const applicationsAPI = {
	getAll: ({ page = 1, limit = 10 }) => api.get(`/applications?page=${page}&limit=${limit}`),
	create: (data) => api.post('/applications', data),
	update: (id, data) => api.put(`/applications/${id}`, data),
	delete: (id) => api.delete(`/applications/${id}`),
};
