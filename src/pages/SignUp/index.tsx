import { Avatar, Grid, Box, Link, Typography, Container } from "@mui/material";
import { LockOutlined as LockOutlinedIcon } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";

import TextField from "@components/TextField";

import { z } from "zod";

import useValidateForm from "@hooks/useValidateForm";
import { useNavigate } from "react-router-dom";
import useAuth from "@hooks/useAuth";

import { useUserRegister } from "@libs/queries/user/useUserRegister";

const schema = z
  .object({
    email: z
      .string({ message: "Informe o Email" })
      .min(1, { message: "Informe pelo menos um caracter" })
      .email("Informe um Email válido"),
    companyName: z
      .string({ message: "Informe o Nome da Empresa" })
      .min(1, { message: "Informe pelo menos um caracter" }),
    password: z
      .string({ message: "Informe a senha" })
      .min(1, { message: "Informe pelo menos um caracter" }),
    confirmPassword: z
      .string({ message: "Informe a confirmação da senha" })
      .min(1, { message: "Informe pelo menos um caracter" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não correspondem",
    path: ["confirmPassword"],
  });

export default function SignUp() {
  const { mutateAsync, isPending } = useUserRegister();

  const { setToken } = useAuth();
  const navigate = useNavigate();

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
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Cadastre
        </Typography>
        <Box sx={{ mt: 3 }}>
          <FormProvider>
            <Grid container spacing={1}>
              <Grid item xs={12}>
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
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="companyName"
                  name="companyName"
                  required
                  variant="outlined"
                  sx={{ ariaLabel: "companyName" }}
                  label="Nome da Empresa"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Senha"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  name="password"
                  placeholder="••••••"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="confirmPassword"
                  label="Confirme a senha"
                  type="password"
                  id="confirmPassword"
                  autoComplete="new-password"
                  placeholder="••••••"
                />
              </Grid>
            </Grid>
          </FormProvider>
          <LoadingButton
            loading={isPending}
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            fullWidth
            onClick={handleSubmit(async (data) => {
              const response = await mutateAsync(data);
              setToken(response.token);
              navigate("/home");
            })}
          >
            Cadastrar
          </LoadingButton>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/" variant="body2">
                Já tem uma conta? Entre
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
