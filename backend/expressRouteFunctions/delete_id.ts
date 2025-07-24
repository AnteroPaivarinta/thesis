import { use } from "../variables/variables.ts";
import { connection } from '../db.ts';
import getPersons from "./getPersons.ts";

export const deleteId = async(req: any, res: any) => {
  
  let dataArray = await getPersons();
  let id = req.params.id;
  const deleteQuery = `DELETE FROM PERSON WHERE PersonID ='${id}';`;
  await connection.query(use);
  await connection.query(deleteQuery);
  let array = dataArray.filter((value) => value.PersonID != id);
  dataArray = array;
  return res.status(200).send(array);
}



export default deleteId;