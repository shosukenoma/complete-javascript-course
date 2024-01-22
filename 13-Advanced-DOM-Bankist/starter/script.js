'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

// for (let i = 0; i < btnsOpenModal.length; i++)
//   btnsOpenModal[i].addEventListener('click', openModal);
const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

////////////////////////////////////
////////////////////////////////////
////////////////////////////////////

// Selects the whole HTML document (<head><body>etc.)
console.log(document.documentElement);
console.log(document.head);
console.log(document.body);

const header = document.querySelector('.header');
const allSections = document.querySelectorAll('.section');
console.log(allSections);

document.getElementById('section--1');

// This gets all elements with a certain <tagName>
// This method returns an HTLMCollection
// - A "Live" Collection that gets updated automatically by insert/delete of tags
// - NodeList doesn't get updated so keeps the original state.
const allButtons = document.getElementsByTagName('button');
console.log(allButtons);

console.log(document.getElementsByClassName('btn'));

// Creating and Inserting Elements
// .insertAdjacentHTML

const message = document.createElement('div');
message.classList.add('cookie-message');
// message.textContent = 'We use cookies for improved functionality and analytics';
message.innerHTML =
  'We use cookies for improved functionality and analytics. <button class="btn btn--close-cookie">Got it!</button>';
// header.prepend(message); // Inserts as a child of the header element
header.append(message); // Inserts after the header element
// These can only be implemented one at a time.

// In order to use one element in two places, we use
// message.cloneNode(true) //true -> All child elements will be copied as well.

// header.before(message) // Insert as the sibling of header
// header.after(message)

// Delete elements
document
  .querySelector('.btn--close-cookie')
  .addEventListener('click', function () {
    message.remove();
  });

// Styles
message.style.backgroundColor = '#37383d';
message.style.width = '120%';

console.log(message.style.height); // Empty, because it's not an inline style.
console.log(message.style.width); // '120%'

// This is how to load the CSS style.
console.log(getComputedStyle(message).height); // Empty, because it's not an inline style.

message.style.height =
  Number.parseFloat(getComputedStyle(message).height, 10) + 30 + 'px';

// Manipulating CSS Custom Properties
document.documentElement.style.setProperty('--color-primary', 'orangered');

// Attributes
const logo = document.querySelector('.nav__logo');
console.log(logo.alt);
console.log(logo.src);
// Setting attributes
logo.alt = 'Beautiful minimalist logo';

// Retrieving non-standard attributes (e.g. 'designer' attribute in an <img> tag)
console.log(logo.getAttribute('designer'));
logo.setAttribute('company', 'Bankist');

console.log(logo.src); // Absolute Path
console.log(logo.getAttribute('src')); // Relative Path

const link = document.querySelector('.nav__link--btn');
console.log(link.href);
console.log(link.getAttribute('href'));

// Data attributes
// Always stored in the "dataset" object
console.log(logo.dataset.versionNumber);

// // Classes
// logo.classList.add();
// logo.classList.remove();
// logo.classList.toggle();
// logo.classList.contains(); // NOT .includes

// // DONT USE! Overwrites everything and only allows one class.
// logo.className = 'Jonas'

const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

btnScrollTo.addEventListener('click', function (e) {
  // Retrieve the coordinates of section--1
  const s1coords = section1.getBoundingClientRect();
  console.log(s1coords);
  // The values are RELATIVE to the VIEWPORT

  // Scroll Positions
  console.log('Current scroll (X/Y): ', window.scrollX, window.scrollY);

  // Viewport Height and Width
  console.log(
    'Viewport height/width: ',
    document.documentElement.clientHeight,
    document.documentElement.clientWidth
  );

  // Scrolling
  // window.scrollTo(
  //   window.scrollX + s1coords.left,
  //   window.scrollY + s1coords.top
  // );
  // s1coords.top will only retrieve the value between the viewport top edge and the element,
  // so we have to add the current scroll position to make it jump to the same place every time.

  // window.scrollTo({
  //   left: window.scrollX + s1coords.left,
  //   top: window.scrollY + s1coords.top,
  //   behavior: 'smooth',
  // });

  // Only available in latest browsers
  section1.scrollIntoView({ behavior: 'smooth' });
});

const alertH1 = function (e) {
  console.log('Mouse Entered!');
};

// We can stack event listeners by add..., add..., add...
const h1 = document.querySelector('h1');
h1.addEventListener('mouseenter', alertH1);

// Outdated
h1.onmouseenter = function (e) {
  console.log('Mouse Entered!');
};

// Removing an event handler
// This line has to be inside some event handler / callback function (cannot be on global scope)
setTimeout(() => h1.removeEventListener('mouseenter', alertH1), 3000);
