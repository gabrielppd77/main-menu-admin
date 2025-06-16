import { Grid, LinearProgress, Stack } from "@mui/material";
import UploadImage from "@modules/core/components/UploadImage";
import { TextField } from "@modules/core/components/TextField";
import SimpleLoadingPage from "@modules/core/components/SimpleLoadingPage";

import { useUploadImage } from "../hooks/useUploadImage";
import { useGetFormData, useUpdateGetFormData } from "../hooks/useGetFormData";
import { useValidateForm } from "@hooks/useValidateForm";
import { z } from "zod";

const schema = z.object({
  name: z.string({ message: "Informe o Nome da loja" }),
  description: z.string({ message: "Informe a Descrição da loja" }).optional(),
  path: z.string({ message: "Informe o Caminho para acesso da loja" }),
});

export default function MainCompany() {
  const { data, isLoading, isFetching } = useGetFormData();
  const { mutateAsync, isPending } = useUploadImage();
  const { handleChange } = useUpdateGetFormData();
  const { FormProvider } = useValidateForm({
    schema,
    values: data,
  });

  async function handleUploadImage(files: FileList) {
    const formData = new FormData();
    formData.append("file", files[0]);
    const imageUrl = await mutateAsync({
      data: formData,
    });
    handleChange({ urlImage: imageUrl });
  }

  if (isLoading) {
    return <SimpleLoadingPage />;
  }

  return (
    <div className="p-2">
      <LinearProgress
        className={`invisible w-full ${isFetching && "visible"}`}
      />

      <Grid container spacing={2} className="p-2">
        <Grid size={{ xs: 12, sm: 7, md: 8, lg: 10 }}>
          <FormProvider>
            <Stack spacing={1} className="flex-1">
              <TextField
                label="Nome da loja"
                name="name"
                className="max-w-2xl"
              />
              <TextField
                label="Caminho para acesso da loja"
                name="path"
                className="max-w-2xl"
              />
              <TextField
                label="Descrição da loja"
                name="description"
                className="max-w-2xl"
                multiline
                rows={4}
              />
            </Stack>
          </FormProvider>
        </Grid>

        <Grid size={{ xs: 12, sm: 5, md: 4, lg: 2 }}>
          <div className="flex flex-col gap-2">
            <p className="text-lg font-medium">Foto principal</p>
            <UploadImage
              onChange={handleUploadImage}
              src={data?.urlImage}
              alt="Foto principal"
              isLoading={isPending}
            />
          </div>
        </Grid>
      </Grid>
    </div>
  );
}
