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
      setUsers(data);
    } catch (err: any) {
      alert("Error al cargar usuarios: " + (err.response?.data || err.message));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  if (loading) return <p>Cargando...</p>;

  return (
    <div className="space-y-4">
      {users.map((u) => (
        <Card key={u.id} className="p-4">
          <p><strong>ID:</strong> {u.id}</p>
          <p><strong>Nombre:</strong> {u.name} {u.lastName}</p>
          <p><strong>Email:</strong> {u.email}</p>
          <p><strong>Usuario:</strong> {u.userName}</p>
          <p><strong>Fecha Nac:</strong> {u.dateOfBirth}</p>
          <p><strong>Dirección:</strong> {u.address}</p>
          <p><strong>Activo:</strong> {u.isActive === 1 ? "Sí" : "No"}</p>
        </Card>
      ))}
    </div>
  );
}
