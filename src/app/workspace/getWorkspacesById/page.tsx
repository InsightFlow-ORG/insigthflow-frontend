"use client";

import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import WorkspaceDetails from "@/components/workspace/GetWorkspaceById";
import { useState } from "react";

export default function Page() {
  const [formData, setFormData] = useState({
    id: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="min-h-screen p-10 flex flex-col items-center bg-gray-50">
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Card del formulario */}
        <div className="bg-white shadow-md border rounded-2xl p-6">
          <h2 className="text-xl font-semibold mb-4">Buscar Workspace</h2>

          <Field>
            <FieldLabel htmlFor="id" className="font-medium">
              Workspace ID *
            </FieldLabel>
            <Input
              id="id"
              name="id"
              type="text"
              placeholder="Mi Workspace"
              value={formData.id}
              onChange={handleChange}
              required
              className="mt-2"
            />
          </Field>
        </div>

        {/* Panel de resultados */}
        <div className="bg-white shadow-md border rounded-2xl p-6">
          <h2 className="text-xl font-semibold mb-4">Detalles</h2>
          <WorkspaceDetails workspaceId={formData.id} />
        </div>
      </div>
    </div>
  );
}
