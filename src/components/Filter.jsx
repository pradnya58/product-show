import React, { useState, useEffect } from 'react';

export default function Filter({ data, handleFilter, sort, setSort }) {
  const [cate, setCate] = useState('All');
  const [price, setPrice] = useState('All');
  const [rating, setRating] = useState('All');

  const [categoryList, setCategoryList] = useState([]);

  useEffect(() => {
    const categories = new Set(['All']);
    data.forEach(p => categories.add(p.category));
    setCategoryList([...categories]);
  }, [data]);

  const handleSubmit = () => {
    handleFilter({ category: cate, price, rating });
  };

  return (
    <aside className="w-full lg:w-[300px] bg-pink-50 dark:bg-gray-900 text-gray-800 dark:text-white px-6 py-6 rounded-md shadow-md mb-6 lg:mb-0 mx-4 text-base font-medium">
      {/* Category */}
      <div className="w-full mb-4">
        <label htmlFor="category" className="block text-base font-semibold dark:text-gray-300 mb-1">
          Category
        </label>
        <select
          id="category"
          value={cate}
          onChange={(e) => setCate(e.target.value)}
          className="w-full p-2 rounded-md border text-base dark:border-gray-600"
        >
          {categoryList.map((cat, i) => (
            <option key={i} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      {/* Price */}
      <div className="w-full mb-4">
        <label htmlFor="price" className="block text-base font-semibold dark:text-gray-300 mb-1">
          Price ($)
        </label>
        <select
          id="price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-full p-2 rounded-md border text-base dark:border-gray-600"
        >
          <option value="All">All</option>
          <option value="10">0 - 10</option>
          <option value="50">0 - 50</option>
          <option value="100">0 - 100</option>
        </select>
      </div>

      {/* Rating */}
      <div className="w-full mb-4">
        <label htmlFor="rating" className="block text-base font-semibold dark:text-gray-300 mb-1">
          Rating
        </label>
        <select
          id="rating"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          className="w-full p-2 rounded-md border text-base dark:border-gray-600"
        >
          <option value="All">All</option>
          {[1, 2, 3, 4, 5].map(r => <option key={r} value={r}>{r}</option>)}
        </select>
      </div>

      {/* Sort By */}
      <div className="w-full mb-6">
        <label htmlFor="sort" className="block text-base font-semibold dark:text-gray-300 mb-1">
          Sort By
        </label>
        <select
          id="sort"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="w-full p-2 rounded-md border text-base dark:border-gray-600"
        >
          <option value="">Default</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="rating-desc">Popularity</option>
          <option value="name-asc">Name: A to Z</option>
          <option value="name-desc">Name: Z to A</option>
        </select>
      </div>

      {/* Apply Button */}
      <button
        onClick={handleSubmit}
        className="w-full mt-2 bg-gray-800 dark:bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 rounded text-base"
      >
        Apply
      </button>
    </aside>
  );
}
