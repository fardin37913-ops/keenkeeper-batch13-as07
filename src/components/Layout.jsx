import React from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { Toaster } from 'sonner';

export const Layout = ({ children }) => {
  return (
    <div className="flex min-h-screen flex-col bg-[#fafafa]">
      <Navbar />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
      <Toaster position="bottom-right" richColors />
    </div>
  );
};

