"use client";

import { useState } from "react";
import { documentApi } from "@/lib/api/document";

export default function FindDocumentById() {
  const [id, setId] = useState("");
  const [document, setDocument] = useState<any>(null);

  const handleSearch = async () => {
    try {
      const data = await documentApi.findDocumentById(id);
      setDocument(data);
    } catch (err: any) {
      alert(err.response?.data?.error || "Documento no encontrado");
    }
  };

  return (
    <div className="p-4">
      <h2 className="font-bold text-xl mb-2">Buscar Documento por ID</h2>

      <input
        className="border p-2 mb-2 w-full"
        placeholder="Ingrese el ID del documento"
        value={id}
        onChange={(e) => setId(e.target.value)}
      />

      <button
        onClick={handleSearch}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Buscar
      </button>

      {document && (
        <div className="mt-4 border p-3 rounded">
          <p><strong>ID:</strong> {document.uuid}</p>
          <p><strong>Titulo:</strong> {document.title}</p>
          <p><strong>Icono:</strong> {document.icon}</p>
          <p><strong>Contenido:</strong> {document.content}</p>
        </div>
      )}
    </div>
  );
}
