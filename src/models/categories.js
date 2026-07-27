import db from './db.js';

const getAllCategories = async () => {
  const query = `
    SELECT category_id, category_name, description
    FROM public.categories
    ORDER BY category_id;
  `;

  const result = await db.query(query);

  return result.rows;
};


// Helper: assign one category to a project
const assignCategoryToProject = async (categoryId, projectId) => {
  const query = `
    INSERT INTO project_category (category_id, project_id)
    VALUES ($1, $2);
  `;
  await db.query(query, [categoryId, projectId]);
};


// Update all category assignments for a project
const updateCategoryAssignments = async (projectId, categoryIds) => {
  // Remove existing assignments
  const deleteQuery = `
    DELETE FROM project_category
    WHERE project_id = $1;
  `;
  await db.query(deleteQuery, [projectId]);

  // Add new assignments
  for (const categoryId of categoryIds) {
    await assignCategoryToProject(categoryId, projectId);
  }
};


// Get a single category by ID
const getCategoryById = async (categoryId) => {
  const query = `
    SELECT category_id, category_name, description
    FROM public.categories
    WHERE category_id = $1;
  `;
  const result = await db.query(query, [categoryId]);
  return result.rows[0];
};


// Get all categories for a given project
const getCategoriesByProjectId = async (projectId) => {
  const query = `
    SELECT c.category_id, c.category_name, c.description
    FROM public.project_categories pc
    JOIN public.categories c ON pc.category_id = c.category_id
    WHERE pc.project_id = $1;
  `;
  const result = await db.query(query, [projectId]);
  return result.rows;
};



// Get all projects for a given category
const getProjectsByCategoryId = async (categoryId) => {
  const query = `
    SELECT p.project_id, p.title, p.description, p.project_date, p.location, o.name AS organization_name
    FROM public.service_projects p
    JOIN public.organization o ON p.organization_id = o.organization_id
    JOIN public.project_categories pc ON p.project_id = pc.project_id
    WHERE pc.category_id = $1
    ORDER BY p.project_date ASC;
  `;
  const result = await db.query(query, [categoryId]);
  return result.rows;
};


const insertCategory = async (name) => {
  if (!name || name.length > 100) {
    throw new Error('Category name must be present and less than 100 characters.');
  }

  const query = `
    INSERT INTO categories (category_name)
    VALUES ($1)
    RETURNING category_id;
  `;
  const result = await db.query(query, [name]);

  return result.rows[0].category_id;
};

const updateCategory = async (id, name) => {
  if (!name || name.length < 3 || name.length > 100) {
    throw new Error('Category name must be between 3 and 100 characters.');
  }

  const query = `
    UPDATE categories
    SET category_name = $1
    WHERE category_id = $2
    RETURNING category_id;
  `;
  const result = await db.query(query, [name, id]);

  if (result.rows.length === 0) {
    throw new Error('Failed to update category.');
  }

  return result.rows[0].category_id;
};




export { getAllCategories, getCategoryById, getCategoriesByProjectId, getProjectsByCategoryId, updateCategoryAssignments, insertCategory, updateCategory };

