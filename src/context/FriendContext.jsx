import React, { createContext, useContext, useState, useEffect } from 'react';
import initialFriends from '../data/friends.json';

const FriendContext = createContext(undefined);

export const FriendProvider = ({ children }) => {
  const [friends, setFriends] = useState([]);
  const [timeline, setTimeline] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      const savedFriends = localStorage.getItem('friends');
      const savedTimeline = localStorage.getItem('timeline');

      if (savedFriends) {
        setFriends(JSON.parse(savedFriends));
      } else {
        setFriends(initialFriends);
      }

      if (savedTimeline) {
        setTimeline(JSON.parse(savedTimeline));
      } else {
        // Initial dummy timeline
        const initialTimeline = [
          { id: 't1', friendId: '1', type: 'text', date: '2026-04-13', notes: 'Caught up about the new project.' },
          { id: 't2', friendId: '2', type: 'meetup', date: '2026-04-03', notes: 'Lunch at the park.' },
          { id: 't3', friendId: '4', type: 'video', date: '2026-04-10', notes: 'Virtual coffee.' },
        ];
        setTimeline(initialTimeline);
      }
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!loading) {
      localStorage.setItem('friends', JSON.stringify(friends));
      localStorage.setItem('timeline', JSON.stringify(timeline));
    }
  }, [friends, timeline, loading]);

  const addInteraction = (friendId, type) => {
    const newInteraction = {
      id: Math.random().toString(36).substr(2, 9),
      friendId,
      type,
      date: new Date().toISOString().split('T')[0],
      notes: `Quick ${type} check-in`,
    };

    setTimeline((prev) => [newInteraction, ...prev]);
    
    // Update friend's last contact
    setFriends((prev) => prev.map(f => {
      if (f.id === friendId) {
        return {
          ...f,
          days_since_contact: 0,
          status: 'on-track',
          next_due_date: new Date(Date.now() + f.goal * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
        };
      }
      return f;
    }));
  };

  return (
    <FriendContext.Provider value={{ friends, timeline, addInteraction, loading }}>
      {children}
    </FriendContext.Provider>
  );
};

export const useFriends = () => {
  const context = useContext(FriendContext);
  if (context === undefined) {
    throw new Error('useFriends must be used within a FriendProvider');
  }
  return context;
};