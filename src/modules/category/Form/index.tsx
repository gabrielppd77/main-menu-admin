import ActionDialog from "@modules/core/components/ActionDialog";
import { TextField } from "@modules/core/components/TextField";

import { useValidateForm } from "@modules/core/hooks/useValidateForm";
import { z } from "zod";

import { useCreate } from "../@hooks/useCreate";
import { useUpdate } from "../@hooks/useUpdate";
import { useUpdateListAll } from "../@hooks/useListAll";

const schema = z.object({
  id: z.string().optional(),
  name: z.string().min(1),
});

export type FormDataType = z.infer<typeof schema>;

interface FormProps {
  data: FormDataType | null;
  onClose: () => void;
}

export default function Form({ data, onClose }: FormProps) {
  const { mutateAsync: mutateAsyncCreate, isPending: isPendingCreate } =
    useCreate();
  const { mutateAsync: mutateAsyncUpdate, isPending: isPendingUpdate } =
    useUpdate();
  const { handleChange } = useUpdateListAll();

  const isPending = isPendingCreate || isPendingUpdate;

  const { FormProvider, handleSubmit } = useValidateForm({
    schema,
    values: data || { id: "", name: "" },
  });

  async function onSubmit(d: FormDataType) {
    if (d.id) {
      await mutateAsyncUpdate({ categoryId: d.id, name: d.name });
    } else {
      await mutateAsyncCreate(d);
    }
    handleChange();
    onClose();
  }

  return (
    <ActionDialog
      title="Cadastro de categoria"
      isLoading={isPending}
      onClose={() => onClose()}
      onSubmit={handleSubmit(onSubmit)}
    >
      <FormProvider>
        <TextField required label="Nome" name="name" autoFocus />
      </FormProvider>
    </ActionDialog>
  );
}
