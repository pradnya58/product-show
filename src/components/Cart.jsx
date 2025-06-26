import React, { useContext } from 'react';
import { userContext } from '../context/UserContext';
import { useDispatch, useSelector } from 'react-redux';
import ShowProduct from './ShowProduct';
import { clearCart } from '../redux/cartSlice';
import { Link } from 'react-router-dom';

export default function Cart() {
  const { isLoggedIn } = useContext(userContext);
  const temp = localStorage.getItem('currentUser');
  console.log('temp', temp);
  let currentUser = [];
  if (temp && temp!='null') currentUser = JSON.parse(atob(temp));
  console.log('current user from cart', currentUser);

  const increaseQty = (id) => {
  setCurrentUserData(prev =>
    prev.map(item => item.id === id
      ? { ...item, quantity: (item.quantity || 1) + 1 }
      : item
    )
  );
};

const decreaseQty = (id) => {
  setCurrentUserData(prev =>
    prev.map(item =>
      item.id === id
        ? { ...item, quantity: Math.max((item.quantity || 1) - 1, 1) }
        : item
    )
  );
};

const removeItem = (id) => {
  setCurrentUserData(prev => prev.filter(item => item.id !== id));
};

  // clear cart items
  const dispatch = useDispatch();
  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const cartItems = useSelector((store) => store.cart.items);
  console.log('cart items', cartItems);

  const currentUserData = [];
  for (let i = 0; i < cartItems.length; i++) {
    if (cartItems[i].userId == currentUser.id) {
      currentUserData.push(cartItems[i]);
    }
  }
  console.log('current user data form cart', currentUserData);

  return currentUserData.length === 0 ? (
  <div className="flex items-center justify-center h-screen dark:bg-gray-900">
    <div className="text-center">
      <h1 className="text-3xl font-bold text-gray-800 mb-4 animate-bounce dark:text-white">
        Oops! No item found in Cart
      </h1>
      <p className="text-gray-600 dark:text-gray-300">Please add some items.</p>
    </div>
  </div>
) : (
  <div className="dark:bg-gray-900 min-h-[92vh] pb-28 relative">
    <div className="container mx-auto px-4 py-10">
      {/* Product Grid */}
      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {currentUserData.map((item) => (
          <div
            key={item.id}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 flex flex-col items-center text-center"
          >
            <img
              src={item.image}
              alt={item.title}
              className="h-36 w-auto object-contain mb-3"
            />
            <h2 className="text-md font-semibold text-gray-800 dark:text-white mb-1 line-clamp-2">{item.title}</h2>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">${item.price}</p>

            {/* Quantity Stepper */}
            <div className="flex items-center space-x-3 mb-3">
              <button
                onClick={() => decreaseQty(item.id)}
                className="bg-gray-300 hover:bg-gray-400 text-black px-2 py-1 rounded"
              >
                −
              </button>
              <span className="text-lg font-semibold">{item.quantity || 1}</span>
              <button
                onClick={() => increaseQty(item.id)}
                className="bg-gray-300 hover:bg-gray-400 text-black px-2 py-1 rounded"
              >
                +
              </button>
            </div>

            {/* Remove Button */}
            <button
              onClick={() => removeItem(item.id)}
              className="text-sm text-red-500 hover:text-red-700 underline"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>

    {/* Sticky Bottom Bar */}
    <div className="fixed bottom-0 left-0 w-full bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 px-4 py-4 flex flex-col md:flex-row justify-center items-center gap-4 z-10">
      <button
        className="bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-6 rounded w-full md:w-1/4"
        onClick={handleClearCart}
      >
        Clear Cart
      </button>
      <Link
        to="/checkout"
        className="bg-green-600 hover:bg-green-500 text-white font-bold py-2 px-6 rounded w-full md:w-1/4 text-center"
      >
        Place Order
      </Link>
    </div>
  </div>
);
}