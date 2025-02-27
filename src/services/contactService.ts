import api from '../lib/api';
import { Contact, ContactForm } from '../lib/types';

const contactService = {
  // Enviar formulario de contacto
  async submitContactForm(form: ContactForm): Promise<{ id: string }> {
    return api.post<{ id: string }>('/contact', form);
  },
  
  // Obtener todos los mensajes de contacto (para admin)
  async getAllContacts(status?: string): Promise<Contact[]> {
    const endpoint = status ? `/contact?status=${status}` : '/contact';
    return api.get<Contact[]>(endpoint);
  },
  
  // Obtener un contacto por ID (para admin)
  async getContactById(id: string): Promise<Contact> {
    return api.get<Contact>(`/contact/${id}`);
  },
  
  // Actualizar estado de un contacto (para admin)
  async updateContactStatus(id: string, status: 'pending' | 'contacted' | 'resolved'): Promise<Contact> {
    return api.patch<Contact>(`/contact/${id}/status`, { status });
  },
  
  // Eliminar un contacto (para admin)
  async deleteContact(id: string): Promise<void> {
    return api.delete(`/contact/${id}`);
  }
};

export default contactService;