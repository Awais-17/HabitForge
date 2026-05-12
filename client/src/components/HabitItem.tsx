import React from 'react';
import { CheckCircle, Flame } from 'lucide-react';
import { motion } from 'framer-motion';

interface HabitItemProps {
  habit: any;
  onComplete: (id: string) => void;
}

const HabitItem: React.FC<HabitItemProps> = ({ habit, onComplete }) => {
  const isCompletedRecently = () => {
    if (!habit.lastCompleted) return false;
    const last = new Date(habit.lastCompleted).getTime();
    const now = new Date().getTime();
    const hoursSince = (now - last) / (1000 * 60 * 60);

    if (habit.refreshInterval) {
      return hoursSince < habit.refreshInterval;
    }
    
    // Default to daily check
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return last >= today.getTime();
  };

  const completed = isCompletedRecently();

  const getButtonText = () => {
    if (!completed) return 'Check-in';
    if (habit.refreshInterval) return 'Refreshes soon';
    return 'Done!';
  };

  return (
    <motion.div 
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className={`card habit-item ${completed ? 'completed' : ''}`}
    >
      <div className="habit-info">
        <motion.div 
          animate={completed ? { scale: [1, 1.2, 1] } : {}}
          className="icon-wrapper" 
          style={{ backgroundColor: habit.color + '22', color: habit.color }}
        >
          <CheckCircle size={24} />
        </motion.div>
        <div>
          <h3>{habit.name}</h3>
          <div className="habit-meta">
            <motion.span 
              key={habit.streak}
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              className={`streak-badge ${habit.streak >= 15 ? 'super-saiyan' : ''}`}
            >
              <Flame size={14} /> {habit.streak} day streak
            </motion.span>
            {habit.refreshInterval && (
              <span className="refresh-tag">Every {habit.refreshInterval}h</span>
            )}
          </div>
        </div>
      </div>
      <button 
        className={`btn ${completed ? 'btn-success' : 'btn-primary'}`}
        onClick={() => !completed && onComplete(habit.id)}
        disabled={completed}
      >
        {getButtonText()}
      </button>
    </motion.div>
  );
};

export default HabitItem;
