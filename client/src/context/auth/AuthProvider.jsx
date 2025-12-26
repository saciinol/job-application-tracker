import { useEffect, useState } from 'react';
import { authAPI } from '../../services/authAPI';
import { AuthContext } from './auth-context';

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);

	const login = async ({ email, password }) => {
		const { data } = await authAPI.login({ email, password });
		localStorage.setItem('token', data.token);
		localStorage.setItem('user', JSON.stringify(data.user));
		setUser(data.user);
		return data;
	};

	const register = async ({ name, email, password }) => {
		const { data } = await authAPI.register({ name, email, password });
		localStorage.setItem('token', data.token);
		localStorage.setItem('user', JSON.stringify(data.user));
		setUser(data.user);
		return data;
	};

	const logout = () => {
		localStorage.removeItem('token');
		localStorage.removeItem('user');
		setUser(null);
	};

	useEffect(() => {
		const verifyUser = async () => {
			const token = localStorage.getItem('token');

			if (!token) {
				setLoading(false);
				return;
			}

			try {
				const { data } = await authAPI.verify();
				setUser(data.user);
			} catch {
				logout();
			} finally {
				setLoading(false);
			}
		};

		verifyUser();
	}, []);

	return <AuthContext.Provider value={{ user, login, register, logout, loading }}>{children}</AuthContext.Provider>;
};
