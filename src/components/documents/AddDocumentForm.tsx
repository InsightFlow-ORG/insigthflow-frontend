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
import { useState } from "react"; 
import { CreateDocumentRequest } from "@/models/request/CreateDocumentRequest";
import { documentApi } from "@/lib/api/document";

// Modal Component
function SuccessModal({ uuid, onClose }: { uuid: string; onClose: () => void }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full mx-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-green-600 text-xl text-center">
              ✅ Documento Creado
            </CardTitle>
            <CardDescription className="text-center">
              Tu documento se registró exitosamente
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg border">
              <p className="text-sm font-medium text-gray-900 mb-2">UUID del Documento:</p>
              <code className="text-xs bg-gray-100 p-2 rounded w-full block font-mono break-all">
                {uuid}
              </code>
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={onClose} className="w-full">
              Cerrar
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

function AddDocumentForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    icon: "",
    workspaceId: ""
  });
  const [showModal, setShowModal] = useState(false);
  const [createdUuid, setCreatedUuid] = useState("");

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

      const response = await documentApi.createDocument(createDocumentRequest);

      // Guardar UUID y abrir modal
      setCreatedUuid(response.uuid);
      setShowModal(true);

      // Reset del formulario
      setFormData({
        title: "",
        icon: "",
        workspaceId: ""
      });
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || error.message || "Error desconocido";
      alert(`Error al registrar documento: formato de uuid invalido`);
    } finally {
      setIsLoading(false);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setCreatedUuid("");
  };

  return (
    <div className="w-full max-w-md relative">
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
                    name="workspaceId"
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

      {/* Modal */}
      {showModal && (
        <SuccessModal uuid={createdUuid} onClose={closeModal} />
      )}
    </div>
  );
}

export default AddDocumentForm;