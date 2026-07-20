// Import any needed model functions
import { getUpcomingProjects, getProjectDetails } from '../models/projects.js';
import { getCategoriesByProjectId } from '../models/categories.js';

// Constant for how many projects to show
const NUMBER_OF_UPCOMING_PROJECTS = 5;



// Controller for upcoming projects page
const showProjectsPage = async (req, res) => {
    const projects = await getUpcomingProjects(NUMBER_OF_UPCOMING_PROJECTS);
    const title = 'Upcoming Service Projects';

    res.render('projects', { title, projects });
};



// Controller for project details page
const showProjectDetailsPage = async (req, res) => {
  try {
    const projectId = req.params.id;
    const project = await getProjectDetails(projectId);
    const categories = await getCategoriesByProjectId(projectId);

    if (!project) {
      return res.status(404).render('404', { message: 'Project not found' });
    }

    const title = 'Service Project Details';
    res.render('project', { title, project, categories });
  } catch (err) {
    console.error('Error loading project details:', err);
    res.status(500).render('500', { message: 'Server error' });
  }
};


// Export controllers
export { showProjectsPage, showProjectDetailsPage };
