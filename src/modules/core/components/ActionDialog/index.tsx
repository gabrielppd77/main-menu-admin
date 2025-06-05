import React from "react";

import Dialog, { DialogProps } from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";

import { TransitionProps } from "@mui/material/transitions";
import {
  Breakpoint,
  Button,
  DialogActions,
  IconButton,
  Theme,
  Tooltip,
  useMediaQuery,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";

import { Close } from "@mui/icons-material";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<DialogProps, "div">;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface ActionDialogProps {
  title: string;
  maxWidth?: Breakpoint;
  children: React.ReactNode;
  isOpen?: boolean;
  onClose: () => void;
  onSubmit: () => void;
  isLoading: boolean;
}

export default function ActionDialog({
  title,
  maxWidth = "xs",
  children,
  isOpen = true,
  onClose,
  onSubmit,
  isLoading,
}: ActionDialogProps) {
  const fullScreen = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("sm")
  );
  return (
    <Dialog
      fullScreen={fullScreen}
      open={isOpen}
      TransitionComponent={Transition}
      keepMounted
      onClose={() => onClose()}
      aria-describedby="action-dialog"
      fullWidth
      maxWidth={maxWidth}
    >
      <DialogTitle>{title}</DialogTitle>
      <Tooltip title="Fechar">
        <IconButton
          aria-label="close"
          onClick={() => onClose()}
          sx={{
            position: "absolute",
            right: 12,
            top: 12,
          }}
        >
          <Close />
        </IconButton>
      </Tooltip>
      <DialogContent dividers>{children}</DialogContent>
      <DialogActions>
        <Button fullWidth variant="outlined" onClick={() => onClose()}>
          Cancelar
        </Button>
        <LoadingButton
          fullWidth
          variant="contained"
          onClick={() => onSubmit()}
          loading={isLoading}
        >
          Salvar
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
}
