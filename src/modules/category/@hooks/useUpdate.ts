import { useMutation } from "@tanstack/react-query";
import api from "@libs/api";
import { fireError } from "@libs/alert";

import { UpdateCategoryRequest } from "../@types/UpdateCategoryRequest";

export function useUpdate() {
  return useMutation({
    mutationFn: async (data: UpdateCategoryRequest) => {
      await api.put("/categories/update", data);
    },
    onError: fireError,
  });
}
