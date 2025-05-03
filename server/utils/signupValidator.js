import { body } from 'express-validator';

export const signupValidator = [
  body('email')
    .isEmail()
    .withMessage('Email must be valid'),
  body('password')
    .trim()
    .isLength({ min: 7, max: 20 })
    .withMessage('Password must be between 7 and 20 characters'),
  body('firstName')
    .notEmpty()
    .withMessage('First name is required'),
  body('lastName')
    .notEmpty()
    .withMessage('Last name is required'),
];
