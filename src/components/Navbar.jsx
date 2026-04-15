import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Clock, BarChart2, Users } from 'lucide-react';
import { cn } from '../lib/utils';

export const Navbar = () => {
  const navItems = [
    { to: '/', label: 'Home', icon: Home },
    { to: '/timeline', label: 'Timeline', icon: Clock },
    { to: '/stats', label: 'Stats', icon: BarChart2 },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <NavLink to="/" className="flex items-center gap-2 text-xl font-bold tracking-tight text-keen-green">
          <span>KeenKeeper</span>
        </NavLink>

        <div className="flex items-center gap-2">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-all duration-200",
                  isActive 
                    ? "bg-keen-green text-white" 
                    : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                )
              }
            >
              <item.icon className="h-4 w-4" />
              <span className="hidden sm:inline">{item.label}</span>
            </NavLink>
          ))}
        </div>
      </div>
    </nav>


  );
};
