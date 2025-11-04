import React from 'react';
import { Home, ArrowLeft, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const NotFoundPage = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/');
  };

  const handleGoBack = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl w-full text-center">
        {/* 404 Animation */}
        <div className="mb-8">
          <div className="relative inline-block">
            <h1 className="text-[120px] sm:text-[180px] lg:text-[220px] font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#32936F] to-[#1E523E] leading-none">
              404
            </h1>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <Search className="w-16 h-16 sm:w-20 sm:h-20 text-[#32936F]/20 animate-pulse" />
            </div>
          </div>
        </div>

        {/* Message */}
        <div className="mb-8 space-y-3">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800">
            Oops! Page Not Found
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-md mx-auto">
            The page you're looking for seems to have wandered off. It might have been moved, deleted, or never existed.
          </p>
        </div>

        {/* Suggestions */}
        <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 mb-8 border-2 border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Here's what you can do:
          </h3>
          <ul className="text-left space-y-3 text-gray-600">
            <li className="flex items-start gap-3">
              <span className="text-[#32936F] font-bold mt-0.5">•</span>
              <span>Check the URL for any typos or errors</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#32936F] font-bold mt-0.5">•</span>
              <span>Go back to the previous page</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#32936F] font-bold mt-0.5">•</span>
              <span>Return to the homepage and start fresh</span>
            </li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            onClick={handleGoBack}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-white border-2 border-gray-200 rounded-xl font-medium text-gray-700 hover:bg-gray-50 hover:border-[#32936F] transition-all duration-300 shadow-sm hover:shadow-md"
          >
            <ArrowLeft className="w-5 h-5" />
            Go Back
          </button>
          <button
            onClick={handleGoHome}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-[#32936F] to-[#2a7a5c] text-white rounded-xl font-medium hover:shadow-lg hover:scale-105 transition-all duration-300"
          >
            <Home className="w-5 h-5" />
            Back to Home
          </button>
        </div>

        {/* Decorative Element */}
        <div className="mt-12 text-gray-400 text-sm">
          Lost? Don't worry, even the best explorers lose their way sometimes.
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;