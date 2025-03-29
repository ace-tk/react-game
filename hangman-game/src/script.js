const words = [
    { word: "eel", hint: "An electric fish" },
    { word: "apple", hint: "A red fruit" },
    { word: "tiger", hint: "A big striped cat" },
  ];
  
  let selectedWord = "";
  let guessedLetters = [];
  let wrongAttempts = 0;
  
  const hintElement = document.querySelector("#hint span");
  const wordDisplay = document.getElementById("word-display");
  const message = document.getElementById("message");
  const keyboard = document.querySelector(".keyboard");
  const restartButton = document.getElementById("restart");
  const parts = document.querySelectorAll(".part");
  
  // Function to start a new game
  function startGame() {
    const randomIndex = Math.floor(Math.random() * words.length);
    selectedWord = words[randomIndex].word;
    guessedLetters = Array(selectedWord.length).fill("_");
    wrongAttempts = 0;
  
    hintElement.textContent = words[randomIndex].hint;
    wordDisplay.textContent = guessedLetters.join(" ");
    message.textContent = "";
    parts.forEach((part) => (part.style.display = "none"));
    keyboard.innerHTML = "";
  
    // Generate the keyboard buttons
    for (let i = 65; i <= 90; i++) {
      const letter = String.fromCharCode(i);
      const button = document.createElement("button");
      button.textContent = letter;
      button.addEventListener("click", () => handleGuess(letter));
      keyboard.appendChild(button);
    }
  }
  
  // Function to handle letter guess
  function handleGuess(letter) {
    if (selectedWord.includes(letter.toLowerCase())) {
      for (let i = 0; i < selectedWord.length; i++) {
        if (selectedWord[i] === letter.toLowerCase()) {
          guessedLetters[i] = letter;
        }
      }
      wordDisplay.textContent = guessedLetters.join(" ");
      if (!guessedLetters.includes("_")) {
        message.textContent = "🎉 You Won!";
      }
    } else {
      parts[wrongAttempts].style.display = "block";
      wrongAttempts++;
      if (wrongAttempts === 6) {
        message.textContent = `😢 You Lost! The word was "${selectedWord}".`;
      }
    }
  }
  
  // Restart the game
  restartButton.addEventListener("click", startGame);
  
  // Start the game initially
  startGame();