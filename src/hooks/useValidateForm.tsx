import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm, DefaultValues } from "react-hook-form";
import { z } from "zod";

interface UseValidateFormProps<TSchema extends z.ZodTypeAny> {
  schema: TSchema;
  defaultValues: DefaultValues<z.infer<TSchema>>;
}

export default function useValidateForm<TSchema extends z.ZodTypeAny>({
  schema,
  defaultValues,
}: UseValidateFormProps<TSchema>) {
  type FormValues = z.infer<typeof schema>;

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  const Component = ({ children }: { children: React.ReactNode }) => (
    <FormProvider {...form}>{children}</FormProvider>
  );

  return {
    FormProvider: Component,
    handleSubmit: form.handleSubmit,
  };
}
