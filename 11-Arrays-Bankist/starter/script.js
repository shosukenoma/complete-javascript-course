'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

// Lecture Notes

let arr = ['a', 'b', 'c', 'd', 'e'];
/* SLICE */
console.log(arr.slice(1, 3));
console.log(arr.slice(-2));
console.log(arr.slice(1, -2));
// You can use slice to create a shallow copy of an array -> Useful for chaining methods
console.log(arr.slice()); // empty parameter
// Same as the spread operator:
console.log([...arr]);

/* SPLICE */
// Unlike slice, the original array gets mutated.
// We "remove" the section of the array.
console.log(arr.splice(2)); // Extracts ['c', 'd', 'e']
console.log(arr); // Remains ['a', 'b']

// Second parameter is the "deleteCount"
arr = ['a', 'b', 'c', 'd', 'e'];
console.log(arr.splice(1, 2)); // Start at position 1 and delete 2 items
console.log(arr);

/* REVERSE */
arr = ['a', 'b', 'c', 'd', 'e'];
const arr2 = ['j', 'i', 'h', 'g', 'f'];
console.log(arr2);
console.log(arr2.reverse());
console.log(arr2);

/* CONCAT */
const letters = arr.concat(arr2);
console.log(letters);
console.log([...arr, ...arr2]);

/* JOIN */
const joinedLetters = letters.join(', ');
console.log(joinedLetters);

/* ES2022 the new "at(index)" method */
const arr3 = [23, 11, 64];
console.log(arr3[0]);
console.log(arr3.at(0));

/* Traditional way of getting the last element in the array */
console.log(arr3[arr3.length - 1]); // arr3[-1] doesn't work
console.log(arr3.slice(-1)[0]);

/* Modern way using at(index) */
console.log(arr3.at(-1)); // Yep this is very useful, and more intuitive!

/* Looping over Arrays: forEach */
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/* for of version */
console.log('-----FOR OF-----');
for (const [index, movement] of movements.entries()) {
  if (movement > 0) {
    console.log(`Movement ${index + 1}: You deposited ${movement}`);
  } else {
    console.log(`Movement ${index + 1}: You withdrew ${Math.abs(movement)}`);
  }
}
/* Using forEach (forEach is a higher order function that takes a callback function as parameter)*/
console.log('-----FOR EACH-----');
movements.forEach(function (movement, index, order) {
  // Parameters for callback function:
  // 1: item, 2: index, 3: array
  if (movement > 0) {
    console.log(`Movement ${index + 1}: You deposited ${movement}`);
  } else {
    console.log(`Movement ${index + 1}: You withdrew ${Math.abs(movement)}`);
  }
});
// You can't use break/continue in forEach

/* forEach with Maps and Sets */
const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

currencies.forEach(function (value, key, map) {
  console.log(`${key}: ${value}`);
});

const currenciesUnique = new Set(['USD', 'GBP', 'USD', 'EUR', 'EUR']);
console.log(currenciesUnique);
currenciesUnique.forEach(function (value, _, map) {
  console.log(`${key}: ${value}`);
});
// Same signature (with three parameters) was kept for the sake of simplicity
