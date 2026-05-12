import { Model } from 'sequelize';
export interface HabitLogAttributes {
    id?: number;
    habitId: number;
    userId: number;
    completedAt: Date;
}
declare class HabitLog extends Model<HabitLogAttributes> implements HabitLogAttributes {
    id: number;
    habitId: number;
    userId: number;
    completedAt: Date;
}
export default HabitLog;
//# sourceMappingURL=HabitLog.d.ts.map