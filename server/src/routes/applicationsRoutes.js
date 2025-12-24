import express from 'express';
import { createApplication, deleteApplication, getApplications, updateApplication } from '../controllers/applicationsController.js';
import { authenticateToken } from '../middleware/auth.js';
import { createApplicationValidator, updateApplicationValidator } from '../validators/applicationValidator.js';
import { validate } from '../middleware/validate.js';

const router = express.Router();

router.get('/', authenticateToken, getApplications);
router.post('/', authenticateToken, createApplicationValidator, validate, createApplication);
router.put('/:id', authenticateToken, updateApplicationValidator, validate, updateApplication);
router.delete('/:id', authenticateToken, deleteApplication);

export default router;
