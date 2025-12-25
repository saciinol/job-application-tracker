import { useTheme } from '../../context/theme/useTheme';
import { Moon, Sun } from 'lucide-react';

const Mode = () => {
	const { theme, toggleTheme } = useTheme();

	return (
		<button className="cursor-pointer absolute top-2 right-2 text-primary" onClick={toggleTheme}>
			{theme === 'light' ? <Sun /> : <Moon />}
		</button>
	);
};

export default Mode;
