import SHA256 from 'crypto-js/sha256.js';
import { connection } from '../db.ts';
import { use } from "../variables/variables.ts";
import transporter from '../transporter.ts';
import insertVerifyCode from '../queries/insertVerifyCode.ts';

export const postAdmin = async(req: any, res: any) => {
  const { user, password } = req.body;
  let email = user;
  let passwordHash = SHA256(password).toString();
  const sqlQuery = `SELECT * FROM ADMIN WHERE email ='${email}';`
  await connection.query(use);
  const [ row ] = await connection.query(sqlQuery);
    const userData = row[0];
    if (email === userData.email && userData.password === passwordHash) {
      let code = Math.floor(1000 + Math.random() * 9000).toString();
      await connection.execute(insertVerifyCode, [email, code]);
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
}

export default postAdmin;