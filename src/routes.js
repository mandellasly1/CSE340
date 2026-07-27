import express from 'express';

import { showHomePage } from './controllers/index.js';
import { showOrganizationsPage, showOrganizationDetailsPage, showNewOrganizationForm, processNewOrganizationForm, organizationValidation, showEditOrganizationForm, processEditOrganizationForm } from './controllers/organizations.js';
import { showProjectsPage, showProjectDetailsPage, showNewProjectForm, processNewProjectForm, projectValidation, showEditProjectForm, processEditProjectForm } from './controllers/projects.js';
import { showCategoriesPage, showCategoryDetailsPage, showAssignCategoriesForm, processAssignCategoriesForm } from './controllers/categories.js';
import { testErrorPage } from './controllers/errors.js';




const router = express.Router();

router.get('/', showHomePage);
router.get('/organizations', showOrganizationsPage);
router.get('/projects', showProjectsPage);
router.get('/categories', showCategoriesPage);


// Route for organization details page
router.get('/organization/:id', showOrganizationDetailsPage );

// Route for project details page
router.get('/project/:id', showProjectDetailsPage );

// Route for category details
router.get('/category/:id', showCategoryDetailsPage );

// Route for new organization page
router.get('/new-organization', showNewOrganizationForm );


// Route to display the edit organization form
router.get('/edit-organization/:id', showEditOrganizationForm );


// Route for new project page
router.get('/new-project', showNewProjectForm);


// Routes to handle the assign categories to project form
router.get('/project/:projectId/assign-categories', showAssignCategoriesForm);


// Routes for editing a project
router.get('/edit-project/:id', showEditProjectForm);


// error-handling routes
router.get('/test-error', testErrorPage);



// Route to handle new organization form submission
router.post('/new-organization', organizationValidation, processNewOrganizationForm);


// Route to handle the edit organization form submission
router.post('/edit-organization/:id', organizationValidation, processEditOrganizationForm);


// Route to handle new project form submission
router.post('/new-project', projectValidation, processNewProjectForm);


// Routes to handle the assign categories to project form
router.post('/project/:projectId/assign-categories', processAssignCategoriesForm);


// Routes for editing a project
router.post('/edit-project/:id', processEditProjectForm);




export default router;


