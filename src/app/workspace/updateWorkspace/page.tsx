"use client";

import { UpdateWorkspaceForm } from "@/components/workspace/UpdateWorkspaceForm";

// Pagina para actualizar un espacio de trabajo
export default function page() {
  return (
    <div className="flex items-center justify-center min-h-screen -mt-10">
      <UpdateWorkspaceForm />
    </div>
  );
}
