const SUITS = ["♠", "♥", "♦", "♣"];
const VALUES = [
  "A",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "J",
  "Q",
  "K",
];

export default class Deck {
  //set cards by default to a fresh deck - so we pass in a set # of cards then we'll have a new deck of every single card
  constructor(cards = freshDeck()) {
    this.cards = cards;
  }

  get numberOfCards() {
    return this.cards.length;
  }

  //take the top element off of our array and returns it back to us.
  pop() {
    return this.cards.shift()
  }

  //adds a card to the bottom of the deck
  push(card) {
    this.cards.push(card)
  }

  //loop through all the cards and swap with another card
  shuffle() {
    for (let i = this.numberOfCards - 1; i > 0; i--) {
       const newIndex = Math.floor(Math.random() * (i + 1))
       const oldValue = this.cards[newIndex]
       this.cards[newIndex] = this.cards[i];
       this.cards[i] = oldValue; 
    }
  }
}

class Card {
  constructor(suit, value) {
    this.suit = suit;
    this.value = value;
  }

  get color() {
      return this.suit === '♣' || this.suit === '♠' ? 'black' : 'red'
  }

  getHtml(){
    const cardDiv = document.createElement('div')
    cardDiv.innerText = this.suit
    cardDiv.classList.add('card', this.color)
    cardDiv.dataset.value = `${this.value} ${this.suit}`
    return cardDiv
  }
}


// this will create a brand new deck of 52 cards - one for each suit and value combination
//use .flatMap funtion to put all the cards into one array of all 52 cards, not 4 arrays of 13 cards based on their suits.
function freshDeck() {
  return SUITS.flatMap((suit) => {
    return VALUES.map((value) => {
      return new Card(suit, value);
    });
  });
}
