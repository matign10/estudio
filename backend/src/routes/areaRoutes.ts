import express from 'express';
import * as areaController from '../controllers/areaController';
import { validate, areaValidationRules } from '../middleware/validator';

const router = express.Router();

router
  .route('/')
  .get(areaController.getAllAreas)
  .post(areaValidationRules, validate, areaController.createArea);

router
  .route('/:id')
  .get(areaController.getAreaById)
  .patch(areaValidationRules, validate, areaController.updateArea)
  .delete(areaController.deleteArea);

export default router;