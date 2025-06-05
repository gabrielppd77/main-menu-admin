import { Avatar, Box, CircularProgress } from "@mui/material";

import { Upload } from "@mui/icons-material";
import VisuallyHiddenInput from "@components/VisuallyHiddenInput";

interface UploadImageProps {
  src?: string;
  alt?: string;
  isLoading?: boolean;
  onChange: (value: FileList) => void;
}

export default function UploadImage({
  src,
  alt,
  isLoading,
  onChange,
}: UploadImageProps) {
  return (
    <Box
      sx={{
        position: "relative",
        display: "inline-block",
        height: 100,
        width: 100,
      }}
    >
      <Avatar
        alt={alt}
        src={src}
        sx={{
          height: 100,
          width: 100,
        }}
      />
      <Box
        component="label"
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          opacity: isLoading ? 1 : 0,
          borderRadius: "50%",
          transition: "opacity 0.2s",
          ":hover": {
            cursor: "pointer",
            opacity: 1,
          },
        }}
      >
        {isLoading ? (
          <CircularProgress />
        ) : (
          <Upload sx={{ color: "white", fontSize: 32 }} />
        )}

        <VisuallyHiddenInput
          type="file"
          accept=".jpg, .jpeg, .png"
          onChange={(event) => {
            const files = event.target.files;
            if (files) {
              onChange(files);
            }
          }}
        />
      </Box>
    </Box>
  );
}
