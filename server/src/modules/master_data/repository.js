const db = require('../../config/db');

async function queryZones() {
  const sql = "SELECT * FROM Zones"

  const [rows] = await db.query(sql);
  return rows;
}
module.exports = { queryZones };