 export const insertVerifyCode = `
        INSERT INTO VERIFYCODE (email, code) 
        VALUES (?, ?)
        ON DUPLICATE KEY UPDATE code = VALUES(code);
      `;

export default insertVerifyCode;
