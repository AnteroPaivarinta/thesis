export const putUserDataQuery = `UPDATE PERSON SET firstName = ?, lastName = ?, age = ?, email = ?, gender = ?, phone = ?, tshirt = ?, team = ?, freeText = ? WHERE PersonID = ?`;

export default putUserDataQuery;