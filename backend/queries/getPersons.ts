import { connection } from '../db.ts';
import { use } from "../variables/variables.ts";

export const getPersonsQuery = "SELECT * FROM PERSON";

  

export default getPersonsQuery;