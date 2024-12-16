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
      setProducts: (data) => set({ products: data }),
      updateProductStock: (id, quantity) => 
        set((state) => {
          let productIndexToUpdate = state.products.findIndex(product => product.id === id)
          state.products[productIndexToUpdate].stock += quantity
          return state
        })
    }),
    {
      name: "product-store", // Nombre de la clave en localStorage
    }
  )
);

export default useProductStore