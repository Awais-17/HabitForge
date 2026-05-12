import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database.js';
import User from './User.js';
class Habit extends Model {
    id;
    userId;
    name;
    frequency;
    color;
    icon;
    streak;
    lastCompleted;
    refreshInterval;
    createdAt;
}
Habit.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id',
        },
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    frequency: {
        type: DataTypes.ENUM('daily', 'weekly'),
        defaultValue: 'daily',
    },
    color: {
        type: DataTypes.STRING,
        defaultValue: '#4f46e5',
    },
    icon: {
        type: DataTypes.STRING,
        defaultValue: 'check',
    },
    streak: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
    lastCompleted: {
        type: DataTypes.DATE,
        defaultValue: null,
    },
    refreshInterval: {
        type: DataTypes.INTEGER,
        defaultValue: null,
    },
}, {
    sequelize,
    modelName: 'Habit',
});
Habit.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(Habit, { foreignKey: 'userId' });
export default Habit;
//# sourceMappingURL=Habit.js.map