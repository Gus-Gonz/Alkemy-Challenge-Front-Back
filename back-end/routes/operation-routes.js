const { Router } = require('express');
const express = require('express');


const operationController = require('../controllers/operation-controller');

const router = express.Router();

router.get('/', operationController.getOperations);

router.get('/last-ten', operationController.getLastTenOperations);

router.get('/type/:type', operationController.getOperationsByType);

router.post('/', operationController.createOperation);

router.put('/:oid', operationController.updateOperation);

router.delete('/:oid', operationController.deleteOperation);

module.exports = router;