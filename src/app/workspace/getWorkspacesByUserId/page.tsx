"use client";

import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import UserList from "@/components/workspace/GetWorkspaceByUserId";
import { useState } from "react";

export default function Page() {
  const [formData, setFormData] = useState({
      userId: "",
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
    <div className="min-h-screen p-10 flex flex-col bg-gray-50 gap-6">
      {/* Card del formulario - más pequeña arriba */}
      <div className="w-full max-w-2xl mx-auto bg-white shadow-md border rounded-2xl p-6">
        <h2 className="text-xl font-semibold mb-4">Buscar Workspace</h2>

        <Field>
          <FieldLabel htmlFor="userId" className="font-medium">
            User ID *
          </FieldLabel>
          <Input
            id="userId"
            name="userId"
            type="text"
            placeholder="Mi Workspace"
            value={formData.userId}
            onChange={handleChange}
            required
            className="mt-2"
          />
        </Field>
      </div>

      {/* Panel de resultados - ocupa todo el ancho */}
      <div className="w-full bg-white shadow-md border rounded-2xl p-8">
        <h2 className="text-2xl font-semibold mb-6">Detalles</h2>
        <UserList userId={formData.userId} />
      </div>
    </div>
  )
}