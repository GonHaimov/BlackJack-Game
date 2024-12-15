const messageEl = document.getElementById("message-el");
const sumEl = document.getElementById("sum-el");
const cardsEl = document.getElementById("cards-el");
const playerEl = document.getElementById("player-el");
const totalBetEl = document.getElementById("total-bet");
const clearBetEl = document.getElementById("clear-bet");

let player = {
    name: "Gon",
    chips: 145
}
let cards = []
let sum = 0
let hasBlackJack = false
let isAlive = false
let message = ""
let bet = 0


playerEl.textContent = player.name + ": $" + player.chips
totalBetEl.textContent = "Total bet: $" + bet


function getRandomCard() {
    let randomNum = Math.floor(Math.random() * 13) + 1
    if (randomNum > 10) {
        return 10;
    } else if (randomNum === 1) {
        return 11;
    }
    return randomNum;
}

function startGame() {
    isAlive = true
    const firstCard = getRandomCard()
    const secondCard = getRandomCard()
    cards = [firstCard,secondCard]
    sum = firstCard + secondCard
    renderGame()
}

function renderGame() {

    cardsEl.textContent = "Cards: "
    for(let i = 0; i < cards.length; i++) {
        cardsEl.textContent += cards[i] + " "
    }

    sumEl.textContent = "Sum: " + sum 

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

function newCard() {
    if (isAlive == true && hasBlackJack == false) {
        let newCard = getRandomCard()
        cards.push(newCard)
        sum += newCard
    } else if (hasBlackJack == true) {

    } else {

    }

    renderGame()
}

function updateBetAndChips() {
    totalBetEl.textContent = "Total bet: $" + bet
    playerEl.textContent = player.name + ": $" + player.chips

}

function placeBet(amount){
    if (player.chips < amount) {
        alert("You don't have enough chips")
        return
    }
    player.chips -= amount
    bet += amount
    updateBetAndChips()
}

function clearBet() {
    player.chips += bet
    bet = 0
    updateBetAndChips()
}

// Event listeners for bet buttons
document.getElementById("tenDollars").addEventListener("click", () => placeBet(10));
document.getElementById("fiftyDollars").addEventListener("click", () => placeBet(50));
document.getElementById("hundredDollars").addEventListener("click", () => placeBet(100));
