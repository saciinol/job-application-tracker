import { Link, useNavigate } from 'react-router-dom';
import { LogOut, Briefcase } from 'lucide-react';
import { useAuth } from '../../context/auth/useAuth';
import Mode from './Mode';

const Layout = ({ children }) => {
	const { user, logout } = useAuth();
	const navigate = useNavigate();

	const handleLogout = () => {
		logout();
		navigate('/login');
	};

	return (
		<div className="min-h-screen bg-muted">
			<nav className="bg-background shadow-sm">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="flex justify-between items-center h-16">
						<Link to="/" className="flex items-center gap-2 text-xl font-bold text-blue-600">
							<Briefcase className="size-6" />
							Job Application Tracker
						</Link>

						{user && (
							<div className="flex items-center gap-1">
								<span className="text-primary/80 pr-4">Hello, {user.name}</span>
								<Mode />

								<button
									onClick={handleLogout}
									className="flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-primary/10 rounded-lg transition cursor-pointer"
								>
									<LogOut className="w-4 h-4" />
									Logout
								</button>
							</div>
						)}
					</div>
				</div>
			</nav>

			<main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">{children}</main>
		</div>
	);
};

export default Layout;
