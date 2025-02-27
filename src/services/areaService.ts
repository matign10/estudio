import api from '../lib/api';
import { Area } from '../lib/types';

const areaService = {
  // Obtener todas las áreas
  async getAllAreas(): Promise<Area[]> {
    return api.get<Area[]>('/areas');
  },
  
  // Obtener un área por ID
  async getAreaById(id: string): Promise<Area> {
    return api.get<Area>(`/areas/${id}`);
  },
  
  // Crear una nueva área
  async createArea(area: Area): Promise<Area> {
    return api.post<Area>('/areas', area);
  },
  
  // Actualizar un área
  async updateArea(id: string, area: Partial<Area>): Promise<Area> {
    return api.patch<Area>(`/areas/${id}`, area);
  },
  
  // Eliminar un área
  async deleteArea(id: string): Promise<void> {
    return api.delete(`/areas/${id}`);
  }
};

export default areaService;