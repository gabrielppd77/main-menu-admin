import ActionDialog from "@modules/core/components/ActionDialog";
import { TextField } from "@modules/core/components/TextField";

import { useValidateForm } from "@modules/core/hooks/useValidateForm";

import { z } from "zod";

const schema = z.object({
  //   id: z.string().optional(),
  name: z.string({ message: "Informe o Nome" }).min(1),
  //   order: z
  //     .number({ message: "Informe a Ordem da Categoria" })
  //     .min(1, "Informe uma ordem válida"),
});

type DataType = z.infer<typeof schema>;

interface FormProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Form({ isOpen, onClose }: FormProps) {
  const { FormProvider, handleSubmit } = useValidateForm({
    schema,
    values: {},
  });

  async function onSubmit(d: DataType) {
    // if (d.id) {
    //   await mutateAsyncUpdate({
    //     id: d.id,
    //     data: d,
    //   });
    // } else {
    //   await mutateAsyncCreate({
    //     data: d,
    //   });
    // }
    onClose();
  }

  return (
    <ActionDialog
      title="Cadastro de Categoria"
      isOpen={isOpen}
      isLoading={false}
      onClose={() => onClose()}
      onSubmit={handleSubmit(onSubmit)}
    >
      <FormProvider>
        <TextField required label="Nome" name="name" autoFocus />
      </FormProvider>
    </ActionDialog>
  );
}
