import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { fetchAllMenuItems, fetchAllTables } from '../api/axios';
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

  useEffect(() => {
    const storedCart = localStorage.getItem('userCart');
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('userCart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (item) => {
    if (!item || !item.id) return;

    setCart((prevCart) => {
      if (!Array.isArray(prevCart)) return [];

      const exists = prevCart.find((i) => i?.id === item.id);
      if (exists) {
        return prevCart.map((i) =>
          i?.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      } else {
        return [...prevCart, { ...item, quantity: 1 }];
      }
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-100 p-6 md:p-10">
      <div className="max-w-screen-xl mx-auto">


        <div id='UserDashBoard'>
          <UserDashHeader menuItemsLen={menuItems.length} tables={tables} />
        </div>


        {/* Tabs */}


        <div className="flex justify-center gap-4 mb-6 flex-wrap">
          {['menu', 'tables', 'orders', 'cart'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-full font-semibold transition-all duration-300 text-sm md:text-base ${activeTab === tab
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
          <UserDashboardMenu
            menuItems={menuItems}
            cart={cart}
            setCart={setCart}
            addToCart={addToCart}
          />
        )}


        {/* Tables */}
        {activeTab === 'tables' && (
            <UserDashBoardTableSec tables = {tables}></UserDashBoardTableSec>
        )}

        {/* Orders */}
        {activeTab === 'orders' && (
           <UserDashbordOrderSec></UserDashbordOrderSec>
        )}

        {/* Cart */}
        {activeTab === 'cart' && <Cart cart={cart} setCart={setCart} />}
      </div>
    </div>
  );
}


