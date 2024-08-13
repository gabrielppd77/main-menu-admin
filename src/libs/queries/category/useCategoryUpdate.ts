import { useMutation, useQueryClient } from "@tanstack/react-query";

import { CategoryUpdateDTO } from "./dtos/CategoryUpdateDTO";

import api from "@libs/api";

import { notifyUpdate } from "@libs/notification";
import { extractError } from "@libs/alert";

import { query } from "./useCategoryGetAll";

interface RequestProps {
  id: string;
  data: CategoryUpdateDTO;
}

export function useCategoryUpdate() {
  const queryClient = useQueryClient();

  async function handleRequest({ id, data }: RequestProps) {
    await api.put("/Category/" + id, data);
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
