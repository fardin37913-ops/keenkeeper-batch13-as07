import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Search } from 'lucide-react';

export const NotFound = () => {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
      <div className="mb-8 rounded-full bg-emerald-50 p-8">
        <Search className="h-16 w-16 text-emerald-600" />
      </div>
      <h1 className="mb-4 text-4xl font-black text-gray-900">404 - Page Not Found</h1>
      <p className="mb-12 max-w-md text-lg text-gray-500">
        Oops! It seems like the connection you're looking for doesn't exist. Let's get you back to your friends.
      </p>
      <Link
        to="/"
        className="inline-flex items-center gap-2 rounded-xl bg-emerald-900 px-8 py-4 text-lg font-bold text-white shadow-xl shadow-emerald-900/20 transition-all hover:bg-emerald-800 hover:scale-105 active:scale-95"
      >
        <Home className="h-5 w-5" />
        Back to Home
      </Link>
    </div>
  );
};
