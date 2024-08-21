import { useMutation, useQueryClient } from "@tanstack/react-query";

import { ProductRequestDTO } from "./dtos/ProductRequestDTO";

import api from "@libs/api";

import { notifyUpdate } from "@libs/notification";
import { extractError } from "@libs/alert";

import { query } from "./useProductGetAll";

interface RequestProps {
  id: string;
  data: ProductRequestDTO;
}

export function useProductUpdate() {
  const queryClient = useQueryClient();

  async function handleRequest({ id, data }: RequestProps) {
    await api.put("/Product/" + id, data);
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
