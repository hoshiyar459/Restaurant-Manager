import React, { useState } from 'react'
import { motion } from 'framer-motion';



function RestroDashHeader( {menuItemCount} ) {

    const [menuItems, setMenuItems] = useState([]);
      const handleLogout = () => {
    localStorage.removeItem('restaurantName');
    navigate('/'); // Redirect to login
  };
  return (
    <div>
        <div className="flex justify-between items-center mb-10">
        <div>
          <motion.button
            className="bg-red-500 text-white font-semibold py-2 px-4 rounded-xl shadow-md hover:scale-105 transition"
            whileHover={{ scale: 1.05 }}
            onClick={handleLogout}
          >
            🔓 Logout
          </motion.button>
          <motion.h1
            className="text-4xl font-bold text-gray-900 mt-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            Restaurant Dashboard
          </motion.h1>
          <p className="text-gray-500 mt-1">Manage your restaurant operations</p>
        </div>
        <motion.button
          className="bg-orange-500 text-white font-semibold py-2 px-4 rounded-xl shadow-md hover:scale-105 transition"
          whileHover={{ scale: 1.05 }}
        >
          🏪 My Restaurant
        </motion.button>
      </div>



       {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <motion.div className="bg-gradient-to-br from-orange-500 to-orange-400 text-white p-5 rounded-xl shadow-lg" whileHover={{ scale: 1.03 }}>
          <p className="text-sm">Active Orders</p>
          <h2 className="text-3xl font-bold">12</h2>
          <p className="text-xs">+2 from last hour</p>
        </motion.div>

        <motion.div className="bg-white p-5 rounded-xl shadow hover:shadow-md" whileHover={{ scale: 1.03 }}>
          <p className="text-sm text-gray-500">Table Status</p>
          <h2 className="text-3xl font-bold text-gray-800">8/20</h2>
          <p className="text-xs text-gray-400">Tables occupied</p>
        </motion.div>

        <motion.div className="bg-white p-5 rounded-xl shadow hover:shadow-md" whileHover={{ scale: 1.03 }}>
          <p className="text-sm text-gray-500">Today's Revenue</p>
          <h2 className="text-3xl font-bold text-green-600">$2450</h2>
          <p className="text-xs text-gray-400">+15% from yesterday</p>
        </motion.div>

        <motion.div className="bg-gradient-to-br from-orange-300 to-orange-400 text-white p-5 rounded-xl shadow-lg" whileHover={{ scale: 1.03 }}>
          <p className="text-sm">Menu Items</p>
          <h2 className="text-3xl font-bold">{menuItemCount}</h2>
          <p className="text-xs">Available dishes</p>
        </motion.div>
      </div>

    </div>
  )
}

export default RestroDashHeader