export const validateRegister = (formData) => {
	const { firstName, lastName, email, password, confirmPassword } = formData;
	const errors = {};

	if (!firstName || !firstName.trim() || !lastName || !lastName.trim()) {
		errors.name = ['Full name is required'];
	}

	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	if (!email || !email.trim()) {
		errors.email = ['Email is required'];
	} else if (!emailRegex.test(email.trim())) {
		errors.email = ['Please enter a valid email address'];
	}

	if (!password) {
		errors.password = ['Password is required'];
	} else if (password.length < 6) {
		errors.password = ['Password must be at least 6 characters long'];
	}

	if (password !== confirmPassword) {
		errors.confirmPassword = ['Passwords do not match'];
	}

	return {
		isValid: Object.keys(errors).length === 0,
		errors,
	};
};
