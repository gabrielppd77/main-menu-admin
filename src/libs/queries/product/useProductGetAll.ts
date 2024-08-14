import { useQuery } from "@tanstack/react-query";

import api from "@libs/api";

import { ProductResponseDTO } from "./dtos/ProductResponseDTO";
import { extractError } from "@libs/alert";

export const query = ["Product"];

export function useProductGetAll() {
  async function handleRequest() {
    const response = await api.get<ProductResponseDTO[]>("/Product");
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
