import { check, validationResult } from 'express-validator';

export const signupValidation = [
  check('firstName', 'Username is required').not().isEmpty(),
  check('lastName', 'Username is required').not().isEmpty(),
  check('phone', 'Phone number is required').not().isEmpty(),
  check('phone', 'Please include a valid phone number').isLength({ min: 10 }),
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Password must be 6 or more characters').isLength({ min: 6 })
];

export const loginValidation = [
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Password is required').exists()
];

export const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};