import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import verifyUserToken from './middleware/verifyUserToken.ts';
import deleteId from './expressRouteFunctions/delete_id.ts';
import postAdmin from './expressRouteFunctions/postAdmin.ts';
import putUserData from './expressRouteFunctions/putUserData.ts';
import { postUserData } from './expressRouteFunctions/postUserData.ts';
import getPersons from './expressRouteFunctions/getPersons.ts';
import postAdminVerify from './expressRouteFunctions/postAdminVerify.ts';

const app = express();

dotenv.config();

app.use(cors())
app.use(express.json())
app.post('/admin', postAdmin );
app.post('/admin/verify', postAdminVerify);
app.post('/userData', postUserData);
app.put('/userData', putUserData);
app.get('/userData', verifyUserToken,  async function(req:any, res:any) {
  const dataArray = await getPersons();
  res.json(dataArray.map((value) => value.licenseCard === 1 ? {...value, licenseCad: true} : {...value, licenseCard: false}))
});
app.delete('/delete/:id', deleteId);

const PORT_API = 3001
app.listen(PORT_API, () => {
    console.log(`Server running on port ${PORT_API}`)
})