import { Container } from "@mui/material";

import PageHeader from "@modules/core/components/PageHeader";

export default function Home() {
  return (
    <Container maxWidth="xl" className="p-2">
      <PageHeader title="Bem vindo" />
    </Container>
  );
}
