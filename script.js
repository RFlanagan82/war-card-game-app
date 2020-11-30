import Deck from "./deck.js";

//need to assign number values to each card
const CARD_VALUE_MAP = {
  2: 2,
  3: 3,
  4: 4,
  5: 5,
  6: 6,
  7: 7,
  8: 8,
  9: 9,
  10: 10,
  J: 11,
  Q: 12,
  K: 13,
  A: 14,
};

const computerCardSlot = document.querySelector(".computer-card-slot");
const playerCardSlot = document.querySelector(".player-card-slot");
const computerDeckElement = document.querySelector(".computer-deck");
const playerDeckElement = document.querySelector(".player-deck");
const text = document.querySelector(".text");

let playerDeck, computerDeck, inRound, stop;

document.addEventListener("click", () => {
  if (stop) {
      startGame();
      return
  }

  if (inRound) {
    cleanBeforeRound();
  } else {
    flipCards();
  }
});

startGame();
function startGame() {
  const deck = new Deck();
  deck.shuffle();

  //need to give half of the cards to each - the computer and the player
  const deckMidpoint = Math.ceil(deck.numberOfCards / 2);

  //first 26 cards of the deck
  playerDeck = new Deck(deck.cards.slice(0, deckMidpoint));

  //second 26 cards of the deck
  computerDeck = new Deck(deck.cards.slice(deckMidpoint, deck.numberOfCards));

  inRound = false;
  stop = false;

  cleanBeforeRound();

}

function cleanBeforeRound() {
  inRound = false;
  text.innerText = "";
  computerCardSlot.innerHTML = "";
  playerCardSlot.innerHTML = "";

  updateDeckCount();
}

//create logic to flip the cards and push used card to 'bottom of the deck'
function flipCards() {
  inRound = true;

  const playerCard = playerDeck.pop();
  const computerCard = computerDeck.pop();

  //updates html div each time a card is flipped
  playerCardSlot.appendChild(playerCard.getHtml());
  computerCardSlot.appendChild(computerCard.getHtml());

  updateDeckCount();

  if (isRoundWinner(playerCard, computerCard)) {
    text.innerText = "You Win!";
    playerDeck.push(playerCard);
    playerDeck.push(computerCard);
  } else if (computerCard, playerCard) {
      text.innerText = "You Lose!";
      computerDeck.push(playerCard);
      computerDeck.push(computerCard);
  } else {
    text.innerText = "It's a Draw!";
    playerDeck.push(playerCard);
    computerDeck.push(computerCard);
  }

  if (isGameOver(playerDeck)) {
      text.innerText = 'You lost the game!';
      stop = true;
  } else if (isGameOver(computerDeck)){
      text.innerText = 'You won the game!';
  }
}

//create a function to change the number of cards each player has based on the current round.
function updateDeckCount() {
  computerDeckElement.innerText = computerDeck.numberOfCards;
  playerDeckElement.innerText = playerDeck.numberOfCards;
}

//create a function to validate who won the round
function isRoundWinner(cardOne, cardTwo) {
  return CARD_VALUE_MAP[cardOne.value] > CARD_VALUE_MAP[cardTwo.value];
}

//create a function to check to see if the player has lost all their cards
function isGameOver(deck) {
return deck.numberOfCards === 0;
}
