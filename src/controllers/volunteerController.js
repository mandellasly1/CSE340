import { addVolunteer, removeVolunteer } from '../models/volunteer.js';

// Volunteer for a project
export async function volunteer(req, res) {
  try {
    await addVolunteer(req.session.user.user_id, req.params.id);
    req.flash('success', 'You are now volunteering for this project.');
    res.redirect(`/project/${req.params.id}`);
  } catch (err) {
    console.error('Error volunteering:', err);
    req.flash('error', 'There was a problem volunteering for this project.');
    res.redirect(`/project/${req.params.id}`);
  }
}

// Remove volunteer from a project
export async function unvolunteer(req, res) {
  try {
    await removeVolunteer(req.session.user.user_id, req.params.id);
    req.flash('success', 'You have removed yourself as a volunteer.');
    res.redirect(`/project/${req.params.id}`);
  } catch (err) {
    console.error('Error removing volunteer:', err);
    req.flash('error', 'There was a problem removing you from this project.');
    res.redirect(`/project/${req.params.id}`);
  }
}
