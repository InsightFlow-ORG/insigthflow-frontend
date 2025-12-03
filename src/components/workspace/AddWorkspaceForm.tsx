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

export function AddWorkspaceForm() {
  return (
    <div className="w-full max-w-md">
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
                <FieldLabel htmlFor="Name">Nombre</FieldLabel>
                <Input id="Name" type="text" placeholder="John Doe" />
              </Field>
              <Field>
                <FieldLabel htmlFor="Theme">Temática</FieldLabel>
                <Input id="Theme" type="text" placeholder="Technology" />
              </Field>
              <Field>
                <FieldLabel htmlFor="Description">Descripción</FieldLabel>
                <TextareaAutosize
                  id="Description"
                  placeholder="A brief description"
                  className="w-full rounded-md border bg-transparent px-3 py-2 text-base outline-none"
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="picture">Imagen</FieldLabel>
                <Input id="picture" type="file" />
              </Field>
            </FieldGroup>
          </FieldSet>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full">
            Agregar
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
