const Input = ({ type, name, value, onChange, className = '', ...props }) => {
	return (
		<input
			type={type}
			name={name}
			value={value}
			onChange={onChange}
			className={`flex w-full border-primary/20 text-primary bg-transparent px-3 pt-4 pb-2 text-base disabled:cursor-not-allowed disabled:opacity-50 peer focus:border-blue-600 rounded-md border focus:outline-none h-auto ${className}`}
			{...props}
		/>
	);
};

export default Input;
