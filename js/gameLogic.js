export function getRandomCard() {
  let randomNum = Math.floor(Math.random() * 13) + 1;
  return randomNum > 10 ? 10 : randomNum === 1 ? 11 : randomNum;
}

export function calculateSum(cards) {
  return cards.reduce((sum, card) => sum + card, 0);
}
