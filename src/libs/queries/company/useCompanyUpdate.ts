import { useMutation, useQueryClient } from "@tanstack/react-query";

import { CompanyUpdateDTO } from "./dtos/CompanyUpdateDTO";

import api from "@libs/api";

import { notifyUpdate } from "@libs/notification";
import { extractError } from "@libs/alert";

import { query } from "./useCompanyGetCompany";

interface RequestProps {
  id: string;
  data: CompanyUpdateDTO;
}

export function useCompanyUpdate() {
  const queryClient = useQueryClient();

  async function handleRequest({ id, data }: RequestProps) {
    await api.put("/Company/" + id, data);
  }

  return useMutation({
    mutationFn: handleRequest,
    onSuccess: () => {
      notifyUpdate();
      queryClient.invalidateQueries({
        queryKey: query,
      });
    },
    onError: extractError,
  });
}
