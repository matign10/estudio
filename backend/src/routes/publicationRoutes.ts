import express from 'express';
import * as publicationController from '../controllers/publicationController';
import { validate, publicationValidationRules } from '../middleware/validator';

const router = express.Router();

router
  .route('/')
  .get(publicationController.getAllPublications)
  .post(publicationValidationRules, validate, publicationController.createPublication);

router
  .route('/:id')
  .get(publicationController.getPublication)
  .patch(publicationValidationRules, validate, publicationController.updatePublication)
  .delete(publicationController.deletePublication);

export default router;