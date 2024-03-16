import { closeModal } from './board.js';

const projectsContainer = document.querySelector('.projects__wrapper');
const projectModal = document.querySelector('.project__modal-container');
let addProjectBtn = document.querySelector('.project__modal-open');

//
//  PROJECTS BOARD
//
projectsContainer.addEventListener('click', (e) => {
  if (e.target.classList.contains('project__tile-container')) {
    // TODO: open a board with the selected project's tasks
    console.log(e.target);
  } else if (e.target.classList.contains('project__modal-open')) {
    addProjectBtn = projectsContainer.removeChild(addProjectBtn);
    console.log(addProjectBtn);
  }
});

//
//  NEW PROJECT FORM
//
const projectForm = document.querySelector('#project__form');
const projectTitleInput = document.querySelector('#project__form-title');
projectForm.addEventListener('submit', (e) => {
  e.preventDefault();
  // TODO: update project list in storage when user creates new project
  const projectList = [
    ...document.querySelectorAll('.project__tile-container'),
  ];
  const projectTitle = projectTitleInput.value;
  const newProject = `
  <div class="project__tile-container">
    <h2 class="project__name">${projectTitle}</h2>
    <div class="project__description-container">
      <p class="project__description-todo">To-Do</p>
      <p class="project__description-doing">In Progress</p>
      <p class="project__description-done">Done</p>
    </div>
  </div>`;

  projectsContainer.insertAdjacentHTML('beforeend', newProject);

  closeModal(projectModal, e);
  projectsContainer.insertAdjacentElement('beforeend', addProjectBtn);
});
