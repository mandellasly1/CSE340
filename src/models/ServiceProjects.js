import db from './db.js';

// Get a single project by ID
export async function getProjectById(projectId) {
  const result = await db.query(
    `SELECT * FROM service_projects WHERE project_id = $1`,
    [projectId]
  );
  return result.rows[0];
}


// Get all projects
export async function getAllProjects() {
  const result = await db.query(`SELECT * FROM service_projects`);
  return result.rows;
}


