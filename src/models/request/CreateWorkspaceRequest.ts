export interface CreateWorkspaceRequest {
  name: string;
  description: string;  // ✅ Ahora es required
  theme: string;        // ✅ Cambiado de "topic" a "theme"
  image: File;          // ✅ Agregado
  ownerId: string;      // Se envía como string, C# lo convierte a Guid
  username: string;     // ✅ Cambiado de "ownerName" a "username"
}