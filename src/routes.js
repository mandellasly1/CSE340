import express from 'express';

import { showHomePage } from './controllers/index.js';
import { showOrganizationsPage, showOrganizationDetailsPage, processNewOrganizationForm, organizationValidation, showEditOrganizationForm, processEditOrganizationForm, newOrganizationPage } from './controllers/organizations.js';
import { showProjectsPage, showProjectDetailsPage, showNewProjectForm, processNewProjectForm, projectValidation, showEditProjectForm, processEditProjectForm } from './controllers/projects.js';
import { showCategoriesPage, showCategoryDetailsPage, showAssignCategoriesForm, processAssignCategoriesForm, showNewCategoryForm, processNewCategoryForm, showEditCategoryForm, processEditCategoryForm } from './controllers/categories.js';
import { testErrorPage } from './controllers/errors.js';
import { showUserRegistrationForm, processUserRegistrationForm, showLoginForm, processLoginForm, processLogout, requireLogin, showDashboard, requireRole, } from './controllers/users.js';
import { isAuthenticated, isAdmin, redirectIfLoggedIn } from '../Authentication.js';

const router = express.Router();

// Public routes
router.get('/', showHomePage);
router.get('/organizations', showOrganizationsPage);
router.get('/projects', showProjectsPage);
router.get('/categories', showCategoriesPage);

// Details pages
router.get('/organization/:id', showOrganizationDetailsPage);
router.get('/project/:id', showProjectDetailsPage);
router.get('/category/:id', showCategoryDetailsPage);

// User registration & login
router.get('/register', showUserRegistrationForm);
router.post('/register', processUserRegistrationForm);

router.get('/login', showLoginForm);
router.post('/login', processLoginForm);

router.get('/logout', processLogout);

// Protected dashboard
router.get('/dashboard', requireLogin, showDashboard);


router.get('/login', redirectIfLoggedIn, (req, res) => {
  res.render('login', { title: 'Login' });
});

router.get('/register', redirectIfLoggedIn, (req, res) => {
  res.render('register', { title: 'Register' });
});







// Admin-only routes

// Organizations
router.get('/new-organization', requireRole('admin'), newOrganizationPage);
router.post('/new-organization', requireRole('admin'), organizationValidation, processNewOrganizationForm);

router.get('/edit-organization/:id', requireRole('admin'), showEditOrganizationForm);
router.post('/edit-organization/:id', requireRole('admin'), organizationValidation, processEditOrganizationForm);

// Projects
router.get('/new-project', requireRole('admin'), showNewProjectForm);
router.post('/new-project', requireRole('admin'), projectValidation, processNewProjectForm);

router.get('/edit-project/:id', requireRole('admin'), showEditProjectForm);
router.post('/edit-project/:id', requireRole('admin'), processEditProjectForm);

// Categories
router.get('/new-category', requireRole('admin'), showNewCategoryForm);
router.post('/new-category', requireRole('admin'), processNewCategoryForm);

router.get('/edit-category/:id', requireRole('admin'), showEditCategoryForm);
router.post('/edit-category/:id', requireRole('admin'), processEditCategoryForm);

// Assign categories to projects
router.get('/project/:projectId/assign-categories', requireRole('admin'), showAssignCategoriesForm);
router.post('/project/:projectId/assign-categories', requireRole('admin'), processAssignCategoriesForm);



router.get('/projects', isAuthenticated, (req, res) => {
  res.render('projects', { title: 'Projects' });
});

router.get('/categories', isAuthenticated, (req, res) => {
  res.render('categories', { title: 'Categories' });
});

router.get('/users', isAdmin, (req, res) => {
  res.render('users', { title: 'Manage Users' });
});





// Error handling
router.get('/test-error', testErrorPage);






export default router;
