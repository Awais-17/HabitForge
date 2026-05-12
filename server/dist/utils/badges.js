import User from '../models/User.js';
import Habit from '../models/Habit.js';
import HabitLog from '../models/HabitLog.js';
export const BADGES = [
    {
        id: 'rookie',
        name: 'Rookie',
        description: 'Welcome to the Hero Academy!',
        criteria: 'account_created'
    },
    {
        id: 'consistency_king',
        name: 'Consistency King',
        description: 'Maintain a 7-day streak on any habit',
        criteria: 'streak >= 7'
    },
    {
        id: 'habit_starter',
        name: 'Habit Starter',
        description: 'Complete your first habit',
        criteria: 'total_completions >= 1'
    },
    {
        id: 'century_club',
        name: 'Century Club',
        description: 'Complete 100 habits total',
        criteria: 'total_completions >= 100'
    },
    {
        id: 'early_bird',
        name: 'Early Bird',
        description: 'Complete a habit before 8 AM',
        criteria: 'completed_at < 8:00'
    }
];
export const checkBadges = async (userId) => {
    const user = await User.findByPk(userId);
    if (!user)
        return [];
    const habits = await Habit.findAll({ where: { userId: userId } });
    const logs = await HabitLog.findAll({ where: { userId: userId } });
    const logsCount = logs.length;
    const newBadges = [];
    // Check Rookie
    if (!user.badges.includes('rookie')) {
        newBadges.push('rookie');
    }
    // Check Consistency King
    if (!user.badges.includes('consistency_king')) {
        const hasLongStreak = habits.some((h) => h.streak >= 7);
        if (hasLongStreak)
            newBadges.push('consistency_king');
    }
    // Check Habit Starter
    if (!user.badges.includes('habit_starter')) {
        if (logsCount >= 1)
            newBadges.push('habit_starter');
    }
    // Check Century Club
    if (!user.badges.includes('century_club')) {
        if (logsCount >= 100)
            newBadges.push('century_club');
    }
    // Check Early Bird
    if (!user.badges.includes('early_bird')) {
        const hasEarlyLog = logs.some((log) => {
            const hours = new Date(log.completedAt).getHours();
            return hours < 8;
        });
        if (hasEarlyLog)
            newBadges.push('early_bird');
    }
    if (newBadges.length > 0) {
        const updatedBadges = [...user.badges, ...newBadges];
        await user.update({ badges: updatedBadges });
    }
    return newBadges;
};
//# sourceMappingURL=badges.js.map