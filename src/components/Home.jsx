import React, { useContext, useEffect, useState } from 'react';
import HomeShimmer from '../shimmerUI/HomeShimmer';
import ShowProduct from './ShowProduct';
import { REACT_APP_PRODUCTS_API } from '../utils';
import { userContext } from '../context/UserContext';
import useOnline from '../customHooks/useOnline';
import Offline from './Offline';
import HeaderCarousel from './HeaderCarousel';
import Filter from './Filter';
import AboutPage from './AboutPage';

export default function Home() {
  const isOnline = useOnline();
  const [data, setData] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sort, setSort] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 11;
  const { setIsLoggedIn } = useContext(userContext);

  useEffect(() => {
    fetch(REACT_APP_PRODUCTS_API)
      .then(res => res.json())
      .then(json => {
        setData(json);
        setFilterData(json);
      })
      .catch(err => {
        console.log('error in fetching products: ', err);
        alert('Some API error. Try after some time.');
      });

    setIsLoggedIn(localStorage.getItem('login'));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const results = data.filter(p =>
      p.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilterData(results);
    setCurrentPage(1);
  };

  const handleFilter = ({ category, price, rating }) => {
    const results = data.filter(p =>
      (category.toLowerCase() === 'all' || p.category === category) &&
      (price.toLowerCase() === 'all' || p.price < +price) &&
      (rating.toLowerCase() === 'all' || Math.round(p.rating.rate) === +rating)
    );
    setFilterData(results);
    setCurrentPage(1);
  };

  let sortedData = [...filterData];
  if (sort === 'price-asc') {
    sortedData.sort((a, b) => a.price - b.price);
  } else if (sort === 'price-desc') {
    sortedData.sort((a, b) => b.price - a.price);
  } else if (sort === 'rating-desc') {
    sortedData.sort((a, b) => b.rating.rate - a.rating.rate);
  } else if (sort === 'name-asc') {
    sortedData.sort((a, b) => a.title.localeCompare(b.title));
  } else if (sort === 'name-desc') {
    sortedData.sort((a, b) => b.title.localeCompare(a.title));
  }

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filterData.length / itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePrev = () => {
    if (currentPage > 1) handlePageChange(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) handlePageChange(currentPage + 1);
  };

  if (!isOnline) return <Offline />;
  if (data.length === 0) return <HomeShimmer />;

  return (
    <div className="dark:bg-gray-800 pb-10">
      <HeaderCarousel />

      <div className="flex flex-col lg:flex-row">
        <Filter data={data} handleFilter={handleFilter} sort={sort} setSort={setSort} />

        <div className="flex-1 px-4">
          <form className="my-6 flex" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="flex-grow border p-2 mr-2 rounded dark:bg-gray-700 dark:text-gray-200"
            />
            <button
              type="submit"
              className="bg-gray-800 dark:bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
            >
              Search
            </button>
          </form>

          {filterData.length === 0 ? (
            <h1 className="text-gray-900 dark:text-gray-300 text-2xl font-bold text-center animate-bounce">
              No data found.
            </h1>
          ) : (
            <>
              <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                {currentItems.map(prod => (
                  <ShowProduct key={prod.id} data={prod} />
                ))}
              </div>

              <div className="flex justify-center items-center gap-2 mt-8 flex-wrap">
                <button
                  onClick={handlePrev}
                  disabled={currentPage === 1}
                  className="px-3 py-1 rounded text-sm font-medium bg-gray-200 text-gray-800 hover:bg-pink-100 disabled:opacity-50"
                >
                  Previous
                </button>

                {Array.from({ length: totalPages }, (_, index) => (
                  <button
                    key={index}
                    onClick={() => handlePageChange(index + 1)}
                    className={`px-3 py-1 rounded text-sm font-medium transition-all duration-200 ${
                      currentPage === index + 1
                        ? 'bg-pink-600 text-white'
                        : 'bg-gray-200 text-gray-800 hover:bg-pink-100'
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}

                <button
                  onClick={handleNext}
                  disabled={currentPage === totalPages}
                  className="px-3 py-1 rounded text-sm font-medium bg-gray-200 text-gray-800 hover:bg-pink-100 disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      <AboutPage />
    </div>
  );
}
