import { Box, LinearProgress, Stack } from "@mui/material";

import TextField from "@components/TextField";
import ActionDialog from "@components/ActionDialog";
import CurrencyTextField from "@components/CurrencyTextField";
import AutoCompleteCategory from "@components/AutoCompleteCategory";

import { useProductCreate } from "@libs/queries/product/useProductCreate";
import { useProductUpdate } from "@libs/queries/product/useProductUpdate";
import { useProductGetById } from "@libs/queries/product/useProductGetById";

import { z } from "zod";

import useValidateForm from "@hooks/useValidateForm";
import { useEffect } from "react";

const schema = z.object({
  id: z.string().optional(),
  name: z
    .string({ message: "Informe o Nome" })
    .min(1, { message: "Informe pelo menos um caractere" }),
  description: z.string().optional(),
  urlImage: z.string().optional(),
  order: z
    .number({ message: "Informe a Ordem do Produto" })
    .min(1, "Informe uma ordem válida"),
  price: z
    .number({ message: "Informe o Preço" })
    .min(0.01, { message: "Informe um Preço válido" }),
  categoryId: z
    .string({ message: "Informe a Categoria" })
    .min(1, "Informe uma Categoria válida"),
});

type DataType = z.infer<typeof schema>;

interface Form {
  id: string | null;
  onClose: () => void;
}

export default function Form({ id, onClose }: Form) {
  const { mutateAsync: mutateAsyncCreate, isPending: isPendingCreate } =
    useProductCreate();
  const { mutateAsync: mutateAsyncUpdate, isPending: isPendingUpdate } =
    useProductUpdate();

  const { data, isLoading: _isLoading, isFetching } = useProductGetById({ id });

  const isLoading = _isLoading || isFetching;

  const isSubmitting = isPendingCreate || isPendingUpdate;

  const { FormProvider, handleSubmit, reset } = useValidateForm({
    schema,
    defaultValues: data || {},
  });

  useEffect(() => {
    reset(data);
  }, [data, reset]);

  async function onSubmit(d: DataType) {
    if (d.id) {
      await mutateAsyncUpdate({
        params: { id: d.id },
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
      title="Cadastro de Produto"
      isLoading={isSubmitting}
      onClose={() => onClose()}
      onSubmit={handleSubmit(onSubmit)}
    >
      <FormProvider>
        <Stack gap={1}>
          <TextField required label="Nome" name="name" />
          <TextField label="Descrição" name="description" />
          <TextField
            required
            type="number"
            label="Ordem do Produto"
            name="order"
          />
          <CurrencyTextField required label="Preço" name="price" prefix="R$ " />
          <AutoCompleteCategory name="categoryId" />
          <Box height={4}>{isLoading && <LinearProgress />}</Box>
        </Stack>
      </FormProvider>
    </ActionDialog>
  );
}
