import React, { useState } from 'react';
import { uploadMenuItem } from '../api/axios';
import { toast } from 'react-toastify';

const AddMenuItem = ({ onItemAdded }) => {
  const [form, setForm] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    image: null,
    status: 'Available',
  });

  const [previewImage, setPreviewImage] = useState(null);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const rules = {
      name: {
        required: true,
        message: 'Name is required',
      },
      description: {
        required: true,
        message: 'Description is required',
      },
      price: {
        required: true,
        validator: (value) => !isNaN(value) && parseFloat(value) > 0,
        message: 'Enter a valid price (must be > 0)',
      },
      category: {
        required: true,
        message: 'Category is required',
      },
    };

    const newErrors = {};

    Object.entries(rules).forEach(([field, rule]) => {
      const value = form[field];
      if (rule.required && !value?.toString().trim()) {
        newErrors[field] = rule.message;
      } else if (rule.validator && !rule.validator(value)) {
        newErrors[field] = rule.message;
      }
    });

    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (errors[name]) {
      const updatedErrors = { ...errors };
      delete updatedErrors[name];
      setErrors(updatedErrors);
    }

    if (name === 'image') {
      const file = files[0];
      setForm({ ...form, image: file });

      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => setPreviewImage(reader.result);
        reader.readAsDataURL(file);
      } else {
        setPreviewImage(null);
      }
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      toast.error("❌ Please fix form errors.");
      return;
    }

    try {
      const formData = new FormData();
      Object.entries(form).forEach(([key, value]) => {
        if (key === 'image' && value) {
          formData.append('image', value);
        } else {
          formData.append(key, value);
        }
      });

      await uploadMenuItem(formData);
      toast.success('✅ Product added successfully!');
        onItemAdded(); 

      setForm({
        name: '',
        description: '',
        price: '',
        category: '',
        image: null,
        status: 'Available',
      });
      setPreviewImage(null);
      setErrors({});
    } catch (error) {
      toast.error('❌ Failed to add product. Please try again.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-orange-100 via-white to-orange-200 p-4">
      <form
        onSubmit={handleSubmit}
        className="backdrop-blur-lg bg-white/70 p-8 rounded-2xl shadow-2xl max-w-xl w-full space-y-5 border border-orange-200 transition-all duration-300"
      >
        <h2 className="text-2xl font-bold text-center text-orange-600">🍽️ Add New Menu Item</h2>

        <input
          type="text"
          name="name"
          placeholder="Item Name"
          value={form.name}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-orange-400 focus:outline-none"
        />
        {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}

        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-orange-400 focus:outline-none"
          rows="3"
        />
        {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}

        <div className="flex flex-col md:flex-row gap-4">
          <div className="w-full">
            <input
              type="number"
              name="price"
              placeholder="Price"
              value={form.price}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-orange-400 focus:outline-none"
            />
            {errors.price && <p className="text-red-500 text-sm">{errors.price}</p>}
          </div>

          <div className="w-full">
            <input
              type="text"
              name="category"
              placeholder="Category"
              value={form.category}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-orange-400 focus:outline-none"
            />
            {errors.category && <p className="text-red-500 text-sm">{errors.category}</p>}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Upload Image</label>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-xl file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:bg-orange-500 file:text-white hover:file:bg-orange-600 transition-all"
          />
          {previewImage && (
            <img
              src={previewImage}
              alt="Preview"
              className="mt-3 rounded-xl w-full h-48 object-cover shadow-md border"
            />
          )}
        </div>

        <select
          name="status"
          value={form.status}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-orange-400 focus:outline-none"
        >
          <option value="Available">Available</option>
          <option value="Out of Stock">Out of Stock</option>
        </select>

        <button
          type="submit"
          className="w-full py-3 bg-orange-500 text-white font-semibold rounded-xl hover:bg-orange-600 transition-all"
        >
          ➕ Add Item
        </button>
      </form>
    </div>
  );
};

export default AddMenuItem;
