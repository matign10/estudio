/**
 * Tipos comunes para la aplicación
 */

// TeamMember
export interface TeamMember {
  _id?: string;
  name: string;
  position: string;
  bio: string;
  imageUrl: string;
  socialLinks?: {
    linkedin?: string;
    twitter?: string;
    email?: string;
  };
  order?: number;
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

// Publication
export interface Publication {
  _id?: string;
  title: string;
  description: string;
  content: string;
  imageUrl: string;
  authors: string[];
  tags?: string[];
  publishDate?: string;
  isPublished?: boolean;
  slug: string;
  createdAt?: string;
  updatedAt?: string;
}

// Area
export interface Area {
  _id?: string;
  title: string;
  description: string;
  icon: string;
  order?: number;
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

// Contact
export interface Contact {
  _id?: string;
  name: string;
  email: string;
  phone?: string;
  message: string;
  status?: 'pending' | 'contacted' | 'resolved';
  createdAt?: string;
  updatedAt?: string;
}

// ContactForm
export interface ContactForm {
  name: string;
  email: string;
  phone?: string;
  message: string;
}