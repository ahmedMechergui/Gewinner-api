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
const manageServicesController = require('../controllers/client/manage-services-controller');
const manageContactUsController = require('../controllers/visitor/manage-contact-us-controller');
const manageMoovobrainOrders = require('../controllers/admin/manage-moovobrain-orders');

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

// Add client ID
router.post('/clientID', authAdmin, clientsManagementController.addClientID);

/* =============================
    Manage moovobrain orders
   =============================*/

// Get all moovobrain orders
router.get('/moovobrain',authAdmin , manageMoovobrainOrders.getAllOrders);

// Update moovobrain order status
router.post('/moovobrain/:id',authAdmin , manageMoovobrainOrders.updateOrderStatus);

// Remove moovobrain order
router.delete('/moovobrain/:id',authAdmin,manageMoovobrainOrders.deleteOrder);
/* =============================
    Manage tests
   =============================*/

// Get all tests
router.get('/tests', authAdmin, testsManagementController.getAllTests);

// Validate test
router.post('/tests/validate/:id', authAdmin, testsManagementController.validateTest);

// Update Test
router.post('/tests/update/:id', authAdmin, testsManagementController.updateTest);

// Delete Test
router.delete('/tests/:id' , authAdmin , testsManagementController.deleteTest);

/* =============================
    Manage accessories
   =============================*/

// Add accessorie
router.post('/accessories', authAdmin,
    manageAccessoriesController.uploadImage.array('image[]'),
    manageAccessoriesController.addAccessorie,
    manageAccessoriesController.addAccessorieErrorCatcher);

// Get accessorie
router.get('/accessories/:id', manageAccessoriesController.getOneAccessorie);

// Get all accessories  { none => accessories }
router.get('/accessories', manageAccessoriesController.getAllAccessories);
// Update Accessorie
router.post('/accessories-update/:id', authAdmin,
    manageAccessoriesController.uploadImage.array('image[]'),
    manageAccessoriesController.updateAccessorie,
    manageAccessoriesController.addAccessorieErrorCatcher);
// Delete accessorie
router.delete('/accessories/:id', authAdmin, manageAccessoriesController.deleteAccessorie);

/* =============================
    Manage accessories Order
   =============================*/
// Add Accessories Orders
router.post('/accessories-order', manageAccessoriesController.addAccessorieOrder);

// Get All Accessories Orders
router.get('/accessories-order', authAdmin, manageAccessoriesController.getAllAccessoriesOrders);

// Delete Accessorie Order
router.delete('/accessories-order/:id', authAdmin, manageAccessoriesController.deleteAccessorieOrder);

// Change Accessorie Order Status
router.post('/accessories-order-update/:id', authAdmin, manageAccessoriesController.changeOrderStatus);

/* =============================
    Manage joins-us applications
   =============================*/

// Get a cv PDF file
router.get('/join-us/cv/:id', authAdmin, manageJoinUsController.getCvPdfFile);

// Get all join-us applications
router.get('/join-us/all', authAdmin, manageJoinUsController.getAllApplications);

// Get a join-us application
router.get('/join-us/:id', authAdmin, manageJoinUsController.getOneApplication);

// update a join-us application , patch route causing errors with angular so we used post
router.post('/join-us/:id', authAdmin, manageJoinUsController.updateApplication);

// delete a join-us application
router.delete('/join-us/:id', authAdmin, manageJoinUsController.deleteApplication);
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
router.post('/members-update/:id',
    authAdmin,
    manageTeamMembersController.uploadImage.single('image'),
    manageTeamMembersController.updateTeamMember,
    manageTeamMembersController.addTeamMemberErrorCatcher);

// delete a team member
router.delete('/members/:id', authAdmin, manageTeamMembersController.deleteTeamMember);

/* =============================
    Manage services
   =============================*/

// get maintenance requests
/*
      /maintenance  => get all maintenance requests
     /maintenance?fixed=true  => get fixed maintenance requests
    /maintenance?fixed=false  => get unfixed maintenance requests

 */
router.get('/services/maintenance', authAdmin, manageServicesController.getMaintenanceRequests);

// set a maintenance request as fixed
router.post('/services/maintenance/fixed/:id',
    authAdmin,
    manageServicesController.setMaintenanceRequestFixed);

// Delete maintenance request
router.delete('/services/maintenance/:id' , authAdmin , manageServicesController.deleteMaintenanceRequest)

// Get scheduled quality controls
router.get('/services/qualityControl', authAdmin, manageServicesController.getAllQualityControlsByAdmin);

// Get scheduled quality controls
/*
    /services/qualityControl  , Get all scheduled quality controls for all clients
    /services/qualityControl?days=X  , Get scheduled quality controls for all clients for next X days
 */
router.get('/services/nextQualityControl', authAdmin, manageServicesController.getQualityControlsByAdminForNextDays);

// Validate or reject quality control request
router.post('/services/qualityControl/:id',authAdmin , manageServicesController.validateQualityControlRequest);

// Delete Quality control request
router.delete('/services/qualityControl/:id' , authAdmin , manageServicesController.deleteQualityControl);

// get on hold training requests
router.get('/services/training', authAdmin, manageServicesController.getTrainingSessionRequests);

// Set Training session requests as not in hold anymore
router.post('/services/training/:id', authAdmin, manageServicesController.setTrainingSessionAsDone);

// Delete Training session request
router.delete('/services/training/:id' , authAdmin , manageServicesController.deleteTrainingSession);

/* =============================
    Manage contact us messages
   =============================*/

// get all contact us messages
router.get('/contacts', authAdmin, manageContactUsController.getAllContactUs);

// delete a contact us message
router.delete('/contacts/:id', authAdmin, manageContactUsController.deleteContactUsMessage);

module.exports = router;
