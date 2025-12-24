import express from 'express';
import dotenv from 'dotenv';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';

import { validateEnv } from './src/utils/validateEnv.js';
import corsOptions from './src/config/cors.js';
import authRoutes from './src/routes/authRoutes.js';
import applicationsRoutes from './src/routes/applicationsRoutes.js';
import analyticsRoutes from './src/routes/analyticsRoutes.js';
import { errorHandler, notFoundHandler } from './src/middleware/errorHandler.js';

dotenv.config();
validateEnv(); // validate env before starting server

const app = express();

app.use(helmet());
app.use(cors(corsOptions));
app.use(morgan('dev'));
app.use(express.json({ limit: '10mb' }));

app.use('/api/auth', authRoutes);
app.use('/api/applications', applicationsRoutes);
app.use('/api/analytics', analyticsRoutes);

app.get('/', (req, res) => {
	res.json({ message: 'Job Application Tracker API', version: '1.0.0' });
});

app.use(notFoundHandler);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));
