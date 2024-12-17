import { create } from "zustand";
import { ProductModel } from "../utils/models";
import { persist } from "zustand/middleware";

interface ProductStore {
  products: ProductModel[];
  setProducts: (products: ProductModel[]) => void;
  updateProductStock: (productId: string | number, quantity: number) => void;
}
/**
 * Store para persistir datos de productos en localStorage
 */
const useProductStore = create(
  persist<ProductStore>(
    (set) => ({
      products: [],
      setProducts: (data) => set((state) => ({ ...state ,products: [...data] })), // Asegura una nueva referencia
      updateProductStock: (id, quantity) =>
        set((state) => {
          const updatedProducts = state.products.map((product) =>
            product.id === id
              ? { ...product, stock: product.stock + quantity }
              : product
          );
          return { ...state, products: updatedProducts };
        }),
    }),
    {
      name: "product-store", // Nombre de la clave en localStorage
    }
  )
);

export default useProductStore;
