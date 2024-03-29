'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');
const nav = document.querySelector('.nav');

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

// Smooth scrolling
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

////////////////////////////////////
// Page Navigation

// document.querySelectorAll('.nav__link').forEach(function (el) {
//   el.addEventListener('click', function (e) {
//     e.preventDefault(); // Prevent jumping to href #section--1, etc.
//     const id = this.getAttribute('href'); // We can use the href path to specify where to scroll to.
//     document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
//   });
// });

// Event Delegation
// The act of adding a generalized event handler to the parent element,
// instead of adding the same event handlers to every single element in a forEach.

// 1. Add event listener to a common parent element
// 2. Retrieve the origin of the event (e.target)
document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();

  // Matching click-area (we want to ignore clicks on irrelevant areas)
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

// Tabbed Component
tabsContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab'); // CLOSEST VERY USEFUL!

  // Guard clause
  // Ignore clicks outside of the specified area
  if (!clicked) return; // return if null

  // Remove --active class from all tabs first
  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  tabsContent.forEach(c => c.classList.remove('operations__content--active'));

  // Activate content area
  clicked.classList.add('operations__tab--active');
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

// Menu Fade Animation

const handleHover = function (e, opacity) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(el => {
      if (el !== link) el.style.opacity = opacity;
    });
    logo.style.opacity = opacity;
  }
};

// Passing an "argument" into the handler
nav.addEventListener('mouseover', handleHover.bind(0.5));
nav.addEventListener('mouseout', handleHover.bind(1));

// // Sticky navigation: 'scroll' event

// // Using the 'scroll' event is very bad for performance
// // as it fires up the event constantly
// const initialCoords = section1.getBoundingClientRect();
// window.addEventListener('scroll', function () {
//   console.log(initialCoords);
//   if (window.scrollY > initialCoords.top) {
//     nav.classList.add('sticky');
//   } else {
//     nav.classList.remove('sticky');
//   }
// });

// // Sticky navigation: Intersection Observer API

// const obsCallback = function (entries, observer) {
//   entries.forEach(entry => {
//     console.log(entry);
//   });
// };

// const obsOptions = {
//   root: null, // null -> viewport
//   threshold: 0.1, // Percentage of the target element that is visible
//   // If 10% of section1 is visible, invoke callback.
// };

// const observer = new IntersectionObserver(obsCallback, obsOptions);
// observer.observe(section1);

const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height;

const stickyNav = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) {
    nav.classList.add('sticky');
  } else {
    nav.classList.remove('sticky');
  }
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});
headerObserver.observe(header);

// Reveal sections
// We must observe multiple targets (multiple sections)
const allSections = document.querySelectorAll('.section');

const revealSection = function (entries, observer) {
  const [entry] = entries;
  // console.log(entry);
  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');

  // Disable observer once we show the section
  observer.unobserve(entry.target);
};
const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  theshold: 0.15,
});

allSections.forEach(section => {
  section.classList.add('section--hidden');
  sectionObserver.observe(section);
});

// Lazy loading images
const imgTargets = document.querySelectorAll('img[data-src]');
console.log(imgTargets);

const loadImg = function (entries, observer) {
  const [entry] = entries;
  console.log(entry);

  if (!entry.isIntersecting) return;

  // Replace src with data-src
  entry.target.src = entry.target.dataset.src;
  // // Potentially shows lazy-img before img finishes loading (when network is slow)
  // entry.target.classList.remove('lazy-img');

  // Use 'load' event to wait for img to finish loading
  entry.target.addEventListener('load', function () {
    this.classList.remove('lazy-img');
  });

  observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: '200px', // Make the image load a bit before we reach them.
});

imgTargets.forEach(img => imgObserver.observe(img));

/* Slider Component */
// We can wrap the code for a whole component in a big function.
const slider = function () {
  const slides = document.querySelectorAll('.slide');
  const btnLeft = document.querySelector('.slider__btn--left');
  const btnRight = document.querySelector('.slider__btn--right');
  const dotContainer = document.querySelector('.dots');

  const maxSlide = slides.length;
  let curSlide = 0;

  // // Test code for building process
  // const slider = document.querySelector('.slider');
  // slider.style.transform = 'scale(0.4) translateX(-300px)';
  // slider.style.overflow = 'visible';

  // Functions
  const createDots = function () {
    // Just looping over the number of slides, not the slides themselves
    slides.forEach((_, i) => {
      dotContainer.insertAdjacentHTML(
        'beforeend',
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  };

  const activateDot = function (slide) {
    document
      .querySelectorAll('.dots__dot')
      .forEach(dot => dot.classList.remove('dots__dot--active'));

    document
      // Select an element with a specific attribute
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add('dots__dot--active');
  };

  // TranslateX 0%, 100%, 200%, 300% to put them side by side
  const goToSlide = function (slide) {
    slides.forEach(
      // IMPORTANT LOGIC
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  };

  const nextSlide = function () {
    if (curSlide === maxSlide - 1) {
      curSlide = 0;
    } else {
      curSlide++;
    }
    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const prevSlide = function () {
    if (curSlide === 0) {
      curSlide = maxSlide - 1;
    } else {
      curSlide--;
    }
    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const init = function () {
    createDots();
    activateDot(0);
    goToSlide(0);
  };
  init();

  // Event Handlers
  btnRight.addEventListener('click', nextSlide);
  btnLeft.addEventListener('click', prevSlide);

  document.addEventListener('keydown', function (e) {
    console.log(e);
    if (e.key === 'ArrowLeft') prevSlide();
    e.key === 'ArrowRight' && nextSlide();
  });

  dotContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('dots__dot')) {
      const { slide } = e.target.dataset; //Retrieves value from "data-slide" attribute
      goToSlide(slide);
      activateDot(curSlide);
    }
  });
};
slider();
////////////////////////////////////
////////////////////////////////////
////////////////////////////////////

// // Selects the whole HTML document (<head><body>etc.)
// console.log(document.documentElement);
// console.log(document.head);
// console.log(document.body);

// const header = document.querySelector('.header');
// const allSections = document.querySelectorAll('.section');
// console.log(allSections);

// document.getElementById('section--1');

// // This gets all elements with a certain <tagName>
// // This method returns an HTLMCollection
// // - A "Live" Collection that gets updated automatically by insert/delete of tags
// // - NodeList doesn't get updated so keeps the original state.
// const allButtons = document.getElementsByTagName('button');
// console.log(allButtons);

// console.log(document.getElementsByClassName('btn'));

// // Creating and Inserting Elements
// // .insertAdjacentHTML

// const message = document.createElement('div');
// message.classList.add('cookie-message');
// // message.textContent = 'We use cookies for improved functionality and analytics';
// message.innerHTML =
//   'We use cookies for improved functionality and analytics. <button class="btn btn--close-cookie">Got it!</button>';
// // header.prepend(message); // Inserts as a child of the header element
// header.append(message); // Inserts after the header element
// // These can only be implemented one at a time.

// // In order to use one element in two places, we use
// // message.cloneNode(true) //true -> All child elements will be copied as well.

// // header.before(message) // Insert as the sibling of header
// // header.after(message)

// // Delete elements
// document
//   .querySelector('.btn--close-cookie')
//   .addEventListener('click', function () {
//     message.remove();
//   });

// // Styles
// message.style.backgroundColor = '#37383d';
// message.style.width = '120%';

// console.log(message.style.height); // Empty, because it's not an inline style.
// console.log(message.style.width); // '120%'

// // This is how to load the CSS style.
// console.log(getComputedStyle(message).height); // Empty, because it's not an inline style.

// message.style.height =
//   Number.parseFloat(getComputedStyle(message).height, 10) + 30 + 'px';

// // Manipulating CSS Custom Properties
// document.documentElement.style.setProperty('--color-primary', 'orangered');

// // Attributes
// const logo = document.querySelector('.nav__logo');
// console.log(logo.alt);
// console.log(logo.src);
// // Setting attributes
// logo.alt = 'Beautiful minimalist logo';

// // Retrieving non-standard attributes (e.g. 'designer' attribute in an <img> tag)
// console.log(logo.getAttribute('designer'));
// logo.setAttribute('company', 'Bankist');

// console.log(logo.src); // Absolute Path
// console.log(logo.getAttribute('src')); // Relative Path

// const link = document.querySelector('.nav__link--btn');
// console.log(link.href);
// console.log(link.getAttribute('href'));

// // Data attributes
// // Always stored in the "dataset" object
// console.log(logo.dataset.versionNumber);

// // // Classes
// // logo.classList.add();
// // logo.classList.remove();
// // logo.classList.toggle();
// // logo.classList.contains(); // NOT .includes

// // // DONT USE! Overwrites everything and only allows one class.
// // logo.className = 'Jonas'

// const alertH1 = function (e) {
//   console.log('Mouse Entered!');
// };

// // We can stack event listeners by add..., add..., add...
// const h1 = document.querySelector('h1');
// h1.addEventListener('mouseenter', alertH1);

// // Outdated
// h1.onmouseenter = function (e) {
//   console.log('Mouse Entered!');
// };

// // Removing an event handler
// // This line has to be inside some event handler / callback function (cannot be on global scope)
// setTimeout(() => h1.removeEventListener('mouseenter', alertH1), 3000);

// /* Event Propagation */
// const randomInt = (min, max) =>
//   Math.floor(Math.random() * (max - min + 1) + min);

// const randomColor = () =>
//   `rgb(${randomInt(0, 255)}, ${randomInt(0, 255)}, ${randomInt(0, 255)})`;

// document.querySelector('.nav__link').addEventListener('click', function (e) {
//   console.log('LINK', e.target, e.currentTarget); // e.target is the origin of the event (where the click took place)
//   this.style.backgroundColor = randomColor();
//   console.log(e.currentTarget === this); //true
// });

// document.querySelector('.nav__links').addEventListener('click', function (e) {
//   console.log('LINKS', e.target, e.currentTarget);
//   this.style.backgroundColor = randomColor();

//   // Stop propagation
//   e.stopPropagation(); // Cut off flow of event propagation
// });

// document.querySelector('.nav').addEventListener(
//   'click',
//   function (e) {
//     console.log('NAV', e.target, e.currentTarget);
//     this.style.backgroundColor = randomColor();
//   }
//   // , true // set the useCapture parameter to true -> event handler will listen to capture events, instead of bubbling events
// );

// /* DOM Traversing */
// const h1 = document.querySelector('h1');

// // Going downwards: child
// console.log(h1.querySelectorAll('.highlight'));
// console.log(h1.childNodes);
// console.log(h1.children);

// h1.firstElementChild.style.color = 'white';
// h1.lastElementChild.style.color = 'black';

// // Going upwards: parents
// console.log(h1.parentNode);
// console.log(h1.parentElement);

// h1.closest('.header').style.background = 'var(--gradient-secondary)';

// // Going sideways: siblings
// console.log(h1.previousElementSibling);
// console.log(h1.nextElementSibling);

// // To select ALL siblings:
// console.log(h1.parentElement.children); // Going up and back down

// [...h1.parentElement.children].forEach(function (el) {
//   if (el !== h1) el.style.transform = 'scale(0.5)';
// });

// Listens for HTML and JS load
// Activates once the HTML is parsed
document.addEventListener('DOMContentLoaded', function (e) {
  console.log('HTML parsed and DOM tree built!', e);
});

// Event is fired once everything in the page is done loading
window.addEventListener('load', function (e) {
  console.log('Page fully loaded', e);
});

// // Don't use unless necessary in UX perspective.
// // Event fires right before the user leaves the page
// window.addEventListener('beforeunload', function (e) {
//   e.preventDefault();
//   console.log(e);
//   e.returnValue = ''; // This message won't be displayed in most modern browsers.
// });
