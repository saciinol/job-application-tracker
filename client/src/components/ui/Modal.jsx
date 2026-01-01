import { X } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

const Modal = ({ open, onClose, children }) => {
	const dialogRef = useRef(null);

	// close on ESC
	useEffect(() => {
		if (!open) return;

		const handleKey = (e) => {
			if (e.key === 'Escape') onClose();
		};

		document.addEventListener('keydown', handleKey);
		return () => document.removeEventListener('keydown', handleKey);
	}, [open, onClose]);

	// lock scroll
	useEffect(() => {
		if (!open) return;

		document.body.style.overflow = 'hidden';
		return () => {
			document.body.style.overflow = '';
		};
	}, [open]);

	// focus modal on open
	useEffect(() => {
		if (open) dialogRef.current?.focus();
	}, [open]);

	if (!open) return null;

	return createPortal(
		<div
			className="
        fixed inset-0 z-50
        bg-black/50
        flex items-center justify-center
      "
			onClick={onClose}
		>
			<div
				ref={dialogRef}
				role="dialog"
				aria-modal="true"
				tabIndex={-1}
				onClick={(e) => e.stopPropagation()}
				className="
          w-full max-w-lg
          rounded-xl
          bg-muted
          p-6
          shadow-xl
          focus:outline-none relative
        "
			>
				<button
					onClick={onClose}
					aria-label="Close modal"
					className="
            absolute top-4 right-4
            rounded-full p-1
            text-gray-500 dark:text-gray-400
            hover:bg-primary/10
            focus:outline-none cursor-pointer
          "
				>
					<X className="size-5" />
				</button>

				{children}
			</div>
		</div>,
		document.body
	);
};

export default Modal;
