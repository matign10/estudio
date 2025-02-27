import express from 'express';
import * as contactController from '../controllers/contactController';
import { validate, contactValidationRules } from '../middleware/validator';

const router = express.Router();

// Public route for submitting contact form
router.post('/', contactValidationRules, validate, contactController.submitContactForm);

// Admin routes - these would typically be protected with authentication middleware
router.get('/', contactController.getAllContacts);
router.get('/:id', contactController.getContactById);
router.patch('/:id/status', contactController.updateContactStatus);
router.delete('/:id', contactController.deleteContact);

export default router;