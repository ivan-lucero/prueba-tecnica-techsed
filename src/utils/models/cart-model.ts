import { ProductModel } from "./product-model";

export interface CartModel {
  id?: string;
  items: CartItem[];
  createdAt?: Date;
}

export interface CartItem {
  product: ProductModel;
  quantity: number;
}
