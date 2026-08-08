import db from './db.js';



// Add a volunteer to a project
const addVolunteer = async (userId, projectId) => {
  return db.query(
    `INSERT INTO volunteers (user_id, project_id)
     VALUES ($1, $2)
     ON CONFLICT DO NOTHING`,
    [userId, projectId]
  );
};



// Remove a volunteer from a project
const removeVolunteer = async (userId, projectId) => {
  return db.query(
    `DELETE FROM volunteers
     WHERE user_id = $1 AND project_id = $2`,
    [userId, projectId]
  );
};

// Get all projects a user has volunteered for
const getUserVolunteers = async (userId) => {
  return db.query(
    `SELECT sp.*
     FROM service_projects sp
     JOIN volunteers v ON sp.project_id = v.project_id
     WHERE v.user_id = $1`,
    [userId]
  );
};

// Check if a user is volunteering for a specific project
const isUserVolunteering = async (userId, projectId) => {
  const result = await db.query(
    `SELECT 1
     FROM volunteers
     WHERE user_id = $1 AND project_id = $2`,
    [userId, projectId]
  );
  return result.rowCount > 0;
};

export { addVolunteer, removeVolunteer, getUserVolunteers, isUserVolunteering };
