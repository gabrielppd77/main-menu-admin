import { useEffect } from "react";

import { Box, CircularProgress, LinearProgress, Stack } from "@mui/material";
import { LoadingButton } from "@mui/lab";

import PageHeader from "@components/PageHeader";
import TextField from "@components/TextField";

import useValidateForm from "@hooks/useValidateForm";

import { z } from "zod";
import { confirmPassword, confirmMessage } from "@libs/alert";

import { useCompanyGetCompany } from "@libs/queries/company/useCompanyGetCompany";
import { useCompanyUpdate } from "@libs/queries/company/useCompanyUpdate";
import { useUserRemoveAccount } from "@libs/queries/user/useUserRemoveAccount";
import { useNavigate } from "react-router-dom";
import useAuth from "@hooks/useAuth";

const schema = z.object({
  id: z.string().optional(),
  name: z
    .string({ message: "Informe o Nome" })
    .min(1, "Informe pelo menos um caractere"),
  path: z
    .string({ message: "Informe o caminho para acessar o seu site" })
    .min(1, "Informe pelo menos um caractere"),
  description: z.string().optional(),
  urlImage: z.string().optional(),
});

type DataType = z.infer<typeof schema>;

export default function Company() {
  const { data, isLoading, isFetching } = useCompanyGetCompany();
  const { setToken } = useAuth();
  const navigate = useNavigate();

  const { mutateAsync: mutateAsyncUpdate, isPending: isPendingUpdate } =
    useCompanyUpdate();
  const {
    mutateAsync: mutateAsyncRemoveAccount,
    isPending: isPendingRemoveAccount,
  } = useUserRemoveAccount();

  const { FormProvider, handleSubmit, reset } = useValidateForm({
    schema,
    defaultValues: data || {},
  });

  useEffect(() => {
    if (data) {
      reset(data);
    }
  }, [data, reset]);

  async function onSubmit(d: DataType) {
    if (d.id) {
      await mutateAsyncUpdate({
        id: d.id,
        data: d,
      });
    }
  }

  function handleRemoveAccount() {
    confirmPassword(async (password) => {
      await mutateAsyncRemoveAccount({
        params: {
          password,
        },
      });
      confirmMessage(
        () => {
          setToken("");
          navigate("/");
        },
        {
          title: "Conta removida com sucesso!",
          text: "Você será redirecionado para a página inicial",
        }
      );
    });
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
          <TextField required label="Caminho para acesso do site" name="path" />
          <TextField label="Descrição" name="description" />
          <TextField label="URL da Imagem" name="urlImage" />

          <Box>
            <LoadingButton
              variant="contained"
              color="error"
              loading={isPendingRemoveAccount}
              onClick={handleRemoveAccount}
            >
              Deletar conta
            </LoadingButton>
          </Box>
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
