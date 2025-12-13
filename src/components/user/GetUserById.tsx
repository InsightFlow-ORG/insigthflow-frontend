"use client";

import { useState } from "react";
import { userApi } from "@/lib/api/user";
// Componente para obtener un usuario por su ID
export default function GetUserById() {
  const [id, setId] = useState("");
  const [user, setUser] = useState<any>(null);

  const handleSearch = async () => {
    try {
      const data = await userApi.getUserById(id);
      setUser(data);
    } catch (err: any) {
      alert(err.response?.data?.error || "Usuario no encontrado");
    }
  };

  return (
    <div className="p-4">
      <h2 className="font-bold text-xl mb-2">Buscar Usuario por ID</h2>

      <input
        className="border p-2 mb-2 w-full"
        placeholder="Ingrese el ID del usuario"
        value={id}
        onChange={(e) => setId(e.target.value)}
      />

      <button
        onClick={handleSearch}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Buscar
      </button>

      {user && (
        <div className="mt-4 border p-3 rounded">
          <p><strong>ID:</strong> {user.id}</p>
          <p><strong>Nombre:</strong> {user.name}</p>
          <p><strong>Apellido:</strong> {user.lastName}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Username:</strong> {user.userName}</p>
          <p><strong>Fecha Nacimiento:</strong> {user.dateOfBirth}</p>
          <p><strong>Dirección:</strong> {user.address}</p>
          <p><strong>Activo:</strong> {user.isActive === 1 ? "Sí" : "No"}</p>
        </div>
      )}
    </div>
  );
}
