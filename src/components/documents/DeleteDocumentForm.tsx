"use client";

import { useState } from "react";
import {
  Trash2,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Loader2,
} from "lucide-react";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { workspaceApi } from "@/lib/api/workspace";
import { documentApi } from "@/lib/api/document";

export default function DeleteDocument() {
  const [documentId, setDocumentId] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{
    success: boolean;
    message: string;
  } | null>(null);

  const handleDelete = async () => {
    if (!documentId.trim()) {
      setResult({
        success: false,
        message: "Por favor ingresa un ID del documento válido",
      });
      return;
    }

    try {
      setLoading(true);
      setResult(null);

      // ✔ API devuelve solo true/false
      const success: boolean = await documentApi.deleteDocument(documentId);

      if (success) {
        setResult({
          success: true,
          message: `El documento con ID "${documentId}" ha sido marcado como eliminado.`,
        });

        // ✔ Limpia el input para permitir seguir eliminando
        setDocumentId("");
      } else {
        setResult({
          success: false,
          message: "No se pudo eliminar el documento. ID no encontrado.",
        });
      }
    } catch (error) {
      setResult({
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Error al eliminar el documento",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-10 flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-2xl">
        <div className="bg-white shadow-lg border border-gray-300 rounded-2xl overflow-hidden">
          {/* Header neutro */}
          <div className="bg-black p-6 text-white">
            <div className="flex items-center gap-3">
              <div className="bg-gray-800 p-3 rounded-lg">
                <Trash2 className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">Eliminar un Documento</h1>
                <p className="text-gray-400 text-sm mt-1">
                  Esta acción realiza un soft delete.
                </p>
              </div>
            </div>
          </div>

          {/* Contenido */}
          <div className="p-6 space-y-6">
            <Field>
              <FieldLabel
                htmlFor="documentId"
                className="font-medium text-gray-900"
              >
                ID del Document *
              </FieldLabel>
              <Input
                id="documentId"
                name="documentId"
                type="text"
                placeholder="ej: 19725667-aba1-474e-8687-525b867242fd"
                value={documentId}
                onChange={(e) => setDocumentId(e.target.value)}
                disabled={loading}
                className="mt-2 font-mono text-sm"
              />
              <p className="text-xs text-gray-500 mt-2">
                Ingresa el ID del workspace que deseas eliminar.
              </p>
            </Field>

            {result && (
              <div className="border-2 rounded-lg p-5 bg-gray-100 border-gray-300">
                <div className="flex items-start gap-3">
                  {result.success ? (
                    <CheckCircle className="h-6 w-6 text-gray-700 shrink-0" />
                  ) : (
                    <XCircle className="h-6 w-6 text-gray-700 shrink-0" />
                  )}
                  <div className="flex-1">
                    <h3 className="font-bold text-lg mb-1 text-gray-900">
                      {result.success
                        ? "✓ Eliminado (soft delete)"
                        : "✗ Error al eliminar"}
                    </h3>
                    <p className="text-sm text-gray-700">{result.message}</p>
                  </div>
                </div>
              </div>
            )}

            <div className="flex gap-3 pt-2">
              <button
                onClick={handleDelete}
                disabled={!documentId.trim() || loading}
                className="flex-1 bg-black text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Eliminando...
                  </>
                ) : (
                  <>
                    <Trash2 className="h-5 w-5" />
                    Eliminar Workspace
                  </>
                )}
              </button>

              <button
                onClick={() => {
                  setDocumentId("");
                  setResult(null);
                }}
                disabled={loading}
                className="px-6 py-3 border-2 border-gray-400 text-gray-700 rounded-lg font-semibold hover:bg-gray-100 transition-colors disabled:opacity-50"
              >
                Limpiar
              </button>
            </div>
          </div>
        </div>

        <div className="mt-6 bg-white border border-gray-300 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <div className="bg-gray-200 rounded-full p-2">
              <AlertTriangle className="h-4 w-4 text-gray-700" />
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-gray-900 text-sm">
                ¿Necesitas ayuda?
              </h4>
              <p className="text-gray-700 text-xs mt-1">
                Si tienes dudas sobre qué documents eliminar, ve la sección de ver documents.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
