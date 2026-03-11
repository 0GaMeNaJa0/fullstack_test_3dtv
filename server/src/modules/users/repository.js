const db = require('../../config/db');

async function queryUsers() {
  
  const sql =
    "SELECT u.*,z.name as 'zoneName' " +
    "FROM Users u " +
    "LEFT JOIN Zones z ON u.zoneId = z.zoneId ";

  const [rows] = await db.query(sql);
  return rows;
}

async function insertUser(userData) {

  const sql = `INSERT INTO Users (firstName, lastName, email, phone, registerAt, zoneId, isFanZone, createdAt) VALUES (?, ?, ?, ?,?,?,?,?)`;

  const params = [userData.firstName, userData.lastName, userData.email, userData.phone, userData.registerAt, userData.zoneId, userData.isFanZone,  userData.createdAt];

  const [result] = await db.query(sql, params);

  return {
    insertId: result.insertId,
    affectedRows: result.affectedRows
  };
}

async function updateFanZone(userId){
  const sql = `UPDATE Users u SET u.isFanzone = 1 WHERE u.userId = ?`;

  const params = [userId]

  const [result] = await db.query(sql, params);

  return {
    affectedRows: result.affectedRows,
    changedRows: result.changedRows
  };
}
module.exports = { queryUsers,insertUser,updateFanZone };