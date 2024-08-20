import { Autocomplete, CircularProgress, TextField } from "@mui/material";
import { Controller, FieldError } from "react-hook-form";

interface AutoCompleteProps<TData> {
  label: string;
  name: string;
  isValidate?: boolean;
  options: TData[];
  renderOptions: (d: TData) => string;
  fetchData?: () => void;
  isLoading?: boolean;
  idField: keyof TData extends string ? keyof TData : never;
  required?: boolean;
  onChange?: (d: string) => void;
  value?: string;
  error?: FieldError;
}

function AutoCompleteDefault<TData>({
  label,
  name,
  options,
  renderOptions,
  fetchData,
  isLoading,
  idField,
  required,
  onChange,
  value,
  error,
}: AutoCompleteProps<TData>) {
  return (
    <Autocomplete
      id="auto-complete"
      onChange={(_, obj) =>
        onChange && onChange(obj ? (obj[idField] as string) : "")
      }
      value={options.find((d) => d[idField] === value) || null}
      getOptionLabel={renderOptions}
      onOpen={() => {
        if (fetchData && options.length === 0) {
          fetchData();
        }
      }}
      getOptionKey={(d) => d[idField] as string}
      options={options}
      loading={isLoading}
      openText="Abrir"
      clearText="Limpar"
      closeText="Fechar"
      loadingText="Carregando..."
      noOptionsText="Sem opções"
      renderInput={(params) => (
        <TextField
          {...params}
          name={name}
          helperText={error ? error.message : null}
          error={!!error}
          label={label}
          required={required}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {isLoading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
    />
  );
}

function AutoCompleteControlled<TData>({
  name,
  ...rest
}: AutoCompleteProps<TData>) {
  return (
    <Controller
      name={name}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <AutoCompleteDefault
          {...rest}
          name={name}
          onChange={onChange}
          value={value}
          error={error}
        />
      )}
    />
  );
}

export default function AutoComplete<TData>({
  isValidate = true,
  ...rest
}: AutoCompleteProps<TData>) {
  if (isValidate) {
    return <AutoCompleteControlled {...rest} />;
  }
  return <AutoCompleteDefault {...rest} />;
}
