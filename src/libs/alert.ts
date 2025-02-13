import Swal, { SweetAlertIcon } from "sweetalert2";

import { AxiosError, HttpStatusCode } from "axios";

interface ResponseData {
  status: HttpStatusCode;
  detail: string | string[];
  title?: string;
}

export function extractError(err: unknown) {
  let title = "Oops...";
  let text = "Algo deu errado!";
  let icon: SweetAlertIcon = "error";

  if (err instanceof AxiosError) {
    const data: ResponseData | undefined = err?.response?.data;
    if (data && data.detail) {
      title = data.status + " " + (data.title || title);
      text =
        typeof data.detail === "string" ? data.detail : data.detail.join(",");
      icon = data.status === HttpStatusCode.BadRequest ? "warning" : "error";
    }
  }

  Swal.fire({
    icon,
    title,
    text,
    confirmButtonText: "Beleza!",
    showCloseButton: true,
  });
}

export function confirmDelete(onConfirm: () => Promise<void>) {
  Swal.fire({
    icon: "question",
    title: "Você realmente quer remover?",
    text: "As alterações não poderão ser desfeitas",
    showConfirmButton: true,
    showCancelButton: true,
    reverseButtons: true,
    confirmButtonText: "Sim",
    confirmButtonColor: "red",
    cancelButtonText: "Não",
    showLoaderOnConfirm: true,
    preConfirm: async () => {
      await onConfirm();
    },
    allowOutsideClick: () => !Swal.isLoading(),
  });
}

export function confirmPassword(
  onConfirm: (password: string) => Promise<void>
) {
  Swal.fire({
    icon: "question",
    title: "Você realmente quer remover?",
    text: "As alterações não poderão ser desfeitas, confirme digitando a sua senha",
    showConfirmButton: true,
    showCancelButton: true,
    reverseButtons: true,
    confirmButtonText: "Sim",
    confirmButtonColor: "red",
    cancelButtonText: "Não",
    showLoaderOnConfirm: true,
    preConfirm: async (password: string) => {
      await onConfirm(password);
    },
    allowOutsideClick: () => !Swal.isLoading(),
    input: "password",
    inputPlaceholder: "Digite sua senha",
    inputAttributes: {
      autocapitalize: "off",
      autocorrect: "off",
    },
  });
}

export function confirmMessage(
  onClose: () => void,
  { title, text }: { title: string; text: string }
) {
  Swal.fire({
    icon: "success",
    title,
    text,
    showConfirmButton: true,
    confirmButtonText: "Beleza!",
    didClose: () => onClose(),
  });
}
