import { useMutation, useQueryClient } from "@tanstack/react-query";

import { CategoryCreateDTO } from "./dtos/CategoryCreateDTO";

import api from "@libs/api";

import { notifyCreate } from "@libs/notification";
import { extractError } from "@libs/alert";

import { query } from "./useCategoryGetAll";

interface RequestProps {
  data: CategoryCreateDTO;
}

export function useCategoryCreate() {
  const queryClient = useQueryClient();

  async function handleRequest({ data }: RequestProps) {
    await api.post("/Category", data);
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
