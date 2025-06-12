import { useState,useEffect } from 'react';
import { motion } from 'framer-motion';
import AddMenuItem from '../Components/AddMenuItem';
import { MenuDisplay } from '../Components/MenuCard';
import { fetchAllMenuItems } from '../api/axios';
import TableManager from '../Components/TableManager';

export default function RestaurentDashboard() {
  const [selectedTab, setSelectedTab] = useState('orders'); // default tab
   const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadMenuItems = async () => {
    try {
      const response = await fetchAllMenuItems();
      if (response.status === 200) {
        setMenuItems(response.data);
      } else {
        setMenuItems([]);
      }
    } catch (error) {
      console.error("Error fetching menu items:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMenuItems();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-orange-50 px-6 py-10">
      {/* Header */}
      <div className="flex justify-between items-center mb-10">
        <div>
          <motion.h1
            className="text-4xl font-bold text-gray-900"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            Restaurant dashcam
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
          <h2 className="text-3xl font-bold">45</h2>
          <p className="text-xs">Available dishes</p>
        </motion.div>
      </div>

      {/* Tabs */}
      <div className="flex justify-around bg-white rounded-xl shadow-sm p-3 text-sm font-medium text-gray-600 mb-6">
        <span
          className={`cursor-pointer hover:text-orange-500 ${selectedTab === 'orders' && 'text-orange-500 font-bold'}`}
          onClick={() => setSelectedTab('orders')}
        >
          📦 Orders
        </span>
        <span
          className={`cursor-pointer hover:text-orange-500 ${selectedTab === 'menu' && 'text-orange-500 font-bold'}`}
          onClick={() => setSelectedTab('menu')}
        >
          🍽️ Menu
        </span>
        <span
          className={`cursor-pointer hover:text-orange-500 ${selectedTab === 'tables' && 'text-orange-500 font-bold'}`}
          onClick={() => setSelectedTab('tables')}
        >
          🪑 Tables
        </span>
        <span
          className={`cursor-pointer hover:text-orange-500 ${selectedTab === 'analytics' && 'text-orange-500 font-bold'}`}
          onClick={() => setSelectedTab('analytics')}
        >
          📊 Analytics
        </span>
      </div>

      {/* Conditional Sections */}
      {selectedTab === 'orders' && (
        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Recent Orders</h3>
          <p className="text-sm text-gray-400 mb-6">Track and manage customer orders in real-time</p>

          <div className="space-y-4">
            {/* Order Item #1 */}
            <div className="flex items-center justify-between p-4 bg-orange-50 rounded-xl shadow-sm">
              <div className="flex items-center space-x-4">
                <div className="bg-orange-500 text-white font-bold px-3 py-1 rounded-full">#1</div>
                <div>
                  <p className="text-gray-800 font-medium">Table 3</p>
                  <p className="text-sm text-gray-500">Margherita Pizza, Pasta Carbonara</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <span className="bg-gray-200 text-gray-600 text-xs font-semibold px-2 py-1 rounded-full">New</span>
                <span className="font-bold text-gray-800">$30</span>
              </div>
            </div>

            {/* Order Item #2 */}
            <div className="flex items-center justify-between p-4 bg-orange-50 rounded-xl shadow-sm">
              <div className="flex items-center space-x-4">
                <div className="bg-orange-500 text-white font-bold px-3 py-1 rounded-full">#2</div>
                <div>
                  <p className="text-gray-800 font-medium">Table 4</p>
                  <p className="text-sm text-gray-500">Paneer Tikka, Naan</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <span className="bg-yellow-200 text-yellow-800 text-xs font-semibold px-2 py-1 rounded-full">Preparing</span>
                <span className="font-bold text-gray-800">$35</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {selectedTab === 'menu' && (
        <div className="space-y-6">
              <AddMenuItem onItemAdded={loadMenuItems} />
      <MenuDisplay items={menuItems} loading={loading} />
        </div>
      )}

      {selectedTab === 'tables' && (
        <TableManager></TableManager>
      )}

      {selectedTab === 'analytics' && (
        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Analytics Dashboard</h3>
          <p className="text-sm text-gray-400">Visualize your restaurant’s performance over time.</p>
          {/* Replace with analytics chart/components */}
          <div className="mt-4 text-gray-700">
            📈 Charts coming soon...
          </div>
        </div>
      )}
    </div>
  );
}
