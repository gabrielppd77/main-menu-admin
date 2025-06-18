import { Button, Grid, LinearProgress, Stack } from "@mui/material";

import RemoveAccount from "./RemoveAccount";
import MainPhoto from "./MainPhoto";

import {
  useGetGeneralData,
  useUpdateGetGeneralData,
} from "../hooks/useGetGeneralData";
import { useValidateForm } from "@hooks/useValidateForm";
import { z } from "zod";
import { TextField } from "@modules/core/components/TextField";
import SimpleLoadingPage from "@modules/core/components/SimpleLoadingPage";
import { useUpdateFormData } from "../hooks/useUpdateFormData";

const schema = z.object({
  name: z.string({ message: "Informe o Nome" }).min(1),
});

type DataType = z.infer<typeof schema>;

export default function Profile() {
  const { data, isLoading, isFetching } = useGetGeneralData();
  const { mutateAsync, isPending } = useUpdateFormData();
  const { FormProvider, handleSubmit } = useValidateForm({
    schema,
    values: data,
  });
  const { handleChange } = useUpdateGetGeneralData();

  async function onSubmit(d: DataType) {
    await mutateAsync({
      data: d,
    });
    handleChange(d);
  }

  if (isLoading) {
    return <SimpleLoadingPage />;
  }

  return (
    <Stack>
      <LinearProgress
        className={`invisible w-full ${isFetching && "visible"}`}
      />
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, sm: 7, md: 8, lg: 10 }}>
          <FormProvider>
            <Stack spacing={1} className="flex-1">
              <TextField label="Nome" name="name" className="max-w-2xl" />
            </Stack>
          </FormProvider>

          <div className="mt-2">
            <Button onClick={handleSubmit(onSubmit)} loading={isPending}>
              Salvar Alterações
            </Button>
          </div>
        </Grid>

        <Grid size={{ xs: 12, sm: 5, md: 4, lg: 2 }}>
          <MainPhoto urlImage={data?.urlImage} />
        </Grid>
      </Grid>
      <RemoveAccount />
    </Stack>
  );
}
