import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { createCart, addToCart, removeFromCart, updateCart, getCart } from '../api/shopify';

interface CartItem {
  id: string;
  variantId: string;
  productId: string;
  title: string;
  variantTitle?: string;
  quantity: number;
  price: number;
  image?: string;
}

interface CartState {
  cartId: string | null;
  items: CartItem[];
  totalQuantity: number;
  totalAmount: number;
  checkoutUrl: string | null;
  isLoading: boolean;
  error: string | null;

  // Actions
  initializeCart: () => Promise<void>;
  addItem: (item: Omit<CartItem, 'id'>) => Promise<void>;
  removeItem: (lineId: string) => Promise<void>;
  updateItemQuantity: (lineId: string, quantity: number) => Promise<void>;
  clearCart: () => void;
  syncCart: () => Promise<void>;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      cartId: null,
      items: [],
      totalQuantity: 0,
      totalAmount: 0,
      checkoutUrl: null,
      isLoading: false,
      error: null,

      initializeCart: async () => {
        const { cartId } = get();
        
        if (cartId) {
          // Try to fetch existing cart
          try {
            const cart = await getCart(cartId);
            
            if (cart) {
              set({
                items: cart.lines.edges.map((edge: any) => ({
                  id: edge.node.id,
                  variantId: edge.node.merchandise.id,
                  productId: edge.node.merchandise.product.id,
                  title: edge.node.merchandise.product.title,
                  variantTitle: edge.node.merchandise.title,
                  quantity: edge.node.quantity,
                  price: parseFloat(edge.node.merchandise.price.amount),
                  image: edge.node.merchandise.product.images.edges[0]?.node.url,
                })),
                totalQuantity: cart.totalQuantity,
                totalAmount: parseFloat(cart.cost.totalAmount.amount),
                checkoutUrl: cart.checkoutUrl,
              });
              return;
            }
          } catch (error) {
            console.error('Failed to fetch cart:', error);
          }
        }

        // Create new cart if none exists
        try {
          const cart = await createCart();
          set({
            cartId: cart.id,
            checkoutUrl: cart.checkoutUrl,
            items: [],
            totalQuantity: 0,
            totalAmount: 0,
          });
        } catch (error) {
          console.error('Failed to create cart:', error);
          set({ error: 'Failed to initialize cart' });
        }
      },

      addItem: async (item) => {
        set({ isLoading: true, error: null });
        
        try {
          let { cartId } = get();

          // Create cart if it doesn't exist
          if (!cartId) {
            const cart = await createCart();
            cartId = cart.id;
            set({ cartId, checkoutUrl: cart.checkoutUrl });
          }

          // Add item to Shopify cart
          const cart = await addToCart(cartId, [
            {
              merchandiseId: item.variantId,
              quantity: item.quantity,
            },
          ]);

          // Update local state
          set({
            items: cart.lines.edges.map((edge: any) => ({
              id: edge.node.id,
              variantId: edge.node.merchandise.id,
              productId: edge.node.merchandise.product.id,
              title: edge.node.merchandise.product.title,
              variantTitle: edge.node.merchandise.title,
              quantity: edge.node.quantity,
              price: parseFloat(edge.node.merchandise.price.amount),
              image: edge.node.merchandise.product.images.edges[0]?.node.url,
            })),
            totalQuantity: cart.totalQuantity,
            totalAmount: parseFloat(cart.cost.totalAmount.amount),
            checkoutUrl: cart.checkoutUrl,
            isLoading: false,
          });
        } catch (error) {
          console.error('Failed to add item:', error);
          set({ 
            error: 'Failed to add item to cart',
            isLoading: false,
          });
        }
      },

      removeItem: async (lineId) => {
        set({ isLoading: true, error: null });
        
        try {
          const { cartId } = get();
          
          if (!cartId) {
            throw new Error('No cart found');
          }

          const cart = await removeFromCart(cartId, [lineId]);

          set({
            items: cart.lines.edges.map((edge: any) => ({
              id: edge.node.id,
              variantId: edge.node.merchandise.id,
              productId: edge.node.merchandise.product.id,
              title: edge.node.merchandise.product.title,
              variantTitle: edge.node.merchandise.title,
              quantity: edge.node.quantity,
              price: parseFloat(edge.node.merchandise.price.amount),
              image: edge.node.merchandise.product.images.edges[0]?.node.url,
            })),
            totalQuantity: cart.totalQuantity,
            totalAmount: parseFloat(cart.cost.totalAmount.amount),
            isLoading: false,
          });
        } catch (error) {
          console.error('Failed to remove item:', error);
          set({ 
            error: 'Failed to remove item from cart',
            isLoading: false,
          });
        }
      },

      updateItemQuantity: async (lineId, quantity) => {
        if (quantity <= 0) {
          return get().removeItem(lineId);
        }

        set({ isLoading: true, error: null });
        
        try {
          const { cartId } = get();
          
          if (!cartId) {
            throw new Error('No cart found');
          }

          const cart = await updateCart(cartId, [{ id: lineId, quantity }]);

          set({
            totalQuantity: cart.totalQuantity,
            totalAmount: parseFloat(cart.cost.totalAmount.amount),
            isLoading: false,
          });

          // Update local items
          const items = get().items.map(item =>
            item.id === lineId ? { ...item, quantity } : item
          );
          
          set({ items });
        } catch (error) {
          console.error('Failed to update quantity:', error);
          set({ 
            error: 'Failed to update quantity',
            isLoading: false,
          });
        }
      },

      clearCart: () => {
        set({
          cartId: null,
          items: [],
          totalQuantity: 0,
          totalAmount: 0,
          checkoutUrl: null,
        });
      },

      syncCart: async () => {
        const { cartId } = get();
        
        if (!cartId) return;

        try {
          const cart = await getCart(cartId);
          
          if (cart) {
            set({
              items: cart.lines.edges.map((edge: any) => ({
                id: edge.node.id,
                variantId: edge.node.merchandise.id,
                productId: edge.node.merchandise.product.id,
                title: edge.node.merchandise.product.title,
                variantTitle: edge.node.merchandise.title,
                quantity: edge.node.quantity,
                price: parseFloat(edge.node.merchandise.price.amount),
                image: edge.node.merchandise.product.images.edges[0]?.node.url,
              })),
              totalQuantity: cart.totalQuantity,
              totalAmount: parseFloat(cart.cost.totalAmount.amount),
              checkoutUrl: cart.checkoutUrl,
            });
          }
        } catch (error) {
          console.error('Failed to sync cart:', error);
        }
      },
    }),
    {
      name: 'deee-todo-cart',
      partialize: (state) => ({
        cartId: state.cartId,
        items: state.items,
        totalQuantity: state.totalQuantity,
        totalAmount: state.totalAmount,
        checkoutUrl: state.checkoutUrl,
      }),
    }
  )
);
