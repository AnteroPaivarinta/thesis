export const selectVerifyCode = `
  SELECT * FROM VERIFYCODE
  WHERE email = ?;
`;

export default selectVerifyCode;
