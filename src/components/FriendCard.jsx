import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '../lib/utils';
import { motion } from 'motion/react';

export const FriendCard = ({ friend }) => {
  const statusColors = {
    'on-track': 'bg-keen-mint text-keen-green',
    'almost due': 'bg-keen-orange text-white',
    'overdue': 'bg-keen-red text-white',
  };

  return (
    <Link to={`/friend/${friend.id}`} className="group block">
      <div className="keen-card flex flex-col items-center p-6 text-center">
        <div className="mb-4 h-20 w-20 overflow-hidden rounded-full">
          <img
            src={friend.picture}
            alt={friend.name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
            referrerPolicy="no-referrer"
          />
        </div>

        <div className="space-y-2">
          <h3 className="text-sm font-bold text-gray-900 group-hover:text-keen-green transition-colors">
            {friend.name}
          </h3>
          
          <p className="text-[10px] text-gray-400">
            {friend.days_since_contact}d ago
          </p>

          <div className="flex flex-wrap justify-center gap-1.5 pt-1">
            {friend.tags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-keen-mint px-2 py-0.5 text-[8px] font-bold uppercase tracking-wider text-keen-green"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="pt-2">
            <span className={cn(
              "keen-badge",
              statusColors[friend.status]
            )}>
              {friend.status}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};


