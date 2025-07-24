import serverlessExpress from '@vendia/serverless-express';
import app from "./api"; 

export const handler = serverlessExpress({ app });