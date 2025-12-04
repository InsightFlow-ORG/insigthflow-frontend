"use client";

import { useEffect, useState } from "react";
import { Crown, Edit, User, Loader2 } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "../ui/card";
import { workspaceApi } from "@/lib/api/workspace";

// Tipos según los datos del backend
interface UserData {
  id: string;
  name: string;
  image: string;
  role: string;
}

// Props
interface UserListProps {
  userId?: string; // si filtras por workspace o usuario actual
}

export default function UserList({ userId }: UserListProps) {
  const [users, setUsers] = useState<UserData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadUsers = async () => {
    try {
      setLoading(true);
      const data = await workspaceApi.getWorkspacesByUserId(userId || "");
      console.log(data);
      setUsers(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al cargar usuarios");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userId) loadUsers();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  const getRoleBadgeColor = (role: string) => {
    switch (role.toLowerCase()) {
      case "admin":
        return "bg-purple-100 text-purple-800 border-purple-300";
      case "editor":
        return "bg-blue-100 text-blue-800 border-blue-300";
      case "viewer":
        return "bg-gray-100 text-gray-800 border-gray-300";
      default:
        return "bg-gray-100 text-gray-800 border-gray-300";
    }
  };

  const getRoleIcon = (role: string) => {
    if (role.toLowerCase() === "admin") return <Crown className="h-3 w-3" />;
    if (role.toLowerCase() === "editor") return <Edit className="h-3 w-3" />;
    return <User className="h-3 w-3" />;
  };

  if (loading)
    return (
      <div className="flex justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );

  if (error)
    return (
      <div className="p-4 bg-red-100 text-red-700 rounded">Error: {error}</div>
    );

  if (!users.length)
    return (
      <p className="text-gray-600 text-sm">
        No se encontraron usuarios para este workspace.
      </p>
    );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
      {users.map((user) => (
        <Card key={user.id} className="shadow-sm border">
          <CardHeader className="border-b">
            <div className="flex items-center gap-3">
              <div className="h-14 w-14 rounded-full bg-linear-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white text-xl font-semibold overflow-hidden">
                {user.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={user.image}
                    alt={user.name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  user.name.charAt(0).toUpperCase()
                )}
              </div>

              <div>
                <CardTitle className="text-lg">{user.name}</CardTitle>
                <CardDescription>ID: {user.id}</CardDescription>
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-4">
            <div
              className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium border ${getRoleBadgeColor(
                user.role
              )}`}
            >
              {getRoleIcon(user.role)}
              {user.role}
            </div>
          </CardContent>

          <CardFooter className="border-t bg-gray-50 text-sm text-gray-700">
            Usuario asignado a este workspace
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
