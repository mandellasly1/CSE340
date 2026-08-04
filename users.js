// users.js (in project root)
import express from 'express';
import { requireRole, showAllUsers } from './src/controllers/users.js';

const router = express.Router();

// Only admins can access this page
router.get('/users', requireRole('admin'), showAllUsers);

export default router;
