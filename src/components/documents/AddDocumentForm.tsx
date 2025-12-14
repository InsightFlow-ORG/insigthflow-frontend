/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Field, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import TextareaAutosize from "react-textarea-autosize";
import { useState } from "react"; 
import { CreateDocumentRequest } from "@/models/request/CreateDocumentRequest";
import { userApi } from "@/lib/api/user";

function AddDocumentForm() {
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    icon: "",
    workspaceId: ""
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.title.trim() ||
      !formData.icon.trim() ||
      !formData.workspaceId.trim() 
    ) {
      alert("Todos los campos son obligatorios.");
      return;
    }

    try {
      setIsLoading(true);

      const createDocumentRequest: CreateDocumentRequest = {
        Title: formData.title,
        Icon: formData.icon,
        WorkspaceId: formData.workspaceId,
      };

      await userApi.createUser(createUserRequest);

      alert("¡Cliente registrado exitosamente!");

      setFormData({
        title: "",
        icon: "",
        workspaceId: ""
      });
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || error.message || "Error desconocido";
      alert(`Error al registrar cliente: ${errorMessage}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md">
      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle className="text-center w-full">
              <strong className="font-bold text-xl">Agregar un Documento</strong>
            </CardTitle>
            <CardDescription className="text-center">
              Complete el formulario para registrar un documento.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <FieldSet>
              <FieldGroup>
  <Field>
    <FieldLabel>Título</FieldLabel>
    <Input
      name="title"
      value={formData.title}
      onChange={handleChange}
      placeholder="Ingrese el título"
      required
    />
  </Field>

  <Field>
    <FieldLabel>Icono</FieldLabel>
    <Input
      name="icon"
      value={formData.icon}
      onChange={handleChange}
      placeholder="Ingrese el icono"
      required
    />
  </Field>

  <Field>
    <FieldLabel>WorkspaceId</FieldLabel>
    <Input
      name="WorkspaceId"
      value={formData.workspaceId}
      onChange={handleChange}
      placeholder="Ingrese el Workspace Id"
      required
    />
  </Field>
</FieldGroup>
            </FieldSet>
          </CardContent>

          <CardFooter>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Registrando..." : "Registrar"}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
}

export default AddDocumentForm;   
