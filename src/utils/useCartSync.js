import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useAuth } from './AuthContext';
import { setCart, clearCart } from './cartSlice';
import { fetchCart, addToCart as addToCartDB, removeFromCart as removeFromCartDB, clearCart as clearCartDB } from './supabaseService';

export const useCartSync = () => {
  const dispatch = useDispatch();
  const { user } = useAuth();
  const cartItems = useSelector((store) => store.cart.items);
  const synced = useSelector((store) => store.cart.synced);

  // Load cart from Supabase when user logs in
  useEffect(() => {
    if (user && !synced) {
      loadCartFromDB();
    } else if (!user && synced) {
      dispatch(clearCart());
    }
  }, [user]);

  const loadCartFromDB = async () => {
    try {
      const dbCart = await fetchCart(user.id);
      // Transform DB cart to Redux format
      const items = dbCart.flatMap(item => 
        Array(item.quantity).fill({
          card: {
            info: {
              id: item.menu_items.id,
              name: item.menu_items.name,
              description: item.menu_items.description,
              price: item.menu_items.price,
              defaultPrice: item.menu_items.default_price,
              isVeg: item.menu_items.is_veg,
              imageId: item.menu_items.image_id
            }
          }
        })
      );
      dispatch(setCart(items));
    } catch (error) {
      console.error('Failed to load cart:', error);
    }
  };

  const syncAddItem = async (item) => {
    if (user) {
      try {
        await addToCartDB(user.id, item.card.info.id, 1);
      } catch (error) {
        console.error('Failed to sync add to cart:', error);
      }
    }
  };

  const syncRemoveItem = async (item) => {
    if (user) {
      try {
        const dbCart = await fetchCart(user.id);
        const cartItem = dbCart.find(ci => ci.menu_item_id === item.card.info.id);
        if (cartItem) {
          await removeFromCartDB(cartItem.id);
        }
      } catch (error) {
        console.error('Failed to sync remove from cart:', error);
      }
    }
  };

  const syncClearCart = async () => {
    if (user) {
      try {
        await clearCartDB(user.id);
      } catch (error) {
        console.error('Failed to sync clear cart:', error);
      }
    }
  };

  return { syncAddItem, syncRemoveItem, syncClearCart, loadCartFromDB };
};
