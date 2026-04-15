import React from 'react';
import { useFriends } from '../context/FriendContext';
import { FriendCard } from '../components/FriendCard';
import { Plus, Users, CheckCircle, AlertCircle, MessageSquare } from 'lucide-react';
import { motion } from 'motion/react';

export const Home = () => {
  const { friends, timeline, loading } = useFriends();

  if (loading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-emerald-500 border-t-transparent"></div>
      </div>
    );
  }

  const stats = [
    { label: 'Total Friends', value: friends.length, icon: Users, color: 'text-koi-teal', bg: 'bg-koi-teal/5' },
    { label: 'On Track', value: friends.filter(f => f.status === 'on-track').length, icon: CheckCircle, color: 'text-koi-lily', bg: 'bg-koi-lily/10' },
    { label: 'Need Attention', value: friends.filter(f => f.status !== 'on-track').length, icon: AlertCircle, color: 'text-koi-orange', bg: 'bg-koi-orange/10' },
    { label: 'Interactions', value: timeline.length, icon: MessageSquare, color: 'text-indigo-600', bg: 'bg-indigo-50' },
  ];

  return (
    <div className="min-h-screen bg-keen-bg">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        {/* Banner Section */}
        <section className="mb-20 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl"
          >
            Friends to keep close in your life
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="mx-auto mb-8 max-w-2xl text-sm text-gray-500"
          >
            Your personal shelf of meaningful connections. Browse, tend, and nurture the relationships that matter most.
          </motion.p>
          <motion.button 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="keen-btn-primary"
          >
            <Plus className="h-4 w-4" />
            <span>Add a Friend</span>
          </motion.button>
        </section>

        {/* Summary Cards */}
        <div className="mb-20 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i }}
              className="keen-card flex flex-col items-center p-8 text-center"
            >
              <span className="text-3xl font-bold text-gray-900">{stat.value}</span>
              <span className="mt-2 text-xs font-medium text-gray-400">{stat.label}</span>
            </motion.div>
          ))}
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-900">Your Friends</h2>
        </div>

        {/* Friend Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {friends.map((friend, i) => (
            <motion.div
              key={friend.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i }}
            >
              <FriendCard friend={friend} />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
