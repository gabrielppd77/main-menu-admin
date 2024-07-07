import { useMutation } from "@tanstack/react-query";

import { extractError } from "@libs/alert";
import api from "@libs/api";

import { LoginRequest } from "./dtos/LoginRequest";
import { AuthResponse } from "./dtos/AuthResponse";

function useLogin() {
  return useMutation({
    mutationFn: async (data: LoginRequest) => {
      const response = await api.post<AuthResponse>("/user/login", data);
      return response.data;
    },
    onError: extractError,
  });
}

export { useLogin };
