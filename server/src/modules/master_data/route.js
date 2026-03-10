const express = require('express');
const ctrl = require('./controller');
const router = express.Router();

router.get('/zones', ctrl.getZones);

module.exports = router;