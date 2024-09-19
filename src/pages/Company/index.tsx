import { Box, CircularProgress, LinearProgress, Stack } from "@mui/material";
import { LoadingButton } from "@mui/lab";

import PageHeader from "@components/PageHeader";
import TextField from "@components/TextField";

import useValidateForm from "@hooks/useValidateForm";

import { z } from "zod";

import { useCompanyGetCompany } from "@libs/queries/company/useCompanyGetCompany";
import { useCompanyUpdate } from "@libs/queries/company/useCompanyUpdate";

const schema = z.object({
  id: z.string().optional(),
  name: z
    .string({ message: "Informe o Nome" })
    .min(1, "Informe pelo menos um caractere"),
  description: z.string().optional(),
  urlImage: z.string().optional(),
});

type DataType = z.infer<typeof schema>;

export default function Company() {
  const { data, isLoading, isFetching } = useCompanyGetCompany();

  const { mutateAsync: mutateAsyncUpdate, isPending: isPendingUpdate } =
    useCompanyUpdate();

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
    }
  }

  return (
    <Stack gap={1} p={2}>
      <PageHeader
        title="Empresa"
        renderRight={isLoading && <CircularProgress size={25} />}
      />

      <LinearProgress
        variant={isFetching ? "indeterminate" : "determinate"}
        value={0}
      />

      <FormProvider>
        <Stack gap={1}>
          <TextField required label="Nome" name="name" />
          <TextField label="Descrição" name="description" />
          <TextField label="URL da Imagem" name="urlImage" />
        </Stack>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <LoadingButton
            variant="contained"
            loading={isPendingUpdate}
            onClick={handleSubmit(onSubmit)}
          >
            Salvar
          </LoadingButton>
        </Box>
      </FormProvider>
    </Stack>
  );
}
