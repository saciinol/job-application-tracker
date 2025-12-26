import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import * as userModel from '../models/userModel.js';
import { AppError } from '../utils/AppError.js';

export const register = async (req, res, next) => {
	try {
		const { email, password, name } = req.body || {};

		const existingEmail = await userModel.findByEmail(email);
		if (existingEmail) throw new AppError('Email already in use', 400);

		const salt = await bcrypt.genSalt(10);
		const hashedPW = await bcrypt.hash(password, salt);

		const user = await userModel.createUser(email, hashedPW, name);
		const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '7d' });

		res.status(201).json({
			token,
			user,
		});
	} catch (error) {
		next(error);
	}
};

export const login = async (req, res, next) => {
	try {
		const { email, password } = req.body || {};

		const user = await userModel.findByEmail(email);
		if (!user) throw new AppError('Invalid email or password', 401);

		const isPWValid = await bcrypt.compare(password, user.password);
		if (!isPWValid) throw new AppError('Invalid email or password', 401);

		const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '7d' });

		res.json({
			token,
			user: {
				id: user.id,
				email: user.email,
				name: user.name,
			},
		});
	} catch (error) {
		next(error);
	}
};

export const verify = async (req, res, next) => {
	try {
		const id = req.user.id;
		const user = await userModel.findById(id);
		if (!user) throw new AppError('User not found', 404);

		res.json({
			user: {
				id: user.id,
				email: user.email,
				name: user.name,
			},
		});
	} catch (error) {
		next(error);
	}
};
