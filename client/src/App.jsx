import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/auth/useAuth';
import { PageLoader } from './components/ui/LoadingSpinner';
import ScrollToTop from './components/ui/ScrollToTop';
import Layout from './components/ui/Layout';

const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const Dashboard = lazy(() => import('./pages/Dashboard'));

const ProtectedRoute = ({ children }) => {
	const { user } = useAuth();
	return user ? children : <Navigate to="/login" replace />;
};

const PublicRoute = ({ children }) => {
	const { user } = useAuth();
	return user ? <Navigate to="/" replace /> : children;
};

const App = () => {
	const { loading } = useAuth();

	if (loading) return <PageLoader />;

	return (
		<Suspense fallback={<PageLoader />}>
			<ScrollToTop />

			<Routes>
				<Route
					path="/login"
					element={
						<PublicRoute>
							<Login />
						</PublicRoute>
					}
				/>

				<Route
					path="/register"
					element={
						<PublicRoute>
							<Register />
						</PublicRoute>
					}
				/>

				<Route
					path="/"
					element={
						<ProtectedRoute>
							<Layout>
								<Dashboard />
							</Layout>
						</ProtectedRoute>
					}
				/>

				<Route path="*" element={<Navigate to="/" replace />} />
			</Routes>
		</Suspense>
	);
};

export default App;
