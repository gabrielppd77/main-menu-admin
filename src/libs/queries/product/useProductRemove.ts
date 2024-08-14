import { useMutation, useQueryClient } from "@tanstack/react-query";

import api from "@libs/api";

import { notifyRemove } from "@libs/notification";
import { extractError } from "@libs/alert";

import { query } from "./useProductGetAll";

interface RequestProps {
  id: string;
}

export function useProductRemove() {
  const queryClient = useQueryClient();

  async function handleRequest({ id }: RequestProps) {
    await api.delete("/Product/" + id);
  }

  return useMutation({
    mutationFn: handleRequest,
    onSuccess: () => {
      notifyRemove();
      queryClient.invalidateQueries({
        queryKey: query,
      });
    },
    onError: extractError,
  });
}
