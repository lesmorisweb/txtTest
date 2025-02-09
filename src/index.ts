import express from 'express';
import cors from 'cors';
import sequelize from './db/conection'
import router from "./routes/index"
import dotenv from 'dotenv';
dotenv.config({ path: './.env' });

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', router);

const PORT = Number(process.env.PORT_EXPRESS);
const dbPort= Number(process.env.DB_PORT_POSTGRES);

console.log("server port", PORT)
console.log("Database port", dbPort)
console.log(`process.env.DB_PORT_EXPRESS: ${process.env.DB_PORT_EXPRESS}`)
console.log("environment variables:", process.env)
console.log(`process.env.DB_PORT_POSTGRES: ${process.env.DB_PORT_POSTGRESS}`)

sequelize.authenticate().
then(() => {
    console.log("database connected successfully!");
})
.catch((error)=> {
    console.error("error conecting to the database", error);
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});


