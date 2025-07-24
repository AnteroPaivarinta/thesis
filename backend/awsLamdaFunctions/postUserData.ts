import { connection } from '../db.ts';
import { use } from "../variables/variables.ts";
import transporter from '../transporter.ts';
import insertVerifyCode from '../queries/insertVerifyCode.ts';
import postUserDataQuery from '../queries/postUserDataQuery.ts';


export const postUserData = async(req: any, res: any) => {
    
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
    
    await connection.query(use);
    const sql = postUserDataQuery;
    const nyt = new Date();
    await connection.query(sql, [
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
  
    return "It's working";
}