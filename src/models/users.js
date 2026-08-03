import db from './db.js';
import bcrypt from 'bcrypt';

/**
 * Create a new user with default role = 'user'
 */
const createUser = async (name, email, passwordHash, roleId = null) => {
    // If no roleId is passed, default to 'user'
    const query = `
        INSERT INTO users (name, email, password_hash, role_id, created_at) 
        VALUES ($1, $2, $3, COALESCE($4, (SELECT role_id FROM roles WHERE role_name = 'user')), NOW()) 
        RETURNING user_id
    `;
    const queryParams = [name, email, passwordHash, roleId];
    
    const result = await db.query(query, queryParams);

    if (result.rows.length === 0) {
        throw new Error('Failed to create user');
    }

    if (process.env.ENABLE_SQL_LOGGING === 'true') {
        console.log('Created new user with ID:', result.rows[0].user_id);
    }

    return result.rows[0].user_id;
};

/**
 * Find user by email and include role_name
 */
const findUserByEmail = async (email) => {
    const query = `
        SELECT u.user_id, u.name, u.email, u.password_hash, u.role_id, r.role_name
        FROM users u
        JOIN roles r ON u.role_id = r.role_id
        WHERE u.email = $1
    `;
    const result = await db.query(query, [email]);

    if (result.rows.length === 0) {
        return null; // User not found
    }
    
    return result.rows[0];
};

/**
 * Verify password using bcrypt
 */
const verifyPassword = async (password, passwordHash) => {
    return bcrypt.compare(password, passwordHash);
};

/**
 * Authenticate user by email + password
 */
const authenticateUser = async (email, password) => {
    const user = await findUserByEmail(email);
    if (!user) return null;

    const isValid = await verifyPassword(password, user.password_hash);
    if (!isValid) return null;

    // Remove password hash before returning
    delete user.password_hash;
    return user;
};

export { createUser, findUserByEmail, authenticateUser };
