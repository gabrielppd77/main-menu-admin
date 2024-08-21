import { useMutation, useQueryClient } from "@tanstack/react-query";

import { ProductRequestDTO } from "./dtos/ProductRequestDTO";

import api from "@libs/api";

import { notifyCreate } from "@libs/notification";
import { extractError } from "@libs/alert";

import { query } from "./useProductGetAll";

interface RequestProps {
  data: ProductRequestDTO;
}

export function useProductCreate() {
  const queryClient = useQueryClient();

  async function handleRequest({ data }: RequestProps) {
    await api.post("/Product", data);
  }

  return useMutation({
    mutationFn: handleRequest,
    onSuccess: () => {
      notifyCreate();
      queryClient.invalidateQueries({
        queryKey: query,
      });
    },
    onError: extractError,
  });
}
