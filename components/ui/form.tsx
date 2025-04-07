"use client";

import * as React from "react";
import * as LabelPrimitive from "@radix-ui/react-slot";
import * as FormPrimitive from "@radix-ui/react-form";

import { cn } from "@/lib/utils";

const Form = FormPrimitive.Root;

const FormField = FormPrimitive.Field;

const FormMessage = React.forwardRef<
  React.ElementRef<typeof FormPrimitive.Message>,
  React.ComponentPropsWithoutRef<typeof FormPrimitive.Message>
>(({ className, children, ...props }, ref) => (
  <FormPrimitive.Message
    ref={ref}
    className={cn("text-sm font-medium text-destructive", className)}
    {...props}
  >
    {children}
  </FormPrimitive.Message>
));
FormMessage.displayName = FormPrimitive.Message.displayName;

const FormLabel = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>
>(({ className, ...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    className={cn(
      "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
      className
    )}
    {...props}
  />
));
FormLabel.displayName = "FormLabel";

export { Form, FormField, FormMessage, FormLabel }; 