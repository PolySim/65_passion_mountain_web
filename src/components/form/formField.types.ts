import { Control } from "react-hook-form";

export type FormFieldType = {
  control: Control<any>;
  name: string;
  type: "text-area" | string;
  label?: string;
  description?: string;
  placeholder?: string;
  disabled?: boolean;
};

export type FormSelectType = Omit<FormFieldType, "type"> & {
  options: {
    value: string;
    label: string;
    disabled?: boolean;
  }[];
};
