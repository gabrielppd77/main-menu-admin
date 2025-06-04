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
import { TextField } from "@components/TextField";

import { z } from "zod";
import { routePaths } from "@providers/RouterProvider";

import { useValidateForm } from "@hooks/useValidateForm";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@hooks/useAuth";
import { useLogin } from "../hooks/useLogin";
import { TextFieldPassword } from "@components/TextFieldPassword";

const schema = z.object({
  email: z
    .string({ message: "Informe o Email" })
    .min(1)
    .email("Informe um Email válido"),
  password: z.string({ message: "Informe a senha" }).min(1),
});

export default function Login() {
  const { mutateAsync, isPending } = useLogin();

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
              <TextFieldPassword
                name="password"
                autoComplete="current-password"
                required
                label="Senha"
              />
            </Stack>

            <LoadingButton
              loading={isPending}
              type="submit"
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              fullWidth
              onClick={handleSubmit(async (data) => {
                const response = await mutateAsync(data);
                setToken(response.token);
                navigate(routePaths.home);
              })}
            >
              Entre
            </LoadingButton>
          </FormProvider>

          <Grid container>
            <Grid>
              <Link
                className="hover:cursor-pointer"
                onClick={() => navigate(routePaths.register)}
                variant="body2"
              >
                Não tem uma conta? Cadastre
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
