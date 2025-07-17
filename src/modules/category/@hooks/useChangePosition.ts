import { fireError } from "@libs/alert";
import api from "@libs/api";
import { useMutation } from "@tanstack/react-query";
import { ChangeCategoryPositionRequest } from "../@types/ChangeCategoryPositionRequest";
import { notifyUpdate } from "@libs/notification";

export function useChangePosition() {
  return useMutation({
    mutationFn: async (data: ChangeCategoryPositionRequest[]) => {
      await api.patch("/categories/change-position", data);
    },
    onError: fireError,
    onSuccess: () => notifyUpdate(),
  });
}
