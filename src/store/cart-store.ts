import { create } from "zustand";
import { CartModel, ProductModel } from "../utils/models";
import Swal from "sweetalert2";

export interface CartActions {
  addToCart: (product: ProductModel, quantity: number) => void;
  removeFromCart: (productId: string | number, quantity?: number) => void;
  clearCart: () => void;
  updateQuantity: (productId: string | number, quantity: number) => void;
}

const useCartStore = create<CartModel & CartActions>((set) => ({
  items: [],
  addToCart: (product, quantity) =>
    set((state) => {
      //Busca si esta el producto en el carrito
      const findIndex = state.items.findIndex(
        (item) => item.product.id === product.id
      );
      const newItems = [...state.items];

      let itemFinded = state.items[findIndex];
      if (product.stock - ((itemFinded && itemFinded.quantity) || 0) <= 0) {
        Swal.fire({
          title: "No hay mas stock del producto!",
          icon: "error",
        });
        return state;
      }
      // Si el producto existe en el carrito le agrega la cantidad, sino agrega el nuevo producto al carrito
      if (findIndex !== -1) {
        newItems[findIndex] = {
          ...newItems[findIndex],
          quantity: newItems[findIndex].quantity + quantity,
        };
      } else {
        newItems.push({ product, quantity });
      }
      return { ...state, items: newItems };
    }),

  //TODO: Continuar aca. arreglar error de retornar objetos inmubtables. RESPUESTA CHAT GPT
  updateQuantity: (productId, quantity) =>
    set((state) => {
      const findIndex = state.items.findIndex(
        (item) => item.product.id === productId
      );
      const item = state.items[findIndex];
      if (!state.items.length) return state;
      if (!item) return state;

      // Validar el nuevo stock
      if (quantity > item.product.stock) {
        console.warn("La cantidad excede el stock disponible.");
        return state;
      }
      let newItems = [...state.items];
      newItems = state.items!.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      );
      return { ...state, items: newItems };
    }),

  removeFromCart: (productId, quantity) =>
    set((state) => {
      let newItems = [...state.items];
      const itemIndex = state.items!.findIndex(
        (item) => item.product.id === productId
      );
      const item = state.items[itemIndex];
      if (!item) {
        console.warn("El producto no existe");
        return state;
      }
      if (item.quantity < 0) {
        console.warn("Al producto no se le puede quitar mas cantidad");
        return state;
      }
      if (!quantity) {
        newItems = newItems.filter((item) => item.product.id !== productId);
        return { ...state, items: newItems };
      }
      if (item.quantity > 0) {
        newItems = state.items.map((item) =>
          item.product.id === productId
            ? { ...item, quantity: item.quantity - (quantity || 0) }
            : item
        );
      }
      if (item.quantity - quantity === 0) {
        newItems = state.items!.filter((item) => item.product.id !== productId);
      }

      return { ...state, items: newItems };
    }),

  clearCart: () =>
    set((state) => {
      return { ...state, items: [] };
    }),
  getTotal: () =>
    set((state) => {
      const total = state.items.reduce(
        (acc, item) => acc + item.quantity * item.product.price,
        0
      );
      console.log("Precio total del carrito:", total);
      return { ...state, total };
    }),
}));
export default useCartStore;
