import { Stack } from "@mui/material";

import TextField from "@components/TextField";
import ActionDialog from "@components/ActionDialog";
import CurrencyTextField from "@components/CurrencyTextField";
import AutoCompleteCategory from "@components/AutoCompleteCategory";

import { useProductCreate } from "@libs/queries/product/useProductCreate";
import { useProductUpdate } from "@libs/queries/product/useProductUpdate";
import { ProductResponseDTO } from "@libs/queries/product/dtos/ProductResponseDTO";

import { z } from "zod";

import useValidateForm from "@hooks/useValidateForm";

const schema = z.object({
  id: z.string().optional(),
  name: z
    .string({ message: "Informe o Nome" })
    .min(1, { message: "Informe pelo menos um caractere" }),
  description: z
    .string({ message: "Informe a Descrição" })
    .min(1, { message: "Informe pelo menos um caractere" }),
  imageUrl: z.string().optional(),
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
  data?: ProductResponseDTO;
  onClose: () => void;
}

export default function Form({ data, onClose }: Form) {
  const { mutateAsync: mutateAsyncCreate, isPending: isPendingCreate } =
    useProductCreate();
  const { mutateAsync: mutateAsyncUpdate, isPending: isPendingUpdate } =
    useProductUpdate();

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
      title="Cadastro de Produto"
      isLoading={isLoading}
      onClose={() => onClose()}
      onSubmit={handleSubmit(onSubmit)}
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
          <TextField label="URL da Imagem" name="imageUrl" />
          <CurrencyTextField required label="Preço" name="price" prefix="R$ " />
          <AutoCompleteCategory name="categoryId" />
        </Stack>
      </FormProvider>
    </ActionDialog>
  );
}
