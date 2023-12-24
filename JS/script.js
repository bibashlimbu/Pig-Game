"use strict";

const rollDiceBtn = document.querySelector(".roll-dice"),
  holdBtn = document.querySelector(".hold"),
  newGameBtn = document.querySelector(".new-game"),
  currentScore1 = document.querySelector(".currentScore-0"),
  currentScore2 = document.querySelector(".currentScore-1"),
  playerScore1 = document.querySelector(".playerScore-0"),
  playerScore2 = document.querySelector(".playerScore-1"),
  player1 = document.querySelector(".player-0"),
  player2 = document.querySelector(".player-1"),
  diceImg = document.querySelector(".main img");

let scores, score, playing, playerActive;

const initialGame = () => {
  scores = [0, 0];
  (score = 0), (playing = true), (playerActive = 0);

  playerScore1.textContent = 0;
  playerScore2.textContent = 0;
  currentScore2.textContent = 0;
  currentScore1.textContent = 0;

  player1.classList.add("player-active");
  player2.classList.remove("player-active");
  player2.classList.remove("player-won");
  player1.classList.remove("player-won");
  diceImg.classList.add("hidden");
};

initialGame();

//new game
newGameBtn.addEventListener("click", initialGame);

const switchPlayer = () => {
  document.querySelector(`.currentScore-${playerActive}`).textContent = 0;
  score = 0;
  playerActive = playerActive === 0 ? 1 : 0;
  player1.classList.toggle("player-active");
  player2.classList.toggle("player-active");
};

rollDiceBtn.addEventListener("click", () => {
  if (playing) {
    // generating random dice number
    let randomDice = Math.trunc(Math.random() * 6) + 1;
    console.log(randomDice, typeof randomDice);

    //displaying random dice number
    diceImg.classList.remove("hidden");
    diceImg.src = `img/dice-${randomDice}.png`;

    // updating score to current score

    if (randomDice !== 1) {
      score += randomDice;
      document.querySelector(`.currentScore-${playerActive}`).textContent =
        score;
    } else {
      //switch the player
      switchPlayer();
    }
  }
});

//hold button
holdBtn.addEventListener("click", () => {
  if (playing) {
    //add current score to total score
    scores[playerActive] += score;
    console.log(scores);
    document.querySelector(`.playerScore-${playerActive}`).textContent =
      scores[playerActive];
    // if the score is greater or equal than 100 then the players wins
    if (scores[playerActive] >= 100) {
      playing = false;
      document
        .querySelector(`.player-${playerActive}`)
        .classList.add("player-won");
      document
        .querySelector(`.player-${playerActive}`)
        .classList.remove("player-active");
      diceImg.classList.add("hidden");
    } else {
      //switch the player
      switchPlayer();
    }
  }
});
