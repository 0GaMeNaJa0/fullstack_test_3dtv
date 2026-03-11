const express = require('express');
const ctrl = require('./controller');
const router = express.Router();

router.get('/', ctrl.getUsers);
router.post('/', ctrl.createUser);
router.post('/sendEmail',ctrl.sendEmail)
router.get('/exportExcel',ctrl.exportExcel)

module.exports = router;