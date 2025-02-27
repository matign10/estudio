import { Request, Response } from 'express';
import TeamMember from '../models/Team';

// Get all team members
export const getAllTeamMembers = async (req: Request, res: Response) => {
  try {
    const members = await TeamMember.find({ isActive: true }).sort({ order: 1 });
    res.status(200).json({
      status: 'success',
      results: members.length,
      data: members
    });
  } catch (error: any) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

// Get team member by ID
export const getTeamMemberById = async (req: Request, res: Response) => {
  try {
    const member = await TeamMember.findById(req.params.id);
    
    if (!member) {
      return res.status(404).json({
        status: 'fail',
        message: 'Team member not found'
      });
    }
    
    res.status(200).json({
      status: 'success',
      data: member
    });
  } catch (error: any) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

// Create new team member
export const createTeamMember = async (req: Request, res: Response) => {
  try {
    const newMember = await TeamMember.create(req.body);
    
    res.status(201).json({
      status: 'success',
      data: newMember
    });
  } catch (error: any) {
    res.status(400).json({
      status: 'fail',
      message: error.message
    });
  }
};

// Update team member
export const updateTeamMember = async (req: Request, res: Response) => {
  try {
    const member = await TeamMember.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );
    
    if (!member) {
      return res.status(404).json({
        status: 'fail',
        message: 'Team member not found'
      });
    }
    
    res.status(200).json({
      status: 'success',
      data: member
    });
  } catch (error: any) {
    res.status(400).json({
      status: 'fail',
      message: error.message
    });
  }
};

// Delete team member
export const deleteTeamMember = async (req: Request, res: Response) => {
  try {
    const member = await TeamMember.findByIdAndDelete(req.params.id);
    
    if (!member) {
      return res.status(404).json({
        status: 'fail',
        message: 'Team member not found'
      });
    }
    
    res.status(204).json({
      status: 'success',
      data: null
    });
  } catch (error: any) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};