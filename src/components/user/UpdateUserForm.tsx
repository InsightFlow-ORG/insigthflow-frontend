"use client";

import { useState } from "react";
import { userApi } from "@/lib/api/user";
import { UpdateUserRequest } from "@/models/request/UpdateUserRequest";

export default function UpdateUserForm() {
  const [id, setId] = useState("");
  const [userLoaded, setUserLoaded] = useState(false);

  const [formData, setFormData] = useState<UpdateUserRequest>({
    name: "",
    lastName: "",
    userName: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  
  const handleLoadUser = async () => {
    try {
      setMessage(null);

      const user = await userApi.getUserById(id);

      setFormData({
        name: user.name,
        lastName: user.lastName,
        userName: user.userName,
      });

      setUserLoaded(true);
    } catch (error: any) {
      setMessage("Usuario no encontrado.");
    }
  };

 
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await userApi.updateUser(id, formData);
      setMessage("Usuario actualizado correctamente.");
    } catch (error) {
      setMessage("Error al actualizar el usuario.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Editar Usuario</h1>

      {}
      <div className="mb-4">
        <label className="block font-medium mb-1">ID del Usuario</label>
        <input
          type="text"
          className="border w-full p-2 rounded"
          value={id}
          onChange={(e) => setId(e.target.value)}
        />
        <button
          onClick={handleLoadUser}
          className="mt-2 bg-blue-600 text-white px-4 py-2 rounded"
        >
          Cargar Usuario
        </button>
      </div>

      {message && (
        <div className="p-3 bg-green-600 text-white rounded mb-3 text-center">
          {message}
        </div>
      )}

      {}
      {userLoaded && (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-medium mb-1">Nombre</label>
            <input
              type="text"
              name="name"
              className="border w-full p-2 rounded"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Apellido</label>
            <input
              type="text"
              name="lastName"
              className="border w-full p-2 rounded"
              value={formData.lastName}
              onChange={(e) =>
                setFormData({ ...formData, lastName: e.target.value })
              }
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Nombre de Usuario</label>
            <input
              type="text"
              name="userName"
              className="border w-full p-2 rounded"
              value={formData.userName}
              onChange={(e) =>
                setFormData({ ...formData, userName: e.target.value })
              }
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 text-white py-2 rounded"
          >
            {loading ? "Guardando..." : "Guardar Cambios"}
          </button>
        </form>
      )}
    </div>
  );
}
