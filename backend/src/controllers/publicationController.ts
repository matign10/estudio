import { Request, Response } from 'express';
import Publication from '../models/Publication';

// Get all publications
export const getAllPublications = async (req: Request, res: Response) => {
  try {
    const query: any = { isPublished: true };
    
    // Filter by tag if provided
    if (req.query.tag) {
      query.tags = { $in: [req.query.tag] };
    }
    
    // Sort by publishDate by default (newest first)
    const publications = await Publication.find(query)
      .sort({ publishDate: -1 });
    
    res.status(200).json({
      status: 'success',
      results: publications.length,
      data: publications
    });
  } catch (error: any) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

// Get publication by ID or slug
export const getPublication = async (req: Request, res: Response) => {
  try {
    const query = req.params.id.match(/^[0-9a-fA-F]{24}$/) 
      ? { _id: req.params.id }  // If ID format
      : { slug: req.params.id }; // If slug format
    
    const publication = await Publication.findOne(query);
    
    if (!publication) {
      return res.status(404).json({
        status: 'fail',
        message: 'Publication not found'
      });
    }
    
    res.status(200).json({
      status: 'success',
      data: publication
    });
  } catch (error: any) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

// Create new publication
export const createPublication = async (req: Request, res: Response) => {
  try {
    const newPublication = await Publication.create(req.body);
    
    res.status(201).json({
      status: 'success',
      data: newPublication
    });
  } catch (error: any) {
    res.status(400).json({
      status: 'fail',
      message: error.message
    });
  }
};

// Update publication
export const updatePublication = async (req: Request, res: Response) => {
  try {
    const publication = await Publication.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );
    
    if (!publication) {
      return res.status(404).json({
        status: 'fail',
        message: 'Publication not found'
      });
    }
    
    res.status(200).json({
      status: 'success',
      data: publication
    });
  } catch (error: any) {
    res.status(400).json({
      status: 'fail',
      message: error.message
    });
  }
};

// Delete publication
export const deletePublication = async (req: Request, res: Response) => {
  try {
    const publication = await Publication.findByIdAndDelete(req.params.id);
    
    if (!publication) {
      return res.status(404).json({
        status: 'fail',
        message: 'Publication not found'
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