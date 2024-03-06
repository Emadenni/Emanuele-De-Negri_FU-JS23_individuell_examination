import { create } from "zustand";
import { cartProduct } from "../components/types";
import { CountState } from "../components/types";

interface CartState {
    cart: cartProduct[];
    total: string;
    addToCart: (product: cartProduct) => void;
    updateQuantity: (productId: string, quantityDelta: number) => void;
    removeProduct: (productId: string) => void;
    emptyCart: () => void;
  }
  
  const calculateTotalPrice = (cart: cartProduct[]) => {
    const lastTotal = JSON.parse(sessionStorage.getItem("total") || "0");
    return cart.reduce((total, product) => total + product.price * product.quantity, lastTotal);
  };
  

export const useCartStore = create<CartState>((set) => ({
cart: sessionStorage.getItem("cart") ? JSON.parse(sessionStorage.getItem("cart")!) : [],
total: calculateTotalPrice(JSON.parse(sessionStorage.getItem("cart") || "[]")),

addToCart: (product) => {
    set((state) => {
      const existingProduct = state.cart.find((p) => p.id === product.id);
      if (existingProduct) {
      
        const quantity = existingProduct.quantity || 0;
        existingProduct.quantity = quantity + 1;
        sessionStorage.setItem("cart", JSON.stringify(state.cart));
        return { ...state }; 
      } else {
        product.quantity = 1;
        const updatedCart = [...state.cart, product];
        sessionStorage.setItem("cart", JSON.stringify(updatedCart));
        return { ...state, cart: updatedCart }; // Aggiorna solo il campo del carrello
      }
    });
  },

  updateQuantity: (productId, quantityDelta) => {
    set((state) => {
      const updatedCart = state.cart.map((item) => {
        if (item.id === productId) {
          item.quantity += quantityDelta;
        }
        return item;
      });
      sessionStorage.setItem("cart", JSON.stringify(updatedCart)); 
      return { cart: updatedCart, total: calculateTotalPrice(updatedCart) };
    });
  },

  removeProduct: (productId) => {
    set((state) => {
      const updatedCart = state.cart.filter((item) => item.id !== productId);
      sessionStorage.setItem("cart", JSON.stringify(updatedCart)); 
      return { cart: updatedCart, total: calculateTotalPrice(updatedCart) };
    });
  },

  emptyCart: () => {
    sessionStorage.removeItem("cart"); 
    const { resetCounts } = useCountStore.getState(); 
    resetCounts(); 
    set({ cart: [] }); 
  }
  
}));

export const getCountFromSessionStorage = () => {
    const countString = sessionStorage.getItem("count");
    if (countString !== null) {
      return parseInt(countString, 10);
    } else {
      return 0;
    }
  };
  
  export const useCountStore = create<CountState>((set) => ({
    count: getCountFromSessionStorage(),
    decrement: () =>
      set((state) => {
        const newCount = state.count - 1;
        sessionStorage.setItem("count", newCount.toString());
        return { count: newCount };
      }),
    increment: () =>
      set((state) => {
        const newCount = state.count + 1;
        sessionStorage.setItem("count", newCount.toString());
        return { count: newCount };
      }),
    resetCounts: () =>
      set((_state) => {
        sessionStorage.removeItem("count"); 
        return { count: 0 }; 
      }),
  }));
  