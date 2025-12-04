"use client";

import React, { useState, useEffect } from "react";
import { ArrowUpDown, Users, Calendar, Loader2 } from "lucide-react";
import { workspaceApi } from "@/lib/api/workspace";

type SortKey = "name" | "members" | "createdAt" | null;

interface Member {
  userName: string;
  role: string;
}

interface Workspace {
  id: string;
  name: string;
  description: string;
  theme: string;
  image: string;
  members: Member[];
  isActive: boolean;
  createdAt: string;
}

export default function WorkspacesTable() {
  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState<{ key: SortKey; direction: "asc" | "desc" }>({ 
    key: null, 
    direction: "asc" 
  });

  useEffect(() => {
    fetchWorkspaces();
  }, []);

  const fetchWorkspaces = async () => {
    try {
      setLoading(true);
      const data = await workspaceApi.getWorkspaces();
      setWorkspaces(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cargar los workspaces');
      console.error('Error fetching workspaces:', err);
    } finally {
      setLoading(false);
    }
  };

  const filteredData = workspaces.filter((workspace) =>
    workspace.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedData = [...filteredData].sort((a, b) => {
    if (!sortConfig.key) return 0;

    if (sortConfig.key === "members") {
      return sortConfig.direction === "asc"
        ? a.members.length - b.members.length
        : b.members.length - a.members.length;
    }

    if (sortConfig.key === "createdAt") {
      const aTime = new Date(a.createdAt).getTime();
      const bTime = new Date(b.createdAt).getTime();
      return sortConfig.direction === "asc" ? aTime - bTime : bTime - aTime;
    }

    // fallback / default: compare names as strings
    const aValue = String(a.name).toLowerCase();
    const bValue = String(b.name).toLowerCase();

    if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
    if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
    return 0;
  });

  const handleSort = (key: SortKey) => {
    setSortConfig({
      key,
      direction:
        sortConfig.key === key && sortConfig.direction === "asc" ? "desc" : "asc",
    });
  };

  if (loading) {
    return (
      <div className="w-full max-w-7xl mx-auto p-6">
        <div className="flex items-center justify-center h-64">
          <div className="flex flex-col items-center gap-3">
            <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
            <p className="text-gray-600">Cargando workspaces...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full max-w-7xl mx-auto p-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center gap-2">
            <div className="text-red-600 font-medium">Error:</div>
            <div className="text-red-700">{error}</div>
          </div>
          <button
            onClick={fetchWorkspaces}
            className="mt-3 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto p-6">
      <div className="mb-6">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900">Workspaces</h2>
        <p className="text-gray-600 mt-1">
          Administra y visualiza todos tus espacios de trabajo
        </p>
      </div>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Buscar por nombre..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full max-w-sm"
        />
      </div>

      <div className="overflow-hidden rounded-lg border border-gray-200 shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse bg-white">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left font-medium text-gray-700">
                  Workspace
                </th>
                <th className="px-6 py-3 text-left font-medium text-gray-700">
                  Descripción
                </th>
                <th className="px-6 py-3 text-center">
                  <button
                    onClick={() => handleSort("members")}
                    className="flex items-center justify-center gap-2 font-medium text-gray-700 hover:text-gray-900 w-full"
                  >
                    Miembros
                    <ArrowUpDown className="h-4 w-4" />
                  </button>
                </th>
                <th className="px-6 py-3 text-left font-medium text-gray-700">
                  Estado
                </th>
                <th className="px-6 py-3 text-left">
                  <button
                    onClick={() => handleSort("createdAt")}
                    className="flex items-center gap-2 font-medium text-gray-700 hover:text-gray-900"
                  >
                    Fecha de Creación
                    <ArrowUpDown className="h-4 w-4" />
                  </button>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {sortedData.length > 0 ? (
                sortedData.map((workspace) => (
                  <tr key={workspace.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-lg bg-linear-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white font-semibold flex-shrink-0">
                          {workspace.image ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img 
                              src={workspace.image} 
                              alt={workspace.name}
                              className="h-10 w-10 rounded-lg object-cover"
                            />
                          ) : (
                            workspace.name.charAt(0).toUpperCase()
                          )}
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">{workspace.name}</div>
                          <div className="text-xs text-gray-500">{workspace.theme}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-600 max-w-md truncate">
                        {workspace.description}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-2">
                        <Users className="h-4 w-4 text-gray-500" />
                        <span className="font-medium text-gray-700">
                          {workspace.members?.length || 0}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          workspace.isActive
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {workspace.isActive ? "Activo" : "Inactivo"}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Calendar className="h-4 w-4 text-gray-400" />
                        {new Date(workspace.createdAt).toLocaleDateString("es-ES", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                    No se encontraron resultados.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-4 text-sm text-gray-600">
        Total: {sortedData.length} workspace(s)
      </div>
    </div>
  );
}