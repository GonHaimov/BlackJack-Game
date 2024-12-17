import { getRandomCard, calculateSum } from "./gameLogic.js";
import { placeBet, clearBet } from "./betting.js";


const messageEl = document.getElementById("message-el");
const sumEl = document.getElementById("sum-el");
const cardsEl = document.getElementById("cards-el");
const playerEl = document.getElementById("player-el");
const totalBetEl = document.getElementById("total-bet");
const clearBetBtn = document.getElementById("clear-bet");
const startButtonEl = document.getElementById("start-btn")
const newCardEl = document.getElementById("newCard-btn")


let player = { name: "Gon", chips: 145 };
let cards = [];
let sum = 0;
let hasBlackJack = false;
let isAlive = false;
let message = "";
let bet = 0;

playerEl.textContent = `${player.name}: $${player.chips}`;
totalBetEl.textContent = `Total bet: $${bet}`;

function updateUI(player, bet) {
    playerEl.textContent = `${player.name}: $${player.chips}`;
    totalBetEl.textContent = `Total bet: $${bet}`;
}

// Start Game
function startGame() {
    isAlive = true;
    cards = [getRandomCard(), getRandomCard()];
    sum = calculateSum(cards);
    renderGame();
}

// Render Game
function renderGame() {
    cardsEl.textContent = `Cards: ${cards.join(" ")}`;
    sumEl.textContent = `Sum: ${sum}`;

    if (sum <= 20) {
        message = "Do you want to draw a new card?"
    } else if (sum === 21) {
        message = "Wohoo! You've got BlackJack!"
        hasBlackJack = true
    } else {
        message = "You're out of the game!"
        isAlive = false
    }
    
    messageEl.textContent = message
}

// New Card
function newCard() {
    if (isAlive && !hasBlackJack) {
        const card = getRandomCard();
        cards.push(card);
        sum = calculateSum(cards);
        renderGame();
    }
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
