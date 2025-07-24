import { connection } from '../db.ts';
import { use } from "../variables/variables.ts";
import putUserDataQuery from '../queries/putUserDataQuery.ts';


export const putUserData = async(req: any, res: any) => {

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
  await connection.query(use);
  await connection.query(putUserDataQuery, [firstName, lastName, age, email, gender, phone, tshirt, team, freeText, PersonID]);
  return res.status(200).send('made query');
}

export default putUserData;