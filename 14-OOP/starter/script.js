'use strict';

// Constructor function that "simulates" classes
const Person = function (firstName, birthYear) {
  // Instance properties
  this.firstName = firstName;
  this.birthYear = birthYear;

  // // DON'T DO THIS!!!
  // //  -> We will be creating a new instance of this generic function all th time.
  // this.calcAge = function () {
  //   console.log(2037 - this.birthYear);
  // };
};

const jonas = new Person('Jonas', 1991);
console.log(jonas);

// 1. A new empty object { } is created
// 2. The function is called, and 'this' is set to the new empty object { }
// 3. The newly created object { } is linked to a prototype -> creates __proto__ property
// 4. Function automatically returns the object { }

const matilda = new Person('Matilda', 2017);
const jack = new Person('Jack', 1975);
console.log(matilda, jack);

const jay = 'Jay';

console.log(jonas instanceof Person); // true
console.log(jay instanceof Person); // false

// Prototypes

Person.prototype.calcAge = function () {
  console.log(2037 - this.birthYear);
}; // "this" points to the object calling this function.

jonas.calcAge();
matilda.calcAge();

// Each object has a property called _ _ proto _ _
console.log(jonas.__proto__);
console.log(jonas.__proto__ === Person.prototype);
console.log(Person.prototype.isPrototypeOf(jonas));
console.log(Person.prototype.isPrototypeOf(Person));
// <Person.prototype> is equal to the prototype of the created object

// Setting object property in prototype
Person.prototype.species = 'Homo Sapiens';
console.log(jonas.species);
console.log(matilda.species);

console.log(jonas.hasOwnProperty('firstName')); // true
console.log(jonas.hasOwnProperty('species')); // false

console.log(jonas.constructor);

/* Prototypal Inheritance on Built-In Objects */
console.log(jonas.__proto__);
console.log(jonas.__proto__.__proto__);
console.log(jonas.__proto__.__proto__.__proto__);

console.dir(Person.prototype.constructor);

const arr = [3, 6, 4, 5, 6, 9, 3];
console.log(arr.__proto__);
console.log(arr.__proto__ === Array.prototype);
// const arr = [] is same as const arr = new Array

Array.prototype.unique = function () {
  return [...new Set(this)];
};
console.log(arr.unique());

const h1 = document.querySelector('h1');
console.dir(h1);

/* CODING CHALLENGE #1 */
// Constructor function for 'Car' object
const Car = function (make, speed) {
  // Instance properties
  this.make = make;
  this.speed = speed;
};

// Prototypal Inheritance
Car.prototype.accelerate = function () {
  this.speed += 10;
  console.log(this.speed);
};

Car.prototype.brake = function () {
  this.speed -= 5;
  console.log(this.speed);
};

const bmw = new Car('BMW', 120);
const mercedes = new Car('Mercedes', 95);

console.log(bmw.__proto__);
console.log(mercedes.__proto__);

bmw.accelerate();
mercedes.brake();

/* ES6 CLASSES */

// Class declaration
class PersonCl {
  constructor(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  }

  // Methods will be added to PersonCl.prototype property
  calcAge() {
    console.log(2037 - this.birthYear);
  }
}

const jessica = new PersonCl('Jessica', 1996);
console.log(jessica);
jessica.calcAge();

console.log(jessica.__proto__ === PersonCl.prototype); //true

PersonCl.prototype.greet = function () {
  console.log(`Hey ${this.firstName}!`);
};
jessica.greet();

// NOTES ON CLASSES //
// 1. Classes are not hoisted (classes can't be used before their declarations)
// 2. Classes are first-class citizens (classes can be passed into and returned from functions)!!!
// 3. Any code inside the class are executed in strict mode automatically

/* SETTERS and GETTERS */
