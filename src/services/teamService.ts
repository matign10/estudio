import api from '../lib/api';
import { TeamMember } from '../lib/types';

const teamService = {
  // Obtener todos los miembros del equipo
  async getAllTeamMembers(): Promise<TeamMember[]> {
    return api.get<TeamMember[]>('/team');
  },
  
  // Obtener un miembro del equipo por ID
  async getTeamMemberById(id: string): Promise<TeamMember> {
    return api.get<TeamMember>(`/team/${id}`);
  },
  
  // Crear un nuevo miembro del equipo
  async createTeamMember(teamMember: TeamMember): Promise<TeamMember> {
    return api.post<TeamMember>('/team', teamMember);
  },
  
  // Actualizar un miembro del equipo
  async updateTeamMember(id: string, teamMember: Partial<TeamMember>): Promise<TeamMember> {
    return api.patch<TeamMember>(`/team/${id}`, teamMember);
  },
  
  // Eliminar un miembro del equipo
  async deleteTeamMember(id: string): Promise<void> {
    return api.delete(`/team/${id}`);
  }
};

export default teamService;