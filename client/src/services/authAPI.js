import api from './api';

export const authAPI = {
	register: (data) => api.post('/auth/register', data),
	login: (data) => api.post('/auth/login', data),
	verify: () => api.get('/auth/verify'),
};
