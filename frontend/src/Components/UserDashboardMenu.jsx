import React from 'react'
import { motion } from 'framer-motion'

function UserDashboardMenu({ menuItems, cart, setCart, addToCart }) {
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
                      {menuItems.map((item) => (
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
                          <div className="flex justify-between items-center">
                            <span className="text-lg font-bold text-orange-500">₹{item.price}</span>
                            {cart.find((i) => i.id === item.id) ? (
                              <div className="flex items-center gap-2">
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
                                  {cart.find((i) => i.id === item.id)?.quantity}
                                </span>
                                <button
                                  onClick={() => addToCart(item)}
                                  className="bg-orange-500 text-white px-3 py-1 rounded-full text-lg font-bold hover:bg-orange-600"
                                >
                                  +
                                </button>
                              </div>
                            ) : (
                              <button
                                onClick={() => addToCart(item)}
                                className="bg-orange-500 text-white px-4 py-1 rounded-full hover:bg-orange-600 transition-all"
                              >
                                Add to Cart
                              </button>
                            )}
                          </div>
                        </motion.div>
                      ))}
                    </motion.div>
                  </div>
    </div>
  )
}

export default UserDashboardMenu