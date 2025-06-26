import React from 'react';

export default function AboutUs() {
  return (
    <div className="flex flex-col justify-between min-h-screen dark:bg-gray-900 px-4 py-10">
      <div className="max-w-3xl text-center mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-6 dark:text-white">About Us</h1>

        <p className="text-gray-600 mb-4 dark:text-gray-300">
          Welcome to <span className="font-semibold text-pink-600">My Shopping</span>, your stylish and sophisticated shopping destination.
          We are committed to providing you with top-notch products and an exceptional shopping experience.
        </p>

        <p className="text-gray-600 mb-4 dark:text-gray-300">
          At My Shopping, we believe in the magic of online shopping to make your life more convenient and luxurious.
          Our platform offers an eclectic range of products from various categories, including cutting-edge electronics,
          trendy fashion items, and elegant home goods.
        </p>

        <p className="text-gray-600 mb-4 dark:text-gray-300">
          Our mission is to deliver elegance and quality at every step. We pride ourselves on our commitment to style,
          reliability, and impeccable customer service.
        </p>

        <p className="text-gray-600 mb-4 dark:text-gray-300">
          Whether you're looking for the latest gadgets, the trendiest fashion pieces, or sophisticated home essentials,
          My Shopping has got you covered. Dive into our carefully curated selection and indulge in the luxury of secure
          online shopping.
        </p>

        <p className="text-gray-600 dark:text-gray-300">
          Thank you for choosing <span className="font-semibold text-pink-600">My Shopping</span>. Elevate your lifestyle with us.
        </p>
      </div>

      {/* Footer */}
      <footer className="mt-12 border-t pt-6 px-4 sm:px-6 lg:px-8 bg-gray-100 dark:bg-gray-800 text-center">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">Contact Us</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-2">
          If you have any questions, feedback, or inquiries, feel free to reach out to our customer support team.
          We are here to assist you and ensure your satisfaction.
        </p>
        <p className="text-gray-600 dark:text-gray-300">
          Email: <span className="text-blue-500">support@MyShopping.com</span><br />
          Phone: <span className="text-blue-500">1-800-123-4567</span>
        </p>
        <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">&copy; {new Date().getFullYear()} MyShopping. All rights reserved.</p>
      </footer>
    </div>
  );
}  
