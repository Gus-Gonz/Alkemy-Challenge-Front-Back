const { Router } = require("express");
const express = require("express");

const operationController = require("../controllers/operation-controller");

const router = express.Router();

router.get("/", operationController.getLastTenOperations);

router.post("/", operationController.createOperation);

router.put("/:oid", operationController.updateOperation);

router.delete("/:oid", operationController.deleteOperation);

module.exports = router;
