import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database.js';
class User extends Model {
    id;
    name;
    email;
    xp;
    level;
    badges;
    isPremium;
    createdAt;
}
User.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    xp: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
    level: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
    },
    badges: {
        type: DataTypes.JSON,
        defaultValue: [],
    },
    isPremium: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
}, {
    sequelize,
    modelName: 'User',
});
export default User;
//# sourceMappingURL=User.js.map