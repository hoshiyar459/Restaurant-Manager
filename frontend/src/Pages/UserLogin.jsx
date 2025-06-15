import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaUser, FaPhoneAlt, FaKey } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { sendUserOtp, verifyUserOtp } from '../api/axios'; // ✅ import backend functions

export default function UserLogin() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [user, setUser] = useState({ name: '', phone: '', otp: '', role: 'USER' });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value.trimStart() });
  };

  const sendOtp = async () => {
    if (!user.name.trim()) {
      toast.warning("Name can't be empty.");
      return;
    }
    if (!/^\d{10}$/.test(user.phone)) {
      toast.error('Phone must be a valid 10-digit number.');
      return;
    }

    try {
      const response = await sendUserOtp({
        username: user.name,
        mobileNumber: user.phone,
      });

      const otp = response.data.otp;
      toast.success(`OTP sent 🚀 | Your OTP is ${otp}`); // still showing for testing
      setUser((prev) => ({ ...prev, otp: '' }));
      setStep(2);
    } catch (error) {
      toast.error('Failed to send OTP. Try again.');
    }
  };

const verifyOtp = async () => {
  if (user.otp.length !== 6) {
    toast.warning('Enter a valid 6-digit OTP');
    return;
  }

  try {
    const response = await verifyUserOtp({
      username: user.name,
      mobileNumber: user.phone,
      otp: user.otp,
    });

    // ✅ Show a success message (extract string safely)
    toast.success('OTP verified successfully');

    // ✅ Store userId and user info
    localStorage.setItem('userId', response.data.id);
    localStorage.setItem('restaurantUser', JSON.stringify(response.data));

    // ✅ Redirect
    navigate('/select-restaurant');
  } catch (error) {
    toast.error('Invalid OTP or verification failed.');
  }
};


  const goBack = () => {
    setStep(1);
    setUser({ ...user, otp: '' });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-tr from-orange-600 via-red-400 to-yellow-500 px-4 text-white font-sans">
      <ToastContainer position="top-center" autoClose={3000} />
      <motion.h1
        className="text-4xl sm:text-5xl font-extrabold mb-2"
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        🍽️ Welcome to RestaurantPro
      </motion.h1>

      <motion.p
        className="text-lg mb-6 text-center max-w-md"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        Dive in and manage your restaurant like a pro. Let's get started!
      </motion.p>

      <motion.div
        className="bg-white/20 backdrop-blur-md text-white w-full max-w-md rounded-3xl p-8 shadow-2xl border border-white/20"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {step === 1 && (
          <>
            <InputField
              icon={<FaUser />}
              name="name"
              placeholder="Your Name"
              value={user.name}
              onChange={handleChange}
            />
            <InputField
              icon={<FaPhoneAlt />}
              name="phone"
              placeholder="Mobile Number"
              maxLength={10}
              value={user.phone}
              onChange={handleChange}
            />
            <ActionButton onClick={sendOtp} text="Send OTP 🚀" color="orange" />
          </>
        )}

        {step === 2 && (
          <>
            <motion.p
              className="text-center mb-4 text-white/90"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              OTP sent to <strong>{user.phone}</strong>
            </motion.p>
            <InputField
              icon={<FaKey />}
              name="otp"
              placeholder="Enter 6-digit OTP"
              maxLength={6}
              value={user.otp}
              onChange={handleChange}
            />
            <div className="flex gap-4 mt-4">
              <ActionButton onClick={goBack} text="⬅ Back" color="gray" />
              <ActionButton onClick={verifyOtp} text="✅ Verify" color="orange" />
            </div>
          </>
        )}
      </motion.div>

      <p className="mt-8 text-sm opacity-75">Made with 💖 for foodpreneurs</p>
    </div>
  );
}

// 🔥 Input Field with icon
const InputField = ({ icon, ...props }) => (
  <div className="relative mb-4">
    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-orange-300 text-sm">
      {icon}
    </span>
    <input
      {...props}
      className="w-full pl-10 pr-4 py-2 text-orange-700 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-orange-400 shadow-inner"
    />
  </div>
);

// 🔥 Reusable Action Button
const ActionButton = ({ onClick, text, color }) => {
  const base = "w-full text-white font-semibold py-2 rounded-xl transition transform duration-200 hover:scale-105";
  const colors = {
    orange: "bg-orange-500 hover:bg-orange-600",
    gray: "bg-gray-300 text-orange-700 hover:bg-gray-400",
  };
  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`${base} ${colors[color]}`}
    >
      {text}
    </motion.button>
  );
};
