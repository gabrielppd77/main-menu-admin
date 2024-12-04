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
  name: z.string({ message: "Informe o Nome" }).min(1),
  description: z.string().optional(),
  order: z.number({ message: "Informe a Ordem do Produto" }).min(1),
  price: z.number({ message: "Informe o Preço" }),
  categoryId: z.string({ message: "Informe a Categoria" }).min(1),
});

type DataType = z.infer<typeof schema>;

interface FormProps {
  id: string | null;
  onClose: () => void;
}

export default function Form({ id, onClose }: FormProps) {
  const { data, isLoading: _isLoading, isFetching } = useProductGetById({ id });

  const isLoading = _isLoading || isFetching;

  const { FormProvider, handleSubmit, reset } = useValidateForm({
    schema,
    defaultValues: data,
  });

  useEffect(() => {
    reset(data);
  }, [data, reset]);

  const { mutateAsync: mutateAsyncCreate, isPending: isPendingCreate } =
    useProductCreate();
  const { mutateAsync: mutateAsyncUpdate, isPending: isPendingUpdate } =
    useProductUpdate();

  const isSubmitting = isPendingCreate || isPendingUpdate;

  async function onSubmit(d: DataType) {
    if (id) {
      await mutateAsyncUpdate({
        params: { id },
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
      <Box height={4}>{isLoading && <LinearProgress />}</Box>
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
        </Stack>
      </FormProvider>
    </ActionDialog>
  );
}
