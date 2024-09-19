import {
  Avatar,
  Link,
  Grid,
  Box,
  Typography,
  Container,
  Stack,
} from "@mui/material";
import { LockOutlined as LockOutlinedIcon } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";

import TextField from "@components/TextField";

import useValidateForm from "@hooks/useValidateForm";
import { z } from "zod";

import { useNavigate } from "react-router-dom";
import useAuth from "@hooks/useAuth";

import { useUserLogin } from "@libs/queries/user/useUserLogin";

const schema = z.object({
  email: z
    .string()
    .min(1, { message: "Informe o Email" })
    .email("Informe um Email válido"),
  password: z.string().min(1, { message: "Informe a Senha" }),
});
export default function SignIn() {
  const { mutateAsync, isPending } = useUserLogin();

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
          Entre
        </Typography>
        <Box sx={{ mt: 1, width: "100%" }}>
          <FormProvider>
            <Stack gap={2}>
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
              <TextField
                name="password"
                placeholder="••••••"
                type="password"
                id="password"
                autoComplete="current-password"
                autoFocus
                required
                variant="outlined"
                label="Senha"
              />
            </Stack>
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
            Entre
          </LoadingButton>

          <Grid container>
            <Grid item xs></Grid>
            <Grid item>
              <Link onClick={() => navigate("/sign-up")} variant="body2">
                {"Não tem uma conta? Cadastre"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
