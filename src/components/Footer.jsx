import React from 'react';
import { Users, Instagram, Twitter, Facebook } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-keen-green py-16 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center text-center">
          <div className="mb-4 text-5xl font-extrabold tracking-tight">
            KeenKeeper
          </div>
          <p className="mb-8 max-w-2xl text-sm text-gray-300">
            Your personal shelf of meaningful connections. Browse, tend, and nurture the relationships that matter most.
          </p>
          
          <div className="mb-12 flex flex-col items-center gap-4">
            <span className="text-xs font-bold uppercase tracking-widest text-gray-400">Social Links</span>
            <div className="flex gap-4">
              {[Instagram, Facebook, Twitter].map((Icon, i) => (
                <a 
                  key={i}
                  href="#" 
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-keen-green transition-all hover:scale-110"
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>
        </div>
        
        <div className="flex flex-col items-center justify-between border-t border-white/10 pt-8 sm:flex-row">
          <p className="text-xs text-gray-400">© 2026 KeenKeeper. All rights reserved.</p>
          <div className="mt-4 flex gap-8 sm:mt-0">
            <a href="#" className="text-xs text-gray-400 hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="text-xs text-gray-400 hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="text-xs text-gray-400 hover:text-white transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>


  );
};
