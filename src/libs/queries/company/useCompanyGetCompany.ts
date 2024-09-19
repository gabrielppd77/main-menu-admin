import { useQuery } from "@tanstack/react-query";

import api from "@libs/api";

import { CompanyResponseDTO } from "./dtos/CompanyResponseDTO";
import { extractError } from "@libs/alert";

export const query = ["Company"];

export function useCompanyGetCompany() {
  async function handleRequest() {
    const response = await api.get<CompanyResponseDTO>("/Company");
    return response.data;
  }

  const { error, ...rest } = useQuery({
    queryKey: query,
    queryFn: handleRequest,
  });

  if (error) {
    extractError(error);
  }

  return rest;
}
