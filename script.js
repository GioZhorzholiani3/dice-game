"use strict";

const player0EL = document.querySelector(".player--0");
const player1EL = document.querySelector(".player--1");

const score0EL = document.getElementById("score--0");
const score1EL = document.getElementById("score--1");

const cur0 = document.getElementById("current--0");
const cur1 = document.getElementById("current--1");

const diceEL = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");

//starting conditon
// let scores = [0, 0];
// let currentScore = 0;
// let activePlayer = 0;
// let playing = true;

// score0EL.textContent = 0;
// score1EL.textContent = 0;
// diceEL.classList.add("hidden");
let scores, playing, activePlayer, currentScore;

const init = () => {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0EL.textContent = 0;
  score1EL.textContent = 0;
  cur0.textContent = 0;
  cur1.textContent = 0;

  diceEL.classList.add("hidden");
  player0EL.classList.remove("player--winner");
  player1EL.classList.remove("player--winner");
  player0EL.classList.add("player--active");
  player1EL.classList.remove("player--active");
};

init();

const switchPlayer = () => {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0EL.classList.toggle("player--active");
  player1EL.classList.toggle("player--active");
};

//rolling dice functional
btnRoll.addEventListener("click", () => {
  if (playing) {
    //generate random number between 1-6
    const dice = Math.trunc(Math.random() * 6 + 1);

    //display image
    diceEL.classList.remove("hidden");
    diceEL.src = `dice-${dice}.png`;

    if (dice !== 1) {
      //add current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      //swich next palyer
      switchPlayer();
    }
  }
});

btnHold.addEventListener("click", () => {
  if (playing) {
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    if (scores[activePlayer] > 100) {
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
      diceEL.classList.add("hidden");
    } else {
      switchPlayer();
    }
  }
  
});

btnNew.addEventListener("click", init);

