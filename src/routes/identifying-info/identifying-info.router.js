const express = require('express');
const { check } = require('express-validator/check');
const config = require('../../../knexfile');
const database = require('knex')(config);

const identifyingInfoController = require('./identifying-info.controller');

const router = express.Router();

router.get('', identifyingInfoController.list);
router.post('', identifyingInfoController.create);
router.get('/:id', identifyingInfoController.get);
router.put('/:id', identifyingInfoController.update);
router.delete('/:id', identifyingInfoController.del);

module.exports = {
  identifyingInfoRouter: router,
};
