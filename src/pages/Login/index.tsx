import { Avatar, Paper, Box, Grid, Typography } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { LoadingButton } from "@mui/lab";

import TextFieldControl from "@components/TextFieldControl";

import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";

import { useUserLogin } from "@libs/queries/user/useUserLogin";
import useAuth from "@hooks/useAuth";
import { useNavigate } from "react-router-dom";

const schema = z.object({
  email: z
    .string()
    .min(1, { message: "Informe o Email" })
    .email("Informe um Email válido"),
  password: z.string().min(1, { message: "Informe a Senha" }),
});

export default function Login() {
  const { mutateAsync, isPending } = useUserLogin();
  const { setToken } = useAuth();
  const navigate = useNavigate();

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          // backgroundImage:
          //   'url("/static/images/templates/templates-images/sign-in-side-bg.png")',

          backgroundColor: (t) =>
            t.palette.mode === "light"
              ? t.palette.grey[50]
              : t.palette.grey[900],
          backgroundSize: "cover",
          backgroundPosition: "left",
        }}
      />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={1} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
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
          <Box sx={{ mt: 1 }}>
            <FormProvider {...form}>
              <TextFieldControl
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextFieldControl
                margin="normal"
                required
                fullWidth
                name="password"
                label="Senha"
                type="password"
                id="password"
                autoComplete="current-password"
              />
            </FormProvider>
            <LoadingButton
              loading={isPending}
              variant="contained"
              fullWidth
              sx={{ mt: 2, mb: 2 }}
              onClick={form.handleSubmit(async (data) => {
                const response = await mutateAsync(data);
                setToken(response.token);
                navigate("/home", { replace: true });
              })}
            >
              Entrar
            </LoadingButton>
            {/* <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Esqueceu a senha?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Não tem uma conta? Cadastre-se"}
                </Link>
              </Grid>
            </Grid> */}
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}
