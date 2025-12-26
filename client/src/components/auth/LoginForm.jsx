import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

import { useAuth } from '../../context/auth/useAuth';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Label from '../ui/Label';

const LoginForm = () => {
	const { login } = useAuth();
	const [formData, setFormData] = useState({
		email: '',
		password: '',
	});
	const [showPassword, setShowPassword] = useState(false);
	const [validationErrors, setValidationErrors] = useState('');
	const [isSubmitting, setIsSubmitting] = useState(false);

	const handleChange = (e) => {
		const { name, value } = e.target;

		setValidationErrors('');

		setFormData({
			...formData,
			[name]: value,
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setIsSubmitting(true);

		try {
			await login({ email: formData.email.trim(), password: formData.password });
			// eslint-disable-next-line no-unused-vars
		} catch (error) {
			setValidationErrors('Invalid email or password.');
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<form onSubmit={handleSubmit} className="flex flex-col gap-4">
			<div className="flex flex-col gap-2 relative">
				<Input
					id="email"
					type="email"
					name="email"
					value={formData.email}
					onChange={handleChange}
					className={`${validationErrors ? 'border-red-600 focus:border-red-600' : ''}`}
					placeholder=""
					disabled={isSubmitting}
					required
				/>

				<Label htmlFor="email">Email</Label>
			</div>

			<div className="flex flex-col">
				<div className="flex items-center justify-end relative">
					<Input
						id="password"
						type={showPassword ? 'text' : 'password'}
						name="password"
						value={formData.password}
						onChange={handleChange}
						className={`${validationErrors ? 'border-red-600 focus:border-red-600' : ''}`}
						placeholder=""
						disabled={isSubmitting}
						required
					/>

					<Label htmlFor="password">Password</Label>

					<div
						onClick={() => setShowPassword(!showPassword)}
						className="absolute mr-2 cursor-pointer text-primary hover:text-blue-600 rounded-full duration-100 p-2 select-none"
					>
						{showPassword ? <Eye className="size-4" /> : <EyeOff className="size-4" />}
					</div>
				</div>

				<p className={`ml-1 text-red-600 text-sm ${validationErrors ? 'opacity-100' : 'opacity-0'}`}>
					{validationErrors ? validationErrors : '&nbsp;'}
				</p>
			</div>

			<Button type="submit" disabled={isSubmitting} className="w-full">
				Login
			</Button>
		</form>
	);
};

export default LoginForm;
