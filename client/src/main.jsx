import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/auth/AuthProvider.jsx';
import { ThemeProvider } from './context/theme/ThemeProvider.jsx';
import ErrorBoundary from './components/ui/ErrorBoundary.jsx';

createRoot(document.getElementById('root')).render(
	<StrictMode>
		<ErrorBoundary>
			<ThemeProvider>
				<AuthProvider>
					<BrowserRouter>
						<App />
					</BrowserRouter>
				</AuthProvider>
			</ThemeProvider>
		</ErrorBoundary>
	</StrictMode>
);
