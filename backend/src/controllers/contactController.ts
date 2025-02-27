import { Request, Response } from 'express';
import Contact from '../models/Contact';

// Submit a contact form
export const submitContactForm = async (req: Request, res: Response) => {
  try {
    const newContact = await Contact.create({
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      message: req.body.message,
      status: 'pending'
    });
    
    res.status(201).json({
      status: 'success',
      message: 'Contact form submitted successfully',
      data: {
        id: newContact._id
      }
    });
  } catch (error: any) {
    res.status(400).json({
      status: 'fail',
      message: error.message
    });
  }
};

// Get all contact submissions (for admin)
export const getAllContacts = async (req: Request, res: Response) => {
  try {
    const { status } = req.query;
    
    // Build query based on status filter
    const query: any = {};
    if (status && ['pending', 'contacted', 'resolved'].includes(status as string)) {
      query.status = status;
    }
    
    // Sort by created date (newest first)
    const contacts = await Contact.find(query).sort({ createdAt: -1 });
    
    res.status(200).json({
      status: 'success',
      results: contacts.length,
      data: contacts
    });
  } catch (error: any) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

// Get contact by ID
export const getContactById = async (req: Request, res: Response) => {
  try {
    const contact = await Contact.findById(req.params.id);
    
    if (!contact) {
      return res.status(404).json({
        status: 'fail',
        message: 'Contact not found'
      });
    }
    
    res.status(200).json({
      status: 'success',
      data: contact
    });
  } catch (error: any) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

// Update contact status
export const updateContactStatus = async (req: Request, res: Response) => {
  try {
    // Only allow status update
    if (!req.body.status || !['pending', 'contacted', 'resolved'].includes(req.body.status)) {
      return res.status(400).json({
        status: 'fail',
        message: 'Invalid status value'
      });
    }
    
    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      {
        new: true,
        runValidators: true
      }
    );
    
    if (!contact) {
      return res.status(404).json({
        status: 'fail',
        message: 'Contact not found'
      });
    }
    
    res.status(200).json({
      status: 'success',
      data: contact
    });
  } catch (error: any) {
    res.status(400).json({
      status: 'fail',
      message: error.message
    });
  }
};

// Delete contact
export const deleteContact = async (req: Request, res: Response) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);
    
    if (!contact) {
      return res.status(404).json({
        status: 'fail',
        message: 'Contact not found'
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