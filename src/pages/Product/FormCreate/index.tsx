import { Stack } from "@mui/material";

import TextField from "@components/TextField";
import ActionDialog from "@components/ActionDialog";
import CurrencyTextField from "@components/CurrencyTextField";
import AutoCompleteCategory from "@components/AutoCompleteCategory";

import { useProductCreate } from "@libs/queries/product/useProductCreate";

import { z } from "zod";

import useValidateForm from "@hooks/useValidateForm";

const schema = z.object({
  name: z.string().min(1, { message: "Informe o Nome" }),
  description: z.string().min(1, { message: "Informe a Descrição" }),
  imageUrl: z.string(),
  order: z.number().min(1, { message: "Informe a Ordem do Produto" }),
  price: z.number().min(0.01, { message: "Informe o Preço" }),
  categoryId: z.string().min(1, { message: "Informe a Categoria" }),
});

interface FormCreateProps {
  onClose: () => void;
}

export default function FormCreate({ onClose }: FormCreateProps) {
  const { mutateAsync, isPending } = useProductCreate();

  const { FormProvider, handleSubmit } = useValidateForm({
    schema,
    defaultValues: {
      name: "",
      description: "",
      imageUrl: "",
      order: 0,
      price: 0,
      categoryId: "",
    },
  });

  return (
    <ActionDialog
      title="Cadastro de Produto"
      isLoading={isPending}
      onClose={() => onClose()}
      onSubmit={handleSubmit(async (data) => {
        await mutateAsync({ data });
        onClose();
      })}
    >
      <FormProvider>
        <Stack gap={2}>
          <TextField required label="Nome" name="name" />
          <TextField required label="Descrição" name="description" />
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
