"use client";

import WorkspacesTable from "@/components/workspace/GetWorkspaces";

// Pagina para obtener y mostrar los espacios de trabajo
export default function page() {
  return (
    <div className="flex justify-center items-start min-h-screen p-4">
      <WorkspacesTable />
    </div>
  );
}
