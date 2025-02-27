import mongoose, { Schema, Document } from 'mongoose';

export interface ITeamMember extends Document {
  name: string;
  position: string;
  bio: string;
  imageUrl: string;
  socialLinks?: {
    linkedin?: string;
    twitter?: string;
    email?: string;
  };
  order: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const TeamMemberSchema: Schema = new Schema({
  name: { type: String, required: true },
  position: { type: String, required: true },
  bio: { type: String, required: true },
  imageUrl: { type: String, required: true },
  socialLinks: {
    linkedin: { type: String },
    twitter: { type: String },
    email: { type: String }
  },
  order: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

export default mongoose.model<ITeamMember>('TeamMember', TeamMemberSchema);