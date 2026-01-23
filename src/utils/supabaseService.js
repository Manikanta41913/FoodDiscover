import { supabase } from './supabaseClient';

// Restaurants
export const fetchRestaurants = async () => {
  const { data, error } = await supabase
    .from('restaurants')
    .select('*')
    .order('avg_rating', { ascending: false });
  
  if (error) throw error;
  return data;
};

export const fetchRestaurantById = async (id) => {
  const { data, error } = await supabase
    .from('restaurants')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) throw error;
  return data;
};

// Menu Items
export const fetchMenuItems = async (restaurantId) => {
  const { data, error } = await supabase
    .from('menu_items')
    .select('*')
    .eq('restaurant_id', restaurantId)
    .order('category');
  
  if (error) throw error;
  return data;
};

// Cart
export const fetchCart = async (userId) => {
  const { data, error } = await supabase
    .from('cart_items')
    .select(`
      *,
      menu_items (
        *,
        restaurants (name)
      )
    `)
    .eq('user_id', userId);
  
  if (error) throw error;
  return data;
};

export const addToCart = async (userId, menuItemId, quantity = 1) => {
  const { data: existing } = await supabase
    .from('cart_items')
    .select('*')
    .eq('user_id', userId)
    .eq('menu_item_id', menuItemId)
    .single();

  if (existing) {
    const { data, error } = await supabase
      .from('cart_items')
      .update({ quantity: existing.quantity + quantity })
      .eq('id', existing.id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  } else {
    const { data, error } = await supabase
      .from('cart_items')
      .insert({ user_id: userId, menu_item_id: menuItemId, quantity })
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }
};

export const updateCartItem = async (cartItemId, quantity) => {
  if (quantity <= 0) {
    return await removeFromCart(cartItemId);
  }
  
  const { data, error } = await supabase
    .from('cart_items')
    .update({ quantity })
    .eq('id', cartItemId)
    .select()
    .single();
  
  if (error) throw error;
  return data;
};

export const removeFromCart = async (cartItemId) => {
  const { error } = await supabase
    .from('cart_items')
    .delete()
    .eq('id', cartItemId);
  
  if (error) throw error;
};

export const clearCart = async (userId) => {
  const { error } = await supabase
    .from('cart_items')
    .delete()
    .eq('user_id', userId);
  
  if (error) throw error;
};

// Orders
export const createOrder = async (userId, orderData) => {
  const { data: order, error: orderError } = await supabase
    .from('orders')
    .insert({
      user_id: userId,
      total_amount: orderData.totalAmount,
      delivery_fee: orderData.deliveryFee,
      platform_fee: orderData.platformFee,
      gst: orderData.gst,
      grand_total: orderData.grandTotal
    })
    .select()
    .single();

  if (orderError) throw orderError;

  const orderItems = orderData.items.map(item => ({
    order_id: order.id,
    menu_item_id: item.menu_item_id,
    quantity: item.quantity,
    price: item.price
  }));

  const { error: itemsError } = await supabase
    .from('order_items')
    .insert(orderItems);

  if (itemsError) throw itemsError;

  await clearCart(userId);

  return order;
};

export const fetchOrders = async (userId) => {
  const { data, error } = await supabase
    .from('orders')
    .select(`
      *,
      order_items (
        *,
        menu_items (*)
      )
    `)
    .eq('user_id', userId)
    .order('created_at', { ascending: false });
  
  if (error) throw error;
  return data;
};
