import { CreateWorkspaceRequest } from "../../models/request/CreateWorkspaceRequest";
import axiosInstance from "../axios";

export const workspaceApi = {
  getWorkspaces: async () => {
    const response = await axiosInstance.get("/workspace");
    return response.data;
  },

  createWorkspace: async (data: CreateWorkspaceRequest) => {
    const response = await axiosInstance.post("/workspace", data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },
}

