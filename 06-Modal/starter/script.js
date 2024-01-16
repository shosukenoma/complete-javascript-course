'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.close-modal');
const btnsOpenModal = document.querySelectorAll('.show-modal');

console.log(btnsOpenModal);

const showModal = function () {
  console.log('Button clicked!');
  // Manually remove class attributes.
  // !! NO DOT in the beginning !!
  overlay.classList.remove('hidden');
  modal.classList.remove('hidden');
};

const closeModal = function () {
  overlay.classList.add('hidden');
  modal.classList.add('hidden');
};

btnsOpenModal.forEach(btn => {
  btn.addEventListener('click', showModal);
});

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

// Esc Key Press Event
document.addEventListener('keydown', function (e) {
  // console.log(e);
  if (!modal.classList.contains('hidden') && e.key === 'Escape') {
    closeModal();
    console.log('The esc key was pressed.');
  }
});
