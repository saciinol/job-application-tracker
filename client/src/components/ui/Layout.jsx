import { Link } from 'react-router-dom';
import { LogOut, Briefcase, Loader2, ChevronDown } from 'lucide-react';
import { useAuth } from '../../context/auth/useAuth';
import Mode from './Mode';
import { useState } from 'react';
import Dropdown, { DropdownItem } from './Dropdown';

const Layout = ({ children }) => {
	const { user, logout } = useAuth();
	const [isLoggingOut, setIsLoggingOut] = useState(false);

	const handleLogout = async () => {
		setIsLoggingOut(true);

		await new Promise((res) => setTimeout(res, 500));

		logout();
	};

	return (
		<div className="min-h-screen bg-muted">
			<div className="bg-background shadow-sm dark:border-b border-zinc-900">
				<header className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<nav className="flex justify-between items-center h-16">
						<Link to="/" className="flex items-center gap-2 text-base md:text-xl font-bold text-blue-600">
							<Briefcase className="size-6" />
							<p className='hidden md:inline'>Job Application Tracker</p>
						</Link>

						<div className="hidden md:flex items-center gap-1">
							<span className="text-primary/80 pr-4">Hello, {user.name}</span>

							<Mode />

							<button
								onClick={handleLogout}
								className="flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-primary/10 rounded-lg transition cursor-pointer"
							>
								{isLoggingOut ? (
									<Loader2 className="size-4 animate-spin text-blue-600" />
								) : (
									<LogOut className="size-4" />
								)}
								Logout
							</button>
						</div>

						<div className="md:hidden flex items-center justify-center">
							<Mode />
							<Dropdown
								trigger={
									<div className="flex justify-center items-center gap-1">
										<span className="text-primary/80 text-sm">Hello, {user.name}</span>
										<ChevronDown className="text-primary/80 size-5" />
									</div>
								}
							>
								<DropdownItem
									onClick={handleLogout}
									className="text-sm text-red-600 transition"
								>
									{isLoggingOut ? (
										<Loader2 className="size-4 animate-spin text-blue-600" />
									) : (
										<LogOut className="size-4" />
									)}
									Logout
								</DropdownItem>
							</Dropdown>
						</div>
					</nav>
				</header>
			</div>

			<main className="max-w-380 mx-auto px-4 sm:px-6 lg:px-8 py-8">{children}</main>
		</div>
	);
};

export default Layout;
