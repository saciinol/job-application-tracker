const Button = ({ children, variant = 'default', className = '', ...props }) => {
	const base =
		'inline-flex items-center justify-center whitespace-nowrap rounded-md text-base font-medium transition-colors focus:outline-none disabled:pointer-events-none disabled:opacity-50 cursor-pointer';

	const styles = {
		default: `${base} bg-primary text-background h-10 px-4 py-2 hover:bg-primary/80 duration-100`,
		transparent: `${base} border bg-transparent text-primary h-10 px-4 py-2 hover:bg-primary hover:text-background duration-100`,
		blue: `${base} bg-blue-600 text-background px-4 py-2 hover:bg-blue-700`,
		red: `${base} bg-red-600 text-background px-4 py-2 hover:bg-red-700`,
		icon: `${base} h-10 w-10`,
	};

	return (
		<button className={`${styles[variant]} ${className}`} {...props}>
			{children}
		</button>
	);
};

export default Button;
