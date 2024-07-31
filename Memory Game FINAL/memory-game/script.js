const gameContainer = document.getElementById("game");
let cardOne = null;
let cardTwo = null;
let cardsTurned = 0;
let noClick = false;

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

function shuffle(array) {
  let counter = array.length;
  while (counter > 0) {
    let index = Math.floor(Math.random() * counter);
    counter--;
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    const newDiv = document.createElement("div");
    newDiv.classList.add("cards");
    newDiv.dataset.color = color;
    newDiv.addEventListener("click", handleCardClick);
    gameContainer.append(newDiv);
  }
}

// TODO: Implement this function!
function handleCardClick(event) {
  if (noClick || event.target.classList.contains("turned")) return;

  const currentCard = event.target;
  const color = currentCard.dataset.color;
  currentCard.style.backgroundColor = color;
  currentCard.classList.add("turned");

  if (!cardOne || !cardTwo) {
    cardOne = cardOne || currentCard;
    cardTwo = (currentCard !== cardOne) ? currentCard : null;
  }

  if (cardOne && cardTwo) {
    noClick = true;

    const colorOne = cardOne.dataset.color;
    const colorTwo = cardTwo.dataset.color;

    if (colorOne === colorTwo) {
      cardsTurned += 2;
      cardOne.removeEventListener("click", handleCardClick);
      cardTwo.removeEventListener("click", handleCardClick);
      resetCards(true);
    } else {
      setTimeout(() => {
        resetCards(false);
      }, 1000);
    }
  }

  if (cardsTurned === COLORS.length) {
    setTimeout(() => alert("YAY! YOU WON!"), 100);
  }
}

function resetCards(matched) {
  if (!matched) {
    cardOne.style.backgroundColor = "#ccc";
    cardTwo.style.backgroundColor = "#ccc";
    cardOne.classList.remove("turned");
    cardTwo.classList.remove("turned");
  }
  cardOne = null;
  cardTwo = null;
  noClick = false;
}

createDivsForColors(shuffledColors);