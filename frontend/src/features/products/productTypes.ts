export interface ProductSize {
    width: number;
    height: number;
  }

  export interface Product {
    id: number;
    imageUrl: string;
    name: string;
    count: number;
    size: ProductSize;
    weight: string;
    comments?: CommentModel[];
  }

  export interface CommentModel {
    id: number;
    productId: number;
    description: string;
    date: string;
  }