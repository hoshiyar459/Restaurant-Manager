import React from 'react'

function UserDashBoardTableSec( {tables}) {
  return (
    <div>
         <div>
            <h2 className="text-2xl font-bold text-orange-600 mb-4">Reserve Your Table</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {Array.isArray(tables) &&
                tables.map((table) => (
                  <div
                    key={table.id}
                    className={`rounded-xl p-4 text-center border transition-all duration-300 ${table.status === 'Available'
                      ? 'border-green-400 bg-white'
                      : 'border-gray-300 bg-gray-100 text-gray-400'
                      }`}
                  >
                    <div className="text-xl">🪑</div>
                    <div className="font-bold">Table {table.name || table.id}</div>
                    <div className="text-sm">{table.capacity || table.seats} seats</div>
                    <div
                      className={`mt-2 text-sm font-medium ${table.status === 'Available' ? 'text-green-600' : 'text-red-500'
                        }`}
                    >
                      {table.status}
                    </div>
                  </div>
                ))}
            </div>
          </div>
    </div>
  )
}

export default UserDashBoardTableSec