import React, { useContext } from 'react';
import { userContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const { logout } = useContext(userContext);
  const navigate = useNavigate();

  const storageData = localStorage.getItem('currentUser');

  if (!storageData || storageData === 'null') {
    return (
      <div className="flex items-center justify-center min-h-screen bg-pink-50 dark:bg-gray-900">
        <h1 className="text-xl font-semibold text-gray-800 dark:text-white">
          No signed-in user. Please <span className="text-pink-600 font-bold">Login</span>.
        </h1>
      </div>
    );
  }

  const user = JSON.parse(atob(storageData));

  const handleLogout = () => {
    logout();
    localStorage.setItem('login', false);
    localStorage.setItem('currentUser', null);
    navigate('/login');
  };

  return (
    <div className="dark:bg-gray-900 min-h-[92vh] py-16 px-4">
      <div className="max-w-lg mx-auto bg-white p-8 rounded shadow-md animate-fade-in dark:bg-gray-800 dark:text-white">
        <h2 className="text-2xl font-bold mb-4 capitalize">
          {user.name?.firstname || ''} {user.name?.lastname || ''}
        </h2>
        <p className="text-gray-600 mb-4">{user.email}</p>

        {user.address && (
          <div className="mb-4">
            <h3 className="text-xl font-bold mb-2">Address</h3>
            <p>{`${user.address.number || ''} ${user.address.street || ''}, ${user.address.city || ''}, ${user.address.zipcode || ''}`}</p>
          </div>
        )}

        {user.phone && (
          <div className="mb-4">
            <h3 className="text-xl font-bold mb-2">Contact</h3>
            <p>Phone: {user.phone}</p>
          </div>
        )}

        {user.address?.geolocation && (
          <div className="mb-4">
            <h3 className="text-xl font-bold mb-2">Geolocation</h3>
            <p>Latitude: {user.address.geolocation.lat}, Longitude: {user.address.geolocation.long}</p>
          </div>
        )}

        <div className="flex justify-center">
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
