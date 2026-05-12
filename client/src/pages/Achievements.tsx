import React from 'react';
import { motion } from 'framer-motion';
import { Award, Crown, Zap, Target, Coffee } from 'lucide-react';

interface AchievementsProps {
  user: any;
}

const Achievements: React.FC<AchievementsProps> = ({ user }) => {
  const allBadges = [
    { id: 'rookie', name: 'Rookie', desc: 'Welcome to the Hero Academy!', icon: <Award size={32} color="#94a3b8" /> },
    { id: 'consistency_king', name: 'Consistency King', desc: '7-day streak milestone', icon: <Crown size={32} color="#f59e0b" /> },
    { id: 'habit_starter', name: 'Habit Starter', desc: 'Complete your first habit', icon: <Zap size={32} color="#0ea5e9" /> },
    { id: 'century_club', name: 'Century Club', desc: '100 total completions', icon: <Target size={32} color="#ec4899" /> },
    { id: 'early_bird', name: 'Early Bird', desc: 'Complete a habit before 8 AM', icon: <Coffee size={32} color="#10b981" /> },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      className="page-container"
    >
      <header>
        <h1>Achievements</h1>
        <p className="text-dim">Your collection of legendary milestones.</p>
      </header>

      <div className="productivity-grid">
        {allBadges.map((badge) => {
          const isUnlocked = user.badges.includes(badge.id);
          return (
            <motion.div 
              key={badge.id}
              whileHover={isUnlocked ? { scale: 1.05 } : {}}
              className={`card glass-card widget-card ${!isUnlocked ? 'locked' : ''}`}
              style={{ opacity: isUnlocked ? 1 : 0.5 }}
            >
              <div className="badge-icon-large">
                {badge.icon}
              </div>
              <div className="badge-details">
                <h3>{badge.name}</h3>
                <p className="text-dim">{badge.desc}</p>
              </div>
              {!isUnlocked && <div className="lock-overlay">LOCKED</div>}
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default Achievements;
