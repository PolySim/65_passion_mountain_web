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
import { FormFileType } from "@/components/form/formField.types";

const FormFile = ({
  control,
  name,
  label,
  description,
  disabled,
  multiple,
  accept,
}: FormFileType) => {
  return (
    <FormField
      control={control}
      render={({ field: { value, onChange, ...fieldProps } }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input
              disabled={disabled}
              {...fieldProps}
              type="file"
              accept={accept}
              onChange={(event) =>
                onChange(event.target.files && event.target.files[0])
              }
              multiple={multiple}
            />
          </FormControl>
          <FormDescription>{description}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
      name={name}
    />
  );
};

export default FormFile;
