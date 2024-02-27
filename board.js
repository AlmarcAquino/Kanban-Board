export { updateTaskList as updateTasks };
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
      const isAddedFromModal = true;
      addTaskToColumn(inputs, modalInfo.targetColumnName, isAddedFromModal);
      closeModal(modal);
    }
    updateTaskList();
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
const addTaskToColumn = (inputs, columnName, isAddedFromModal) => {
  const column = document.querySelector(`.${columnName}-column`);
  const taskTitle = inputs[0].value || inputs[0];
  const taskDescription = inputs[1].value || inputs[1];
  const newTask = `
  <div class="task" draggable="true">
    <h3 class="task-title">${taskTitle}</h3>
    <p class="task-description">${taskDescription}</p>
    <button class="delete-task-btn" onclick="deleteTask(this.parentNode)">DELETE</button>
  </div>`;
  // console.log(typeof taskDescription);

  // Append task to the bottom of the list if added from modal
  // Append task to the top of the column if initializing page
  if (isAddedFromModal) {
    clearFormInputs(inputs);
    column.insertAdjacentHTML('afterbegin', newTask);
  } else {
    column.insertAdjacentHTML('beforeend', newTask);
  }
};

// Reset form inputs
const clearFormInputs = (inputs) => {
  inputs.forEach((input) => {
    input.value = '';
  });
};

//
// LOCAL STORAGE
//
let taskArr = [];
const updateTaskList = () => {
  taskArr = [];
  const currentTasks = document.querySelectorAll('.task');
  currentTasks.forEach((task) => {
    let taskObj = {};
    taskObj.taskColumn = task.closest('.task-column').dataset.columnName;
    taskObj.taskTitle = task.querySelector('.task-title').innerText;
    taskObj.taskDescription = task.querySelector('.task-description').innerText;
    taskArr.push(taskObj);
  });
  console.log(taskArr);
  storeTaskList(taskArr);
};

// Update local storage with current task list
const storeTaskList = (taskList) => {
  const serializedTaskList = JSON.stringify(taskList);
  localStorage.setItem('taskList', serializedTaskList);
  console.log(localStorage.getItem('taskList'));
};

// TODO: fix error that occurs when calling this
// may be due to input type
const displayTaskList = () => {
  const taskList = JSON.parse(localStorage.getItem('taskList'));
  taskList.forEach((task) => {
    const { taskTitle, taskDescription, taskColumn } = task;
    const taskInfo = [taskTitle, taskDescription];
    const taskName = taskColumn;
    const isAddedFromModal = false;
    addTaskToColumn(taskInfo, taskName, isAddedFromModal);
  });
};

window.onload = () => {
  displayTaskList();
};
// updateTaskList();

//
//  TASKS
//
