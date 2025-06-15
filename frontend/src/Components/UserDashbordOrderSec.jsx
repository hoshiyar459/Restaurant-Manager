import React from 'react'



function dummyOrders() {
  return [
    {
      id: 'ORD001',
      number: 1,
      items: 'Margherita Pizza, Caesar Salad',
      time: '2 hours ago',
      status: 'Delivered',
      price: 30,
    },
    {
      id: 'ORD002',
      number: 2,
      items: 'Pasta Carbonara, Chocolate Cake',
      time: '15 minutes ago',
      status: 'Preparing',
      price: 24,
    },
    {
      id: 'ORD003',
      number: 3,
      items: 'Grilled Salmon, Wine',
      time: '5 minutes ago',
      status: 'Confirmed',
      price: 35,
    },
  ];
}

function UserDashbordOrderSec() {
    return (
        <div>
            <h2 className="text-2xl font-bold mb-2">My Orders</h2>
            <p className="text-sm text-gray-500 mb-4">Track your order status and history</p>
            <div className="space-y-4">
                {[...dummyOrders()].map((order) => (
                    <div
                        key={order.id}
                        className="bg-white rounded-2xl shadow-md px-4 py-3 flex justify-between items-center hover:shadow-lg transition duration-200"
                    >
                        <div className="flex items-center space-x-3">
                            <div className="bg-orange-500 text-white rounded-full px-3 py-1 font-bold text-sm">
                                #{order.number.toString().padStart(2, '0')}
                            </div>
                            <div>
                                <div className="text-md font-semibold text-gray-800">{order.id}</div>
                                <div className="text-sm text-gray-600">{order.items}</div>
                                <div className="text-xs text-gray-400">{order.time}</div>
                            </div>
                        </div>
                        <div className="text-right">
                            <div
                                className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${order.status === 'Delivered'
                                    ? 'bg-orange-100 text-orange-600'
                                    : order.status === 'Preparing'
                                        ? 'bg-gray-100 text-gray-600'
                                        : 'bg-green-100 text-green-600'
                                    }`}
                            >
                                {order.status}
                            </div>
                            <div className="text-lg font-bold text-gray-800 mt-1">${order.price}</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default UserDashbordOrderSec