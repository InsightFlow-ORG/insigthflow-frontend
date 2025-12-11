"use client";

import { useEffect, useState } from "react";
import { userApi } from "@/lib/api/user";
import { UserResponse } from "@/models/request/UserResponse";
import { Card } from "@/components/ui/card";

export default function UserList() {
  const [users, setUsers] = useState<UserResponse[]>([]);
  const [loading, setLoading] = useState(true);

  const loadUsers = async () => {
    try {
      const data = await userApi.getAllUsers();

      console.log("API RESPONSE USERS:", data);

      if (!Array.isArray(data)) {
        console.error("❌ La API no devolvió un arreglo:", data);
        setUsers([]);
        return;
      }

      setUsers(data);
    } catch (err: any) {
      console.error("ERROR AL CARGAR USUARIOS:", err);
      alert("Error al cargar usuarios: " + (err.response?.data || err.message));
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("¿Seguro que deseas eliminar este usuario?")) return;

    try {
      await userApi.deleteUser(id);
      alert("Usuario eliminado correctamente");
      loadUsers();
    } catch (err: any) {
      console.error(err);
      alert("Error al eliminar usuario: " + (err.response?.data || err.message));
    }
  };

  if (loading) return <p>Cargando...</p>;

  return (
    <div className="space-y-4">
      {Array.isArray(users) && users.length > 0 ? (
        users.map((u) => (
          <Card key={u.id} className="p-4 space-y-2">
            <p><strong>ID:</strong> {u.id}</p>
            <p><strong>Nombre:</strong> {u.name} {u.lastName}</p>
            <p><strong>Email:</strong> {u.email}</p>
            <p><strong>Usuario:</strong> {u.userName}</p>
            <p><strong>Fecha Nac:</strong> {u.dateOfBirth}</p>
            <p><strong>Dirección:</strong> {u.address}</p>
            <p><strong>Activo:</strong> {u.isActive === 1 ? "Sí" : "No"}</p>

            <button
              onClick={() => handleDelete(u.id)}
              className="mt-2 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            >
              Eliminar
            </button>
          </Card>
        ))
      ) : (
        <p className="text-gray-400">No hay usuarios para mostrar.</p>
      )}
    </div>
  );
}
