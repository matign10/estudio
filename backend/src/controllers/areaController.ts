import { Request, Response } from 'express';
import Area from '../models/Area';

// Get all areas
export const getAllAreas = async (req: Request, res: Response) => {
  try {
    const areas = await Area.find({ isActive: true }).sort({ order: 1 });
    
    res.status(200).json({
      status: 'success',
      results: areas.length,
      data: areas
    });
  } catch (error: any) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

// Get area by ID
export const getAreaById = async (req: Request, res: Response) => {
  try {
    const area = await Area.findById(req.params.id);
    
    if (!area) {
      return res.status(404).json({
        status: 'fail',
        message: 'Area not found'
      });
    }
    
    res.status(200).json({
      status: 'success',
      data: area
    });
  } catch (error: any) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

// Create new area
export const createArea = async (req: Request, res: Response) => {
  try {
    const newArea = await Area.create(req.body);
    
    res.status(201).json({
      status: 'success',
      data: newArea
    });
  } catch (error: any) {
    res.status(400).json({
      status: 'fail',
      message: error.message
    });
  }
};

// Update area
export const updateArea = async (req: Request, res: Response) => {
  try {
    const area = await Area.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );
    
    if (!area) {
      return res.status(404).json({
        status: 'fail',
        message: 'Area not found'
      });
    }
    
    res.status(200).json({
      status: 'success',
      data: area
    });
  } catch (error: any) {
    res.status(400).json({
      status: 'fail',
      message: error.message
    });
  }
};

// Delete area
export const deleteArea = async (req: Request, res: Response) => {
  try {
    const area = await Area.findByIdAndDelete(req.params.id);
    
    if (!area) {
      return res.status(404).json({
        status: 'fail',
        message: 'Area not found'
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