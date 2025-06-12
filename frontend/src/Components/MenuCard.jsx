import { motion } from 'framer-motion';

export const MenuCard = ({ name, price, category, status, image }) => {
  return (
    <motion.div 
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      className="bg-white rounded-2xl shadow-md p-4 flex flex-col items-center w-full h-full transition-all duration-300 hover:shadow-lg"
    >
      <div className="w-full h-40 overflow-hidden rounded-md mb-4">
        <img
          src={image || 'https://img.freepik.com/premium-vector/character-avatar-isolated_729149-194801.jpg?semt=ais_hybrid&w=740'}
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
          status === 'Available' 
            ? 'bg-green-100 text-green-800' 
            : 'bg-red-100 text-red-800'
        }`}
      >
        {status}
      </span>
    </motion.div>
  );
};

export const MenuDisplay = ({ items = [], loading = false }) => {
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
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
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
            name={item.name}
            price={item.price}
            category={item.category}
            status={item.status}
            image={item.imageUrl ? 'http://localhost:8080' + item.imageUrl : item.image}
          />
        ))}
      </div>
    </div>
  );
};