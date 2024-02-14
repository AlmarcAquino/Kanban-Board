// TODO:
//    open modal based on modal btn clicked
//    Add ability to create new tasks
//
// GLOBALS
//

//
// MODALS
//
// Get list of all button which open a modal
const openModalBtns = [...document.querySelectorAll('[data-modal-open]')];
const modalContainers = [
  ...document.querySelectorAll('[data-modal-container]'),
];

// Functions to open/close modal
const openModal = (modalName) => {
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
};

const closeModal = (modal) => {
  modal.classList.remove('modal-displayed');
};

// Open modal based on which type of open-button was clicked
openModalBtns.forEach((btn) => {
  btn.addEventListener('click', (e) => {
    const clickedBtn = e.target;
    determineModal(clickedBtn);
  });
});

// Determine which modal to open based on data attribute of button
const determineModal = (btn) => {
  const modalName = btn.dataset.modalOpen;
  openModal(modalName);
};
