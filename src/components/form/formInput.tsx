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
import { Textarea } from "@/components/ui/textarea";

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
            {type === "text-area" ? (
              <Textarea disabled={disabled} {...field} rows={12} />
            ) : (
              <Input disabled={disabled} {...field} type={type} />
            )}
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
