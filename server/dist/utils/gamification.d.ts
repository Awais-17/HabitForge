/**
 * Calculates the current level based on XP.
 * Formula: Level = floor(0.2 * sqrt(XP))
 */
export declare const calculateLevel: (xp: number) => number;
/**
 * Determines the next streak count based on the last completion date.
 */
export declare const calculateNextStreak: (lastCompleted: Date | null, currentStreak: number) => number;
/**
 * XP rewards for various actions
 */
export declare const XP_REWARDS: {
    HABIT_COMPLETE: number;
    STREAK_BONUS_BASE: number;
};
export declare const calculateXPForCompletion: (streak: number) => number;
//# sourceMappingURL=gamification.d.ts.map