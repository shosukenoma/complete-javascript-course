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

const displayMovements = function (movements) {
  // Remove HTML content
  containerMovements.innerHTML = '';

  movements.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal ';
    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
        <div class="movements__value">${mov}€</div>
      </div>
    `;

    // Insert HTML literal at specified position inside a class.
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};
// displayMovements(account1.movements);

// MAP method
const createUsernames = function (accs) {
  accs.forEach(acc => {
    acc.username = acc.owner
      .toLowerCase() // "steven thomas williams"
      .split(' ') // ["steven", "thomas", "williams"]
      .map(str => str.charAt(0)) // ["s", "t", "w"]
      .join(''); // "stw"
    console.log(acc.username);
    return acc.username;
  });
};
createUsernames(accounts);
console.log(accounts);

// REDUCE method

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, cur) => acc + cur, 0);
  labelBalance.textContent = `${acc.balance} €`;
};
// calcDisplayBalance(account1.movements);

const calcDisplaySummary = function (acc) {
  const ins = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${ins}€`;

  const outs = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(outs)}€`;

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(mov => mov * (acc.interestRate / 100))
    .filter(mov => mov >= 1)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumInterest.textContent = `${interest}€`;
};
// calcDisplaySummary(account1.movements);

const updateUI = function (acc) {
  // Display movements
  displayMovements(acc.movements);
  // Display balance
  calcDisplayBalance(acc);
  // Display summary
  calcDisplaySummary(acc);
};

let currentAccount;
btnLogin.addEventListener('click', function (e) {
  // Prevent form from submitting / Prevent refresh
  e.preventDefault();
  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  console.log(currentAccount);

  // Optional chaining, in case currentAccount = undefined.
  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // Display UI and Welcome Message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;

    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Number(inputTransferAmount.value);

  const recipient = accounts.find(
    acc => acc.username === inputTransferTo.value
  );

  if (
    amount > 0 &&
    currentAccount.balance >= amount &&
    recipient?.username &&
    recipient?.username !== currentAccount.username
  ) {
    console.log('Transfer Valid!');
    currentAccount.movements.push(-Number(inputTransferAmount.value));
    recipient.movements.push(amount);
    updateUI(currentAccount);
  }

  inputTransferAmount.value = inputTransferTo.value = '';
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  // Approve if there is any single deposit that amounts to 10% of the requested loan amount.
  const amount = Number(inputLoanAmount.value);
  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    // Approve Loan
    currentAccount.movements.push(amount);
    updateUI(currentAccount);
  }
  inputLoanAmount.value = '';
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();
  console.log('Closed');

  if (
    inputCloseUsername.value === currentAccount.username &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    console.log(index);

    // Delete Account
    accounts.splice(index, 1); // Remove 1 element starting at index position.

    // Hide UI
    containerApp.style.opacity = 0;

    inputCloseUsername.value = inputClosePin.value = '';
  }
});

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
currenciesUnique.forEach(function (value, key, map) {
  console.log(`${key}: ${value}`);
});
// Same signature (with three parameters) was kept for the sake of simplicity

///////////////////////////////////////
// Coding Challenge #1

/* 
Julia and Kate are doing a study on dogs. So each of them asked 5 dog owners about their dog's age, and stored the data into an array (one array for each). For now, they are just interested in knowing whether a dog is an adult or a puppy. A dog is an adult if it is at least 3 years old, and it's a puppy if it's less than 3 years old.

Create a function 'checkDogs', which accepts 2 arrays of dog's ages ('dogsJulia' and 'dogsKate'), and does the following things:

1. Julia found out that the owners of the FIRST and the LAST TWO dogs actually have cats, not dogs! So create a shallow copy of Julia's array, and remove the cat ages from that copied array (because it's a bad practice to mutate function parameters)
2. Create an array with both Julia's (corrected) and Kate's data
3. For each remaining dog, log to the console whether it's an adult ("Dog number 1 is an adult, and is 5 years old") or a puppy ("Dog number 2 is still a puppy 🐶")
4. Run the function for both test datasets

HINT: Use tools from all lectures in this section so far 😉

TEST DATA 1: Julia's data [3, 5, 2, 12, 7], Kate's data [4, 1, 15, 8, 3]
TEST DATA 2: Julia's data [9, 16, 6, 8, 3], Kate's data [10, 5, 6, 1, 4]

GOOD LUCK 😀
*/

const checkDogs = function (dogsJulia, dogsKate) {
  const dogsJuliaCorrected = dogsJulia.slice(1, -2);
  const dogsBoth = [...dogsJuliaCorrected, ...dogsKate];
  dogsBoth.forEach(function (dogAge, i) {
    console.log(
      `Dog number ${i + 1} is ${
        dogAge >= 3 ? 'an adult' : 'a child'
      }, and is ${dogAge} years old.`
    );
  });
};

checkDogs([3, 5, 2, 12, 7], [4, 1, 15, 8, 3]);
checkDogs([9, 16, 6, 8, 3], [10, 5, 6, 1, 4]);

// MAP

const eurToUsd = 1.1;
const movementsUSD = movements.map(mov => Math.trunc(mov * eurToUsd));

console.log(movementsUSD);

// // Implementing MAP in for of loop
// const forMovementsUSD = [];
// for (const mov of movements) {
//   forMovementsUSD.push(mov * eurToUsd);
// }

const movementsDescriptions = movements.map((mov, i, arr) => {
  `Movement ${i + 1}: You ${mov > 0 ? 'deposited' : 'withdrew'} ${Math.abs(
    mov
  )}`;
});
console.log(movementsDescriptions);

// FILTERING

const deposits = movements.filter(function (mov) {
  return mov > 0;
});
console.log(movements);
console.log(deposits);

// const depositsFor = [];
// for (const mov of movements) {
//   if (mov > 0) depositsFor.push(mov);
// }
// console.log(depositsFor);

const withdrawals = movements.filter(function (mov) {
  return mov < 0;
});
console.log(withdrawals);

// REDUCE
// First parameter of callback function is the accumulator variable.

// const balance = movements.reduce(function (acc, cur, i, arr) {
//   console.log(`Iteration ${i}: ${acc + cur}`);
//   return acc + cur;
// }, 0);

// Shorter version
const balance = movements.reduce((acc, cur) => acc + cur, 0);

// let balance2 = 0;
// for (const mov of movements) balance2 += mov;
// console.log(balance2);

// REDUCE: Maximum value of array
const maximum = movements.reduce((acc, mov) => {
  return Math.max(acc, mov);
}, movements[0]);

console.log(maximum);

///////////////////////////////////////
// Coding Challenge #2

/* 
Let's go back to Julia and Kate's study about dogs. This time, they want to convert dog ages to human ages and calculate the average age of the dogs in their study.

Create a function 'calcAverageHumanAge', which accepts an arrays of dog's ages ('ages'), and does the following things in order:

1. Calculate the dog age in human years using the following formula: if the dog is <= 2 years old, humanAge = 2 * dogAge. If the dog is > 2 years old, humanAge = 16 + dogAge * 4.
2. Exclude all dogs that are less than 18 human years old (which is the same as keeping dogs that are at least 18 years old)
3. Calculate the average human age of all adult dogs (you should already know from other challenges how we calculate averages 😉)
4. Run the function for both test datasets

TEST DATA 1: [5, 2, 4, 1, 15, 8, 3]
TEST DATA 2: [16, 6, 10, 5, 6, 1, 4]

GOOD LUCK 😀
*/

const calcAverageHumanAge = function (dogAges) {
  const humanAges = dogAges.map(age => (age <= 2 ? age * 2 : 16 + age * 4));
  console.log(humanAges);
  const adultAges = humanAges.filter(age => age >= 18);
  console.log(adultAges);
  const average = adultAges.reduce((acc, age) => acc + age) / adultAges.length;
  console.log(average);
};
calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]);

////////////////////////////////////////////

const totalDepositsUSD = movements
  .filter(mov => mov > 0)
  .map(mov => mov * eurToUsd)
  .reduce((acc, mov) => acc + mov, 0);

console.log(totalDepositsUSD);

// // We can use the arr parameter to show how the array changes over each process
// const totalDepositsUSD = movements
//   .filter((mov, i, arr) => {
//     console.log(arr);
//     return mov > 0;
//   })
//   .map((mov, i, arr) => {
//     console.log(arr);
//     return mov * eurToUsd;
//   })
//   .reduce((acc, mov) => acc + mov, 0);

// console.log(totalDepositsUSD);

///////////////////////////////////////
// Coding Challenge #3

/* 
Rewrite the 'calcAverageHumanAge' function from the previous challenge, but this time as an arrow function, and using chaining!

TEST DATA 1: [5, 2, 4, 1, 15, 8, 3]
TEST DATA 2: [16, 6, 10, 5, 6, 1, 4]

GOOD LUCK 😀
*/

const chainCalcAverageHumanAge = function (dogAges) {
  const average = dogAges
    .map(age => (age <= 2 ? age * 2 : 16 + age * 4))
    .filter(age => age >= 18)
    .reduce((acc, age, i, arr) => acc + age / arr.length, 0);
  console.log(average);
};
chainCalcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]);

const firstWithdrawal = movements.find(mov => mov < 0);
console.log(movements);
console.log(firstWithdrawal);

console.log(accounts);
const account = accounts.find(acc => acc.owner === 'Jessica Davis');
console.log(account);

/* Some and Every methods */

// Equality: .includes()
console.log(movements.includes(-130)); //true

// Conditional Membership: .some(item => item > 25)
console.log(movements.some(mov => mov > 2000)); //true

const anyDeposits = movements.some(mov => mov > 0);
console.log(anyDeposits);

// Conditional: .every(item => item > 10)
console.log(account4.movements.every(mov => mov > 0)); //true - "Are all movements in account4 deposits?"

// Separate callback function
const checkDeposits = mov => mov > 0;
movements.some(checkDeposits);
movements.every(checkDeposits);
movements.filter(checkDeposits);

/* FLAT and FLATMAP */
const nestedArr = [[1, 2, 3], [4, 5, 6], 7, 8];
console.log(nestedArr.flat()); // [1, 2, 3, 4, 5, 6, 7, 8]
// ONLY GOES 1-Level deep by default!

const deeperArr = [[[1, 2], 3], [[4, 5], 6], 7, 8];
console.log(nestedArr.flat(2));

const accountMovements = accounts.map(acc => acc.movements);
const allMovements = accountMovements.flat();
const overallBalance = allMovements.reduce((acc, mov) => acc + mov, 0);
console.log(overallBalance);

const chainedOverallBalance = accounts
  .map(acc => acc.movements)
  .flat()
  .reduce((acc, mov) => acc + mov, 0);
console.log(chainedOverallBalance);

// TIP!
// Using map() on an object attribute (resulting in an array of the attributes)
// and using flat() is a very commonly used combination of methods.

// FLATMAP: map() and then flat().
// argument is same as map()
const flatMapOverallBalance = accounts
  .flatMap(acc => acc.movements)
  .reduce((acc, mov) => acc + mov, 0);
console.log(chainedOverallBalance);
