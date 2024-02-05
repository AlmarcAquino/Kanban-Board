// GLOBALS

//
// MODALS
//
const openModal = (modal) => {
  modal.classList.add('modal-displayed');
};
const closeModal = (modal) => {
  modal.classList.remove('modal-displayed');
};

//
// NEW TASK MODAL
//
const addTaskBtn = document.querySelector('.new-task__modal-open');
const closeTaskModalBtn = document.querySelector('.new-task__modal-close');
const newTaskModal = document.querySelector('.new-task__modal-container');

// Open modal when add button is clicked
addTaskBtn.addEventListener('click', () => openModal(newTaskModal));

// Close modal when close button is clicked
closeTaskModalBtn.addEventListener('click', () => closeModal(newTaskModal));

// Close modal when user clicks outside of modal
newTaskModal.addEventListener('click', (e) => {
  if (e.target === newTaskModal) {
    closeModal(newTaskModal);
  }
});

//
// POMODORO MODAL
//
const addPomoBtn = document.querySelector('.pomo__modal-open');
const closePomoBtn = document.querySelector('.pomo__modal-close');
const pomoModal = document.querySelector('.pomo__modal-container');
// Open modal when add button is clicked
addPomoBtn.addEventListener('click', () => openModal(pomoModal));

// Close modal when close button is clicked
closePomoBtn.addEventListener('click', () => closeModal(pomoModal));

// Close modal when user clicks outside of modal
pomoModal.addEventListener('click', (e) => {
  if (e.target === pomoModal) {
    closeModal(pomoModal);
  }
});

//
//
//  REFACTOR TO HAVE TOOLBAR EVENT LISTENER TO OPEN EACH MODAL
//
//
