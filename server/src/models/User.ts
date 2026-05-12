import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database.js';

export interface UserAttributes {
  id?: number;
  name: string;
  email: string;
  xp: number;
  level: number;
  badges: string[];
  isPremium: boolean;
  createdAt?: Date;
}

class User extends Model<UserAttributes> implements UserAttributes {
  public id!: number;
  public name!: string;
  public email!: string;
  public xp!: number;
  public level!: number;
  public badges!: string[];
  public isPremium!: boolean;
  public readonly createdAt!: Date;
}

User.init(
  {
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
  },
  {
    sequelize,
    modelName: 'User',
  }
);

export default User;
