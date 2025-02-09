import dotenv from "dotenv"
import { Dialect, Sequelize } from "sequelize";

dotenv.config();

console.log("DB Config:");
console.log(`Host: ${process.env.DB_HOST}`);
console.log(`Port: ${process.env.DB_PORT}`);
console.log(`User: ${process.env.DB_USER}`);
console.log(`Database: ${process.env.DB_NAME}`);
console.log(`Dialect: ${process.env.DB_DIALECT}`);

const dbDialect: Dialect= process.env.DB_DIALECT as Dialect;

const sequelize= new Sequelize(
    process.env.DB_NAME || "database_name",
    process.env.DB_USER || "user_name",
    process.env.DB_PASWWORD || "password",
    {
        host: process.env.DB_HOST,
        dialect: dbDialect,
        port: Number(process.env.DB_PORT_POSTGRES) || 5435,
        logging: console.log,
    }

)

export default sequelize;