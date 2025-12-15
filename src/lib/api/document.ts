import { CreateDocumentRequest } from "@/models/request/CreateDocumentRequest";
import { axiosInstance_2 } from "../axios"; 
import { UpdateDocumentRequest } from "@/models/request/UpdateDocumentRequest";

export const documentApi = {

    createDocument : async (data : CreateDocumentRequest) => {
        console.log(data);
        const response = await axiosInstance_2.post("/documents", data);
        return response.data;
    },

    findDocumentById : async(id : string) => {
        const response = await axiosInstance_2.get(`/documents/${id}`);
        return response.data;
    },

    updateDocument : async(id : string, data : UpdateDocumentRequest) => {
        console.log(data);
        const response = await axiosInstance_2.put(`/documents/${id}`, data);
    },

    deleteDocument : async(id : string) => {
        const response = await axiosInstance_2.delete(`/documents/${id}`);
        return response.data;
    }

}