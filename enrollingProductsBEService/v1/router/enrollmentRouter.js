/* ************************************************************
Author(s): Swati
Sprint: Sprint 1
Created On: 7/2020
Modified by: 
Modified on: 
====================
Description: Router description
************************************************************ */

const express = require("express");
const router = express.Router();

//Routing for each URI mapped to API functions.
const { postProductInfo, getProductInfo, deleteProductInfo } = require('../src/enrollmentProductBackend')

router.route('/v1/products').post(postProductInfo).get(getProductInfo).delete(deleteProductInfo);


module.exports = router;