//DATA
let guessedLetters = [];
let wordStore = [];
let wordMutate = [];
let incorrectGuessCount = 0;

// RETRIEVING NEW WORD USING RANDOM WORD API
async function getWord() {
  const response = await fetch(
    "https://random-word-api.herokuapp.com/word?number=1"
  );
  const data = await response.json();
  return data[0];
}

async function startNewGame() {
  const word = await getWord();
  wordStore = word.split('')
  resetData();
  mutatingWord();
  displayHangmanWord();
  console.log("New word:", word);
}

const newGameBtn = document.querySelector(".game--new--game");
newGameBtn.addEventListener("click", startNewGame);

function mutatingWord(){
    for (let i = 0; i < wordStore.length; i++){
        wordMutate[i] = "_";
    }
}

//DISPLAYNG THE NEW WORD USING ___ ON THE UI
const wordDisplay = document.querySelector(".game--word--display");
function displayHangmanWord(){
    wordDisplay.innerHTML = wordMutate.join(" ");
}

//GUESSING LETTERS
const guessedBtns = document.querySelectorAll(".game--letter");
guessedBtns.forEach((btn) => {btn.addEventListener("click", checkGuessedLetter)});
const hangmanImage = document.querySelector(".game--img--status");

function checkGuessedLetter(event) {
  const guessedLetter = event.target.innerText.toLowerCase();
  console.log("User guessed:", guessedLetter);

  guessedLetters.push(guessedLetter);

  if (wordStore.includes(guessedLetter)){
    for (let i = 0; i < wordStore.length; i++){
        if (wordStore[i] === guessedLetter){
            wordMutate[i] = guessedLetter;
        }
    }
    displayHangmanWord();
    event.target.disabled = true;
    console.log(guessedLetter + " is in the word!");
  } else {
    incorrectGuessCount += 1;
    hangmanImage.src = `imgs/h-${incorrectGuessCount}.jpg`
    console.log(guessedLetter + " is not in the word");
  }
  checkIfWon();
  console.log(guessedLetters)
  console.log(wordStore)
  console.log(wordMutate)
}

const gameResults = document.querySelector(".game--results")
function checkIfWon(){
    if (incorrectGuessCount === 10){
        gameResults.innerHTML = "YOU LOST TRY AGAIN"
        incorrectGuessCount = 0;
        guessedBtns.forEach((btn) => {btn.disabled = true});
    }
    else if (incorrectGuessCount < 10 && !wordMutate.includes("_")){
        gameResults.innerHTML = "YAY U WON"
    }
}

function resetData(){
    guessedLetters = [];
    wordMutate = [];
    incorrectGuessCount = 0;
    gameResults.innerHTML = "";
    hangmanImage.src = `imgs/h-${0}.jpg`
    guessedBtns.forEach((btn) => {btn.disabled = false});
}