export interface ProductResponseDTO {
  id: string;
  name: string;
  description?: string;
  urlImage?: string;
  order: number;
  price: number;
  categoryId: string;
  categoryName: string;
}
