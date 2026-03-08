const express = require('express');
const ctrl = require('./controller');
const router = express.Router();

router.get('/', ctrl.getUsers);
router.post('/', ctrl.createUser);
router.put('/fanZone', ctrl.toggleFanZone);
router.put('/sendEmail', ctrl.toggleSendEmail);

module.exports = router;