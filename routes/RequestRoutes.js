const express = require('express');
const router = express.Router();
const { sendRequest, getRequests, deleteRequest } = require('../controllers/RequestController');

router.post('/sendRequest', sendRequest);
router.post('/getRequests', getRequests);
router.delete('/deleteRequest', deleteRequest);

module.exports = router;