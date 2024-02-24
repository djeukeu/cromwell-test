import { body } from 'express-validator';

// Login validation schema
export const loginSchema = [body('email').isEmail(), body('password').isLength({ min: 8 })];

// Register validation schema
export const registerSchema = [
  body('fullname').isString(),
  body('email').isEmail(),
  body('address').isString(),
  body('password').isLength({ min: 8 }),
];
