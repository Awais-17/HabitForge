import React, { useState, useEffect } from 'react';
import { habitService, userService } from './services/api';
import Sidebar from './components/Sidebar';
import HabitList from './components/HabitList';
import Dashboard from './components/Dashboard';
import Heatmap from './components/Heatmap';
import PremiumGate from './components/PremiumGate';
import Achievements from './pages/Achievements';
import Productivity from './pages/Productivity';
import { AnimatePresence, motion } from 'framer-motion';

const App: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [habits, setHabits] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState<string | null>(null);
  const [activePage, setActivePage] = useState('dashboard');

  useEffect(() => {
    // Try to load user from localStorage or create a demo one
    const savedUserId = localStorage.getItem('habitforge_user_id');
    if (savedUserId) {
      fetchUserData(savedUserId);
    } else {
      setLoading(false);
    }
  }, []);

  const fetchUserData = async (userId: string) => {
    try {
      const userRes = await userService.getUser(userId);
      setUser(userRes.data);
      const habitsRes = await habitService.getHabits(userId);
      setHabits(habitsRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const createDemoUser = async () => {
    try {
      setLoading(true);
      // Clear old session to ensure all new habits are created
      localStorage.removeItem('habitforge_user_id');
      
      const res = await userService.register('Demo User', `demo_${Date.now()}@example.com`);
      const newUser = res.data;
      localStorage.setItem('habitforge_user_id', newUser.id);
      setUser(newUser);
      
      // Create Comprehensive Habit Suite
      const defaultHabits = [
        // Morning Routines
        { name: 'Hydrate Immediately', frequency: 'daily', color: '#3b82f6', refreshInterval: null },
        { name: 'Make Your Bed', frequency: 'daily', color: '#6366f1', refreshInterval: null },
        { name: 'Morning Sunlight', frequency: 'daily', color: '#f59e0b', refreshInterval: null },
        { name: 'Move Your Body', frequency: 'daily', color: '#10b981', refreshInterval: null },
        { name: 'Practice Gratitude', frequency: 'daily', color: '#ec4899', refreshInterval: null },
        { name: 'Nutritious Breakfast', frequency: 'daily', color: '#f97316', refreshInterval: null },
        
        // Productivity/Work
        { name: 'Prioritize Tasks', frequency: 'daily', color: '#8b5cf6', refreshInterval: null },
        { name: 'Time Management', frequency: 'daily', color: '#06b6d4', refreshInterval: null },
        { name: 'Take Movement Breaks', frequency: 'daily', color: '#14b8a6', refreshInterval: 2 }, // Recurring
        { name: 'Limit Technology', frequency: 'daily', color: '#ef4444', refreshInterval: null },
        
        // Afternoon/Evening
        { name: 'Reflect & Plan', frequency: 'daily', color: '#475569', refreshInterval: null },
        { name: 'Stay Active', frequency: 'daily', color: '#22c55e', refreshInterval: null },
        { name: 'Unwind & Disconnect', frequency: 'daily', color: '#334155', refreshInterval: null },
        { name: 'Read a Book', frequency: 'daily', color: '#d946ef', refreshInterval: null },
        
        // General Daily
        { name: '7-9h Sleep', frequency: 'daily', color: '#1e3a8a', refreshInterval: null },
        { name: 'Balanced Diet', frequency: 'daily', color: '#84cc16', refreshInterval: null },
        { name: 'Social Interaction', frequency: 'daily', color: '#facc15', refreshInterval: null },
        { name: 'Hygiene', frequency: 'daily', color: '#94a3b8', refreshInterval: null },
      ];

      // Use Promise.all to create all habits quickly
      await Promise.all(defaultHabits.map(habit => 
        habitService.createHabit({ userId: newUser.id, ...habit })
      ));
      
      // Seed history for demo
      await userService.seedHistory(newUser.id);

      const userRes = await userService.getUser(newUser.id);
      setUser(userRes.data);
      const habitsRes = await habitService.getHabits(newUser.id);
      setHabits(habitsRes.data);
    } catch (error: any) {
      console.error('Error creating demo user:', error);
      alert(`Failed to create demo experience. Please ensure the backend server and PostgreSQL database are running. Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleComplete = async (habitId: string) => {
    try {
      const res = await habitService.completeHabit(habitId, user.id);
      const { habit, currentXP, level, newBadges } = res.data;
      
      // Update local state
      setHabits(habits.map(h => h.id === habitId ? habit : h));
      setUser({ ...user, xp: currentXP, level, badges: [...(user.badges || []), ...(newBadges || [])] });

      if (newBadges && newBadges.length > 0) {
        setNotification(`New Badge Earned: ${newBadges.join(', ')}!`);
        setTimeout(() => setNotification(null), 5000);
      }
    } catch (error: any) {
      alert(error.response?.data?.message || 'Error completing habit');
    }
  };

  const handleUpgrade = async () => {
    try {
      const res = await userService.upgradeToPremium(user.id);
      setUser(res.data);
      setNotification('Welcome to HabitForge Pro!');
      setTimeout(() => setNotification(null), 5000);
    } catch (error: any) {
      console.error('Error upgrading:', error);
      alert(`Upgrade failed: ${error.message}`);
    }
  };

  const handleUpdateProfile = async (updates: { name?: string; email?: string }) => {
    try {
      const res = await userService.updateUser(user.id, updates);
      setUser(res.data);
      setNotification('Profile updated successfully!');
      setTimeout(() => setNotification(null), 5000);
    } catch (error: any) {
      console.error('Error updating profile:', error);
      alert(`Update failed: ${error.message}`);
    }
  };

  if (loading) return <div className="loading">Loading HabitHero...</div>;

  if (!user) {
    return (
      <div className="auth-screen">
        <h1>HabitHero</h1>
        <p>Gamify your self-improvement.</p>
        <button className="btn btn-primary" onClick={createDemoUser}>Start Demo Experience</button>
      </div>
    );
  }

  return (
    <div className="app-container">
      {notification && (
        <div className="notification-toast">
          {notification}
        </div>
      )}
      <Sidebar 
        user={user} 
        onUpdateProfile={handleUpdateProfile} 
        activePage={activePage}
        setActivePage={setActivePage}
      />
      <main className="main-content">
        <AnimatePresence mode="wait">
          {activePage === 'dashboard' && (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <header>
                <h1>My Habits</h1>
                <p className="text-dim">Consistency is your superpower.</p>
              </header>
              <HabitList habits={habits} onComplete={handleComplete} />
              
              <section className="analytics-section">
                <h2>Your Progress</h2>
                <Dashboard userId={user.id} />
                <PremiumGate isPremium={user.isPremium} onUpgrade={handleUpgrade}>
                  <Heatmap userId={user.id} />
                </PremiumGate>
              </section>
            </motion.div>
          )}

          {activePage === 'achievements' && (
            <Achievements key="achievements" user={user} />
          )}

          {activePage === 'productivity' && (
            <Productivity key="productivity" />
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

export default App;
