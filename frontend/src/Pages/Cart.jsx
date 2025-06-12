import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaPlus, FaTrash, FaShoppingCart, FaReceipt } from 'react-icons/fa';

export default function CartPage() {
   
    
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const storedCart = localStorage.getItem('userCart');
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('userCart', JSON.stringify(cart));
  }, [cart]);

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

  const addFakeProduct = () => {
    const newItem = {
      id: Date.now(),
      title: `Delicious Dish #${cart.length + 1}`,
      description: "A delightful taste of spices and herbs made fresh for you!",
      image: "https://source.unsplash.com/featured/?food,dish",
      price: Math.floor(Math.random() * 400 + 100),
      quantity: 1,
    };
    setCart([...cart, newItem]);
  };

  const increaseCapacity = () => {
    alert("🚀 Table capacity increased! (Pretend backend call)");
  };

  const makeOrder = () => {
    if (cart.length === 0) return alert("🛒 Cart is empty!");
    alert("✅ Order Placed Successfully!");
    setCart([]);
    localStorage.removeItem("userCart");
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

        <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
          <button
            onClick={addFakeProduct}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full font-bold shadow transition-all"
          >
            <FaPlus className="inline mr-2" />
            Add Random Product
          </button>

          <button
            onClick={increaseCapacity}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full font-bold shadow transition-all"
          >
            🚀 Increase Table Capacity
          </button>
        </div>

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
                  transition: {
                    staggerChildren: 0.1,
                  },
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
