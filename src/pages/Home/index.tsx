import { Stack } from "@mui/material";

import PageHeader from "@components/PageHeader";

export default function Home() {
  return (
    <Stack gap={1} p={2}>
      <PageHeader title="Bem vindo" />
    </Stack>
  );
}
