import dotenv from 'dotenv';
import mysql from 'mysql2';

dotenv.config();
const PORT = 3307;

export const connection = mysql.createConnection({
  host     : process.env.WEB_HOSTNAME,
  user     : process.env.WEB_USERNAME,
  password : process.env.WEB_PASSWORD,
  port     : PORT
});

export default connection;