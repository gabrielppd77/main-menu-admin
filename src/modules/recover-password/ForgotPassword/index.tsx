import {
  Avatar,
  Link,
  Grid,
  Box,
  Typography,
  Container,
  Stack,
  Divider,
} from "@mui/material";
import { LockOutlined as LockOutlinedIcon } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { TextField } from "@modules/core/components/TextField";

import { useValidateForm } from "@hooks/useValidateForm";
import { useNavigate } from "react-router-dom";
import { useRecoverPassword } from "../hooks/useRecoverPassword";

import { routePaths } from "@providers/RouterProvider";
import { z } from "zod";
import { confirmMessage } from "@libs/alert";

const schema = z.object({
  email: z
    .string({ message: "Informe o Email" })
    .min(1)
    .email("Informe um Email válido"),
});

export default function ForgotPassword() {
  const navigate = useNavigate();

  const { mutateAsync, isPending } = useRecoverPassword();

  const { FormProvider, handleSubmit } = useValidateForm({
    schema,
  });

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
        className="flex gap-4"
      >
        <div className="flex flex-col items-center">
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Esqueceu a senha?
          </Typography>
        </div>

        <Divider className="w-full" />

        <p className="text-center">
          Informe seu email para receber as instruções de recuperação de senha
        </p>

        <Divider className="w-full" />

        <Box sx={{ mt: 1, width: "100%" }}>
          <FormProvider>
            <Stack gap={1}>
              <TextField
                id="email"
                type="email"
                name="email"
                placeholder="seuemail@email.com"
                autoComplete="email"
                autoFocus
                required
                variant="outlined"
                sx={{ ariaLabel: "email" }}
                label="Email"
              />
            </Stack>

            <LoadingButton
              loading={isPending}
              type="submit"
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              fullWidth
              onClick={handleSubmit(async (data) => {
                await mutateAsync(data.email);
                confirmMessage(() => navigate(routePaths.initial), {
                  title: "Email de recuperação enviado com sucesso",
                  text: "Você deve receber as instruções para recuperação de senha em poucos instantes em seu email",
                });
              })}
            >
              Enviar recuperação de senha
            </LoadingButton>
          </FormProvider>

          <Grid container justifyContent="flex-end">
            <Grid>
              <Link
                className="hover:cursor-pointer"
                onClick={() => navigate(routePaths.initial)}
                variant="body2"
              >
                Voltar
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
