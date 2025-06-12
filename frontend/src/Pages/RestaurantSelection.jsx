import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { fetchAllRestaurants } from '../api/axios'; // Make sure the path is correct

export default function RestaurantSelection() {
  const navigate = useNavigate();
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    const loadRestaurants = async () => {
      try {
        const response = await fetchAllRestaurants();
        setRestaurants(response.data); // Assumes response.data is an array of User objects with restaurantName
      } catch (error) {
        toast.error("Failed to load restaurants 😓");
        console.error(error);
      }
    };

    loadRestaurants();
  }, []);

  const handleSelect = (restaurant) => {
    localStorage.setItem('restaurantName', restaurant.restaurantName); // Save for further usage
    toast.success("Restaurant selected 🚀");
    navigate(`/UserDashBoard?restaurantId=${restaurant._id}`); // _id from MongoDB, adjust if different
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-yellow-500 via-orange-400 to-red-500 flex flex-col items-center justify-center px-4 text-white">
      <ToastContainer position="top-center" />
      
      <motion.h2
        className="text-3xl sm:text-4xl font-bold mb-6"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        🍴 Choose Your Restaurant
      </motion.h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl w-full">
        {restaurants.map((resto, idx) => (
          <motion.div
            key={resto._id}
            onClick={() => handleSelect(resto)}
            className="cursor-pointer bg-white/20 backdrop-blur-lg border border-white/30 rounded-2xl p-6 shadow-lg hover:scale-105 hover:bg-white/30 transition-transform duration-300"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 * idx }}
          >
            <h3 className="text-xl font-bold text-white">{resto.restaurantName}</h3>
            <p className="text-sm text-white/80 mt-1">{resto.phoneNumber}</p>
          </motion.div>
        ))}
      </div>

      <p className="mt-10 text-sm text-white/80">Powered by 🍽️ RestaurantPro</p>
    </div>
  );
}
