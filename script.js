//
// RETRIEVING NEW WORD USING RANDOM WORD API
//
async function getWord() {
  const response = await fetch(
    "https://random-word-api.herokuapp.com/word?number=1"
  );
  const data = await response.json();
  return data[0];
}

async function startNewGame() {
  const word = await getWord();
  displayHangmanWord(word);
  console.log("New word:", word);
}

const newGameBtn = document.querySelector(".game--new--game");
newGameBtn.addEventListener("click", startNewGame);

//DISPLAYNG THE NEW WORD USING ___ ON THE UI
const wordDisplay = document.querySelector(".game--word--display");
function displayHangmanWord(word){
    wordDisplay.innerHTML = "";

    for (let i = 0; i < word.length; i++){
        wordDisplay.innerHTML += "_ "
    }
}