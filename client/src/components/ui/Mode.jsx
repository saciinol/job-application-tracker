import { useTheme } from '../../context/theme/useTheme';
import { Moon, Sun } from 'lucide-react';

const Mode = () => {
	const { theme, toggleTheme } = useTheme();

	return (
		<button className="cursor-pointer text-primary hover:bg-primary/10 p-2 rounded-lg" onClick={toggleTheme}>
			{theme === 'light' ? <Sun /> : <Moon />}
		</button>
	);
};

export default Mode;
