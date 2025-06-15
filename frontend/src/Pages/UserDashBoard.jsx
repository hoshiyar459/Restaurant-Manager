import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  fetchAllMenuItems,
  fetchAllTables,
  addToCart as addToCartAPI,
} from '../api/axios';
import Cart from './Cart';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import UserDashHeader from '../Components/UserDashHeader';
import UserDashboardMenu from '../Components/UserDashboardMenu';
import UserDashBoardTableSec from '../Components/UserDashBoardTableSec';
import UserDashbordOrderSec from '../Components/UserDashbordOrderSec';

export default function UserDashBoard() {
  const [activeTab, setActiveTab] = useState('menu');
  const [menuItems, setMenuItems] = useState([]);
  const [tables, setTables] = useState([]);
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  const userId = localStorage.getItem('userId');

  // Fetch data
  useEffect(() => {
    fetchAllMenuItems()
      .then((res) => setMenuItems(res.data))
      .catch((err) => console.error('Error fetching menu:', err));

    fetchAllTables()
      .then((res) => {
        const data = Array.isArray(res.data) ? res.data : res.data?.tables || [];
        setTables(data);
      })
      .catch((err) => console.error('Error fetching tables:', err));
  }, []);

  // Load cart from localStorage
  useEffect(() => {
    const storedCart = localStorage.getItem('userCart');
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  // Save cart to localStorage on change
  useEffect(() => {
    localStorage.setItem('userCart', JSON.stringify(cart));
  }, [cart]);

  // Add item to cart
 const addToCart = async (item) => {
  if (!item || !item.id) return;

  const updatedCart = [...cart];
  const existingItem = updatedCart.find((i) => i.id === item.id);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    updatedCart.push({ ...item, quantity: 1 });
  }

  setCart(updatedCart);

  // Save to localStorage
  localStorage.setItem('userCart', JSON.stringify(updatedCart));

  // Send to backend
  try {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      toast.error('⚠️ Please login first!');
      return;
    }

    await addToCartAPI(userId, item.id); // item.id = menuId
    toast.success(`✅ ${item.title} added to your cart!`);
  } catch (err) {
    console.error('Error adding to cart:', err);
    toast.error('❌ Failed to add to cart on server!');
  }
};

  // Handle order placement
  const makeOrder = async () => {
    if (!userId) {
      toast.error('❌ User not logged in.');
      return;
    }

    if (cart.length === 0) {
      toast.warn('🛒 Cart is empty!');
      return;
    }

    try {
      for (const item of cart) {
        await addToCartAPI(userId, item.id); // using `id` as `menuId`
      }

      toast.success('✅ Order placed successfully!');
      setCart([]);
      localStorage.removeItem('userCart');
      setActiveTab('orders'); // redirect to orders tab
    } catch (err) {
      console.error(err);
      toast.error('🔥 Failed to place order.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-100 p-6 md:p-10">
      <div className="max-w-screen-xl mx-auto">
        <div id="UserDashBoard">
          <UserDashHeader menuItemsLen={menuItems.length} tables={tables} />
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

        {/* Conditional Tabs */}
        {activeTab === 'menu' && (
          <UserDashboardMenu
            menuItems={menuItems}
            cart={cart}
            setCart={setCart}
            addToCart={addToCart}
          />
        )}

        {activeTab === 'tables' && (
          <UserDashBoardTableSec tables={tables} />
        )}

        {activeTab === 'orders' && (
          <UserDashbordOrderSec />
        )}

        {activeTab === 'cart' && (
          <Cart cart={cart} setCart={setCart} makeOrder={makeOrder} />
        )}
      </div>
    </div>
  );
}
