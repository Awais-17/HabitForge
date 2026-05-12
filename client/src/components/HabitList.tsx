import React from 'react';
import HabitItem from './HabitItem';
import { AnimatePresence } from 'framer-motion';

interface HabitListProps {
  habits: any[];
  onComplete: (id: string) => void;
}

const HabitList: React.FC<HabitListProps> = ({ habits, onComplete }) => {
  return (
    <div className="habit-list">
      <AnimatePresence mode="popLayout">
        {habits.length === 0 ? (
          <p className="text-dim">No habits yet. Add one to start your journey!</p>
        ) : (
          habits.map((habit) => (
            <HabitItem key={habit.id} habit={habit} onComplete={onComplete} />
          ))
        )}
      </AnimatePresence>
    </div>
  );
};

export default HabitList;
