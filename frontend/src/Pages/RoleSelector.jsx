import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export default function RoleSelector() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-orange-500 to-orange-400 text-white px-4">
      <motion.h1 
        className="text-5xl font-bold mb-2 mt-4"
        initial={{ opacity: 0, y: -20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.6 }}
      >
        RestaurantPro
      </motion.h1>

      <motion.p
        className="text-lg mb-8"
        initial={{ opacity: 0, y: -10 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        Complete Restaurant Management System
      </motion.p>

      <motion.button 
        className="bg-white text-orange-500 font-semibold px-6 py-2 rounded-full mb-8 shadow-md hover:scale-105 transition"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Choose Your Role
      </motion.button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
        {/* Owner Card */}
        <motion.div 
          className="bg-orange-400 border-2 border-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition"
          whileHover={{ scale: 1.02 }}
        >
          <div className="text-center text-4xl mb-4">🏪</div>
          <h2 className="text-2xl font-bold mb-2 text-center">Restaurant Owner</h2>
          <p className="mb-4 text-center">Manage your restaurant operations</p>
          <ul className="text-sm space-y-1">
            <li>• Upload & Edit Menu</li>
            <li>• Track Orders in Real-time</li>
            <li>• Bill Payment Management</li>
            <li>• Real-time Table Status</li>
            <li>• Analytics & Reports</li>
          </ul>
          <button onClick={()=> navigate("/userLogin")} className="w-full mt-4 bg-white text-orange-500 font-bold py-2 rounded-xl hover:bg-orange-100">Continue as Owner</button>
        </motion.div>

        {/* Customer Card */}
        <motion.div 
          className="bg-orange-400  border-white border-2 rounded-2xl p-6 shadow-lg hover:shadow-xl transition"
          whileHover={{ scale: 1.02 }}
        >
          <div className="text-center text-4xl mb-4">👨‍🍳</div>
          <h2 className="text-2xl font-bold mb-2 text-center">Customer</h2>
          <p className="mb-4 text-center">Enjoy seamless dining experience</p>
          <ul className="text-sm space-y-1 ">
            <li>• Browse Restaurant Menus</li>
            <li>• Book Tables Online</li>
            <li>• Order Food & Track Status</li>
            <li>• Secure Bill Payment</li>
            <li>• Exclusive Perks & Offers</li>
          </ul>
          <button onClick={()=> navigate("/userLogin")} className="w-full mt-4 bg-orange-500 text-white font-bold py-2 rounded-xl hover:bg-orange-600">Continue as Customer</button>
        </motion.div>
      </div>
    </div>
  );
}
