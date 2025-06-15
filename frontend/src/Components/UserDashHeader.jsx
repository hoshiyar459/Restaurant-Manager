import React, { useState } from 'react'
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function UserDashHeader( {menuItemsLen , tables}) {
     const [activeTab, setActiveTab] = useState('menu');
       const [cart, setCart] = useState([]);
       const navigate = useNavigate();
       
  return (
    <>
            <div className="flex justify-end mb-4">
               
          <button
            onClick={() => {
              localStorage.clear();
              toast.success('Logged out successfully! Redirecting to login page...');
              navigate('/');
            }}
            className="bg-orange-500 text-white px-4 py-2 rounded-full shadow hover:bg-orange-600 transition-all"
          >
            🚪 Logout
          </button>
        </div>

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
            <div className="text-4xl font-bold">{menuItemsLen}</div>
            <div className="text-lg">Menu Items</div>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }} className="bg-gradient-to-r from-orange-400 to-orange-300 text-white rounded-2xl p-6 text-center shadow-xl">
            <div className="text-3xl">🪑</div>
            <div className="text-4xl font-bold">
              {Array.isArray(tables)
                ? tables.filter((t) => t?.status === 'Available').length
                : 0}
            </div>
            <div className="text-lg">Tables Available</div>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }} className="border-2 border-orange-400 bg-white rounded-2xl p-6 text-center shadow-xl">
            <div className="text-3xl">⭐</div>
            <div className="text-4xl font-bold text-orange-500">4.8</div>
            <div className="text-lg">Customer Rating</div>
          </motion.div>
        </div>


    </>
  )
}

export default UserDashHeader