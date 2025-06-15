import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaPlus, FaTrash, FaShoppingCart, FaReceipt } from 'react-icons/fa';
import { addToCart, fetchUserCart } from '../api/axios';

export default function CartPage() {
  const [cart, setCart] = useState([]);
  const userId = localStorage.getItem('userId'); // keep just userId for now

  // ✅ Fetch cart from backend on page load
  useEffect(() => {
    const loadCartFromBackend = async () => {
      if (!userId) {
        console.warn("User ID not found. Please login first.");
        return;
      }

      try {
        const response = await fetchUserCart(userId);
        const backendCart = response.data;

        // Map backend cart to expected frontend structure
        const mappedCart = backendCart.map((item) => ({
          id: item.id, // cart item ID
          menuId: item.menu.id,
          title: item.menu.name,
          description: item.menu.description,
          imageUrl: item.menu.imageUrl,
          price: item.menu.price,
          quantity: item.quantity,
        }));

        setCart(mappedCart);
      } catch (error) {
        console.error("Failed to fetch cart:", error);
      }
    };

    loadCartFromBackend();
  }, [userId]);

  const updateQuantity = (id, quantity) => {
    const updated = cart.map((item) =>
      item.id === id ? { ...item, quantity: Math.max(quantity, 1) } : item
    );
    setCart(updated);
  };

  const removeItem = (id) => {
    const updated = cart.filter((item) => item.id !== id);
    setCart(updated);
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const makeOrder = async () => {
    if (!userId) {
      alert("❌ User not logged in.");
      return;
    }

    if (cart.length === 0) {
      alert("🛒 Cart is empty!");
      return;
    }

    try {
      for (const item of cart) {
        await addToCart(userId, item.menuId); // if backend supports quantity, send that too
      }

      alert("✅ Order Placed Successfully!");
      setCart([]);
    } catch (error) {
      console.error("Error placing order:", error);
      alert("🔥 Failed to place order. Try again!");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-orange-100 p-6">
      <div className="max-w-5xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-extrabold text-center text-orange-600 mb-8"
        >
          <FaShoppingCart className="inline mr-2" />
          Your Mind-Blowing Cart
        </motion.h2>

        {cart.length === 0 ? (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-gray-500 text-center mt-20 text-lg"
          >
            😢 Oops! Your cart is empty. Let’s add something yummy.
          </motion.p>
        ) : (
          <>
            <motion.div
              className="space-y-6"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: {
                  transition: { staggerChildren: 0.1 },
                },
              }}
            >
              {cart.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col md:flex-row items-center bg-white rounded-3xl p-4 shadow-lg hover:shadow-2xl transition-all gap-4"
                >
                  <img
                    src={`http://localhost:8080${item.imageUrl}`}
                    alt={item.title}
                    className="w-full md:w-40 h-32 object-cover rounded-xl shadow"
                  />
                  <div className="flex-1 text-center md:text-left">
                    <h3 className="text-2xl font-bold text-orange-700">{item.title}</h3>
                    <p className="text-gray-600 text-sm mt-1">{item.description}</p>
                    <p className="text-lg font-semibold text-green-700 mt-2">
                      ₹{item.price} × {item.quantity}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      min={1}
                      value={item.quantity}
                      onChange={(e) =>
                        updateQuantity(item.id, parseInt(e.target.value))
                      }
                      className="w-16 border border-orange-300 rounded px-2 py-1 text-center"
                    />
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-red-500 hover:text-red-700 text-xl"
                      title="Remove Item"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            <div className="text-right text-xl font-bold text-orange-700 mt-6">
              Grand Total: ₹{total.toFixed(2)}
            </div>

            <div className="mt-8 text-center">
              <button
                onClick={makeOrder}
                className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 rounded-full text-xl font-bold shadow-xl transition-all"
              >
                <FaReceipt className="inline mr-3" />
                Make Order
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
