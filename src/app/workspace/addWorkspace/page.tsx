"use client";

import { AddWorkspaceForm } from "@/components/workspace/AddWorkspaceForm";

// Pagina para agregar un nuevo espacio de trabajo
export default function Page() { 
  return (
    <div className='flex items-center justify-center min-h-screen -mt-10'>
      <AddWorkspaceForm />
    </div>
  )
}