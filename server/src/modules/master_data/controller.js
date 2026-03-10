const service = require('./service');

async function getZones(req, res, next) {
  try {
    const zones = await service.getZones();
    res.json(zones);
  } catch (err) { next(err); }
}

module.exports = {
  getZones
};