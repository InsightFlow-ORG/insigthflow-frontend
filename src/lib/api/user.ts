import { axiosInstance_1 } from "../axios"; 
import { CreateUserRequest } from "../../models/request/CreateUserRequest"; 
import { LoginRequest } from "@/models/request/loginRequest";

export const userApi = {
  createUser: async (data: CreateUserRequest) => {
    const response = await axiosInstance_1.post("/api/Users/register", data);
    return response.data;
  },

  login: async (data: LoginRequest) => {
    const response = await axiosInstance_1.post("/api/Auth/login", data);
    return response.data;  
  },

  getAllUsers: async () => {
    const token = localStorage.getItem("token");

    const response = await axiosInstance_1.get("/api/Users", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  },

  getUserById: async (id: string) => {
  const token = localStorage.getItem("token");

  const response = await axiosInstance_1.get(`/api/Users/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
  },

};





