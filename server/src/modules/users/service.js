const repository = require('./repository');

async function getUsers() {
  return await repository.queryUsers();
}

async function createUser(data) {
  return await repository.insertUser(data);
}

async function allowFanZone(userId) {
  return await repository.updateFanZone(userId);
}

module.exports = { getUsers,createUser,allowFanZone };