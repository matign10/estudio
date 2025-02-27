import express from 'express';
import * as teamController from '../controllers/teamController';
import { validate, teamMemberValidationRules } from '../middleware/validator';

const router = express.Router();

router
  .route('/')
  .get(teamController.getAllTeamMembers)
  .post(teamMemberValidationRules, validate, teamController.createTeamMember);

router
  .route('/:id')
  .get(teamController.getTeamMemberById)
  .patch(teamMemberValidationRules, validate, teamController.updateTeamMember)
  .delete(teamController.deleteTeamMember);

export default router;