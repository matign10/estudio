import api from '../lib/api';
import { Publication } from '../lib/types';

const publicationService = {
  // Obtener todas las publicaciones
  async getAllPublications(tag?: string): Promise<Publication[]> {
    const endpoint = tag ? `/publications?tag=${tag}` : '/publications';
    return api.get<Publication[]>(endpoint);
  },
  
  // Obtener una publicación por ID o slug
  async getPublication(idOrSlug: string): Promise<Publication> {
    return api.get<Publication>(`/publications/${idOrSlug}`);
  },
  
  // Crear una nueva publicación
  async createPublication(publication: Publication): Promise<Publication> {
    return api.post<Publication>('/publications', publication);
  },
  
  // Actualizar una publicación
  async updatePublication(id: string, publication: Partial<Publication>): Promise<Publication> {
    return api.patch<Publication>(`/publications/${id}`, publication);
  },
  
  // Eliminar una publicación
  async deletePublication(id: string): Promise<void> {
    return api.delete(`/publications/${id}`);
  }
};

export default publicationService;