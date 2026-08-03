import bcrypt from 'bcrypt';
import { createUser, findUserByEmail, authenticateUser } from '../models/users.js'; // adjust your models

// Show registration form
const showUserRegistrationForm = (req, res) => {
    res.render('register', { title: 'Register' });
};

// Process registration
const processUserRegistrationForm = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // Hash the password before storing it
        const passwordHash = await bcrypt.hash(password, 10);

        // Create the user in the database (default role_id = 1 for normal user)
        await createUser(name, email, passwordHash, 1);

        req.flash('success', 'Registration successful! Please log in.');
        res.redirect('/login');
    } catch (error) {
        console.error('Error registering user:', error);
        req.flash('error', 'An error occurred during registration. Please try again.');
        res.redirect('/register');
    }
};

// Show login form
const showLoginForm = (req, res) => {
    res.render('login', { title: 'Login' });
};

// Process login
const processLoginForm = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find user by email (join with roles to get role_name)
        const user = await findUserByEmail(email);

        if (user && await bcrypt.compare(password, user.password_hash)) {
            // Store user info in session
            req.session.user = {
                user_id: user.user_id,
                name: user.name,
                email: user.email,
                role_name: user.role_name // comes from roles table
            };

            req.flash('success', 'Login successful!');
            res.redirect('/dashboard');
        } else {
            req.flash('error', 'Invalid email or password.');
            res.redirect('/login');
        }
    } catch (error) {
        console.error('Error during login:', error);
        req.flash('error', 'An error occurred during login. Please try again.');
        res.redirect('/login');
    }
};

// Logout
const processLogout = (req, res) => {
    req.flash('success', 'Logout successful!');
    req.session.destroy(err => {
        if (err) console.error('Error destroying session:', err);
        res.redirect('/login');
    });
};

// Require login middleware
const requireLogin = (req, res, next) => {
    if (!req.session || !req.session.user) {
        req.flash('error', 'You must be logged in to access that page.');
        return res.redirect('/login');
    }
    next();
};

// Dashboard
const showDashboard = (req, res) => {
    const user = req.session.user;
    res.render('dashboard', { 
        title: 'Dashboard',
        name: user.name,
        email: user.email
    });
};

// Require specific role middleware
const requireRole = (role) => {
    return (req, res, next) => {
        if (!req.session || !req.session.user) {
            req.flash('error', 'You must be logged in to access this page.');
            return res.redirect('/login');
        }

        if (req.session.user.role_name !== role) {
            req.flash('error', 'You do not have permission to access this page.');
            return res.redirect('/');
        }

        next();
    };
};

export { 
    showUserRegistrationForm, 
    processUserRegistrationForm, 
    showLoginForm, 
    processLoginForm, 
    requireLogin, 
    processLogout, 
    showDashboard, 
    requireRole 
};
