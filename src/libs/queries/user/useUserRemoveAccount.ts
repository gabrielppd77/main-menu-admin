import { useMutation } from "@tanstack/react-query";

import { extractError } from "@libs/alert";
import api from "@libs/api";

interface RequestProps {
  params: {
    password: string;
  };
}

export function useUserRemoveAccount() {
  return useMutation({
    mutationFn: async ({ params }: RequestProps) => {
      await api.delete("/user/remove-account", { params });
    },
    onError: extractError,
  });
}
