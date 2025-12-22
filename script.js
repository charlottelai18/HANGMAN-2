//DATA
let guessedLetters = [];
let wordStore = [];
let wordMutate = [];

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


function checkGuessedLetter(event) {
  const guessedLetter = event.target.innerText.toLowerCase();
  console.log("User guessed:", guessedLetter);

  if (wordStore.includes(guessedLetter)){
    guessedLetters.push(guessedLetter);
    
    for (let i = 0; i < wordStore.length; i++){
        if (wordStore[i] === guessedLetter){
            wordMutate[i] = guessedLetter;
        }
    }
    
    displayHangmanWord();
    console.log(guessedLetter + " is in the word!");
  } else {
    console.log(guessedLetter + " is not in the word");
  }
}
