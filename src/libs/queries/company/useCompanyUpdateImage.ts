import { useMutation } from "@tanstack/react-query";

import { useInvalidate } from "./useCompanyGetCompany";

import api from "@libs/api";

import { notifyUpdate } from "@libs/notification";
import { extractError } from "@libs/alert";

interface RequestProps {
  id: string;
  data: FormData;
}

export function useCompanyUpdateImage() {
  const { handleInvalidate } = useInvalidate();

  async function handleRequest({ id, data }: RequestProps) {
    await api.put("/company/update-image/" + id, data);
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
