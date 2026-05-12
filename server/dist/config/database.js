import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();
const sequelize = new Sequelize(process.env.DB_NAME || 'admin', process.env.DB_USER || 'admin', process.env.DB_PASSWORD || 'admin', {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '3306'),
    dialect: 'mysql',
    logging: false, // Set to true to see SQL queries
});
export default sequelize;
//# sourceMappingURL=database.js.map