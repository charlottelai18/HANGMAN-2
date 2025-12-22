async function getWord() {
  const response = await fetch(
    "https://random-word-api.herokuapp.com/word?number=1"
  );
  const data = await response.json();
  return data[0];
}

async function startNewGame() {
  const word = await getWord();
  console.log("New word:", word);
}

const newGameBtn = document.querySelector(".game--new--game");
newGameBtn.addEventListener("click", startNewGame);
