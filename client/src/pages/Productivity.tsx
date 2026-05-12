import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Monitor, Bell, Dumbbell, Utensils, Zap } from 'lucide-react';

const Productivity: React.FC = () => {
  const reminders = [
    { time: '08:00', task: 'Morning Workout', icon: <Dumbbell size={18} /> },
    { time: '13:00', task: 'Healthy Lunch', icon: <Utensils size={18} /> },
    { time: '16:00', task: 'Focus Coding', icon: <Zap size={18} /> },
    { time: '21:00', task: 'Night Reading', icon: <Clock size={18} /> },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      className="page-container"
    >
      <header>
        <h1>Productivity Hub</h1>
        <p className="text-dim">Optimize your daily flow.</p>
      </header>

      <div className="productivity-grid">
        <motion.div 
          whileHover={{ scale: 1.02 }}
          className="card glass-card widget-card"
        >
          <div className="widget-header">
            <Monitor size={24} />
            <h3>Screen Timing</h3>
          </div>
          <div className="timing-circle">
            4h 22m
          </div>
          <p className="text-dim center">12% decrease from yesterday</p>
        </motion.div>

        <motion.div 
          whileHover={{ scale: 1.02 }}
          className="card glass-card widget-card"
        >
          <div className="widget-header">
            <Bell size={24} />
            <h3>Daily Reminders</h3>
          </div>
          <ul className="reminder-list">
            {reminders.map((r, i) => (
              <motion.li 
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="reminder-item"
              >
                <span className="reminder-time">{r.time}</span>
                {r.icon}
                <span>{r.task}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Productivity;
