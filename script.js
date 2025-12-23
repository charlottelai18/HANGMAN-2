//DATA
let guessedLetters = [];
let wordStore = [];
let wordMutate = [];
let incorrectGuessCount = 0;

//QUERY SELECTORS
const wordDisplay = document.querySelector(".game--word--display");
const guessedBtns = document.querySelectorAll(".game--letter");
guessedBtns.forEach((btn) => {btn.addEventListener("click", checkGuessedLetter)});
const hangmanImage = document.querySelector(".game--img--status");
const gameResults = document.querySelector(".game--results")
const newGameBtn = document.querySelector(".game--new--game");
newGameBtn.addEventListener("click", startNewGame);

// RETRIEVING NEW WORD USING RANDOM WORD API
async function getWord() {
  const response = await fetch(
    "https://random-word-api.herokuapp.com/word?number=1"
  );
  const data = await response.json();
  return data[0];
}

//starting the game
async function startNewGame() {
  const word = await getWord();
  wordStore = word.split('')
  console.log(word)
  resetData();
  mutatingWord();
  displayHangmanWord();
}

//the word that the user is guessing that we will display on the screen
function mutatingWord(){
    for (let i = 0; i < wordStore.length; i++){
        wordMutate[i] = "_";
    }
}

//DISPLAYNG THE NEW WORD USING _ _ _ ON THE UI
function displayHangmanWord(){
    wordDisplay.innerHTML = wordMutate.join(" ");
}

//GUESSING LETTERS
function checkGuessedLetter(event) {
  const guessedLetter = event.target.innerText.toLowerCase();

  guessedLetters.push(guessedLetter);

  if (wordStore.includes(guessedLetter)){
    for (let i = 0; i < wordStore.length; i++){
        if (wordStore[i] === guessedLetter){
            wordMutate[i] = guessedLetter;
        }
    }
    displayHangmanWord();
    event.target.disabled = true;
  } else {
    incorrectGuessCount += 1;
    hangmanImage.src = `imgs/h-${incorrectGuessCount}.jpg`
  }
  checkIfWon();
}

function checkIfWon(){
    if (incorrectGuessCount === 10){
        gameResults.innerHTML = `YOU LOST :(, the word was ${wordStore.join("")}` 
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