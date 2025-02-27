import mongoose, { Schema, Document } from 'mongoose';

export interface IPublication extends Document {
  title: string;
  description: string;
  content: string;
  imageUrl: string;
  authors: string[];
  tags: string[];
  publishDate: Date;
  isPublished: boolean;
  slug: string;
  createdAt: Date;
  updatedAt: Date;
}

const PublicationSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  content: { type: String, required: true },
  imageUrl: { type: String, required: true },
  authors: [{ type: String, required: true }],
  tags: [{ type: String }],
  publishDate: { type: Date, default: Date.now },
  isPublished: { type: Boolean, default: true },
  slug: { type: String, required: true, unique: true }
}, { timestamps: true });

// Create slug from title before saving
PublicationSchema.pre('save', function(next) {
  if (this.isModified('title')) {
    const doc = this as any;
    doc.slug = doc.title
      .toLowerCase()
      .replace(/[^\w ]+/g, '')
      .replace(/ +/g, '-');
  }
  next();
});

export default mongoose.model<IPublication>('Publication', PublicationSchema);