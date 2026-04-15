import React from 'react';
import { useFriends } from '../context/FriendContext';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { BarChart2, TrendingUp, Award, Heart } from 'lucide-react';
import { motion } from 'motion/react';

export const Stats = () => {
  const { timeline, friends, loading } = useFriends();

  if (loading) return <div className="flex h-[60vh] items-center justify-center"><div className="h-12 w-12 animate-spin rounded-full border-4 border-emerald-500 border-t-transparent"></div></div>;

  // Prepare data for Recharts
  const interactionCounts = timeline.reduce((acc, curr) => {
    acc[curr.type] = (acc[curr.type] || 0) + 1;
    return acc;
  }, {});

  const chartData = Object.keys(interactionCounts).map(type => ({
    name: type.charAt(0).toUpperCase() + type.slice(1),
    value: interactionCounts[type]
  }));

  const COLORS = ['#004d4d', '#ff8c00', '#90ee90', '#f5f5f5'];

  const topFriendId = timeline.reduce((acc, curr) => {
    acc[curr.friendId] = (acc[curr.friendId] || 0) + 1;
    return acc;
  }, {});


  const topFriend = friends.find(f => f.id === Object.keys(topFriendId).sort((a, b) => topFriendId[b] - topFriendId[a])[0]);

  return (
    <div className="min-h-screen bg-keen-bg">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 text-4xl font-extrabold tracking-tight text-gray-900"
        >
          Friendship Analytics
        </motion.h1>

        <div className="grid grid-cols-1 gap-8">
          {/* Chart Section */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="keen-card p-12"
          >
            <div className="mb-12">
              <h2 className="text-sm font-bold uppercase tracking-wider text-gray-400">By Interaction Type</h2>
            </div>
            
            <div className="h-[400px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={80}
                    outerRadius={120}
                    paddingAngle={8}
                    dataKey="value"
                    animationBegin={0}
                    animationDuration={1500}
                    stroke="none"
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      borderRadius: '8px', 
                      border: 'none', 
                      boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '12px',
                    }}
                  />
                  <Legend 
                    verticalAlign="bottom" 
                    height={36}
                    iconType="circle"
                    formatter={(value) => <span className="text-[10px] font-medium text-gray-500 ml-1">{value}</span>}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
