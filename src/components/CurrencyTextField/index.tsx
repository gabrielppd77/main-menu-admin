import { TextField } from "@mui/material";
import { Controller } from "react-hook-form";

import { NumericFormat } from "react-number-format";

interface CurrencyTextFieldProps {
  label: string;
  name: string;
  prefix?: string;
  required?: boolean;
}

export default function CurrencyTextField({
  label,
  name,
  prefix,
}: CurrencyTextFieldProps) {
  return (
    <Controller
      name={name}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <NumericFormat
          allowNegative={false}
          allowLeadingZeros
          thousandSeparator="."
          decimalSeparator=","
          prefix={prefix}
          customInput={TextField}
          helperText={error ? error.message : null}
          error={!!error}
          onValueChange={({ floatValue }) => onChange(floatValue)}
          value={value}
          label={label}
          name={name}
        />
      )}
    />
  );
}
