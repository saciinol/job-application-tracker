import { Link } from 'react-router-dom';
import { Pencil } from 'lucide-react';
import LoginForm from '../components/auth/LoginForm';
import Mode from '../components/ui/Mode';

const Login = () => {

	return (
		<section className="bg-muted h-screen">
    <Mode />
			<div className="flex h-full items-center justify-center">
				<div className="border-muted bg-background flex w-full max-w-sm flex-col items-center gap-y-8 rounded-md border px-6 py-12 shadow-md mx-3">
					<div className="flex flex-col items-center gap-y-2">
						<div className="flex items-center gap-1 lg:justify-start">
							<Pencil className="size-7 text-primary" />
							<h1 className="text-2xl text-primary font-bold">Job Application Tracker</h1>
						</div>
					</div>

					<div className="flex w-full flex-col gap-8">
						<LoginForm />
					</div>

					<div className="text-primary/50 flex justify-center gap-1 text-base">
						<p>Don't have an account?</p>
						<Link to="/register" className="text-primary font-medium hover:underline">
							Sign up
						</Link>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Login;
