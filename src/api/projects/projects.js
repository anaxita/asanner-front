import axios from 'axios';

import { addAccessTokenToHeaders, isAccessTokenExpired } from '../login';

const API_URL = 'http://localhost:8088';

const projectSelect = document.querySelector('.project-select');

export const fetchProjects = async () => {
  if (isAccessTokenExpired()) {
    return;
  }

  try {
    addAccessTokenToHeaders();

    const projects = await axios.post(`${import.meta.env.VITE_API_URL}/projects`);

    console.log('projects: ', projects);

    projects.data.map((project) => {
      const option = document.createElement('option');

      option.text = project.name;
      option.value = project.gid;
      option.classList.add('project-select__option');

      if (projectSelect) {
        projectSelect.appendChild(option);
      }
    });
  } catch (error) {
    console.error(error);
  }
};

const fetchProject = async (gid) => {
  if (isAccessTokenExpired()) {
    return;
  }

  try {
    addAccessTokenToHeaders();

    const project = await axios.get(`${import.meta.env.VITE_API_URL}/project?project_id=${gid}`);

    console.log('project: ', project.data);
  } catch (error) {
    console.error(error);
  }
};

export default () => {
  if (projectSelect) {
    // document.addEventListener('DOMContentLoaded', ())
    fetchProjects();
  }

  if (projectSelect) {
    projectSelect.addEventListener('change', (e) => {
      fetchProject(e.target.value);
    });
  }
};
