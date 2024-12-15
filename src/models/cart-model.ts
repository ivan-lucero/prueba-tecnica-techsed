import { ProductModel } from "./product-model";

export interface CartModel {
  id: string;
  items: CartItems[];
  createdAt: Date;
}

interface CartItems {
  product: ProductModel;
  quantity: number;
}
