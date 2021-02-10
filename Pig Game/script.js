//Selecting Elements
const score0El = document.querySelector("#score--0");
const score1El = document.getElementById("score--1");
const diceEl = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");
const current0El = document.getElementById("current--0");
const current1El = document.getElementById("current--1");

let currentScore = 0;

score0El.textContent = 0;
score1El.textContent = 0;

//Hidding Dice initialy
diceEl.classList.add("hidden");

//Rolling Dice Functionality
btnRoll.addEventListener("click", function () {
  //1. Generating a Random Dice Roll
  const dice = Math.trunc(Math.random() * 6) + 1;

  //2. Display Dice
  diceEl.classList.remove("hidden");
  diceEl.src = `dice-${dice}.png`;

  //3. Check for rolled 1: if true , switch to next player\
  if (dice !== 1) {
    //Add Dice to current Score
    currentScore += dice;
    current0El.textContent = currentScore; //Change later
  } else {
    //Switch to next player
  }
});
