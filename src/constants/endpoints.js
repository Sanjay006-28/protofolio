const base = import.meta.env.BASE_URL;

const endpoints = {
  navbar: `${base}profile/navbar.json`,
  routes: `${base}profile/routes.json`,
  home: `${base}profile/home.json`,
  social: `${base}profile/social.json`,
  about: `${base}profile/about.json`,
  skills: `${base}profile/skills.json`,
  education: `${base}profile/education.json`,
  experiences: `${base}profile/experiences.json`,
  projects: `${base}profile/projects.json`,
  achievements: `${base}profile/achievements.json`,
};

export default endpoints;
