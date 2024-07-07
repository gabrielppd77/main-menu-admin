import { TextField, TextFieldProps } from "@mui/material";
import { Controller } from "react-hook-form";

interface TextFieldControlProps extends Omit<TextFieldProps, "label" | "name"> {
  label: string;
  name: string;
}

export default function TextFieldControl({
  label,
  name,
  type,
  ...restProps
}: TextFieldControlProps) {
  return (
    <Controller
      name={name}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <TextField
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
