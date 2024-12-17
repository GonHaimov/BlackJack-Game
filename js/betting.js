export function placeBet(amount, player, bet, updateUI) {
  if (player.chips < amount) {
    alert("You don't have enough chips");
    return { player, bet };
  }
  player.chips -= amount;
  bet += amount;
  updateUI(player, bet);
  return { player, bet };
}

export function clearBet(player, bet, updateUI) {
  player.chips += bet;
  bet = 0;
  updateUI(player, bet);
  return { player, bet };
}
