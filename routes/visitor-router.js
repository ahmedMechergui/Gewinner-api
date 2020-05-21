const express = require('express');

const manageTestApplications = require('../controllers/visitor/manage-tests-controller');
const joinUsController = require('../controllers/visitor/join-us-controller');

const router = new express.Router();


// Apply for test
router.post('/tests', manageTestApplications.applyForTest);


// (Join us) apply for job/internship
router.post('/join-us',
    joinUsController.upload.single('cv'),
    joinUsController.apply,
    joinUsController.applyErrorCatcher);

module.exports = router;