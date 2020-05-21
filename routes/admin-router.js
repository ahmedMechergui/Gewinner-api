const express = require('express');

const authAdmin = require('../middleware/authentication').authAdmin;
const signController = require('../controllers/admin/sign-up-login-logout-controller');
const manageAdminAccountController = require('../controllers/admin/manage-admin-account-controller');
const clientsManagementController = require('../controllers/admin/manage-clients-controller');
const testsManagementController = require('../controllers/admin/manage-tests-controller');
const manageAccessoriesController = require('../controllers/admin/manage-accessories-controller');
const manageJoinUsController = require('../controllers/admin/manage-join-us-controller');
const manageArticlesController = require('../controllers/admin/manage-articles-controller');
const manageEventsController = require('../controllers/admin/manage-events-controller');
const manageTeamMembersController = require('../controllers/admin/manage-team-members-controller');

const router = new express.Router();

/* =============================
    Admin sign-up-in-out
   =============================*/
// # this request will be executed only one time before production to create the admin

// Sign up an Admin
router.post('/admin', signController.signUp);

// Sign in Admin
router.post('/admin/login', signController.signIn);

// Sign out admin
router.post('/admin/logout', authAdmin, signController.signOut);

/* =============================
    Manage admin account
   =============================*/

// Update admin Account
router.patch('/admin', authAdmin, manageAdminAccountController.updateAccount);

/* =============================
    Manage clients
   =============================*/

// Ban a client
router.post('/banClient/:id', authAdmin, clientsManagementController.banClient);


/* =============================
    Manage tests
   =============================*/

// Validate a test
router.post('/tests/validate/:id', authAdmin, testsManagementController.validateTest);


/* =============================
    Manage accessories
   =============================*/

// Add accessorie
router.post('/accessories', authAdmin,
    manageAccessoriesController.uploadImage.single('image'),
    manageAccessoriesController.addAccessorie,
    manageAccessoriesController.addAccessorieErrorCatcher);

// Get accessorie
router.get('/accessories/:id', manageAccessoriesController.getOneAccessorie);

// Get all accessories  { none => accessories }
router.get('/accessories', manageAccessoriesController.getAllAccessories);
// Update Accessorie
router.patch('/accessories/:id', authAdmin,
    manageAccessoriesController.uploadImage.single('image'),
    manageAccessoriesController.updateAccessorie,
    manageAccessoriesController.addAccessorieErrorCatcher);
// Delete accessorie
router.delete('/accessories/:id', authAdmin, manageAccessoriesController.deleteAccessorie);

/* =============================
    Manage joins-us applications
   =============================*/

// Get a cv PDF file
router.get('/join-us/cv/:id', authAdmin, manageJoinUsController.getCvPdfFile);

// Get all join-us applications
router.get('/join-us/all', authAdmin, manageJoinUsController.getAllApplications);

// Get a join-us application
router.get('/join-us/:id', authAdmin, manageJoinUsController.getOneApplication);

/* =============================
    Manage Articles
   =============================*/

// Add a new article  { admin,authToken, article => none }
router.post('/articles',
    authAdmin,
    manageArticlesController.uploadImage.single('image'),
    manageArticlesController.addArticle,
    manageArticlesController.addArticleErrorCatcher
);


// Get many articles
// /articles  => get all articles
// /articles?limit=X  => get the first X articles
// /articles?limit=X&skip=Y  => skip Y articles then get X articles
router.get('/articles', manageArticlesController.getManyArticles);

// Get one article
router.get('/articles/:id', manageArticlesController.getOneArticle);

// Update Article
router.patch('/articles/:id',
    authAdmin,
    manageArticlesController.uploadImage.single('image'),
    manageArticlesController.updateArticle,
    manageArticlesController.addArticleErrorCatcher);

// Delete an article
router.delete('/articles/:id', authAdmin, manageArticlesController.deleteArticle);

/* =============================
    Manage coming events
   =============================*/

// Add a coming event
router.post('/events', authAdmin, manageEventsController.addEvent);

// get one coming event
router.get('/events/:id', manageEventsController.getOneEvent);

// get many coming events
// /events  => get all events
// /events?limit=X  => get the first X events
router.get('/events', manageEventsController.getManyEvents);

// delete coming event
router.delete('/events/:id', authAdmin, manageEventsController.deleteEvent);

/* =============================
    Manage team Members
   =============================*/

// add a team member
router.post('/members',
    authAdmin,
    manageTeamMembersController.uploadImage.single('image'),
    manageTeamMembersController.addTeamMember,
    manageTeamMembersController.addTeamMemberErrorCatcher);

// Get all team members
router.get('/members/all', manageTeamMembersController.getAllTeamMembers);
// Get a team member
router.get('/members/:id', authAdmin, manageTeamMembersController.getTeamMember);

// Update a team member
router.patch('/members/:id',
    authAdmin,
    manageTeamMembersController.uploadImage.single('image'),
    manageTeamMembersController.updateTeamMember,
    manageTeamMembersController.addTeamMemberErrorCatcher);

// delete a team member
router.delete('/members/:id', authAdmin, manageTeamMembersController.deleteTeamMember);
module.exports = router;