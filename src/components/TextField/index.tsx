import {
  TextField as MUITextField,
  TextFieldProps as MUITextFieldProps,
} from "@mui/material";
import { Controller } from "react-hook-form";

interface TextFieldProps extends Omit<MUITextFieldProps, "label" | "name"> {
  label: string;
  name: string;
  isValidate?: boolean;
}

function TextFieldControlled({ name, type, ...rest }: TextFieldProps) {
  return (
    <Controller
      name={name}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <MUITextField
          helperText={error ? error.message : null}
          error={!!error}
          onChange={(e) => {
            const v =
              type === "number"
                ? parseInt(e.target.value || "0")
                : e.target.value;
            onChange(v);
          }}
          value={value || ""}
          name={name}
          type={type}
          {...rest}
        />
      )}
    />
  );
}

export default function TextField({
  isValidate = true,
  ...rest
}: TextFieldProps) {
  if (isValidate) {
    return <TextFieldControlled {...rest} />;
  }
  return <MUITextField {...rest} />;
}
