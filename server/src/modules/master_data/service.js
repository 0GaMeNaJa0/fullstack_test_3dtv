const repository = require('./repository');

async function getZones() {
  return await repository.queryZones();
}

module.exports = {getZones}