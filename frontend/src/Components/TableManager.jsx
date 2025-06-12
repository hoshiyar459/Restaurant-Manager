import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { fetchAllTables, createTable } from '../api/axios';

export default function TableManager() {
  const [tables, setTables] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  const [newTable, setNewTable] = useState({
    name: '',
    status: 'Available',
    capacity: '',
  });

  // Load all tables from backend
  useEffect(() => {
    const loadTables = async () => {
      try {
        const res = await fetchAllTables();
        console.log("Fetched tables:", res.data);

        // FIX: ensure we set an array
        const tableData = Array.isArray(res.data)
          ? res.data
          : Array.isArray(res.data.tables)
          ? res.data.tables
          : [];

        setTables(tableData);
      } catch (error) {
        console.error('Failed to fetch tables:', error);
        setTables([]); // fallback to empty array to prevent map crash
      }
    };
    loadTables();
  }, []);

  // Add table via backend
  const handleAddTable = async () => {
    try {
      const response = await createTable(newTable);
      setTables([...tables, response.data]);
      setNewTable({ name: '', status: 'Available', capacity: '' });
      setModalOpen(false);
      setValidationErrors({});
    } catch (error) {
      console.error("Error adding table:", error);
    }
  };

  // Handle form validation
  const handleSubmit = () => {
    const errors = {};

    if (!newTable.name || newTable.name.trim().length < 2) {
      errors.name = "Table name must be at least 2 characters.";
    }
    if (
      !newTable.capacity ||
      isNaN(newTable.capacity) ||
      newTable.capacity <= 0
    ) {
      errors.capacity = "Capacity must be a number greater than 0.";
    }

    setValidationErrors(errors);

    if (Object.keys(errors).length === 0) {
      handleAddTable();
    }
  };

  return (
    <div className="min-h-screen bg-white px-6 py-10">
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-3xl font-bold">Table Management</h1>
        <button
          onClick={() => setModalOpen(true)}
          className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded-xl shadow-md"
        >
          + Add Table
        </button>
      </div>

      <p className="text-gray-500 mb-4">Real-time table booking status</p>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
        {tables?.map?.((table) => (
          <motion.div
            key={table.id || table._id}
            className={`rounded-2xl shadow-md p-4 flex flex-col justify-between items-center ${
              table.status === 'Occupied'
                ? 'bg-gradient-to-b from-orange-400 to-orange-500 text-white'
                : 'border border-dashed border-gray-300 text-black'
            }`}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <div className="text-4xl">🪑</div>
            <h2 className="font-bold text-xl mt-2">{table.name}</h2>
            <p className="mt-1 font-semibold">
              {table.status === 'Occupied' ? (
                <>
                  <span className="bg-white text-orange-500 px-2 py-1 rounded-full text-sm font-semibold">
                    Occupied
                  </span>
                  <br />
                  <span className="text-sm">Est. 45 min</span>
                </>
              ) : (
                <span className="bg-black text-white px-2 py-1 rounded-full text-sm">
                  Available
                </span>
              )}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Popup Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-[90%] max-w-md">
            <h2 className="text-2xl font-bold mb-4 text-orange-500">Add New Table</h2>

            {/* Table Name */}
            <input
              type="text"
              placeholder="Enter Table Name"
              value={newTable.name}
              onChange={(e) =>
                setNewTable({ ...newTable, name: e.target.value })
              }
              className={`w-full p-2 border ${
                validationErrors.name ? 'border-red-500' : 'border-gray-300'
              } rounded-md mb-1 focus:outline-none focus:ring-2 focus:ring-orange-400`}
            />
            {validationErrors.name && (
              <p className="text-sm text-red-500 mb-2">{validationErrors.name}</p>
            )}

            {/* Status Dropdown */}
            <select
              className="w-full p-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-orange-400"
              value={newTable.status}
              onChange={(e) =>
                setNewTable({ ...newTable, status: e.target.value })
              }
            >
              <option value="Available">Available</option>
              <option value="Occupied">Occupied</option>
            </select>

            {/* Capacity */}
            <input
              type="number"
              placeholder="Enter Capacity"
              value={newTable.capacity}
              onChange={(e) =>
                setNewTable({ ...newTable, capacity: parseInt(e.target.value) })
              }
              className={`w-full p-2 border ${
                validationErrors.capacity ? 'border-red-500' : 'border-gray-300'
              } rounded-md mb-1 focus:outline-none focus:ring-2 focus:ring-orange-400`}
            />
            {validationErrors.capacity && (
              <p className="text-sm text-red-500 mb-2">{validationErrors.capacity}</p>
            )}

            {/* Buttons */}
            <div className="flex justify-end gap-4 mt-4">
              <button
                className="px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300"
                onClick={() => setModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 rounded-md bg-orange-500 text-white hover:bg-orange-600"
                onClick={handleSubmit}
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
