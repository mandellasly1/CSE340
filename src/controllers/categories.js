// Import any needed model functions
import { getAllCategories, getCategoryById, getProjectsByCategoryId, getCategoriesByProjectId, updateCategoryAssignments } from '../models/categories.js';
import { getProjectDetails } from '../models/projects.js';

// Controller for categories list page
const showCategoriesPage = async (req, res) => {
  try {
    const categories = await getAllCategories();
    const title = 'Service Categories';
    res.render('categories', { title, categories });
  } catch (err) {
    console.error("Error loading categories:", err);
    res.status(500).render("500", { message: "Server error" });
  }
};



// Controller for category details page
const showCategoryDetailsPage = async (req, res) => {
  try {
    const categoryId = req.params.id;
    const category = await getCategoryById(categoryId);
    const projects = await getProjectsByCategoryId(categoryId);

    if (!category) {
      return res.status(404).render("404", { message: "Category not found" });
    }

    const title = `Category: ${category.category_name}`;
    res.render('category', { title, category, projects });
  } catch (err) {
    console.error("Error loading category details:", err);
    res.status(500).render("500", { message: "Server error" });
  }
};


const showAssignCategoriesForm = async (req, res) => {
    const projectId = req.params.projectId;

    const projectDetails = await getProjectDetails(projectId);
    const categories = await getAllCategories();
    const assignedCategories = await getCategoriesByServiceProjectId(projectId);

    const title = 'Assign Categories to Project';

    res.render('assign-categories', { title, projectId, projectDetails, categories, assignedCategories });
};

const processAssignCategoriesForm = async (req, res) => {
    const projectId = req.params.projectId;
    const selectedCategoryIds = req.body.categoryIds || [];
    
    // Ensure selectedCategoryIds is an array
    const categoryIdsArray = Array.isArray(selectedCategoryIds) ? selectedCategoryIds : [selectedCategoryIds];
    await updateCategoryAssignments(projectId, categoryIdsArray);
    req.flash('success', 'Categories updated successfully.');
    res.redirect(`/project/${projectId}`);
};




// Export any controller functions
export { showCategoriesPage, showCategoryDetailsPage, showAssignCategoriesForm, processAssignCategoriesForm };