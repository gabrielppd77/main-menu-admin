export interface ProductRequestDTO {
  name: string;
  description?: string | null;
  urlImage?: string | null;
  order: number;
  price: number;
  categoryId: string;
}
