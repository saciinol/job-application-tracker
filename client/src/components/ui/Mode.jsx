import { useTheme } from '../../context/theme/useTheme';
import { Moon, Sun } from 'lucide-react';

const Mode = () => {
	const { theme, toggleTheme } = useTheme();

	return (
		<label className="relative inline-flex items-center justify-center w-12 h-12 rounded-full cursor-pointer transition-colors hover:bg-primary/10 select-none">
			<input type="checkbox" className="peer sr-only" checked={theme === 'dark'} onChange={toggleTheme} />

			<Sun
				className="
      absolute w-6 h-6 text-yellow-400
      transition-all duration-300 ease-in-out
      rotate-45 scale-75 opacity-0
      peer-checked:rotate-0
      peer-checked:scale-100
      peer-checked:opacity-100"
			/>

			<Moon
				className="
      absolute w-6 h-6 text-blue-400
      transition-all duration-300 ease-in-out
      rotate-0 scale-100 opacity-100
      peer-checked:-rotate-45
      peer-checked:scale-75
      peer-checked:opacity-0"
			/>
		</label>
	);
};

export default Mode;
