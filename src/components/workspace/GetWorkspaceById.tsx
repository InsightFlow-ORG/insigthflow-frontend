"use client";

import { useEffect, useState } from "react";
import { Crown, Edit, Loader2, Users, Calendar } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "../ui/card";
import { workspaceApi } from "../../lib/api/workspace";

// Inrerfaces
interface WorkspaceMember {
  id: string;
  userName: string;
  role: string;
  joinedAt: string;
}

interface WorkspaceData {
  name: string;
  image: string;
  description: string;
  workspaceMembers: WorkspaceMember[];
}

interface WorkspaceDetailsProps {
  workspaceId?: string;
  apiEndpoint?: string;
}

// Componente para mostrar los detalles de un workspace por su ID
export default function WorkspaceDetails({
  workspaceId,
}: WorkspaceDetailsProps) {
  const [workspace, setWorkspace] = useState<WorkspaceData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Función para obtener los detalles del workspace
  const fetchWorkspaceDetails = async () => {
    try {
      setLoading(true);
      const data = await workspaceApi.getWorkspaceById(workspaceId || "");
      setWorkspace(data);
      setError(null);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Error al cargar los workspaces"
      );
      console.error("Error fetching workspaces:", err);
    } finally {
      setLoading(false);
    }
  };

  // useEffect para cargar los detalles cuando cambia el workspaceId
  useEffect(() => {
    fetchWorkspaceDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [workspaceId]);

  // Funciones auxiliares para estilos de roles
  const getRoleBadgeColor = (role: string) => {
    switch (role.toLowerCase()) {
      case "owner":
        return "bg-purple-100 text-purple-800 border-purple-200";
      case "editor":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "viewer":
        return "bg-gray-100 text-gray-800 border-gray-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  // Iconos para roles
  const getRoleIcon = (role: string) => {
    if (role.toLowerCase() === "owner") {
      return <Crown className="h-3 w-3" />;
    }
    if (role.toLowerCase() === "editor") {
      return <Edit className="h-3 w-3" />;
    }
    return null;
  };

  // Maneja los diferentes estados de carga, error y datos
  if (loading) {
    return (
      <Card className="w-full max-w-2xl">
        <CardContent>
          <div className="flex items-center justify-center py-12">
            <div className="flex flex-col items-center gap-3">
              <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
              <p className="text-sm text-gray-600">
                Cargando información del workspace...
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Maneja el estado de error
  if (error) {
    return (
      <Card className="w-full max-w-2xl">
        <CardContent>
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-3">
              <div className="text-red-600 font-medium">Error:</div>
              <div className="text-red-700">{error}</div>
            </div>
            <button
              onClick={fetchWorkspaceDetails}
              className="px-4 py-2 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700 transition-colors"
            >
              Reintentar
            </button>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!workspace) {
    return null;
  }

  function cn(...classes: (string | undefined | null | false)[]): string {
    return classes.filter(Boolean).join(" ");
  }

  // Renderiza los detalles del workspace
  return (
    <Card className="w-full max-w-2xl">
      <CardHeader className="border-b">
        <div className="flex items-center gap-4">
          <div className="h-16 w-16 rounded-xl bg-linear-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white font-bold text-2xl shrink-0">
            {workspace.image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={workspace.image}
                alt={workspace.name}
                className="h-16 w-16 rounded-xl object-cover"
              />
            ) : (
              workspace.name.charAt(0).toUpperCase()
            )}
          </div>
          <div className="flex-1">
            <CardTitle className="text-2xl">{workspace.name}</CardTitle>
            <CardDescription className="mt-1">
              {workspace.description}
            </CardDescription>
            <CardDescription className="mt-1">
              {workspace.workspaceMembers.length}{" "}
              {workspace.workspaceMembers.length === 1 ? "miembro" : "miembros"}
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-gray-700">
            <Users className="h-5 w-5 text-gray-500" />
            <h3 className="font-semibold">Miembros del Workspace</h3>
          </div>

          <div className="space-y-3">
            {workspace.workspaceMembers.map((member) => (
              <div
                key={member.id}
                className="flex items-center justify-between p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-linear-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-semibold">
                    {member.userName.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">
                      {member.userName}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <Calendar className="h-3 w-3" />
                      Unido el{" "}
                      {new Date(member.joinedAt).toLocaleDateString("es-ES", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </div>
                  </div>
                </div>
                <div
                  className={cn(
                    "flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium border",
                    getRoleBadgeColor(member.role)
                  )}
                >
                  {getRoleIcon(member.role)}
                  <span>{member.role}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>

      <CardFooter className="border-t bg-gray-50">
        <div className="text-sm text-gray-600">
          Total de miembros:{" "}
          <span className="font-semibold text-gray-900">
            {workspace.workspaceMembers.length}
          </span>
        </div>
      </CardFooter>
    </Card>
  );
}
