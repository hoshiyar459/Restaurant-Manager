import React, { useState } from 'react';
import { motion } from 'framer-motion';

function UserDashboardMenu({ menuItems, cart, setCart, addToCart }) {
    const [quantities, setQuantities] = useState({});

    const handleQuantityChange = (itemId, value) => {
        const newQuantity = Math.max(1, parseInt(value) || 1);
        setQuantities((prev) => ({ ...prev, [itemId]: newQuantity }));
    };

    const handleAddToCart = (item) => {
        const quantity = quantities[item.id] || 1;
        addToCart(item, quantity);
        setQuantities((prev) => ({ ...prev, [item.id]: 1 })); // reset to 1 after adding
    };

    return (
        <div>
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
                    {menuItems.map((item) => {
                        const cartItem = cart.find((i) => i.id === item.id);
                        const currentQuantity = quantities[item.id] || 1;

                        return (
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
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-lg font-bold text-orange-500">₹{item.price}</span>
                                </div>

                                <div className="flex flex-col items-center gap-3">
                                    <div className="flex items-center justify-center gap-2 w-full">
                                        <label className="text-sm text-gray-600">Qty:</label>
                                        <input
                                            type="number"
                                            min="1"
                                            value={currentQuantity}
                                            onChange={(e) =>
                                                handleQuantityChange(item.id, e.target.value)
                                            }
                                            className="w-16 px-2 py-1 border border-orange-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-400"
                                        />
                                    </div>

                                    <button
                                        onClick={() => handleAddToCart(item)}
                                        className="bg-orange-500 text-white px-4 py-1 rounded-full hover:bg-orange-600 transition-all w-full"
                                    >
                                        Add to Cart
                                    </button>

                                    {cartItem && (
                                        <div className="flex items-center justify-between w-full">
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
                                                {cartItem.quantity}
                                            </span>
                                            <button
                                                onClick={() => addToCart(item, 1)}
                                                className="bg-orange-500 text-white px-3 py-1 rounded-full text-lg font-bold hover:bg-orange-600"
                                            >
                                                +
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>
        </div>
    );
}

export default UserDashboardMenu;
