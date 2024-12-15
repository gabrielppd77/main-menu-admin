import { useMutation } from "@tanstack/react-query";

import { useInvalidate } from "./useCompanyGetCompany";

import { CompanyUpdateDTO } from "./dtos/CompanyUpdateDTO";

import api from "@libs/api";

import { notifyUpdate } from "@libs/notification";
import { extractError } from "@libs/alert";

interface RequestProps {
  data: CompanyUpdateDTO;
}

export function useCompanyUpdate() {
  const { handleInvalidate } = useInvalidate();

  async function handleRequest({ data }: RequestProps) {
    await api.put("/Company", data);
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
