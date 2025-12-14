import { CreateDocumentRequest } from "@/models/request/CreateDocumentRequest";
import { axiosInstance_2 } from "../axios"; 
import { UpdateDocumentRequest } from "@/models/UpdateDocument";

export const documentApi = {

    createDocument : async (data : CreateDocumentRequest) => {
        const response = await axiosInstance_2.post("/documents", data);
        return response.data;
    },

    findDocumentById : async(id : string) => {
        const response = await axiosInstance_2.get(`/documents/${id}`);
        return response.data;
    },

    updateDocument : async(id : string, data : UpdateDocumentRequest) => {
        const response = await axiosInstance_2.patch(`/documents/${id}`, data);
    },

    deleteDocument : async(id : string) => {
        const response = await axiosInstance_2.delete(`/documents/${id}`);
        return response.data;
    }

}