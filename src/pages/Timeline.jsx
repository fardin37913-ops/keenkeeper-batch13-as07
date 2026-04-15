import React, { useState } from 'react';
import { useFriends } from '../context/FriendContext';
import { Phone, MessageCircle, Video, Users, Filter, Search, ArrowUpDown } from 'lucide-react';
import { formatDate } from '../lib/utils';
import { motion, AnimatePresence } from 'motion/react';

export const Timeline = () => {
  const { timeline, friends, loading } = useFriends();
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [sortOrder, setSortOrder] = useState('newest');

  if (loading) return <div className="flex h-[60vh] items-center justify-center"><div className="h-12 w-12 animate-spin rounded-full border-4 border-emerald-500 border-t-transparent"></div></div>;


  const filteredTimeline = timeline
    .filter(entry => {
      const friend = friends.find(f => f.id === entry.friendId);
      const matchesFilter = filter === 'all' || entry.type === filter;
      
      const searchLower = search.toLowerCase();
      const friendName = friend?.name?.toLowerCase() || '';
      const entryNotes = entry.notes?.toLowerCase() || '';
      
      const matchesSearch = friendName.includes(searchLower) || entryNotes.includes(searchLower);
      
      return matchesFilter && matchesSearch;
    })
    .sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
    });

  const interactionIcons = {
    call: { icon: Phone, color: 'text-koi-teal', bg: 'bg-koi-teal/5' },
    text: { icon: MessageCircle, color: 'text-koi-teal', bg: 'bg-koi-teal/5' },
    video: { icon: Video, color: 'text-koi-teal', bg: 'bg-koi-teal/5' },
    meetup: { icon: Users, color: 'text-koi-teal', bg: 'bg-koi-teal/5' },
  };

  return (
    <div className="min-h-screen bg-keen-bg">
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-12">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 text-4xl font-extrabold tracking-tight text-gray-900"
          >
            Timeline
          </motion.h1>
          
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative flex-grow max-w-xs">
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="w-full appearance-none rounded-md border border-gray-200 bg-white py-2 pl-4 pr-10 text-sm text-gray-500 outline-none focus:border-keen-green focus:ring-1 focus:ring-keen-green"
              >
                <option value="all">Filter timeline</option>
                <option value="call">Calls</option>
                <option value="text">Texts</option>
                <option value="video">Videos</option>
                <option value="meetup">Meetups</option>
              </select>
              <Filter className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 pointer-events-none text-gray-400" />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <AnimatePresence mode="popLayout">
            {filteredTimeline.length > 0 ? (
              filteredTimeline.map((entry, i) => {
                const friend = friends.find(f => f.id === entry.friendId);
                const iconConfig = interactionIcons[entry.type] || { icon: MessageCircle };
                const Icon = iconConfig.icon;
                
                return (
                  <motion.div
                    key={entry.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ delay: i * 0.05 }}
                    className="keen-card flex items-center gap-6 p-6"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gray-50 text-gray-400">
                      <Icon className="h-6 w-6" />
                    </div>
                    
                    <div className="flex-grow">
                      <div className="flex items-center justify-between">
                        <h3 className="text-sm font-bold text-gray-900">
                          <span className="capitalize">{entry.type}</span> with {friend?.name || 'Unknown'}
                        </h3>
                      </div>
                      <p className="mt-1 text-xs text-gray-400">{formatDate(entry.date)}</p>
                    </div>
                  </motion.div>
                );
              })
            ) : (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="py-20 text-center"
              >
                <p className="text-sm text-gray-400 italic">No entries found matching your search.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
