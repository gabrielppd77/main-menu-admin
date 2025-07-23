import { XDialog } from "@modules/core/@components/XDialog";
import { TextField } from "@modules/core/@components/TextField";
import { CurrencyTextField } from "@modules/core/@components/CurrencyTextField";
import { AutoCompleteCategory } from "@modules/core/@components/AutoCompleteCategory";

import { FormValidateProvider, z } from "@modules/core/@validation";

import { useCreate } from "../../@hooks/useCreate";
import { useUpdate } from "../../@hooks/useUpdate";
import { useUpdateListAll } from "../../@hooks/useListAll";
import { Stack } from "@mui/material";

const schema = z.object({
  id: z.string().nullish(),
  name: z.string({ message: "Informe o nome" }).min(1),
  description: z.string().nullish(),
  price: z.number({ message: "Informe o preço" }),
  categoryId: z.string().nullish(),
});

export type FormDataType = z.infer<typeof schema>;

interface FormProps {
  isOpen: boolean;
  data: FormDataType | null;
  onClose: () => void;
}

export function Form({ isOpen, data, onClose }: FormProps) {
  const { mutateAsync: mutateAsyncCreate, isPending: isPendingCreate } =
    useCreate();
  const { mutateAsync: mutateAsyncUpdate, isPending: isPendingUpdate } =
    useUpdate();
  const { handleChange } = useUpdateListAll();

  const isPending = isPendingCreate || isPendingUpdate;

  async function handleSubmit(d: FormDataType) {
    if (d.id) {
      await mutateAsyncUpdate({ productId: d.id, ...d });
    } else {
      await mutateAsyncCreate(d);
    }
    handleChange();
    onClose();
  }

  return (
    <XDialog.Root
      isOpen={isOpen}
      onClose={() => onClose()}
      isLoading={isPending}
    >
      <FormValidateProvider
        schema={schema}
        values={data}
        onSubmit={handleSubmit}
      >
        <XDialog.Title title="Cadastro de produto" />
        <XDialog.Content>
          <Stack gap={1}>
            <TextField required label="Nome" name="name" autoFocus />
            <CurrencyTextField
              required
              label="Preço"
              name="price"
              prefix="R$ "
            />
            <AutoCompleteCategory name="categoryId" />
            <TextField
              label="Descrição"
              name="description"
              multiline
              rows={4}
              slotProps={{
                htmlInput: {
                  maxLength: 500,
                },
              }}
            />
          </Stack>
        </XDialog.Content>
        <XDialog.Actions />
      </FormValidateProvider>
    </XDialog.Root>
  );
}
