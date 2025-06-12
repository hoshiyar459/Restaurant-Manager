import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { fetchAllMenuItems, fetchAllTables } from '../api/axios';
import Cart from './Cart';

export default function UserDashBoard() {
  const [activeTab, setActiveTab] = useState('menu');
  const [menuItems, setMenuItems] = useState([]);
  const [tables, setTables] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    fetchAllMenuItems()
      .then((res) => setMenuItems(res.data))
      .catch((err) => console.error('Error fetching menu:', err));

    fetchAllTables()
      .then((res) => setTables(res.data))
      .catch((err) => console.error('Error fetching tables:', err));
  }, []);


  useEffect(() => {
  // Load cart from localStorage when component mounts
  const storedCart = localStorage.getItem('userCart');
  if (storedCart) {
    setCart(JSON.parse(storedCart));
  }
}, []);

useEffect(() => {
  // Save cart to localStorage whenever it changes
  localStorage.setItem('userCart', JSON.stringify(cart));
}, [cart]);


  const addToCart = (item) => {
    setCart((prevCart) => {
      const exists = prevCart.find((i) => i.id === item.id);
      if (exists) {
        return prevCart.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      } else {
        return [...prevCart, { ...item, quantity: 1 }];
      }
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-100 p-6 md:p-10">
      <div className="max-w-screen-xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-extrabold text-center text-orange-600 mb-2"
        >
          🍴 Welcome to RestaurantPro 🍴
        </motion.h1>
        <p className="text-center text-gray-600 mb-8 text-lg">
          Deliciousness at your fingertips
        </p>

        {/* Dashboard Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <motion.div whileHover={{ scale: 1.05 }} className="bg-gradient-to-r from-orange-500 to-orange-400 text-white rounded-2xl p-6 text-center shadow-xl">
            <div className="text-3xl">🍽️</div>
            <div className="text-4xl font-bold">{menuItems.length}</div>
            <div className="text-lg">Menu Items</div>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} className="bg-gradient-to-r from-orange-400 to-orange-300 text-white rounded-2xl p-6 text-center shadow-xl">
            <div className="text-3xl">🪑</div>
            <div className="text-4xl font-bold">
              {tables.filter((t) => t.status === 'Available').length}
            </div>
            <div className="text-lg">Tables Available</div>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} className="border-2 border-orange-400 bg-white rounded-2xl p-6 text-center shadow-xl">
            <div className="text-3xl">⭐</div>
            <div className="text-4xl font-bold text-orange-500">4.8</div>
            <div className="text-lg">Customer Rating</div>
          </motion.div>
        </div>

        {/* Tabs */}
        <div className="flex justify-center gap-4 mb-6 flex-wrap">
          {['menu', 'tables', 'orders', 'cart'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-full font-semibold transition-all duration-300 text-sm md:text-base ${
                activeTab === tab
                  ? 'bg-orange-500 text-white shadow-md'
                  : 'bg-white text-orange-600 border border-orange-300'
              }`}
            >
              {tab === 'menu' && '🍽️ Menu'}
              {tab === 'tables' && '🪑 Book Table'}
              {tab === 'orders' && '📋 My Orders'}
              {tab === 'cart' && `🛒 Cart (${cart.reduce((sum, i) => sum + i.quantity, 0)})`}
            </button>
          ))}
        </div>

        {/* Menu */}
        {activeTab === 'menu' && (
          <div>
            <h2 className="text-2xl font-bold text-orange-600 mb-4">Explore Our Menu</h2>
            <input
              className="w-full mb-6 p-3 border border-orange-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400"
              placeholder="Search menu items..."
            />
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.1 } },
              }}
            >
              {menuItems.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white p-4 rounded-2xl shadow hover:shadow-xl transition transform hover:scale-105 relative"
                >
                  {item.imageUrl ? (
                    <img
                      src={`http://localhost:8080${item.imageUrl}`}
                      alt={item.title}
                      className="w-full h-40 object-cover rounded-xl mb-3"
                    />
                  ) : (
                    <div className="h-40 bg-orange-100 flex items-center justify-center text-5xl rounded-xl mb-3">
                      {item.emoji || '🍽️'}
                    </div>
                  )}
                  <span className="absolute top-3 left-3 bg-orange-100 text-orange-600 text-xs px-3 py-1 rounded-full font-semibold">
                    {item.type}
                  </span>
                  <h3 className="text-lg font-bold text-gray-800 mb-1">{item.title}</h3>
                  <p className="text-sm text-gray-500 mb-2">{item.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-orange-500">₹{item.price}</span>
{cart.find((i) => i.id === item.id) ? (
  <div className="flex items-center gap-2">
    <button
      onClick={() =>
        setCart((prevCart) =>
          prevCart
            .map((i) =>
              i.id === item.id ? { ...i, quantity: i.quantity - 1 } : i
            )
            .filter((i) => i.quantity > 0)
        )
      }
      className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-lg font-bold hover:bg-orange-200"
    >
      -
    </button>
    <span className="text-orange-600 font-semibold">
      {cart.find((i) => i.id === item.id)?.quantity}
    </span>
    <button
      onClick={() => addToCart(item)}
      className="bg-orange-500 text-white px-3 py-1 rounded-full text-lg font-bold hover:bg-orange-600"
    >
      +
    </button>
  </div>
) : (
  <button
    onClick={() => addToCart(item)}
    className="bg-orange-500 text-white px-4 py-1 rounded-full hover:bg-orange-600 transition-all"
  >
     Add to Cart
  </button>
)}

                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        )}

        {/* Tables */}
        {activeTab === 'tables' && (
          <div>
            <h2 className="text-2xl font-bold text-orange-600 mb-4">Reserve Your Table</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {tables.map((table) => (
                <div
                  key={table.id}
                  className={`rounded-xl p-4 text-center border transition-all duration-300 ${
                    table.status === 'Available'
                      ? 'border-green-400 bg-white'
                      : 'border-gray-300 bg-gray-100 text-gray-400'
                  }`}
                >
                  <div className="text-xl">🪑</div>
                  <div className="font-bold">Table {table.name || table.id}</div>
                  <div className="text-sm">{table.capacity || table.seats} seats</div>
                  <div
                    className={`mt-2 text-sm font-medium ${
                      table.status === 'Available' ? 'text-green-600' : 'text-red-500'
                    }`}
                  >
                    {table.status}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Orders */}
        {activeTab === 'orders' && (
          <div>
            <h2 className="text-2xl font-bold mb-2">My Orders</h2>
            <p className="text-sm text-gray-500 mb-4">Track your order status and history</p>
            <div className="space-y-4">
              {[...dummyOrders()].map((order) => (
                <div
                  key={order.id}
                  className="bg-white rounded-2xl shadow-md px-4 py-3 flex justify-between items-center hover:shadow-lg transition duration-200"
                >
                  <div className="flex items-center space-x-3">
                    <div className="bg-orange-500 text-white rounded-full px-3 py-1 font-bold text-sm">
                      #{order.number.toString().padStart(2, '0')}
                    </div>
                    <div>
                      <div className="text-md font-semibold text-gray-800">{order.id}</div>
                      <div className="text-sm text-gray-600">{order.items}</div>
                      <div className="text-xs text-gray-400">{order.time}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div
                      className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                        order.status === 'Delivered'
                          ? 'bg-orange-100 text-orange-600'
                          : order.status === 'Preparing'
                          ? 'bg-gray-100 text-gray-600'
                          : 'bg-green-100 text-green-600'
                      }`}
                    >
                      {order.status}
                    </div>
                    <div className="text-lg font-bold text-gray-800 mt-1">${order.price}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Cart */}
        {activeTab === 'cart' && <Cart cart={cart} setCart={setCart} />}
      </div>
    </div>
  );
}

function dummyOrders() {
  return [
    {
      id: 'ORD001',
      number: 1,
      items: 'Margherita Pizza, Caesar Salad',
      time: '2 hours ago',
      status: 'Delivered',
      price: 30,
    },
    {
      id: 'ORD002',
      number: 2,
      items: 'Pasta Carbonara, Chocolate Cake',
      time: '15 minutes ago',
      status: 'Preparing',
      price: 24,
    },
    {
      id: 'ORD003',
      number: 3,
      items: 'Grilled Salmon, Wine',
      time: '5 minutes ago',
      status: 'Confirmed',
      price: 35,
    },
  ];
}
