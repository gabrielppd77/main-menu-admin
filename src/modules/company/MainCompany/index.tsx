import { Grid } from "@mui/material";

import UploadImage from "@modules/core/components/UploadImage";

import { useUploadImage } from "../hooks/useUploadImage";

export default function MainCompany() {
  const { mutateAsync, isPending } = useUploadImage();

  async function handleUploadImage(files: FileList) {
    const formData = new FormData();
    formData.append("file", files[0]);
    await mutateAsync({
      data: formData,
    });
  }

  return (
    <div>
      <Grid container>
        <Grid size={{ xs: 12, sm: 4 }}>
          <UploadImage
            onChange={handleUploadImage}
            src="rice-and-beans-logo.svg"
            alt="Loja nome"
            isLoading={isPending}
          />
        </Grid>
      </Grid>
    </div>
  );
}
