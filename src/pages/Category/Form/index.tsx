import { Stack } from "@mui/material";

import TextField from "@components/TextField";
import ActionDialog from "@components/ActionDialog";

import { useCategoryCreate } from "@libs/queries/category/useCategoryCreate";
import { useCategoryUpdate } from "@libs/queries/category/useCategoryUpdate";

import { z } from "zod";

import useValidateForm from "@hooks/useValidateForm";

import { CategoryResponseDTO } from "@libs/queries/category/dtos/CategoryResponseDTO";

const schema = z.object({
  id: z.string().optional(),
  name: z
    .string({ message: "Informe o Nome" })
    .min(1, "Informe pelo menos um caractere"),
  order: z
    .number({ message: "Informe a Ordem da Categoria" })
    .min(1, "Informe uma ordem válida"),
});

type DataType = z.infer<typeof schema>;

interface FormProps {
  data?: CategoryResponseDTO;
  onClose: () => void;
}

export default function Form({ data, onClose }: FormProps) {
  const { mutateAsync: mutateAsyncCreate, isPending: isPendingCreate } =
    useCategoryCreate();
  const { mutateAsync: mutateAsyncUpdate, isPending: isPendingUpdate } =
    useCategoryUpdate();

  const isLoading = isPendingCreate || isPendingUpdate;

  const { FormProvider, handleSubmit } = useValidateForm({
    schema,
    defaultValues: data || {},
  });

  async function onSubmit(d: DataType) {
    if (d.id) {
      await mutateAsyncUpdate({
        id: d.id,
        data: d,
      });
    } else {
      await mutateAsyncCreate({
        data: d,
      });
    }
    onClose();
  }

  return (
    <ActionDialog
      title="Cadastro de Categoria"
      isLoading={isLoading}
      onClose={() => onClose()}
      onSubmit={handleSubmit(onSubmit)}
    >
      <FormProvider>
        <Stack gap={1}>
          <TextField required label="Nome" name="name" />
          <TextField
            required
            type="number"
            label="Ordem da Categoria"
            name="order"
          />
        </Stack>
      </FormProvider>
    </ActionDialog>
  );
}
