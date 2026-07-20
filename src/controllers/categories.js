// Import any needed model functions
import { getAllCategories, getCategoryById, getProjectsByCategoryId } from '../models/categories.js';


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




// Export any controller functions
export { showCategoriesPage, showCategoryDetailsPage };