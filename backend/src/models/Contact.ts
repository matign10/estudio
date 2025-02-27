import mongoose, { Schema, Document } from 'mongoose';

export interface IContact extends Document {
  name: string;
  email: string;
  phone?: string;
  message: string;
  status: 'pending' | 'contacted' | 'resolved';
  createdAt: Date;
  updatedAt: Date;
}

const ContactSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String },
  message: { type: String, required: true },
  status: { 
    type: String, 
    enum: ['pending', 'contacted', 'resolved'],
    default: 'pending'
  }
}, { timestamps: true });

export default mongoose.model<IContact>('Contact', ContactSchema);