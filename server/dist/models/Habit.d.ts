import { Model } from 'sequelize';
export interface HabitAttributes {
    id?: number;
    userId: number;
    name: string;
    frequency: 'daily' | 'weekly';
    color: string;
    icon: string;
    streak: number;
    lastCompleted: Date | null;
    refreshInterval: number | null;
    createdAt?: Date;
}
declare class Habit extends Model<HabitAttributes> implements HabitAttributes {
    id: number;
    userId: number;
    name: string;
    frequency: 'daily' | 'weekly';
    color: string;
    icon: string;
    streak: number;
    lastCompleted: Date | null;
    refreshInterval: number | null;
    readonly createdAt: Date;
}
export default Habit;
//# sourceMappingURL=Habit.d.ts.map