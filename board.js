//
// GLOBALS
//

//
// MODALS
//
// Get list of all buttons which open a modal
const openModalBtns = document.querySelectorAll('[data-modal-open]');
// Get list of all modal containers
const modalContainers = document.querySelectorAll('[data-modal-container]');
// Get list of all task columns
const taskColumnContainers = [...document.querySelectorAll('.task-column')];

// Functions to open/close modal and handle form submissions
const manageModal = (modalName, targetColumn) => {
  let modal = null;
  modalContainers.forEach((container) => {
    if (container.dataset.modalContainer === modalName) modal = container;
  });
  modal.classList.add('modal-displayed');

  // Close modal if user clicks outside of modal or clicks exit button
  modal.addEventListener('click', (e) => {
    if (e.target === modal || e.target.classList.contains('close-modal-btn')) {
      closeModal(modal);
    }
  });

  // When the form is submitted:
  // Clear the form's inputs, close the modal
  // If a task modal was submitted, add the task to the column
  const modalForm = modal.querySelector('form');
  const formName = modalForm.dataset.formName;
  const inputs = modalForm.querySelectorAll('input');
  modalForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if (formName === 'task') addTaskToColumn(inputs, targetColumn);
    clearFormInputs(inputs);
    closeModal(modal);
  });
};

const closeModal = (modal) => {
  modal.classList.remove('modal-displayed');
};

// Open modal based on which type of open-button was clicked
openModalBtns.forEach((btn) => {
  btn.addEventListener('click', (e) => {
    const clickedBtn = e.target;
    const targetColumn = clickedBtn.closest('.task-column');
    determineModal(clickedBtn, targetColumn);
  });
});

// Determine which modal to open based on data attribute of button
const determineModal = (btn, targetColumn) => {
  const modalName = btn.dataset.modalOpen;
  manageModal(modalName, targetColumn);
};

const clearFormInputs = (inputs) => {
  inputs.forEach((input) => {
    input.value = '';
  });
};

// TODO:
// Add new task with user inputs
const addTaskToColumn = (inputs, column) => {
  console.log('NOW ADD THE TASK');
};
