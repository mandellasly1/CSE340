// Authentication.js

// Middleware to check if user is logged in
export function isAuthenticated(req, res, next) {
  if (req.session && req.session.user) {
    return next();
  }
  req.flash('error', 'You must be logged in to view this page.');
  res.redirect('/login');
}

// Middleware to check if user is admin
export function isAdmin(req, res, next) {
  if (req.session && req.session.user && req.session.user.role_name === 'admin') {
    return next();
  }
  req.flash('error', 'You do not have permission to view this page.');
  res.redirect('/');
}


// Authentication.js

// Prevent logged-in users from accessing login/register
export function redirectIfLoggedIn(req, res, next) {
  if (req.session && req.session.user) {
    req.flash('info', 'You are already logged in.');
    return res.redirect('/');
  }
  next();
}
