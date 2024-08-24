import express from 'express';
import { signupHandler, loginHandler, forgotPasswordHandler, resetPasswordHandler } from '../controllers/authController.js';
import { signupValidation, loginValidation, validate } from '../middlewares/validators.js';

const router = express.Router();

// Routes
router.post('/signup', signupValidation, validate, signupHandler);
router.post('/login', loginValidation, validate, loginHandler);
router.post('/forgot-password', forgotPasswordHandler);
router.post('/reset/:token', resetPasswordHandler);

export default router;