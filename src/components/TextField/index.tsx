import {
  TextField as MUITextField,
  TextFieldProps as MUITextFieldProps,
} from "@mui/material";
import { Controller } from "react-hook-form";

interface TextFieldProps extends Omit<MUITextFieldProps, "label" | "name"> {
  label: string;
  name: string;
}

export default function TextField({
  label,
  name,
  type,
  ...restProps
}: TextFieldProps) {
  return (
    <Controller
      name={name}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <MUITextField
          helperText={error ? error.message : null}
          error={!!error}
          type={type}
          onChange={(e) => {
            const v =
              type === "number"
                ? parseInt(e.target.value || "0")
                : e.target.value;
            onChange(v);
          }}
          value={value}
          label={label}
          {...restProps}
        />
      )}
    />
  );
}
