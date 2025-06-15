import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import AddMenuItem from '../Components/AddMenuItem';
import MenuDisplayCard from '../Components/MenuCard'

import { fetchAllMenuItems } from '../api/axios';
import TableManager from '../Components/TableManager';
import RestroDashHeader from '../Components/RestroDashHeader';

export default function RestaurentDashboard() {
  
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState('orders');
  const [loading, setLoading] = useState(true);
  const [menuItems, setMenuItems] = useState([]);
  
  const loadMenuItems = async () => {
    let restaurantName = localStorage.getItem('restaurantName');
    if (!restaurantName) return;
    // Replace multiple spaces with dashes
    const formattedName = restaurantName.trim().replace(/\s+/g, '-');

    try {
      const response = await fetchAllMenuItems(formattedName);
      if (response.status === 200) {
        setMenuItems(response.data);
      } else {
        setMenuItems([]);
      }
    } catch (error) {
      console.error('Error fetching menu items:', error);
      setMenuItems([]);
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
        
       <RestroDashHeader menuItemCount={menuItems.length} />
     

      {/* Tabs */}
      <div className="flex justify-around bg-white rounded-xl shadow-sm p-3 text-sm font-medium text-gray-600 mb-6">
        {['orders', 'menu', 'tables', 'analytics'].map((tab) => (
          <span
            key={tab}
            className={`cursor-pointer hover:text-orange-500 ${selectedTab === tab && 'text-orange-500 font-bold'}`}
            onClick={() => setSelectedTab(tab)}
          >
            {tab === 'orders' && '📦 Orders'}
            {tab === 'menu' && '🍽️ Menu'}
            {tab === 'tables' && '🪑 Tables'}
            {tab === 'analytics' && '📊 Analytics'}
          </span>
        ))}
      </div>

      {/* Conditional Content */}
      {selectedTab === 'orders' && (
        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Recent Orders</h3>
          <p className="text-sm text-gray-400 mb-6">Track and manage customer orders in real-time</p>
          {/* Sample Orders */}
          <div className="space-y-4">
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
          <MenuDisplayCard items={menuItems} loading={loading} />
          
        </div>
      )}

      {selectedTab === 'tables' && <TableManager />}

      {selectedTab === 'analytics' && (
        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Analytics Dashboard</h3>
          <p className="text-sm text-gray-400">Visualize your restaurant’s performance over time.</p>
          <div className="mt-4 text-gray-700">📈 Charts coming soon...</div>
        </div>
      )}
    </div>
  );
}
