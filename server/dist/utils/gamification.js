import { differenceInDays, isYesterday, isToday, startOfDay } from 'date-fns';
/**
 * Calculates the current level based on XP.
 * Formula: Level = floor(0.2 * sqrt(XP))
 */
export const calculateLevel = (xp) => {
    return Math.floor(0.2 * Math.sqrt(xp));
};
/**
 * Determines the next streak count based on the last completion date.
 */
export const calculateNextStreak = (lastCompleted, currentStreak) => {
    if (!lastCompleted)
        return 1;
    const today = startOfDay(new Date());
    const lastCompDay = startOfDay(new Date(lastCompleted));
    if (isToday(lastCompDay)) {
        return currentStreak; // Already completed today
    }
    if (isYesterday(lastCompDay)) {
        return currentStreak + 1;
    }
    // Missed one or more days
    return 1;
};
/**
 * XP rewards for various actions
 */
export const XP_REWARDS = {
    HABIT_COMPLETE: 10,
    STREAK_BONUS_BASE: 5, // Per streak day? Or milestones?
};
export const calculateXPForCompletion = (streak) => {
    const bonus = Math.floor(streak / 7) * XP_REWARDS.STREAK_BONUS_BASE;
    return XP_REWARDS.HABIT_COMPLETE + bonus;
};
//# sourceMappingURL=gamification.js.map