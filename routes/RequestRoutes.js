const express = require('express');
const router = express.Router();
const { sendRequest, fetchRequests, fetchRequestData, deleteRequest, acceptRequest } = require('../controllers/RequestController');

router.post('/sendRequest', sendRequest);
router.post('/getRequests', fetchRequests);
router.post('/getRequestData', fetchRequestData);
router.delete('/deleteRequest', deleteRequest);
router.put('/acceptRequest', acceptRequest);

module.exports = router;