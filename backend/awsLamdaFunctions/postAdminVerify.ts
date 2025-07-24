import jwt from 'jsonwebtoken';
import { connection } from '../db.ts';
import getVerifyCode from '../queries/getVerifyCode.ts';

export const postAdminVerify = async( req: any, res: any ) => {

  const jwtSecret = process.env.JWT_SECRET;
  const { inputCode, email } = req.body;
  let verifyCode;
  const [row] = await connection.execute(getVerifyCode, [email]);
  verifyCode = row[0].code;
  if (inputCode === verifyCode && jwtSecret) {
    let token = jwt.sign({foo: 'bar'}, jwtSecret);
    return {token: token};
  } else {
    return {message: "Wrong code"};
  }
}

export default postAdminVerify;