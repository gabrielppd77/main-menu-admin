import { useMutation } from "@tanstack/react-query";

import api from "@libs/api";

import { notifyUpdate } from "@libs/notification";
import { fireError } from "@libs/alert";

interface RequestProps {
  data: FormData;
}

export function useUploadImage() {
  async function handleRequest({ data }: RequestProps) {
    await api.patch("/companies/upload-image", data);
  }

  return useMutation({
    mutationFn: handleRequest,
    onSuccess: () => {
      notifyUpdate();
    },
    onError: fireError,
  });
}
