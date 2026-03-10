const repository = require('./repository');

async function getUsers() {
  return await repository.queryUsers();
}

async function createUser(data) {
  return await repository.insertUser(data);
}

async function toggleFanZone(userId) {
  return await repository.updateFanZone(userId);
}
async function toggleSendEmail(userId) {
  return await repository.updateEmail(userId);
}

module.exports = { getUsers,createUser,toggleFanZone,toggleSendEmail };