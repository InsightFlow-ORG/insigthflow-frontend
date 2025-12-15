"use client";

import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur pl-16">
      <div className="container flex h-16 items-center">
        {/* Logo */}
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <span className="font-bold text-xl">InsightFlow</span>
        </Link>

        {/* Navigation Menu */}
        <NavigationMenu>
          <NavigationMenuList>

            {/* Dropdown con submenú */}
            <NavigationMenuItem>
              <NavigationMenuTrigger>Workspace</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                  <ListItem href="/workspace/addWorkspace" title="Agregar un Workspace">
                    Agrega un nuevo workspace
                  </ListItem>
                  <ListItem href="/workspace/getWorkspaces" title="Ver Workspaces">
                    Ver Workspaces existentes
                  </ListItem>
                  <ListItem href="/workspace/getWorkspacesById" title="Ver Workspaces por ID">
                    Ver Workspace específico por su ID
                  </ListItem>
                  <ListItem href="/workspace/getWorkspacesByUserId" title="Ver Workspaces por id de usuario">
                    Ver Workspaces asociados a un usuario
                  </ListItem>
                  <ListItem href="/workspace/updateWorkspace" title="Editar Workspace">
                    Editar un workspace existente
                  </ListItem>
                  <ListItem href="/workspace/deleteWorkspace" title="Eliminar Workspace">
                    Eliminar un workspace existente
                  </ListItem>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Users</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                  <ListItem href="/users/addUser" title="Agregar un Usuario">
                    Agrega un nuevo usuario
                  </ListItem>
                  <ListItem href="/users/login" title="Iniciar Sesión">
                    Iniciar sesión
                  </ListItem>
                  <ListItem href="/users/getUsers" title="Ver Usuarios">
                    Ver usuarios existentes
                  </ListItem>
                  <ListItem href="/users/getUserById" title="Ver Usuario por ID">
                    Ver usuario específico por su ID
                  </ListItem>
                  <ListItem href="/users/updateUser" title="Editar Usuario">
                    Editar un usuario existente
                  </ListItem>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Documents</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                  <ListItem href="/documents/addDocument" title="Crear un Documento">
                    Agregar un documento
                  </ListItem>
                  <ListItem href="/documents/findDocument" title="Visualizar un Documento">
                    Visualizar un documento
                  </ListItem>
                  <ListItem href="/documents/editDocument" title="Actualizar un Documento">
                    Actualizar un documento
                  </ListItem>
                  <ListItem href="/documents/deleteDocument" title="Eliminar un Documento">
                    Eliminar un documento
                  </ListItem>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </header>
  );
}

// Componente helper para los items de lista
const ListItem = ({
  className,
  title,
  children,
  href,
}: {
  className?: string;
  title: string;
  children: React.ReactNode;
  href: string;
}) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          href={href}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
};
