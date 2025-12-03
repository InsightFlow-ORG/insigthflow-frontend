import { AddWorkspaceForm } from "@/components/workspace/AddWorkspaceForm";

export default function Page() {  // También capitaliza el nombre del componente
  return (
    <div className='flex items-center justify-center min-h-screen -mt-10'>
      <AddWorkspaceForm />
    </div>
  )
}