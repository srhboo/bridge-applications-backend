const express = require('express');
const { check } = require('express-validator/check');
const config = require('../../../knexfile');
const database = require('knex')(config);

const applicationsController = require('./applications.controller');

const router = express.Router();

router.get('', applicationsController.list);
router.post('', applicationsController.create);
router.get('/:id', applicationsController.get);
router.put('/:id', applicationsController.update);
router.delete('/:id', applicationsController.del);

module.exports = {
  applicationsRouter: router,
};
