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




export { getAllCategories, getCategoryById, getCategoriesByProjectId, getProjectsByCategoryId };

