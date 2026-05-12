import { Model } from 'sequelize';
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
declare class User extends Model<UserAttributes> implements UserAttributes {
    id: number;
    name: string;
    email: string;
    xp: number;
    level: number;
    badges: string[];
    isPremium: boolean;
    readonly createdAt: Date;
}
export default User;
//# sourceMappingURL=User.d.ts.map