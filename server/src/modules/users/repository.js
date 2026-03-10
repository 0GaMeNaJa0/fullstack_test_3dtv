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

  const sql = `INSERT INTO Users (firstName, lastName, email, phone, registerAt, zoneId, isFanZone, isSendEmail, createdAt) VALUES (?, ?, ?, ?,?,?,?,?,?)`;

  const params = [userData.firstName, userData.lastName, userData.email, userData.phone, userData.registerAt, userData.zoneId, userData.isFanZone, userData.isSendEmail, userData.createdAt];

  const [result] = await db.query(sql, params);

  return {
    insertId: result.insertId,
    affectedRows: result.affectedRows
  };
}

async function updateFanZone(userId){
  const sql = `UPDATE Users u SET u.isFanzone = NOT u.isFanZone WHERE u.userId = ?`;

  const params = [userId]

  const [result] = await db.query(sql, params);

  return {
    affectedRows: result.affectedRows,
    changedRows: result.changedRows
  };
}

async function updateEmail(userId){
  const sql = `UPDATE Users u SET u.isSendEmail = NOT u.isSendEmail WHERE u.userId = ?`;

  const params = [userId]

  const [result] = await db.query(sql, params);

  return {
    affectedRows: result.affectedRows,
    changedRows: result.changedRows
  };
}

module.exports = { queryUsers,insertUser,updateEmail,updateFanZone };