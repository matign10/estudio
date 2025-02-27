/**
 * API client para comunicarse con el backend
 */

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Tipos de respuesta
interface ApiResponse<T> {
  status: string;
  data: T;
  results?: number;
  message?: string;
}

// Función para manejar errores
const handleError = async (response: Response) => {
  const data = await response.json();
  throw new Error(data.message || 'Error en la solicitud');
};

// Funciones genéricas para peticiones HTTP
const api = {
  // GET request
  async get<T>(endpoint: string): Promise<T> {
    const response = await fetch(`${API_URL}${endpoint}`);
    
    if (!response.ok) {
      await handleError(response);
    }
    
    const { data }: ApiResponse<T> = await response.json();
    return data;
  },
  
  // POST request
  async post<T>(endpoint: string, body: any): Promise<T> {
    const response = await fetch(`${API_URL}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    
    if (!response.ok) {
      await handleError(response);
    }
    
    const { data }: ApiResponse<T> = await response.json();
    return data;
  },
  
  // PATCH request
  async patch<T>(endpoint: string, body: any): Promise<T> {
    const response = await fetch(`${API_URL}${endpoint}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    
    if (!response.ok) {
      await handleError(response);
    }
    
    const { data }: ApiResponse<T> = await response.json();
    return data;
  },
  
  // DELETE request
  async delete(endpoint: string): Promise<void> {
    const response = await fetch(`${API_URL}${endpoint}`, {
      method: 'DELETE',
    });
    
    if (!response.ok) {
      await handleError(response);
    }
  },
};

export default api;