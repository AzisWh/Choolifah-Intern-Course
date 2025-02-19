const { Router } = require("express");

const addModul = require("./addModul");
const editModul = require("./editModul");
const getModul = require("./getModul");

const modulApiController = Router();

// post
modulApiController.use(addModul);
//put
modulApiController.use(editModul);
//get
modulApiController.use(getModul);

module.exports = modulApiController;
