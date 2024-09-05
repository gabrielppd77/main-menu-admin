export interface ProductRequestDTO {
  name: string;
  description: string;
  imageUrl?: string;
  order: number;
  price: number;
  categoryId: string;
}
