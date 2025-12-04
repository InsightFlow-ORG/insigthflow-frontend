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
    <div className="min-h-screen p-10 flex flex-col items-center bg-gray-50">
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Card del formulario */}
        <div className="bg-white shadow-md border rounded-2xl p-6">
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

        {/* Panel de resultados */}
        <div className="bg-white shadow-md border rounded-2xl p-6">
          <h2 className="text-xl font-semibold mb-4">Detalles</h2>
          <UserList userId={formData.userId} />
        </div>
      </div>
    </div>
  )
}
