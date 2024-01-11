'use strict';

const bookings = [];

const createBooking = function (flightNum, numPassengers, price) {
  numPassengers = numPassengers ?? 1;
  const booking = {
    flightNum,
    numPassengers,
    price,
  };
  console.log(booking);
  bookings.push(booking);
};

createBooking('LH123');

const flight = 'NH234';
const jonas = {
  name: 'Jonas Schmedtmann',
  passport: '247394792840',
};

const checkIn = function (flightNum, passenger) {
  flightNum = 'NH999';
  passenger.name = 'Mr. ' + passenger.name;

  if (passenger.passport === '247394792840') {
    // alert('Checked In!');
  } else {
    // alert('Wrong passport!');
  }
};

checkIn(flight, jonas);
console.log(flight);
console.log(jonas);

// Functions accepting callback functions
const oneWord = function (str) {
  return str.replace(/ /g, '').toLowerCase();
};

const upperFirstWord = function (str) {
  const [first, ...others] = str.split(' ');
  return [first.toUpperCase(), ...others].join(' ');
};

// This is a higher order function
// because it takes in a function as a parameter
const transformer = function (str, fn) {
  console.log(`Original string: ${str}`);
  console.log(`Transformed string: ${fn(str)}`);
  console.log(`Transformed by: ${fn.name}`);
};

// No () at the end of upperFirstWord, because this is only a reference to the function
transformer('Javascript is the best!', upperFirstWord);
console.log('');
transformer('Javascript is the best!', oneWord);

// JS uses callbacks all the time
//
const high5 = function () {
  console.log('👋');
};
// document.body.addEventListener('click', high5);

['Jonas', 'Martha', 'Adam'].forEach(high5);

// Functions returning functions
// This is important in "functional programming" paradigm
const greet = function (greeting) {
  return function (name) {
    console.log(`${greeting} ${name}`);
  };
};

const greeterHey = greet('Hey');
greeterHey('Jonas');

// This works too!!
greet('Hello')('Jonas');

// Using arrow functions
// One arrow function returning another function
const arrowGreet = greeting => name => {
  console.log(`${greeting} ${name}`);
};
// const arrowGreet = greeting => {
//   return name => {
//     console.log(`${greeting} ${name}`);
//   };
// };
arrowGreet('Yo wassup')('Jonas');

const lufthansa = {
  airline: 'Lufthansa',
  iataCode: 'LH',
  bookings: [],
  book(flightNum, name) {
    console.log(
      `${name} booked a seat on ${this.airline} flight ${this.iataCode}${flightNum}`
    );
    this.bookings.push({ flight: `${this.iataCode}${flightNum}`, name });
  },
};

lufthansa.book(239, 'Jonas Schmedtmann');
lufthansa.book(635, 'John Smith');
console.log(lufthansa);

const eurowings = {
  airline: 'Eurowings',
  iataCode: 'EW',
  bookings: [],
};

const book = lufthansa.book;

// // This is a regular function call now, so the "this" points to undefined, due to the rule of scoping.
// book(23, 'Sarah Williams');

// We need to use CALL, apply or bind to manually set the "this" keyword
book.call(eurowings, 23, 'Sarah Williams');
console.log(eurowings);

const swiss = {
  airline: 'Swiss Air Lines',
  iataCode: 'LX',
  bookings: [],
};

book.call(swiss, 583, 'Mary Cooper');
console.log(swiss);

// Apply Method
const flightData = [583, 'George Cooper'];
book.apply(swiss, flightData);
console.log(swiss);

// We can use the spread operator (...)
book.call(swiss, ...flightData);

// Bind Method
const bookEW = book.bind(eurowings); // book.bind() returns a new function
const bookLH = book.bind(lufthansa);
const bookLX = book.bind(swiss);
bookEW(23, 'Steven Williams');

// Bind with preset parameter
const bookEW23 = book.bind(eurowings, 23);
bookEW23('Jonas Schmedtmann');

// Binding with Event Listeners
lufthansa.planes = 300;
lufthansa.buyPlane = function () {
  console.log('this keyword: ', this);

  this.planes++;
  console.log(this.planes);
};

// // This would return NaN because 'this' points to the .buy button element.
// document.querySelector('.buy').addEventListener('click', lufthansa.buyPlane);

document
  .querySelector('.buy')
  .addEventListener('click', lufthansa.buyPlane.bind(lufthansa));

// Partial application (presetting values for a specific common use case)
// Creating a more specific function (separate function) based on a more general function.
const addTax = (rate, value) => {
  const res = value + value * rate;
  console.log(res);
};

const addVAT = addTax.bind(null, 0.23); // The value of 'this' can be anything in this case.

// Function returning function solution
const addTaxRate = rate => {
  return function (value) {
    return value + value * rate;
  };
};

// const addVAT23 = addTaxRate(0.23);
// console.log(addVAT23(100));

console.log(addTaxRate(0.23)(100));

// Coding Challenge #1

const poll = {
  question: 'What is your favourite programming language?',
  options: ['0: JavaScript', '1: Python', '2: Rust', '3: C++'],
  answers: new Array(4).fill(0),
  registerNewAnswer() {
    const answer = Number(
      prompt(
        `${this.question}\n${this.options.join('\n')}\n(Write option number)`
      )
    );
    typeof answer === 'number' &&
      answer < this.answers.length &&
      this.answers[answer]++;
    this.displayResults('string');
  },
  displayResults(type = 'array') {
    if (type === 'array') {
      console.log(this.answers);
    }
    if (type === 'string') {
      console.log(`Poll results are ${this.answers.join(', ')}`);
    }
  },
};

document
  .querySelector('.poll')
  .addEventListener('click', poll.registerNewAnswer.bind(poll));

poll.displayResults.call({ answers: [5, 2, 3] }, 'string');
// Specifying a new object to substitute "this.answers"

/* Immediately Invoked Function Expression (IIFE) */
// A function that we only want to use once and never again
//
// We can do so by:
// 1. Not assigning a name or a variable assignment
// 2. Wrapping the function declaration in parenthesis (for JS to register it as an expression)
// 3. Add a () at the end to invoke the function.
(function () {
  console.log('This will never run again');
})();

// Arrow function version
(() => console.log('This will ALSO never run again'))();

// Why use IIFE?
// -> Creating a new scope for data privacy (this is called data encapsulation)

/* CLOSURES */
const secureBooking = function () {
  let passengerCount = 0; // Cannot be accessed from outside the function

  return function () {
    passengerCount++;
    console.log(`${passengerCount} passengers`);
  };
};

const booker = secureBooking();
booker();
booker();
booker();

// Any function always has access
// to the variable environment of the execution context, in which the function was created.
// even after the execution context is popped off.

// Closure: a variable environment attached to the function
// Saved variable from closure has higher priority over global variable of same name.

// We can take a look at the closure variables as follows:
console.dir(booker);

/* More closure examples */
let f;
const g = function () {
  const a = 23;
  f = function () {
    console.log(a * 2);
  };
};

const h = function () {
  const b = 777;
  f = function () {
    console.log(b * 2);
  };
};

g(); // a=23, f=function
f(); // g's execution context is gone, so a=23 should be gone too
// but the variable environment for a=23 is preserved.

h(); // now the closure or "function f" contains the value b instead
f(); // "function f" is re-assigned
console.dir(f);

/* Closure for setTimeout */
/* setTimeout will always need closure from parent function!!! */
const boardPassengers = function (n, wait) {
  const perGroup = n / 3;
  setTimeout(function () {
    console.log(`We are now boarding all ${n} passengers`);
    console.log(`There are 3 groups, each with ${perGroup} passengers`);
  }, wait * 1000);

  console.log(`Will start boarding in ${wait} seconds`);
};

const perGroup = 1000; // Closures have priority over Scope Chain.
boardPassengers(180, 3);
// 180 passengers, 3 seconds wait time

/* Coding Challenge #2 */
(function () {
  const header = document.querySelector('h1');
  header.style.color = 'red';

  document.body.addEventListener('click', function () {
    header.style.color = 'blue';
  });
})();
