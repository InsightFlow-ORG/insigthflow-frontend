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
import { CreateUserRequest } from "@/models/request/CreateUserRequest";
import { userApi } from "@/lib/api/user";


// Formulario para agregar un nuevo cliente
function AddClientForm() {
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    birthDate: "",
    address: "",
    phone: "",
    password: "",
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
// Maneja el envío del formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.firstName.trim() ||
      !formData.lastName.trim() ||
      !formData.email.trim() ||
      !formData.username.trim() ||
      !formData.birthDate.trim() ||
      !formData.address.trim() ||
      !formData.phone.trim() ||
      !formData.password.trim()
    ) {
      alert("Todos los campos son obligatorios.");
      return;
    }

    try {
      setIsLoading(true);

      const createUserRequest: CreateUserRequest = {
        Name: formData.firstName,
        LastName: formData.lastName,
        Email: formData.email,
        UserName: formData.username,
        DateOfBirth: formData.birthDate,
        Address: formData.address,
        PhoneNumber: formData.phone,
        Password: formData.password,
      };

      await userApi.createUser(createUserRequest);

      alert("¡Cliente registrado exitosamente!");

      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        username: "",
        birthDate: "",
        address: "",
        phone: "",
        password: "",
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
              <strong className="font-bold text-xl">Registrar Cliente</strong>
            </CardTitle>
            <CardDescription className="text-center">
              Complete el formulario para registrar un nuevo cliente.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <FieldSet>
              <FieldGroup>
  <Field>
    <FieldLabel>Nombre</FieldLabel>
    <Input
      name="firstName"
      value={formData.firstName}
      onChange={handleChange}
      placeholder="Ingrese el nombre"
      required
    />
  </Field>

  <Field>
    <FieldLabel>Apellido</FieldLabel>
    <Input
      name="lastName"
      value={formData.lastName}
      onChange={handleChange}
      placeholder="Ingrese el apellido"
      required
    />
  </Field>

  <Field>
    <FieldLabel>Email</FieldLabel>
    <Input
      type="email"
      name="email"
      value={formData.email}
      onChange={handleChange}
      placeholder="cliente@ejemplo.com"
      required
    />
  </Field>

  <Field>
    <FieldLabel>Usuario</FieldLabel>
    <Input
      name="username"
      value={formData.username}
      onChange={handleChange}
      placeholder="nombredeusuario"
      required
    />
  </Field>

  <Field>
    <FieldLabel>Fecha de Nacimiento</FieldLabel>
    <Input
      type="date"
      name="birthDate"
      value={formData.birthDate}
      onChange={handleChange}
      required
    />
  </Field>

  <Field>
    <FieldLabel>Dirección</FieldLabel>
    <TextareaAutosize
      name="address"
      value={formData.address}
      onChange={handleChange}
      placeholder="Ingrese la dirección"
      className="w-full p-2 border rounded-md"
      minRows={2}
      required
    />
  </Field>

  <Field>
    <FieldLabel>Teléfono</FieldLabel>
    <Input
      name="phone"
      value={formData.phone}
      onChange={handleChange}
      placeholder="+56 9 1234 5678"
      required
    />
  </Field>

  <Field>
    <FieldLabel>Contraseña</FieldLabel>
    <Input
      type="password"
      name="password"
      value={formData.password}
      onChange={handleChange}
      placeholder="********"
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

export default AddClientForm;   
