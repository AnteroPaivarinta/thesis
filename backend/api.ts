import express from 'express';
import cors from 'cors';
import mysql from 'mysql2';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
//import aws from 'aws-sdk';
import SHA256 from 'crypto-js/sha256.js';
import { connection } from './db.ts';

const app = express();
const jwtKey = "kalevakoodi";
const use = "USE app_database;";
const jwtSecret = '123'; // TODO, Suojaa JWT
const jwtExpirySeconds = 300;
const PORT = 3307;
let verifyCode: string | null = null;


dotenv.config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});

const verifyUserToken = (req:any, res: any, next: any) => {
  if (!req.headers.authorization) {
    return res.status(401).send("Unauthorized request");
  }
  const token = req.headers["authorization"].split(" ")[1];
  if (!token) {
    return res.status(401).send("Access denied. No token provided.");
  }
  try {
    const decoded:any = jwt.verify(token, jwtSecret);
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(400).send("Invalid token.");
  }
};

console.log(process.env.WEB_HOSTNAME, process.env.WEB_USERNAME, process.env.WEB_PASSWORD, PORT)


connection.query(use);
let dataArray: any[] = [];
connection.query("SELECT * FROM PERSON", function (err:any, result:any, fields:any) {
  if (err) {
    console.error("Database query error:", err);
    return;
  }
  if (result) {
    console.log("Result", result)
    const array = JSON.parse(JSON.stringify(result))
    dataArray.push(...array);
  } else {
    console.log("No results found.");
  }
});

app.use(cors())
app.use(express.json())
 
app.post('/admin', async (req:any, res:any) => {
 
  const { user, password } = req.body;
  let emailHash = user;
  let passwordHash = SHA256(password).toString();
  const sqlQuery = `SELECT * FROM ADMIN WHERE email ='${emailHash}';`
  connection.query(use);
  connection.query(sqlQuery, async function (err:any, result:any, fields:any) {
    if (err) throw err;
    const userData = result[0];
    if (emailHash === userData.email && userData.password === passwordHash) {
      let code = Math.floor(1000 + Math.random() * 9000).toString();
      verifyCode = code;
      let mailOptions = {
        from: process.env.EMAIL_USER,
        to: user,
        subject: 'Verify  Code',
        text: code,
      };
      transporter.sendMail(mailOptions, function(error:any, info:any){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
      return res.status(200).send({ loginResponse: 'Right user and password'});
    } else {
      return res.status(401).send("Wrong password");
    }
  });
});

app.post('/admin/verify', async (req: any, res: any) => {
  
  const {inputCode} = req.body;
  if (inputCode === verifyCode) {
    let token = jwt.sign({foo: 'bar'}, jwtSecret);
    return res.status(200).send({token: token});
  } else {
    return res.status(401).send("Wrong verify code");
  }
});


app.post('/userData', async function(req: any,res: any) {

  
  const object = req.body;
  const licenseCard = object.licenseCard === true? 1 : 0
  let tasks = object.tasks;
  let days = object.days;
  let arrayDays: string[] = []
  for (const key in days) {
    if(key.toString() === 'first' && days[key] === true){
      arrayDays.push('28.6.2024')
    }

    if(key.toString() === 'second' && days[key] === true){
      arrayDays.push('29.6.2024')
    }

    if(key.toString() === 'third' && days[key] === true){
      arrayDays.push('30.6.2024')
    }
  }
  
  connection.query(use);
  const sql = `INSERT INTO PERSON VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`;
  const nyt = new Date();
  connection.query(sql, [
      object.PersonID,
      object.firstName,
      object.lastName,
      object.age,
      object.email,
      object.phone,
      object.gender,
      object.tshirt,
      object.team,
      licenseCard.toString(),
      object.freeText,
      tasks.toString(),
      arrayDays.toString(),
      nyt.toString(),
  ]);

  dataArray.push(req.body);
  const message = 'Hei, olet ilmoittanut Kalevan 2024 kisoihin näillä tiedoilla:\n ';
  const firstNameLine = `Etunimi: ${object.firstName} \n`
  const lastNameline = `Sukunimi: ${object.lastName} \n`
  const age = `Ikä: ${object.age} \n`
  const email = `Sähköposti: ${object.email} \n`
  const gender = `Sukupuoli: ${object.gender} \n`
  const phone = `Puhelinnumero: ${object.phone} \n`
  const tshirt = `T-paita: ${object.tshirt} \n`
  const team = `Seura: ${object.team} \n`
  const licenseCardLine = `Lisenssikortti: ${object.licenseCard} \n`
  const hopes = `Toivomukset: ${object.hopes} \n`
  const freeText = `Vapaamuotoinen teksti: ${object.freeText} \n`
  const tasksLine = `Tehtävät: ${tasks} \n`
  const daysLine = `Päivät: ${arrayDays.toString()} \n`
  const total = message+firstNameLine+lastNameline+age+email+gender+phone+tshirt+team+licenseCardLine+hopes+freeText+tasksLine+daysLine;
  

  let mailOptions = {
    from: process.env.EMAIL_USER,
    to: object.email,
    subject: 'Ilmoittautumisvahvistus',
    text: total,
  };
  
  transporter.sendMail(mailOptions, function(error:any, info:any){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });

  return res.status(200).send("It's working");
});


app.put('/userData', async function(req: any,res: any) {
  const {
    firstName,
    lastName,
    age,
    gender,
    phone,
    email,
    team,
    freeText,
    tshirt,
    PersonID,
  } = req.body.data;
  connection.query(use);
  const sql = `UPDATE PERSON SET firstName = ?, lastName = ?, age = ?, email = ?, gender = ?, phone = ?, tshirt = ?, team = ?, freeText = ? WHERE PersonID = ?`;

  connection.query(sql, [firstName, lastName, age, email, gender, phone, tshirt, team, freeText, PersonID]);
  return res.status(200).send('made query');
});


app.get('/userData', verifyUserToken,  function(req:any, res:any) {
  res.json(dataArray.map((value) => value.licenseCard === 1 ? {...value, licenseCad: true} : {...value, licenseCard: false}))
});



app.delete('/delete/:id', function(req:any,res:any) {
  
  let id = req.params.id;
  const deleteQuery = `DELETE FROM PERSON WHERE PersonID ='${id}';`;

  connection.query(use);
  connection.query(deleteQuery);
  let array = dataArray.filter((value) => value.PersonID != id);
  dataArray = array;
  return res.status(200).send(array);
});

const PORT_API = 3001
app.listen(PORT_API, () => {
    console.log(`Server running on port ${PORT_API}`)
})