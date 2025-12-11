import { axiosInstance_1 } from "../axios"; 
import { CreateUserRequest } from "../../models/request/CreateUserRequest"; 

export const userApi = {
  createUser: async (data: CreateUserRequest) => {
    const response = await axiosInstance_1.post("/api/Users/register", data);
    return response.data;
  },
};





