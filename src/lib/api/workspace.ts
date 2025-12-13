import { UpdateWorkspaceRequest } from "@/models/request/UpdateWorkspaceRequest";
import { CreateWorkspaceRequest } from "../../models/request/CreateWorkspaceRequest";
import axiosInstance from "../axios";

// Funciones para interactuar con la API de workspaces
export const workspaceApi = {

  // Obtener todos los workspaces
  getWorkspaces: async () => {
    const response = await axiosInstance.get("/workspace");
    return response.data;
  },

  // Obtener un workspace por su ID
  getWorkspaceById: async (workspaceId: string) => {
    const response = await axiosInstance.get(`/workspace/workspace/${workspaceId}`);
    return response.data;
  },

  // Obtener workspaces por ID de usuario
  getWorkspacesByUserId: async (userId: string) => {
    const response = await axiosInstance.get(`/workspace/${userId}`);
    console.log(response.data);
    return response.data;
  },

  // Crear un nuevo workspace
  createWorkspace: async (data: CreateWorkspaceRequest) => {
    const response = await axiosInstance.post("/workspace", data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  // Actualizar un workspace existente
  updateWorkspace: async (id: string, data: UpdateWorkspaceRequest) => {
    const response = await axiosInstance.patch(`/workspace/${id}`, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  // Eliminar un workspace por su ID
  deleteWorkspace: async (workspaceId: string) => {
    const response = await axiosInstance.delete(`/workspace/${workspaceId}`);
    return response.data;
  } 
  
}

