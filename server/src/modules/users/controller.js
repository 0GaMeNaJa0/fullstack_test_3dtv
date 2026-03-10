const service = require('./service');

async function getUsers(req, res, next) {
  try {
    const users = await service.getUsers();
    res.json(users);
  } catch (err) { next(err); }
}
async function createUser(req, res, next) {
  try {
    const userData = req.body;
    const result = await service.createUser(userData);

    if (result && result.insertId) {
      return res.status(201).json({ message: "User created", userId: result.insertId });
    }
    // fallback if service returns something unexpected
    return res.status(500).send("Failed to create user");
  } catch (err) {
    next(err);
  }
}

async function toggleFanZone(req, res, next) {
  try {
    const userId = req.body.userId;

    const result = await service.toggleFanZone(userId);

    if (result && result.affectedRows > 0) {
      return res.status(200).send("Fan Zone updated");
    }
    return res.status(404).send("User not found or no changes made");
  } catch (err) { next(err); }
}
async function toggleSendEmail(req, res, next) {
  try {
    const userId = req.body.userId;

    const result = await service.toggleSendEmail(userId);

    if (result && result.affectedRows > 0) {
      return res.status(200).send("Email updated");
    }
    return res.status(404).send("User not found or no changes made");
  } catch (err) { next(err); }
}

module.exports = {
  getUsers,
  createUser,
  toggleFanZone,
  toggleSendEmail
};