import { useSelector, useDispatch } from "react-redux";
import { clearCart, removeItem, addItem } from "../utils/cartSlice";
import { CDN_URL } from "../utils/constants";
import { Link } from "react-router-dom";
import { useState } from "react";
import Toast from "./Toast";
import { useCartSync } from "../utils/useCartSync";

const Cart = () => {
  const cartItems = useSelector((store) => store.cart.items);
  const dispatch = useDispatch();
  const [toast, setToast] = useState(null);
  const { syncClearCart, syncRemoveItem, syncAddItem } = useCartSync();

  const showToast = (message, type = "success") => {
    setToast({ message, type });
  };

  const handleClearCart = async () => {
    dispatch(clearCart());
    await syncClearCart();
    showToast("Cart cleared successfully", "success");
  };

  const handleRemoveItem = async (index, item) => {
    dispatch(removeItem(index));
    await syncRemoveItem(item);
    showToast("Item removed from cart", "success");
  };

  const handleAddItem = async (item) => {
    dispatch(addItem(item));
    await syncAddItem(item);
    showToast("Item added to cart", "success");
  };

  // Group items by ID and count quantities
  const groupedItems = cartItems.reduce((acc, item, index) => {
    const id = item.card.info.id;
    if (!acc[id]) {
      acc[id] = {
        item: item,
        quantity: 1,
        indices: [index]
      };
    } else {
      acc[id].quantity += 1;
      acc[id].indices.push(index);
    }
    return acc;
  }, {});

  // Calculate total
  const totalAmount = cartItems.reduce((sum, item) => {
    const price = item.card.info.price || item.card.info.defaultPrice;
    return sum + price / 100;
  }, 0);

  const deliveryFee = totalAmount > 0 ? 40 : 0;
  const platformFee = totalAmount > 0 ? 5 : 0;
  const gst = totalAmount * 0.05;
  const grandTotal = totalAmount + deliveryFee + platformFee + gst;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-900 py-8">
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-dark-900 dark:text-white">Shopping Cart</h1>
            <p className="text-dark-600 dark:text-dark-300 mt-1">{cartItems.length} items in your cart</p>
          </div>
          {cartItems.length > 0 && (
            <button
              className="px-4 py-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg font-medium transition-colors"
              onClick={handleClearCart}
            >
              Clear Cart
            </button>
          )}
        </div>

        {cartItems.length === 0 ? (
          <div className="text-center py-16">
            <div className="card max-w-md mx-auto p-12">
              <div className="text-6xl mb-4">🛒</div>
              <h2 className="text-2xl font-bold text-dark-900 dark:text-white mb-2">Your cart is empty</h2>
              <p className="text-dark-600 dark:text-dark-300 mb-6">Add items from restaurants to get started</p>
              <Link to="/" className="btn-primary inline-block">
                Browse Restaurants
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {Object.values(groupedItems).map(({ item, quantity, indices }) => {
                const price = item.card.info.price || item.card.info.defaultPrice;
                const itemTotal = (price / 100) * quantity;

                return (
                  <div key={item.card.info.id} className="card p-5 dark:bg-dark-800">
                    <div className="flex gap-4">
                      {/* Item Image */}
                      {item.card.info.imageId && (
                        <img
                          src={CDN_URL + item.card.info.imageId}
                          className="w-24 h-24 object-cover rounded-lg flex-shrink-0"
                          alt={item.card.info.name}
                          onError={(e) => {
                            e.target.style.display = 'none';
                          }}
                        />
                      )}

                      {/* Item Details */}
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            {item.card.info.isVeg !== undefined && (
                              <span className={`inline-block w-4 h-4 border-2 ${
                                item.card.info.isVeg ? 'border-green-600' : 'border-red-600'
                              } mr-2`}>
                                <span className={`block w-2 h-2 rounded-full ${
                                  item.card.info.isVeg ? 'bg-green-600' : 'bg-red-600'
                                } m-0.5`}></span>
                              </span>
                            )}
                            <h3 className="font-semibold text-dark-900 dark:text-white inline">
                              {item.card.info.name}
                            </h3>
                          </div>
                        </div>
                        
                        {item.card.info.description && (
                          <p className="text-sm text-dark-600 dark:text-dark-300 mb-3 line-clamp-2">
                            {item.card.info.description}
                          </p>
                        )}
                        
                        <div className="flex items-center justify-between">
                          <p className="font-bold text-dark-900 dark:text-white">
                            ₹{itemTotal.toFixed(2)}
                          </p>

                          {/* Quantity Controls */}
                          <div className="flex items-center gap-3">
                            <button
                              onClick={() => handleRemoveItem(indices[indices.length - 1], item)}
                              className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 dark:bg-dark-700 hover:bg-gray-200 dark:hover:bg-dark-600 text-dark-700 dark:text-dark-200 transition-colors"
                            >
                              {quantity === 1 ? (
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                              ) : (
                                <span className="text-lg font-semibold">−</span>
                              )}
                            </button>
                            
                            <span className="font-semibold text-dark-900 dark:text-white min-w-[2rem] text-center">
                              {quantity}
                            </span>
                            
                            <button
                              onClick={() => handleAddItem(item)}
                              className="w-8 h-8 flex items-center justify-center rounded-full bg-primary-600 hover:bg-primary-700 text-white transition-colors"
                            >
                              <span className="text-lg font-semibold">+</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="card p-6 sticky top-20 dark:bg-dark-800">
                <h2 className="text-xl font-bold text-dark-900 dark:text-white mb-4">Order Summary</h2>
                
                <div className="space-y-3 mb-4 pb-4 border-b border-dark-100 dark:border-dark-700">
                  <div className="flex justify-between text-dark-700 dark:text-dark-300">
                    <span>Subtotal ({cartItems.length} items)</span>
                    <span>₹{totalAmount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-dark-700 dark:text-dark-300">
                    <span>Delivery Fee</span>
                    <span>₹{deliveryFee.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-dark-700 dark:text-dark-300">
                    <span>Platform Fee</span>
                    <span>₹{platformFee.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-dark-700 dark:text-dark-300">
                    <span>GST (5%)</span>
                    <span>₹{gst.toFixed(2)}</span>
                  </div>
                </div>
                
                <div className="flex justify-between text-lg font-bold text-dark-900 dark:text-white mb-6">
                  <span>Total</span>
                  <span>₹{grandTotal.toFixed(2)}</span>
                </div>
                
                <button className="w-full btn-primary py-3 text-lg">
                  Proceed to Checkout
                </button>
                
                <p className="text-xs text-dark-500 dark:text-dark-400 text-center mt-4">
                  By placing your order, you agree to our terms and conditions
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
