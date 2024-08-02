"use client";

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FormFieldType } from "@/components/form/formField.types";

const FormInput = ({
  control,
  name,
  label,
  description,
  disabled,
  type,
}: FormFieldType) => {
  return (
    <FormField
      control={control}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input disabled={disabled} {...field} type={type} />
          </FormControl>
          <FormDescription>{description}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
      name={name}
    />
  );
};

export default FormInput;
