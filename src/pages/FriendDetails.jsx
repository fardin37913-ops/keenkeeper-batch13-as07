import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useFriends } from '../context/FriendContext';
import { Phone, MessageCircle, Video, Calendar, Target, Clock, Mail, BellOff, Archive, Trash2, Edit2, ArrowLeft, History, Users } from 'lucide-react';
import { toast } from 'sonner';
import { cn, formatDate } from '../lib/utils';
import { motion } from 'motion/react';

export const FriendDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { friends, timeline, addInteraction, loading } = useFriends();

  if (loading) return <div className="flex h-[60vh] items-center justify-center"><div className="h-12 w-12 animate-spin rounded-full border-4 border-emerald-500 border-t-transparent"></div></div>;

  const friend = friends.find(f => f.id === id);
  if (!friend) return <div className="p-20 text-center text-2xl font-bold">Friend not found</div>;

  const friendTimeline = timeline.filter(t => t.friendId === id);

  const handleCheckIn = (type) => {
    addInteraction(friend.id, type);
    toast.success(`Logged ${type} with ${friend.name}!`, {
      description: `Timeline updated for ${new Date().toLocaleDateString()}`,
    });
  };


  const statusColors = {
    'on-track': 'bg-koi-lily/10 text-koi-lily',
    'almost due': 'bg-koi-orange/10 text-koi-orange',
    'overdue': 'bg-rose-100 text-rose-700',
  };

  return (
    <div className="min-h-screen bg-keen-bg">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* LEFT COLUMN */}
          <div className="lg:col-span-4 space-y-6">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="keen-card p-8 text-center"
            >
              <div className="mx-auto mb-6 h-32 w-32 overflow-hidden rounded-full">
                <img
                  src={friend.picture}
                  alt={friend.name}
                  referrerPolicy="no-referrer"
                  className="h-full w-full object-cover"
                />
              </div>
              
              <h1 className="mb-2 text-2xl font-bold text-gray-900">{friend.name}</h1>
              
              <div className="mb-4 flex flex-wrap justify-center gap-2">
                <span className={cn("keen-badge", statusColors[friend.status])}>
                  {friend.status}
                </span>
                {friend.tags.map(tag => (
                  <span key={tag} className="rounded-full bg-keen-mint px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-keen-green">
                    {tag}
                  </span>
                ))}
              </div>

              <p className="mb-6 text-sm italic text-gray-500">"{friend.bio}"</p>
              
              <div className="mb-8 flex items-center justify-center gap-2 text-xs text-gray-400">
                <Mail className="h-3 w-3" />
                <span>{friend.email}</span>
              </div>

              <div className="space-y-3">
                <button className="flex w-full items-center justify-center gap-2 rounded-md border border-gray-100 py-3 text-[10px] font-bold uppercase tracking-wider text-gray-600 transition-all hover:bg-gray-50">
                  <BellOff className="h-4 w-4" />
                  Snooze 2 Weeks
                </button>
                <button className="flex w-full items-center justify-center gap-2 rounded-md border border-gray-100 py-3 text-[10px] font-bold uppercase tracking-wider text-gray-600 transition-all hover:bg-gray-50">
                  <Archive className="h-4 w-4" />
                  Archive
                </button>
                <button className="flex w-full items-center justify-center gap-2 rounded-md border border-rose-50 py-3 text-[10px] font-bold uppercase tracking-wider text-rose-600 transition-all hover:bg-rose-50">
                  <Trash2 className="h-4 w-4" />
                  Delete
                </button>
              </div>
            </motion.div>
          </div>
        

          {/* RIGHT COLUMN */}
          <div className="lg:col-span-8 space-y-8">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              {[
                { label: 'Days Since Contact', value: friend.days_since_contact, icon: Clock, color: 'text-keen-green', bg: 'bg-keen-mint' },
                { label: 'Goal (Days)', value: friend.goal, icon: Target, color: 'text-keen-green', bg: 'bg-keen-mint' },
                { label: 'Next Due Date', value: formatDate(friend.next_due_date), icon: Calendar, color: 'text-keen-green', bg: 'bg-keen-mint' },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * i }}
                  className="keen-card p-6 text-center"
                >
                  <div className="mb-2 text-2xl font-bold text-gray-900">{stat.value}</div>
                  <div className="text-[10px] font-bold uppercase tracking-wider text-gray-400">{stat.label}</div>
                </motion.div>
              ))}
            </div>

            {/* Relationship Goal Card */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="keen-card p-8"
            >
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-lg font-bold text-gray-900">Relationship Goal</h2>
                <button className="rounded-md border border-gray-100 p-2 text-gray-400 hover:bg-gray-50">
                  <Edit2 className="h-4 w-4" />
                </button>
              </div>
              <p className="text-sm text-gray-600">
                Connect every <span className="font-bold text-gray-900">{friend.goal} days</span> to maintain a healthy bond.
              </p>
            </motion.div>

            {/* Quick Check-In Card */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="keen-card p-8"
            >
              <h2 className="mb-8 text-lg font-bold text-gray-900">Quick Check-In</h2>
              <div className="grid grid-cols-3 gap-4">
                {[
                  { type: 'Call', icon: Phone },
                  { type: 'Text', icon: MessageCircle },
                  { type: 'Video', icon: Video },
                ].map((action) => (
                  <button 
                    key={action.type}
                    onClick={() => handleCheckIn(action.type.toLowerCase())}
                    className="flex flex-col items-center gap-3 rounded-lg border border-gray-50 bg-gray-50/50 p-6 transition-all hover:bg-gray-100 group"
                  >
                    <action.icon className="h-6 w-6 text-gray-400 group-hover:text-keen-green transition-colors" />
                    <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500">{action.type}</span>
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Recent Interactions */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="keen-card p-8"
            >
              <div className="mb-8 flex items-center justify-between">
                <h2 className="text-lg font-bold text-gray-900">Recent Interactions</h2>
                <button 
                  onClick={() => navigate('/timeline')}
                  className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-keen-green hover:opacity-80 transition-all"
                >
                  <History className="h-4 w-4" />
                  Full History
                </button>
              </div>
              
              <div className="space-y-4">
                {friendTimeline.length > 0 ? (
                  friendTimeline.slice(0, 4).map((entry) => (
                    <div key={entry.id} className="flex items-center justify-between rounded-lg border border-gray-50 p-4">
                      <div className="flex items-center gap-4">
                        <div className="text-gray-400">
                          {entry.type === 'call' && <Phone className="h-5 w-5" />}
                          {entry.type === 'text' && <MessageCircle className="h-5 w-5" />}
                          {entry.type === 'video' && <Video className="h-5 w-5" />}
                          {entry.type === 'meetup' && <Users className="h-5 w-5" />}
                        </div>
                        <div>
                          <div className="text-sm font-bold text-gray-900 capitalize">{entry.type}</div>
                          <div className="text-xs text-gray-400">{entry.notes}</div>
                        </div>
                      </div>
                      <div className="text-[10px] font-medium text-gray-300">{formatDate(entry.date)}</div>
                    </div>
                  ))
                ) : (
                  <p className="text-center py-8 text-sm text-gray-400 italic">No interactions logged yet.</p>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};
