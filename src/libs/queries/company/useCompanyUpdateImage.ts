import { useMutation } from "@tanstack/react-query";

import { useInvalidate } from "./useCompanyGetCompany";

import api from "@libs/api";

import { notifyUpdate } from "@libs/notification";
import { extractError } from "@libs/alert";

interface RequestProps {
  data: FormData;
}

export function useCompanyUpdateImage() {
  const { handleInvalidate } = useInvalidate();

  async function handleRequest({ data }: RequestProps) {
    await api.put("/company/update-image", data);
  }

  return useMutation({
    mutationFn: handleRequest,
    onSuccess: () => {
      notifyUpdate();
      handleInvalidate();
    },
    onError: extractError,
  });
}
