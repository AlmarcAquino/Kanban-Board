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
const manageModal = (modalInfo) => {
  let modal = null;
  modalContainers.forEach((container) => {
    if (container.dataset.modalContainer === modalInfo.modalName)
      modal = container;
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
  const handleFormSubmission = (e) => {
    e.preventDefault();
    if (formName === 'task') {
      addTaskToColumn(inputs, modalInfo.targetColumnName);
      closeModal(modal);
    }
    modalForm.removeEventListener('submit', handleFormSubmission);
  };

  modalForm.addEventListener('submit', handleFormSubmission);
};

// Hide modal
const closeModal = (modal) => {
  modal.classList.remove('modal-displayed');
};

// Open modal based on which type of open-button was clicked
openModalBtns.forEach((btn) => {
  btn.addEventListener('click', (e) => {
    const clickedBtn = e.target;
    getModalInformation(clickedBtn);
  });
});

// Determine which modal, form, and task-column (if applicable) to open
const getModalInformation = (btn) => {
  let modalInfo = {
    modalName: btn.dataset.modalOpen,
    targetColumnName: determineTargetColumn(btn),
  };
  manageModal(modalInfo);
};

//
// FORMS
//
// Get the name of the target column based on button clicked
const determineTargetColumn = (btn) => {
  let targetColumnName = null;
  taskColumnContainers.forEach((column) => {
    if (column.dataset.columnName === btn.dataset.targetColumn) {
      targetColumnName = column.dataset.columnName;
    }
  });
  return targetColumnName;
};

// Add new task with user inputs
const addTaskToColumn = (inputs, columnName) => {
  const column = document.querySelector(`.${columnName}-column`);
  const taskTitle = inputs[0].value;
  const taskDescription = inputs[1].value;
  const newTask = `
  <div class="task" draggable="true">
    <h3 class="task-title">${taskTitle}</h3>
    <p class="task-description">${taskDescription}</p>
  </div>`;

  column.insertAdjacentHTML('afterbegin', newTask);
  clearFormInputs(inputs);
};

// Reset form inputs
const clearFormInputs = (inputs) => {
  inputs.forEach((input) => {
    input.value = '';
  });
};
