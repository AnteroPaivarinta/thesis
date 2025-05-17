import { connection } from '../db.ts';
import { use } from "../variables/variables.ts";
import getPersonsQuery from '../queries/getPersons.ts';


export const getPersons = async() => {

  await connection.query(use);
  let dataArray: any[] = [];
  const [row] = await connection.query(getPersonsQuery);
  if (row) {
    const array = JSON.parse(JSON.stringify(row))
    dataArray.push(...array);
  } else {
    console.log("No results found.");
  }
  return dataArray;
};

export default getPersons;