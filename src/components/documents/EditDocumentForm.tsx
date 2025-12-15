/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Field, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import TextareaAutosize from "react-textarea-autosize";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react"; 
import { UpdateDocumentRequest } from "@/models/request/UpdateDocumentRequest";
import { documentApi } from "@/lib/api/document";

function EditDocumentForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    documentId: "",  // Nuevo campo para el ID
    title: "",
    icon: "",
    content: ""
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

    // Validaciones
    if (!formData.documentId.trim()) {
      alert("El ID del documento es obligatorio.");
      return;
    }
    if (!formData.title.trim() || !formData.icon.trim()) {
      alert("Título e Icono son obligatorios.");
      return;
    }

    try {
      setIsLoading(true);

      const updateDocumentRequest: UpdateDocumentRequest = {
        Title: formData.title,
        Icon: formData.icon,
        Content: formData.content, 
      };

      const response = await documentApi.updateDocument(formData.documentId, updateDocumentRequest);
      
      alert(`¡Documento actualizado exitosamente!\nDocument ID: ${formData.documentId}`);

      setFormData({
        documentId: "",
        title: "",
        icon: "",
        content: ""
      });
    } catch (error: any) {
      if (error.response?.status === 400) {
        const errorMessage = 
          error.response.data?.message || 
          "Error de validación (JSON inválido o UUID incorrecto)";
        alert(`Error: ${errorMessage}`);
      } else if (error.response?.status === 404) {
        alert("Documento no encontrado");
      } else {
        alert(`Error al editar documento: ${error.response?.data?.message || error.message || "Error desconocido"}`);
      }
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
              <strong className="font-bold text-xl">Editar Documento</strong>
            </CardTitle>
            <CardDescription className="text-center">
              Ingresa el ID y modifica los campos del documento.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <FieldSet>
              <FieldGroup>
                <Field>
                  <FieldLabel>ID del Documento *</FieldLabel>
                  <Input
                    name="documentId"
                    value={formData.documentId}
                    onChange={handleChange}
                    placeholder="Ej: 123e4567-e89b-12d3-a456-426614174000"
                    required
                  />
                </Field>

                <Field>
                  <FieldLabel>Título *</FieldLabel>
                  <Input
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Nuevo título"
                    required
                  />
                </Field>

                <Field>
                  <FieldLabel>Icono *</FieldLabel>
                  <Input
                    name="icon"
                    value={formData.icon}
                    onChange={handleChange}
                    placeholder="Nuevo icono"
                    required
                  />
                </Field>

                <Field>
                  <FieldLabel>Contenido JSON (opcional)</FieldLabel>
                  <TextareaAutosize
                    name="content"
                    value={formData.content}
                    onChange={handleChange}
                    placeholder='{"key": "value"}'
                    rows={6}
                    className="resize-vertical"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Formato JSON válido (opcional)
                  </p>
                </Field>
              </FieldGroup>
            </FieldSet>
          </CardContent>

          <CardFooter>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Actualizando..." : "Actualizar Documento"}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
}

export default EditDocumentForm;