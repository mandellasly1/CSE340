-- Organization Table

CREATE TABLE organization (
    organization_id SERIAL PRIMARY KEY,
	name VARCHAR (150) NOT NULL,
	description TEXT NOT NULL,
	contact_email VARCHAR (255) NOT NULL,
	logo_filename VARCHAR (255) NOT NULL
);


-- Insert sample data: Organizations

INSERT INTO organization (name, description, contact_email, logo_filename)
VALUES
('BrightFuture Builders', 'A nonprofit focused on improving community infrastructure through sustainable construction projects.', 'info@brightfuturebuilders.org', 'brightfuture-logo.png'),
('GreenHarvest Growers', 'An urban farming collective promoting food sustainability and education in local neighborhoods.', 'contact@greenharvest.org', 'greenharvest-logo.png'),
('UnityServe Volunteers', 'A volunteer coordination group supporting local charities and service initiatives.', 'hello@unityserve.org', 'unityserve-logo.png');



-- Service projects

CREATE TABLE service_projects (
    project_id SERIAL PRIMARY KEY,
    organization_id INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    location VARCHAR(255),
    project_date DATE NOT NULL,
    CONSTRAINT fk_organization
      FOREIGN KEY (organization_id)
      REFERENCES organization(organization_id)
      ON DELETE CASCADE
);


-- BrightFuture Builders projects

INSERT INTO service_projects (organization_id, title, description, location, project_date)
VALUES
(1, 'Park Cleanup', 'Join us to clean up local parks and make them beautiful!', 'Central Park', '2026-07-20'),
(1, 'Bridge Repair', 'Fixing damaged pedestrian bridges in the community.', 'Riverbend', '2026-08-02'),
(1, 'Playground Build', 'Constructing a safe playground for children.', 'Sunrise Estate', '2026-08-15'),
(1, 'Community Garden Setup', 'Building raised beds for local food production.', 'Westside', '2026-08-25'),
(1, 'School Renovation', 'Repairing classrooms and painting walls.', 'BrightFuture Academy', '2026-09-05');



-- GreenHarvest Growers projects

INSERT INTO service_projects (organization_id, title, description, location, project_date)
VALUES
(2, 'Food Drive', 'Help collect and distribute food to those in need.', 'Community Center', '2026-07-25'),
(2, 'Urban Farm Tour', 'Educating residents about sustainable farming.', 'GreenHarvest Farm', '2026-08-03'),
(2, 'Seed Distribution', 'Providing seeds to families for home gardens.', 'Town Square', '2026-08-12'),
(2, 'Composting Workshop', 'Teaching composting techniques for waste reduction.', 'Community Hall', '2026-08-22'),
(2, 'Farmers Market', 'Organizing a local produce market.', 'Main Street', '2026-09-01');



-- UnityServe Volunteers projects

INSERT INTO service_projects (organization_id, title, description, location, project_date)
VALUES
(3, 'Community Tutoring', 'Volunteer to tutor students in various subjects.', 'Library Hall', '2026-07-30'),
(3, 'Blood Donation Drive', 'Coordinating volunteers for blood donations.', 'City Hospital', '2026-08-06'),
(3, 'Charity Run', 'Organizing a 5K run to raise funds.', 'Unity Park', '2026-08-14'),
(3, 'Senior Care Visit', 'Visiting elderly residents to provide support.', 'Sunset Home', '2026-08-24'),
(3, 'Clothing Collection', 'Gathering clothes for families in need.', 'Community Center', '2026-09-02');


