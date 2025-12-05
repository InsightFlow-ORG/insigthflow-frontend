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
} from "../ui/card";
import { Button } from "../ui/button";
import TextareaAutosize from "react-textarea-autosize";
import { useState } from "react";
import { workspaceApi } from "@/lib/api/workspace";
import { CreateWorkspaceRequest } from "@/models/request/CreateWorkspaceRequest";

export function AddWorkspaceForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    theme: "",
    description: "",
  });
  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.theme.trim() || !formData.description.trim()) {
      alert("Nombre, temática y descripción son requeridos");
      return;
    }

    if (!imageFile) {
      alert("La imagen es requerida");
      return;
    }

    try {
      setIsLoading(true);

      const createWorkspaceRequest : CreateWorkspaceRequest = {
        name: formData.name,
        description: formData.description,
        theme: formData.theme,
        image: imageFile,
        ownerId: "00000000-0000-0000-0000-000000000000",
        username: "John Doe",
      };

      await workspaceApi.createWorkspace(createWorkspaceRequest);

      alert("¡Workspace creado exitosamente!");

      setFormData({ name: "", theme: "", description: "" });
      setImageFile(null);
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || error.message || "Error desconocido";
      alert(`Error al crear workspace: ${errorMessage}`);
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
              <strong className="font-bold text-xl">
                Agregar Espacio de Trabajo
              </strong>
            </CardTitle>
            <CardDescription className="text-center">
              Complete el formulario para agregar un nuevo espacio de trabajo.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <FieldSet>
              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="name">Nombre *</FieldLabel>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Mi Workspace"
                    value={formData.name}
                    onChange={handleChange}
                    disabled={isLoading}
                    required
                  />
                </Field>

                <Field>
                  <FieldLabel htmlFor="theme">Temática *</FieldLabel>
                  <Input
                    id="theme"
                    name="theme"
                    type="text"
                    placeholder="Technology"
                    value={formData.theme}
                    onChange={handleChange}
                    disabled={isLoading}
                    required
                  />
                </Field>

                <Field>
                  <FieldLabel htmlFor="description">Descripción *</FieldLabel>
                  <TextareaAutosize
                    id="description"
                    name="description"
                    placeholder="Una breve descripción..."
                    className="w-full rounded-md border bg-transparent px-3 py-2 text-base outline-none disabled:opacity-50"
                    value={formData.description}
                    onChange={handleChange}
                    disabled={isLoading}
                    minRows={3}
                    required
                  />
                </Field>

                <Field>
                  <FieldLabel htmlFor="picture">Imagen *</FieldLabel>
                  <Input
                    id="picture"
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    disabled={isLoading}
                    required
                  />
                  {imageFile && (
                    <p className="text-sm text-gray-600 mt-1">
                      {imageFile.name}
                    </p>
                  )}
                </Field>
              </FieldGroup>
            </FieldSet>
          </CardContent>

          <CardFooter>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Creando..." : "Agregar"}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
}