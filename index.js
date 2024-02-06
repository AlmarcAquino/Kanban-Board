// GLOBALS

//
// MODALS
//
// Get list of all button which open a modal
const openModalBtns = [...document.querySelectorAll('.open-modal-btn')];
const modalContainers = [...document.querySelectorAll('.modal-container')];

// Functions to open/close modal
const openModal = (modal) => {
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

// Open modal based on index of which button was clicked
// Modal and their corresponding 'open' and 'close' buttons --
// must be at the same index in their respective arrays
const toolbar = document.querySelector('.toolbar');
toolbar.addEventListener('click', (e) => {
  const modalIndex = openModalBtns.indexOf(e.target);
  if (openModalBtns.includes(e.target)) openModal(modalContainers[modalIndex]);
});
