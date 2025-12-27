import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '../../context/auth/useAuth';
import { validateRegister } from '../../utils/validation';
import Input from '../ui/Input';
import Label from '../ui/Label';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import Button from '../ui/Button';

const RegisterForm = () => {
	const { register } = useAuth();
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [formData, setFormData] = useState({
		email: '',
		password: '',
		confirmPassword: '',
	});
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const [validationErrors, setValidationErrors] = useState({});
	const [isSubmitting, setIsSubmitting] = useState(false);

	const navigate = useNavigate();

	const handleChange = (e) => {
		const { name, value } = e.target;

		if (validationErrors[name]) {
			setValidationErrors((prev) => ({
				...prev,
				[name]: null,
			}));
		}

		if ((name === 'firstName' || name === 'lastName') && validationErrors.name) {
			setValidationErrors((prev) => ({
				...prev,
				name: null,
			}));
		}

		if (name === 'firstName') {
			setFirstName(value);
			return;
		}

		if (name === 'lastName') {
			setLastName(value);
			return;
		}

		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		const validation = validateRegister({
			...formData,
			firstName,
			lastName,
		});

		if (!validation.isValid) {
			setValidationErrors(validation.errors);
			return;
		}

		const fullName = `${firstName} ${lastName}`.trim();

		setValidationErrors({});

		setIsSubmitting(true);

		await new Promise((res) => setTimeout(res, 500));

		try {
			await register({
				name: fullName,
				email: formData.email.trim(),
				password: formData.password,
			});
			navigate('/');
		} catch (error) {
			console.error('Failed to register', error);
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<form onSubmit={handleSubmit} className="flex flex-col">
			<div className="flex flex-col">
				<div className="flex gap-2">
					<div className="relative">
						<Input
							id="firstName"
							type="text"
							name="firstName"
							value={firstName}
							onChange={handleChange}
							className={`${validationErrors.name ? 'border-red-600 focus:border-red-600' : ''}`}
							placeholder=""
							disabled={isSubmitting}
						/>

						<Label htmlFor="firstName">First Name</Label>
					</div>

					<div className="relative">
						<Input
							id="lastName"
							type="text"
							name="lastName"
							value={lastName}
							onChange={handleChange}
							className={`${validationErrors.name ? 'border-red-600 focus:border-red-600' : ''}`}
							placeholder=""
							disabled={isSubmitting}
						/>

						<Label htmlFor="lastName">Last Name</Label>
					</div>
				</div>

				<p className={`ml-1 text-red-600 text-xs ${validationErrors.name ? 'opacity-100' : 'opacity-0'}`}>
					{validationErrors.name ? validationErrors.name : '&nbsp;'}
				</p>
			</div>

			<div className="flex flex-col relative">
				<Input
					id="email"
					type="email"
					name="email"
					value={formData.email}
					onChange={handleChange}
					className={`${validationErrors.email ? 'border-red-600 focus:border-red-600' : ''}`}
					placeholder=""
					disabled={isSubmitting}
				/>

				<Label htmlFor="email">Email</Label>

				<p className={`ml-1 text-red-600 text-xs ${validationErrors.email ? 'opacity-100' : 'opacity-0'}`}>
					{validationErrors.email ? validationErrors.email : '&nbsp;'}
				</p>
			</div>

			<div className="flex flex-col">
				<div className="flex items-center justify-end relative">
					<Input
						id="password"
						type={showPassword ? 'text' : 'password'}
						name="password"
						value={formData.password}
						onChange={handleChange}
						className={`${validationErrors.password ? 'border-red-600 focus:border-red-600' : ''}`}
						placeholder=""
						disabled={isSubmitting}
					/>

					<Label htmlFor="password">Password</Label>

					<div
						onClick={() => setShowPassword(!showPassword)}
						className="absolute mr-2 cursor-pointer text-primary hover:text-blue-600 rounded-full duration p-2 select-none"
					>
						{showPassword ? <Eye className="size-4" /> : <EyeOff className="size-4" />}
					</div>
				</div>

				<p className={`ml-1 text-red-600 text-xs ${validationErrors.password ? 'opacity-100' : 'opacity-0'}`}>
					{validationErrors.password ? validationErrors.password : '&nbsp;'}
				</p>
			</div>

			<div className="flex flex-col">
				<div className="flex items-center justify-end relative">
					<Input
						id="confirmPassword"
						type={showConfirmPassword ? 'text' : 'password'}
						name="confirmPassword"
						value={formData.confirmPassword}
						onChange={handleChange}
						className={`${validationErrors.confirmPassword ? 'border-red-600 focus:border-red-600' : ''}`}
						placeholder=""
						disabled={isSubmitting}
					/>

					<Label htmlFor="confirmPassword">Confirm Password</Label>

					<div
						onClick={() => setShowConfirmPassword(!showConfirmPassword)}
						className="absolute mr-2 cursor-pointer text-primary hover:text-blue-600 rounded-full duration p-2 select-none"
					>
						{showConfirmPassword ? <Eye className="size-4" /> : <EyeOff className="size-4" />}
					</div>
				</div>

				<p className={`ml-1 text-red-600 text-xs ${validationErrors.confirmPassword ? 'opacity-100' : 'opacity-0'}`}>
					{validationErrors.confirmPassword ? validationErrors.confirmPassword : '&nbsp;'}
				</p>
			</div>

			<div className="flex flex-col gap-2 mt-4">
				<Button type="submit" disabled={isSubmitting} className="w-full">
					{isSubmitting ? (
						<div className="flex gap-2">
							<Loader2 className="animate-spin text-blue-600" />
							<p>Signing up...</p>
						</div>
					) : (
						'Sign up'
					)}
				</Button>
			</div>
		</form>
	);
};

export default RegisterForm;
