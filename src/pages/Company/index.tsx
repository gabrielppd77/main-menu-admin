import { useEffect } from "react";

import { Box, CircularProgress, LinearProgress, Stack } from "@mui/material";
import { Delete, QrCode2 } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";

import PageHeader from "@components/PageHeader";
import TextField from "@components/TextField";
import UploadImage from "@components/UploadImage";

import useValidateForm from "@hooks/useValidateForm";

import { z } from "zod";
import { confirmPassword, confirmMessage } from "@libs/alert";

import { useCompanyGetCompany } from "@libs/queries/company/useCompanyGetCompany";
import { useCompanyUpdate } from "@libs/queries/company/useCompanyUpdate";
import { useUserRemoveAccount } from "@libs/queries/user/useUserRemoveAccount";
import { useCompanyGetQRCode } from "@libs/queries/company/useCompanyGetQRCode";
import { useCompanyUpdateImage } from "@libs/queries/company/useCompanyUpdateImage";

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
  description: z.string().optional().nullable(),
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
  const { mutateAsync: mutateAsyncGetQRCode, isPending: isPendingGetQRCode } =
    useCompanyGetQRCode();
  const {
    mutateAsync: mutateAsyncUpdateImage,
    isPending: isPendingUpdateImage,
  } = useCompanyUpdateImage();

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

  async function handleUpdateImage(file: File) {
    const formData = new FormData();
    formData.append("file", file);
    await mutateAsyncUpdateImage({
      data: formData,
      id: data?.id || "",
    });
  }

  return (
    <Stack gap={1} p={2}>
      <PageHeader
        title="Loja"
        renderRight={isLoading && <CircularProgress size={25} />}
      />

      <LinearProgress
        variant={isFetching ? "indeterminate" : "determinate"}
        value={0}
      />

      <FormProvider>
        <Stack gap={1}>
          <Stack gap={1} flexDirection="row" alignItems="center">
            <UploadImage
              alt="Imagem da loja"
              src={data?.urlImage}
              onChange={(value) => handleUpdateImage(value[0])}
              isLoading={isPendingUpdateImage}
            />

            <Stack gap={1} width="100%">
              <TextField required label="Nome" name="name" />
              <TextField
                required
                label="Caminho para acesso do site"
                name="path"
              />
            </Stack>
          </Stack>

          <TextField
            label="Descrição"
            name="description"
            inputProps={{ maxLength: 500 }}
            rows={2}
            multiline
          />

          <Stack gap={1}>
            <Box>
              <LoadingButton
                loading={isPendingGetQRCode}
                onClick={async () => await mutateAsyncGetQRCode()}
                variant="outlined"
                startIcon={<QrCode2 />}
              >
                Gerar QR Code da Loja
              </LoadingButton>
            </Box>

            <Box>
              <LoadingButton
                variant="contained"
                color="error"
                startIcon={<Delete />}
                loading={isPendingRemoveAccount}
                onClick={handleRemoveAccount}
              >
                Deletar Loja
              </LoadingButton>
            </Box>
          </Stack>
        </Stack>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <LoadingButton
            variant="contained"
            type="submit"
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
