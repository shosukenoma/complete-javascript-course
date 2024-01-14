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
  constructor(fullName, birthYear) {
    this.fullName = fullName; // This becomes a validating setter call
    // But inside the setter call, we save <fullName> to a separate variable <this._fullName>
    this.birthYear = birthYear;
  }

  // INSTANCE METHODS
  // Methods will be added to PersonCl.prototype property
  calcAge() {
    console.log(2037 - this.birthYear);
  }

  get age() {
    return 2037 - this.birthYear;
  }

  // The way we invoke this setter will be "jessica.fullName = (...)"
  // which overlaps with the "this.fullName" from the constructor, causing a stack overflow.
  // To fix this, we use a naming convention: this._fullName
  set fullName(name) {
    // Overlap A
    console.log(name);
    if (name.includes(' ')) {
      this._fullName = name; // Overlap B - A&B causing an infinite recursive call
    } else {
      alert(`${name} is not a full name!`);
    }
  }

  // Now we need to create a getter.
  get fullName() {
    return this._fullName;
  }

  // STATIC METHOD
  static hey() {
    console.log('Hey');
  }
  // invoke with PersonCl.hey()
}

const jessica = new PersonCl('Jessica Davis', 1996);
console.log(jessica);
jessica.calcAge();
console.log(`Using getter to calculate age: ${jessica.age}`);
// jessica.__proto__ will contain both <age> property and <get age> function

console.log(jessica.__proto__ === PersonCl.prototype); //true

PersonCl.prototype.greet = function () {
  console.log(`Hey ${this.firstName}!`);
};
jessica.greet();

const walter = new PersonCl('Walter White', 1965);

// NOTES ON CLASSES //
// 1. Classes are not hoisted (classes can't be used before their declarations)
// 2. Classes are first-class citizens (classes can be passed into and returned from functions)!!!
// 3. Any code inside the class are executed in strict mode automatically

/* SETTERS and GETTERS */
const account = {
  owner: 'Jonas',
  movements: [200, 530, 120, 300],

  get latest() {
    return this.movements.at(-1);
  },

  set latest(mov) {
    this.movements.push(mov);
  },
};

// When invoking a getter method, we write it as if we're using a property (no call-parenthesis)
console.log(account.latest);

// Again, instead of "calling" the setter, we assign a value like we're using a property.
account.latest = 50;
console.log(account.movements);

/* STATIC METHODS */

// Creating an array from an array-like object
Array.from(document.querySelectorAll('h1'));

// // This doesn't work!
// [1, 2, 3].from(...)

// "from()" is not in Array.prototype
// rather, it is a method in the constructor of the Array object.

Person.hey = function () {
  console.log('Hey there!');
};

Person.hey();
// jonas.hey(); This won't work, because the Person instances do not inherit hey()

/* OBJECT.CREATE */
// (Least used method for prototypal inheritance)
const PersonProto = {
  calcAge() {
    console.log(2037 - this.birthYear);
  },

  init(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  },
};

const steven = Object.create(PersonProto);
// steven will be linked to the PersonProto prototype.
// steven is an empty object, because it doesn't have any property yet.

steven.name = 'Steven';
steven.birthYear = 2022;
steven.calcAge();

// Object.create doesn't use a .prototype property.
// Rather, it directly uses the object literal as the prototype.
console.log(steven.__proto__);
console.log(steven.__proto__ === PersonProto);

const sarah = Object.create(PersonProto);
sarah.init('Sarah', 1987);
console.log(sarah);
console.log(sarah.__proto__);

// Coding Challenge #2

/* 
1. Re-create challenge 1, but this time using an ES6 class;
2. Add a getter called 'speedUS' which returns the current speed in mi/h (divide by 1.6);
3. Add a setter called 'speedUS' which sets the current speed in mi/h (but converts it to km/h before storing the value, by multiplying the input by 1.6);
4. Create a new car and experiment with the accelerate and brake methods, and with the getter and setter.

DATA CAR 1: 'Ford' going at 120 km/h
*/

class ClassCar {
  constructor(make, speed) {
    this.make = make;
    this.speed = speed;
  }

  accelerate() {
    this.speed += 10;
    console.log(`Accelerated. You are now going at ${this.speed} km/h.`);
  }

  brake() {
    this.speed -= 5;
    console.log(`Braked. You are now going at ${this.speed} km/h.`);
  }

  get speedUS() {
    return this.speed / 1.6;
  }

  set speedUS(speed) {
    this.speed = speed * 1.6;
  }
}

const ford = new ClassCar('Ford', 120);
console.log(ford.speedUS);

ford.accelerate();
ford.brake();

ford.speedUS = 30;
console.log(ford.speedUS);

/* Inheritance Between "Classes": Constructor Functions */
// const Person = function (firstName, birthYear) {
//   this.firstName = firstName;
//   this.birthYear = birthYear;
// };

// Person.prototype.calcAge = function () {
//   console.log(2037 - this.birthYear);
// };

const Student = function (firstName, birthYear, course) {
  // We have to set the "this" keyword to point to the Student "class" instead of Person.
  Person.call(this, firstName, birthYear);
  this.course = course;

  // We have to create a link between the Student prototype and Person prototype
  // using Object.create()
};

// !! IMPORTANT !!
Student.prototype = Object.create(Person.prototype);
// We have to do this before writing any other code that adds new properties.
// This is because Object.create() returns an empty object (anything that comes before will be reset)

/* Student.prototype = Person.prototype DOES NOT WORK */
// This is because the new "classes" will become one, when we actually need
// two classes in a hierarchical relationship.

Student.prototype.introduce = function () {
  console.log(`My name is ${this.firstName} and I study ${this.course}.`);
};

const mike = new Student('Mike', 2020, 'Computer Science');
mike.introduce();

console.log(mike.__proto__.__proto__.__proto__);

// !! IMPORTANT !!
Student.prototype.constructor = Student;
console.dir(Student.prototype.constructor);

console.log(mike instanceof Student);
console.log(mike instanceof Person);
console.log(mike instanceof Object);

// Coding Challenge #3

/* 
1. Use a constructor function to implement an Electric Car (called EV) as a CHILD "class" of Car. Besides a make and current speed, the EV also has the current battery charge in % ('charge' property);
2. Implement a 'chargeBattery' method which takes an argument 'chargeTo' and sets the battery charge to 'chargeTo';
3. Implement an 'accelerate' method that will increase the car's speed by 20, and decrease the charge by 1%. Then log a message like this: 'Tesla going at 140 km/h, with a charge of 22%';
4. Create an electric car object and experiment with calling 'accelerate', 'brake' and 'chargeBattery' (charge to 90%). Notice what happens when you 'accelerate'! HINT: Review the definiton of polymorphism 😉

DATA CAR 1: 'Tesla' going at 120 km/h, with a charge of 23%

GOOD LUCK 😀
*/

const EV = function (make, speed, charge) {
  Car.call(this, make, speed);
  this.charge = charge;
};

EV.prototype = Object.create(Car.prototype);

EV.prototype.chargeBattery = function (chargeTo) {
  this.charge = chargeTo;
};

EV.prototype.accelerate = function () {
  this.speed += 20;
  this.charge -= 1;
  console.log(
    `${this.make} going at ${this.speed} km/h, with a charge of ${this.charge}%`
  );
};

const tesla = new EV('Tesla', 120, 23);
console.log('Test Tesla');
console.log(tesla);

tesla.accelerate();
console.log(tesla);

tesla.brake();
console.log('brake', tesla);

tesla.chargeBattery(90);
console.log(tesla);
