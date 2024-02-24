import { Router } from 'express';
import { loginController, registerController, getUserController } from 'src/controllers/user';
import { authCheck } from 'src/middlewares/auth';
import { validationRequest } from 'src/middlewares/validationRequest';
import { loginSchema, registerSchema } from 'src/schema';

export const userRoutes = Router();

// fetch user details endpoint
userRoutes.get('/', authCheck, getUserController);

// user registration endpoint
userRoutes.post('/register', registerSchema, validationRequest, registerController);

// user login endpoint
userRoutes.post('/login', loginSchema, validationRequest, loginController);
