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
const guessCounter = document.querySelector(".game--guess--counter");
newGameBtn.addEventListener("click", startNewGame);

function disableButtons(){
    guessedBtns.forEach((btn) => {btn.disabled = true});
}
guessedBtns.forEach((btn) => {btn.disabled = true});

//DISPLAY 0/10 WRONG GUESSES
guessCounter.innerHTML = `Wrong guesses: ${incorrectGuessCount}/10`;

//HELPER FUNCTION THAT RE-RENDERS WRONG GUESSES AFTER EVERY GUESS
function updateWrongGuess(){
    guessCounter.innerHTML = `Wrong guesses: ${incorrectGuessCount}/10`;
}

async function getWord() {
  const res = await fetch("https://random-word-api.vercel.app/api?words=1");
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const data = await res.json(); // e.g. ["banana"]
  return data[0];
}


//starting the game
async function startNewGame() {
  const word = await getWord();
  wordStore = word.split('')
  guessedBtns.forEach((btn) => {btn.disabled = false});
  resetData();
  updateWrongGuess();
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
    event.target.disabled = true;
    updateWrongGuess();
  }
  checkIfWon();
}

//CHECK IF WON AFTER EVERY GUESS BY COUNTING NUMBER OF _ _ _ IN TRACKING ARRAY
function checkIfWon(){
    if (incorrectGuessCount === 10){
        gameResults.innerHTML = `You lost :( the word was ${wordStore.join("")}` 
        incorrectGuessCount = 0;
        guessedBtns.forEach((btn) => {btn.disabled = true});
    }
    else if (incorrectGuessCount < 10 && !wordMutate.includes("_")){
        gameResults.innerHTML = "Congrats you won!"
    }
}

//RESET ALL DATA AND TRACKING ALL WORDS
function resetData(){
    guessedLetters = [];
    wordMutate = [];
    incorrectGuessCount = 0;
    gameResults.innerHTML = "";
    hangmanImage.src = `imgs/h-${0}.jpg`
    guessedBtns.forEach((btn) => {btn.disabled = false});
}