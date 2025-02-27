import { Request, Response, NextFunction } from 'express';
import { body, validationResult } from 'express-validator';

// Validation middleware
export const validate = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: 'fail',
      message: 'Validation error',
      errors: errors.array()
    });
  }
  next();
};

// Contact form validation rules
export const contactValidationRules = [
  body('name').trim().not().isEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Please provide a valid email'),
  body('message').trim().not().isEmpty().withMessage('Message is required')
];

// Team member validation rules
export const teamMemberValidationRules = [
  body('name').trim().not().isEmpty().withMessage('Name is required'),
  body('position').trim().not().isEmpty().withMessage('Position is required'),
  body('bio').trim().not().isEmpty().withMessage('Bio is required'),
  body('imageUrl').trim().not().isEmpty().withMessage('Image URL is required')
];

// Publication validation rules
export const publicationValidationRules = [
  body('title').trim().not().isEmpty().withMessage('Title is required'),
  body('description').trim().not().isEmpty().withMessage('Description is required'),
  body('content').trim().not().isEmpty().withMessage('Content is required'),
  body('imageUrl').trim().not().isEmpty().withMessage('Image URL is required'),
  body('authors').isArray({ min: 1 }).withMessage('At least one author is required'),
  body('slug').optional().matches(/^[a-z0-9-]+$/).withMessage('Slug must contain only lowercase letters, numbers, and hyphens')
];

// Area validation rules
export const areaValidationRules = [
  body('title').trim().not().isEmpty().withMessage('Title is required'),
  body('description').trim().not().isEmpty().withMessage('Description is required'),
  body('icon').trim().not().isEmpty().withMessage('Icon is required')
];