import Habit from '../models/Habit.js';
import HabitLog from '../models/HabitLog.js';
import User from '../models/User.js';
import { subDays, eachDayOfInterval } from 'date-fns';
export const seedUserHistory = async (userId) => {
    const habits = await Habit.findAll({ where: { userId: userId } });
    if (habits.length === 0)
        return;
    const endDate = new Date();
    const startDate = subDays(endDate, 90); // 3 months of history
    const days = eachDayOfInterval({ start: startDate, end: endDate });
    let totalXp = 0;
    const logsToInsert = [];
    for (const habit of habits) {
        let currentStreak = 0;
        let lastCompleted = null;
        for (const day of days) {
            if (Math.random() > 0.2) {
                const completedAt = new Date(day);
                completedAt.setHours(Math.floor(Math.random() * 12) + 8);
                logsToInsert.push({
                    habitId: habit.id,
                    userId: parseInt(userId),
                    completedAt
                });
                currentStreak++;
                lastCompleted = completedAt;
                totalXp += 10 + (Math.floor(currentStreak / 7) * 5);
            }
            else {
                currentStreak = 0;
            }
        }
        await habit.update({
            streak: currentStreak,
            lastCompleted: lastCompleted
        });
    }
    if (logsToInsert.length > 0) {
        await HabitLog.bulkCreate(logsToInsert);
    }
    const user = await User.findByPk(userId);
    if (user) {
        const level = Math.floor(0.1 * Math.sqrt(totalXp)) + 1;
        await user.update({
            xp: totalXp,
            level: level
        });
    }
};
//# sourceMappingURL=seed.js.map