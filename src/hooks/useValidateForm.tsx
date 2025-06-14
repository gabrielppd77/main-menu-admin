import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm, DefaultValues } from "react-hook-form";
import { z } from "zod";

interface UseValidateFormProps<TSchema extends z.ZodTypeAny> {
  schema: TSchema;
  values?: DefaultValues<z.infer<TSchema>>;
}

export function useValidateForm<TSchema extends z.ZodTypeAny>({
  schema,
  values,
}: UseValidateFormProps<TSchema>) {
  type FormValues = z.infer<typeof schema>;

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    values,
  });

  const Component = ({ children }: { children: React.ReactNode }) => (
    <FormProvider {...form}>
      <form>{children}</form>
    </FormProvider>
  );

  return {
    FormProvider: Component,
    handleSubmit: form.handleSubmit,
    reset: form.reset,
  };
}
