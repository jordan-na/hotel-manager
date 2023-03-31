import mysql from "mysql";
import config from "../config/config.js";

const db = mysql.createConnection({
   host: config.HOST,
   user: config.USER,
   password: config.PASSWORD,
   database: config.DB,
});

db.connect((error) => {
   if (error) console.log("Couldn't connect to database");
   else console.log("Successfully connected to the database.");
});

export default db;