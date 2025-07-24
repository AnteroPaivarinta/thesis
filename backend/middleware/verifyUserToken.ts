import jwt from 'jsonwebtoken';

export const verifyUserToken = (req:any, res: any, next: any) => { // Middleware

  const jwtSecret:string | undefined = process.env.JWT_SECRET;
  
  if (!req.headers.authorization) {
    return res.status(401).send("Unauthorized request");
  }
  const token = req.headers["authorization"].split(" ")[1];
  if (!token) {
    return res.status(401).send("Access denied. No token provided.");
  }

  if(jwtSecret) {
    try {
      const decoded:any = jwt.verify(token, jwtSecret);
      req.user = decoded.user;
      next();
    } catch (err) {
      res.status(400).send("Invalid token.");
    }
  } 
};


export const verifyUserTokenLamda = (token: string ): boolean => { // Middleware

  const jwtSecret:string | undefined = process.env.JWT_SECRET;
  if( jwtSecret ) {
    try {
      jwt.verify(token, jwtSecret);
      return true;
    } catch (err) {
      return false;
    }
  } else {
    return false;
  } 
};



export default verifyUserToken;