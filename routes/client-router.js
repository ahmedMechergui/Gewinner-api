const express = require('express');

const authClient = require('../middleware/authentication').authClient;
const signController = require('../controllers/client/sign-up-in-out-controller');
const manageAccountController = require('../controllers/client/manage-account-controller');
const manageFeedbackController = require('../controllers/client/manage-feedback-controller');

const router = new express.Router();


/* =============================
    Client sign-up-in-out
   =============================*/

// Sign up a new Client
router.post('/clients', signController.signUp);

// Sign in a client
router.post('/clients/login', signController.signIn);

// Sign out a client
router.post('/clients/logout', authClient, signController.signOut);


/* =============================
    Manage account
   =============================*/

// Delete currently logged account
router.delete('/clients', authClient, manageAccountController.deleteAccount);

// Update currently logged account
router.patch('/clients', authClient, manageAccountController.updateAccount);

/* =============================
    Manage feedback
   =============================*/

// Post a feedback
router.post('/feedback', authClient, manageFeedbackController.addFeedback);

// Get a feedback
router.get('/feedback', authClient, manageFeedbackController.getFeedback);

module.exports = router;