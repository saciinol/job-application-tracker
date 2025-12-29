import { useEffect, useRef, useState } from 'react';

const Dropdown = ({ trigger, children, className = '' }) => {
	const [open, setOpen] = useState(false);
	const menuRef = useRef(null);

	useEffect(() => {
		const handleClickOutside = (e) => {
			if (menuRef.current && !menuRef.current.contains(e.target)) {
				setOpen(false);
			}
		};
		document.addEventListener('mousedown', handleClickOutside);
		return () => document.removeEventListener('mousedown', handleClickOutside);
	}, []);

	return (
		<div className="relative inline-block" ref={menuRef}>
			<div onClick={() => setOpen((o) => !o)} className="cursor-pointer select-none">
				{trigger}
			</div>

			{open && (
				<div
					className={`absolute right-0 mt-1 min-w-32 rounded-md bg-muted shadow-md border border-primary/10 ${className}`}
					onClick={() => setOpen(false)}
				>
					{children}
				</div>
			)}
		</div>
	);
};

export const DropdownItem = ({ children, onClick, className = '' }) => {
	return (
		<button
			className={`w-full flex items-center gap-2 text-left px-2.5 py-1.5 rounded-md hover:bg-gray-200 dark:hover:bg-[#1b2027] duration-100 cursor-pointer ${className}`}
			onClick={onClick}
		>
			{children}
		</button>
	);
};

export default Dropdown;
