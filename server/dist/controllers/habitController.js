import { Op, fn, col } from 'sequelize';
import Habit from '../models/Habit.js';
import HabitLog from '../models/HabitLog.js';
import User from '../models/User.js';
import { calculateNextStreak, calculateXPForCompletion, calculateLevel } from '../utils/gamification.js';
import { checkBadges } from '../utils/badges.js';
export const createHabit = async (req, res) => {
    try {
        const { userId, name, frequency, color, icon, refreshInterval } = req.body;
        // Check habit limit for free tier
        const user = await User.findByPk(userId);
        if (!user)
            return res.status(404).json({ message: 'User not found' });
        if (!user.isPremium && !user.email.startsWith('demo_')) {
            const habitCount = await Habit.count({ where: { userId } });
            if (habitCount >= 5) {
                return res.status(403).json({ message: 'Free tier limit reached (max 5 habits). Upgrade to Pro for unlimited habits!' });
            }
        }
        const habit = await Habit.create({ userId, name, frequency, color, icon, refreshInterval, streak: 0, lastCompleted: null });
        res.status(201).json(habit);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
export const getHabits = async (req, res) => {
    try {
        const { userId } = req.query;
        const habits = await Habit.findAll({ where: { userId: userId } });
        res.json(habits);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
export const updateHabit = async (req, res) => {
    try {
        const { habitId } = req.params;
        const { name, frequency, color, icon } = req.body;
        const habit = await Habit.findByPk(habitId);
        if (!habit)
            return res.status(404).json({ message: 'Habit not found' });
        await habit.update({ name, frequency, color, icon });
        res.json(habit);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
export const deleteHabit = async (req, res) => {
    try {
        const { habitId } = req.params;
        const habit = await Habit.findByPk(habitId);
        if (!habit)
            return res.status(404).json({ message: 'Habit not found' });
        await habit.destroy();
        // Also delete logs for this habit (Sequelize can handle this with cascade, but let's be explicit if needed)
        await HabitLog.destroy({ where: { habitId: habitId } });
        res.json({ message: 'Habit deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
export const completeHabit = async (req, res) => {
    try {
        const { habitId } = req.params;
        const { userId } = req.body;
        const habit = await Habit.findByPk(habitId);
        if (!habit)
            return res.status(404).json({ message: 'Habit not found' });
        // Check if already completed recently based on refreshInterval
        if (habit.refreshInterval && habit.lastCompleted) {
            const now = new Date().getTime();
            const last = new Date(habit.lastCompleted).getTime();
            const hoursSince = (now - last) / (1000 * 60 * 60);
            if (hoursSince < habit.refreshInterval) {
                const timeLeft = Math.ceil(habit.refreshInterval - hoursSince);
                return res.status(400).json({
                    message: `This habit refreshes every ${habit.refreshInterval} hours. Please wait ${timeLeft} more hour(s).`
                });
            }
        }
        else {
            // Standard daily check
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            const endOfToday = new Date();
            endOfToday.setHours(23, 59, 59, 999);
            const existingLog = await HabitLog.findOne({
                where: {
                    habitId: habitId,
                    userId,
                    completedAt: {
                        [Op.between]: [today, endOfToday]
                    }
                }
            });
            if (existingLog) {
                return res.status(400).json({ message: 'Habit already completed today' });
            }
        }
        // Update Streak
        const nextStreak = calculateNextStreak(habit.lastCompleted, habit.streak);
        habit.streak = nextStreak;
        habit.lastCompleted = new Date();
        await habit.save();
        // Create Log
        await HabitLog.create({ habitId: parseInt(habitId), userId, completedAt: new Date() });
        // Reward XP
        const user = await User.findByPk(userId);
        if (user) {
            const xpGained = calculateXPForCompletion(nextStreak);
            user.xp += xpGained;
            user.level = calculateLevel(user.xp);
            await user.save();
            const newBadges = await checkBadges(userId);
            return res.json({
                habit,
                xpGained,
                currentXP: user.xp,
                level: user.level,
                newBadges
            });
        }
        res.json({ habit });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
export const getAnalytics = async (req, res) => {
    try {
        const { userId, days = '30' } = req.query;
        const user = await User.findByPk(userId);
        if (!user)
            return res.status(404).json({ message: 'User not found' });
        let requestedDays = parseInt(days);
        if (!user.isPremium && requestedDays > 7) {
            requestedDays = 7;
        }
        const startDate = new Date();
        startDate.setDate(startDate.getDate() - requestedDays);
        const logs = await HabitLog.findAll({
            attributes: [
                [fn('TO_CHAR', col('completedAt'), 'YYYY-MM-DD'), '_id'],
                [fn('COUNT', col('id')), 'count']
            ],
            where: {
                userId: userId,
                completedAt: {
                    [Op.gte]: startDate
                }
            },
            group: [fn('TO_CHAR', col('completedAt'), 'YYYY-MM-DD')],
            order: [[fn('TO_CHAR', col('completedAt'), 'YYYY-MM-DD'), 'ASC']],
            raw: true
        });
        res.json(logs);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
//# sourceMappingURL=habitController.js.map