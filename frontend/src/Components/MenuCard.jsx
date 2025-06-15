import { useState } from 'react';
import { motion } from 'framer-motion';

export default function MenuDisplayCard({ items = [], loading = false }) {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [editFormData, setEditFormData] = useState({ name: '', price: '', category: '', status: '' });

  const handleDelete = (id) => {
    setSelectedId(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    console.log('Deleting item with id:', selectedId);
    // axios.delete(`/api/menu/${selectedId}`);
    setShowDeleteModal(false);
  };

  const handleEdit = (id) => {
    const item = items.find((i) => i.id === id || i._id === id);
    if (item) {
      setEditFormData({
        name: item.name,
        price: item.price,
        category: item.category,
        status: item.status,
      });
      setSelectedId(id);
      setShowEditModal(true);
    }
  };

  const saveEdit = () => {
    console.log('Updated item:', editFormData);
    // axios.put(`/api/menu/${selectedId}`, editFormData);
    setShowEditModal(false);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  if (!items.length) {
    return (
      <div className="bg-red-50 border-l-4 border-red-500 p-4 my-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm text-red-700">No menu items available</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Our Menu</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {items.map((item) => (
          <MenuCard
            key={item.id || item._id}
            id={item.id || item._id}
            name={item.name}
            price={item.price}
            category={item.category}
            status={item.status}
            image={item.imageUrl ? 'http://localhost:8080' + item.imageUrl : item.image}
            onDelete={handleDelete}
            onEdit={handleEdit}
          />
        ))}
      </div>

      {showDeleteModal && (
        <DeleteConfirmModal
          onCancel={() => setShowDeleteModal(false)}
          onConfirm={confirmDelete}
        />
      )}

      {showEditModal && (
        <EditMenuModal
          onCancel={() => setShowEditModal(false)}
          onSave={saveEdit}
          formData={editFormData}
          setFormData={setEditFormData}
        />
      )}
    </div>
  );
}

function MenuCard({ id, name, price, category, status, image, onDelete, onEdit }) {
  const [showOptions, setShowOptions] = useState(false);

  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      className="bg-white rounded-2xl shadow-md p-4 flex flex-col relative items-center w-full h-full transition-all duration-300 hover:shadow-lg"
    >
      {/* Three Dot Menu */}
      <div className="absolute top-2 right-2 z-10">
        <button onClick={() => setShowOptions(!showOptions)} className="text-gray-600 hover:text-gray-900 text-xl">
          ⋮
        </button>
        {showOptions && (
          <div className="absolute right-0 mt-2 w-32 bg-white border rounded shadow-lg z-50">
            <button
              onClick={() => {
                setShowOptions(false);
                onEdit(id);
              }}
              className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm"
            >
              Edit Menu
            </button>
            <button
              onClick={() => {
                setShowOptions(false);
                onDelete(id);
              }}
              className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm text-red-500"
            >
              Delete Menu
            </button>
          </div>
        )}
      </div>

      <div className="w-full h-40 overflow-hidden rounded-md mb-4">
        <img
          src={
            image ||
            'https://img.freepik.com/premium-vector/character-avatar-isolated_729149-194801.jpg?semt=ais_hybrid&w=740'
          }
          alt={name}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>
      <h3 className="font-bold text-lg mb-1 text-center">{name}</h3>
      <p className="text-sm text-gray-600 mb-2">{category}</p>
      <div className="text-xl font-semibold mb-2">₹{price.toFixed(2)}</div>
      <span
        className={`px-4 py-1 text-sm rounded-full font-medium ${
          status === 'Available' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}
      >
        {status}
      </span>
    </motion.div>
  );
}

function DeleteConfirmModal({ onConfirm, onCancel }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-md w-96">
        <h2 className="text-lg font-semibold mb-4">Confirm Deletion</h2>
        <p className="mb-6">Are you sure you want to delete this menu item?</p>
        <div className="flex justify-end space-x-3">
          <button onClick={onCancel} className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">
            Cancel
          </button>
          <button onClick={onConfirm} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

function EditMenuModal({ onCancel, onSave, formData, setFormData }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-md w-96">
        <h2 className="text-lg font-semibold mb-4">Edit Menu Item</h2>
        <input
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full mb-3 p-2 border rounded"
          placeholder="Name"
        />
        <input
          value={formData.price}
          onChange={(e) => setFormData({ ...formData, price: e.target.value })}
          className="w-full mb-3 p-2 border rounded"
          placeholder="Price"
          type="number"
        />
        <input
          value={formData.category}
          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          className="w-full mb-3 p-2 border rounded"
          placeholder="Category"
        />
        <select
          value={formData.status}
          onChange={(e) => setFormData({ ...formData, status: e.target.value })}
          className="w-full mb-3 p-2 border rounded"
        >
          <option value="Available">Available</option>
          <option value="Unavailable">Unavailable</option>
        </select>

        <div className="flex justify-end space-x-3">
          <button onClick={onCancel} className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">
            Cancel
          </button>
          <button onClick={onSave} className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
