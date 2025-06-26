import React from 'react';
import { Link } from 'react-router-dom';

const ShowProduct = ({ data }) => {
  return (
    <div className="w-full max-w-xs sm:max-w-[45%] md:max-w-[48%] lg:max-w-sm rounded overflow-hidden shadow-md mb-6 mx-auto border border-gray-200 hover:shadow-xl transition-transform duration-150 hover:scale-[1.03] dark:border-gray-700 bg-white dark:bg-gray-800 relative">

      {/* Discount Badge */}
      <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full z-10">
        40% OFF
      </div>

      <Link to={`/productdetails/${data.id}`}>
        <div className="flex justify-center items-center p-4 group transition-transform duration-200 hover:scale-105">
          <img
            src={data.image}
            alt={data.category}
            className="h-36 object-contain"
          />
        </div>
      </Link>

      <div className="px-4 pb-3">
        <h2 className="font-bold text-lg text-gray-800 dark:text-white mb-1 line-clamp-2 group-hover:underline transition-colors duration-150">
          {data.title}
        </h2>
        <p className="text-gray-600 text-sm mb-1 dark:text-gray-300 capitalize">
          {data.category}
        </p>
        <div className="flex justify-between items-center">
          <span className="font-semibold text-md text-gray-800 dark:text-white">
            ${data.price}
          </span>
          <span className="text-xs text-gray-500 dark:text-gray-400 line-through">
            ${(data.price * 1.2).toFixed(2)}
          </span>
        </div>
      </div>

      <div className="px-4 pb-4 flex flex-wrap gap-2">
        <span className="bg-gray-200 dark:bg-gray-700 rounded-full px-3 py-1 text-sm font-medium text-gray-700 dark:text-white">
          {data.rating.rate} ⭐
        </span>
        <span className="bg-gray-200 dark:bg-gray-700 rounded-full px-3 py-1 text-sm font-medium text-gray-700 dark:text-white">
          {data.rating.count} Ratings
        </span>
      </div>

      {/* Action Buttons */}
      <div className="px-4 pb-4 flex justify-between gap-3">
        <button
          onClick={() => handleAddToCart(data)}
          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold py-2 px-3 rounded"
        >
          Add to Cart
        </button>
        <button
          onClick={() => handleAddToWishlist(data)}
          className="flex-1 bg-pink-600 hover:bg-pink-700 text-white text-sm font-semibold py-2 px-3 rounded"
        >
          Wishlist
        </button>
      </div>
    </div>
  );
}
export default ShowProduct;
