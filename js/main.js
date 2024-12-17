import { getRandomCard, calculateSum } from "./gameLogic.js";
import { placeBet, clearBet } from "./betting.js";

const messageEl = document.getElementById("message-el");
const playerSumEl = document.getElementById("playerSum-el");
const playerCardsEl = document.getElementById("playerCards-el");

const dealerCardsEl = document.getElementById("dealerCards-el");

const playerEl = document.getElementById("player-el");
const totalBetEl = document.getElementById("total-bet");
const clearBetBtn = document.getElementById("clear-bet");
const startButtonEl = document.getElementById("start-btn");
const newCardEl = document.getElementById("newCard-btn");
const standBtnEl = document.getElementById("stand-btn");

let player = { name: "Gon", chips: 750 };
let playerCards = [];
let dealerCards = [];
let playerSum = 0;
let dealerSum = 0;
let hasBlackJack = false;
let isAlive = false;
let gameOver = false;
let message = "";
let bet = 0;

playerEl.textContent = `${player.name}: $${player.chips}`;
totalBetEl.textContent = `Total bet: $${bet}`;

function updateUI() {
    playerEl.textContent = `${player.name}: $${player.chips}`;
    totalBetEl.textContent = `Total bet: $${bet}`;
  }
  

  function startGame() {
    isAlive = true;
    hasBlackJack = false;
    gameOver = false;
    standBtnEl.disabled = false; // Re-enable the Stand button
    playerCards = [getRandomCard(), getRandomCard()];
    dealerCards = [getRandomCard()];
    playerSum = calculateSum(playerCards);
    dealerSum = calculateSum(dealerCards);
    bet = 0; // Reset bet
    updateUI();
    renderGame();
  }
  
  function renderGame() {
    dealerCardsEl.textContent = `Dealer Cards: ${dealerCards[0]} ?`;
    playerCardsEl.textContent = `Your Cards: ${playerCards.join(" ")}`;
    playerSumEl.textContent = `Sum: ${playerSum}`;
  
    if (playerSum === 21) {
      message = "Wohoo! You've got BlackJack!";
      hasBlackJack = true;
      endGame();
    } else if (playerSum > 21) {
      message = "You're out of the game!";
      isAlive = false;
      endGame();
    } else {
      message = "Do you want to draw a new card?";
    }
    messageEl.textContent = message;
  }
  

// New Card
function newCard() {
  if (!isAlive || gameOver) return;

  const card = getRandomCard();
  playerCards.push(card);
  playerSum = calculateSum(playerCards);

  if (playerSum > 21) {
    isAlive = false;
    message = "You're out of the game!";
    endGame();
  }
  renderGame();
}

function dealerPlay() {
    if (!isAlive || hasBlackJack || gameOver) return;
    gameOver = true;
  
    // Reveal the dealer's hidden card
    while (dealerSum < 17) {
      const card = getRandomCard(); // Get a new random card
      dealerCards.push(card);
      dealerSum = calculateSum(dealerCards);
      renderDealer();
    }
    determineWinner();
  }
  
function renderDealer() {
  dealerCardsEl.textContent = `Dealer Cards: ${dealerCards.join(" ")}`;
}

// Determine Winner
function determineWinner() {
  if (dealerSum > 21 || playerSum > dealerSum) {
    message = "You win!";
    player.chips += bet * 2; // Win bet amount
  } else if (dealerSum > playerSum) {
    message = "Dealer wins!";
  } else {
    message = "It's a draw!";
    player.chips += bet; // Return bet on draw
  }

  bet = 0; // Reset bet
  updateUI();
  messageEl.textContent = message;
}

// End Game
function endGame() {
  if (playerSum > 21 || hasBlackJack) {
    dealerPlay(); // Only reveal cards if the player is done
  }
  gameOver = true;
  bet = 0; // Reset total bet
  updateUI();
}

// Add Event Listeners
document.getElementById("tenDollars").addEventListener("click", () => {
  ({ player, bet } = placeBet(10, player, bet, updateUI));
});
document.getElementById("fiftyDollars").addEventListener("click", () => {
  ({ player, bet } = placeBet(50, player, bet, updateUI));
});
document.getElementById("hundredDollars").addEventListener("click", () => {
  ({ player, bet } = placeBet(100, player, bet, updateUI));
});
clearBetBtn.addEventListener("click", () => {
  ({ player, bet } = clearBet(player, bet, updateUI));
});

startButtonEl.addEventListener("click", startGame);
newCardEl.addEventListener("click", newCard);
standBtnEl.addEventListener("click", () => {
    if (!gameOver) {
      dealerPlay();
      standBtnEl.disabled = true; // Disable the Stand button
    }
  });
  