import { use } from "../variables/variables.ts";
import { connection } from '../db.ts';

export const deleteId = async(req: any, res: any) => {
  let id = req.params.id;
  const deleteQuery = `DELETE FROM PERSON WHERE PersonID ='${id}';`;
  await connection.query(use);
  await connection.query(deleteQuery);
}



export default deleteId;