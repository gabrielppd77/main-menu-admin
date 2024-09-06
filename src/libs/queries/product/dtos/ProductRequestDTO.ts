export interface ProductRequestDTO {
  name: string;
  description: string;
  urlImage?: string;
  order: number;
  price: number;
  categoryId: string;
}
