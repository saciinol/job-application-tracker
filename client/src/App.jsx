import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/auth/useAuth';
import { PageLoader } from './components/ui/LoadingSpinner';
import ScrollToTop from './components/ui/ScrollToTop';

const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const Dashboard = lazy(() => import('./pages/Dashboard'));

const ProtectedRoute = ({ children }) => {
	const { user, loading } = useAuth();

	if (loading) return <PageLoader />;

	if (!user) return <Navigate to="/login" />;

	return children;
};

const PublicRoute = ({ children }) => {
	const { user, loading } = useAuth();

	if (loading) return <PageLoader />;

	if (user) return <Navigate to="/" />;

	return children;
};

const App = () => {
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
							<Dashboard />
						</ProtectedRoute>
					}
				/>
			</Routes>
		</Suspense>
	);
};

export default App;
