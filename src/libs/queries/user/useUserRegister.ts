import { useMutation } from "@tanstack/react-query";

import { extractError } from "@libs/alert";
import api from "@libs/api";

import { RegistrationRequestDTO } from "./dtos/RegistrationRequestDTO";
import { AuthResponse } from "./dtos/AuthResponse";

export function useUserRegister() {
  return useMutation({
    mutationFn: async (data: RegistrationRequestDTO) => {
      const response = await api.post<AuthResponse>("/user/register", data);
      return response.data;
    },
    onError: extractError,
  });
}
