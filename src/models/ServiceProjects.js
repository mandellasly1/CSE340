import db from './db.js';

// Get a single project by ID
const getProjectById = async (projectId) => {
  const result = await db.query(
    `SELECT * FROM service_projects WHERE project_id = $1`,
    [projectId]
  );
  return result.rows[0];
};

// Get all projects
const getAllProjects = async () => {
  const result = await db.query(`SELECT * FROM service_projects`);
  return result.rows;
};

export { getProjectById, getAllProjects };
