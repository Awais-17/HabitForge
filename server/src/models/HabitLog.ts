import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database.js';
import User from './User.js';
import Habit from './Habit.js';

export interface HabitLogAttributes {
  id?: number;
  habitId: number;
  userId: number;
  completedAt: Date;
}

class HabitLog extends Model<HabitLogAttributes> implements HabitLogAttributes {
  public id!: number;
  public habitId!: number;
  public userId!: number;
  public completedAt!: Date;
}

HabitLog.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    habitId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Habit,
        key: 'id',
      },
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: 'id',
      },
    },
    completedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: 'HabitLog',
    indexes: [
      {
        fields: ['habitId', 'userId', 'completedAt'],
      },
    ],
  }
);

HabitLog.belongsTo(Habit, { foreignKey: 'habitId' });
HabitLog.belongsTo(User, { foreignKey: 'userId' });
Habit.hasMany(HabitLog, { foreignKey: 'habitId' });
User.hasMany(HabitLog, { foreignKey: 'userId' });

export default HabitLog;
