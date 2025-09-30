import React from 'react';
import { Ban } from 'lucide-react';
import { Link } from 'react-router-dom';

const Unauthorized = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white p-6">
      <div className="flex flex-col items-center text-center max-w-lg">
        <Ban size={80} className="text-red-500 mb-6 animate-pulse" />
        <h1 className="text-4xl sm:text-5xl font-extrabold mb-4 text-white">Unauthorized Access</h1>
        <p className="text-lg text-gray-400 mb-6">
          You do not have permission to view this page. This content is restricted to authorized users only.
        </p>
        <p className="text-md text-gray-500 mb-8">
          If you believe this is an error, please ensure you are logged in with the correct account.
        </p>
        
        <Link 
          to="/" 
          className="px-6 py-3 bg-teal-500 text-white font-semibold rounded-xl shadow-lg transition-transform transform hover:scale-105"
        >
          Go to Home Page
        </Link>
      </div>
    </div>
  );
};

export default Unauthorized;