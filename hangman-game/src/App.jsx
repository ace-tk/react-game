"use client"

import { useState, useEffect } from "react"
import "./App.css"

// Word list
const wordList = [
  "javascript",
  "react",
  "component",
  "function",
  "developer",
  "programming",
  "interface",
  "application",
  "keyboard",
  "computer",
  "algorithm",
  "variable",
  "database",
  "framework",
  "library",
  "responsive",
  "frontend",
  "backend",
  "deployment",
  "server",
]

const getRandomWord = () => {
  const randomIndex = Math.floor(Math.random() * wordList.length)
  return wordList[randomIndex]
}

// Figure Component
const Figure = ({ wrongLetters }) => {
  const errors = wrongLetters.length

  return (
    <div className="figure">
      {/* Scaffold */}
      <div className="figure-part scaffold-base"></div>
      <div className="figure-part scaffold-vertical"></div>
      <div className="figure-part scaffold-horizontal"></div>
      <div className="figure-part scaffold-rope"></div>

      {/* Head */}
      {errors > 0 && <div className="figure-part head"></div>}

      {/* Body */}
      {errors > 1 && <div className="figure-part body"></div>}

      {/* Arms */}
      {errors > 2 && <div className="figure-part arm-left"></div>}
      {errors > 3 && <div className="figure-part arm-right"></div>}

      {/* Legs */}
      {errors > 4 && <div className="figure-part leg-left"></div>}
      {errors > 5 && <div className="figure-part leg-right"></div>}
    </div>
  )
}

// Word Component
const Word = ({ word, guessedLetters, gameStatus }) => {
  return (
    <div className="word">
      {word.split("").map((letter, index) => (
        <div key={index} className="letter">
          {guessedLetters.includes(letter) || gameStatus === "lost" ? letter : ""}
        </div>
      ))}
    </div>
  )
}

// Keyboard Component
const Keyboard = ({ guessedLetters, wrongLetters, handleGuess, disabled }) => {
  const rows = [
    ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
    ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
    ["z", "x", "c", "v", "b", "n", "m"],
  ]

  return (
    <div className="keyboard">
      {rows.map((row, rowIndex) => (
        <div key={rowIndex} className="keyboard-row">
          {row.map((letter) => {
            const isGuessed = guessedLetters.includes(letter)
            const isWrong = wrongLetters.includes(letter)

            let buttonClass = "key"
            if (isGuessed) {
              buttonClass += isWrong ? " wrong" : " correct"
            }
            if (disabled && !isGuessed) {
              buttonClass += " disabled"
            }

            return (
              <button
                key={letter}
                onClick={() => handleGuess(letter)}
                disabled={isGuessed || disabled}
                className={buttonClass}
              >
                {letter.toUpperCase()}
              </button>
            )
          })}
        </div>
      ))}
    </div>
  )
}

// Main Hangman Game Component
function App() {
  const [word, setWord] = useState("")
  const [guessedLetters, setGuessedLetters] = useState([])
  const [wrongLetters, setWrongLetters] = useState([])
  const [gameStatus, setGameStatus] = useState("playing") // 'playing', 'won', 'lost'

  // Initialize game
  useEffect(() => {
    startNewGame()
  }, [])

  const startNewGame = () => {
    const newWord = getRandomWord()
    setWord(newWord)
    setGuessedLetters([])
    setWrongLetters([])
    setGameStatus("playing")
  }

  const handleGuess = (letter) => {
    if (gameStatus !== "playing" || guessedLetters.includes(letter)) {
      return
    }

    const newGuessedLetters = [...guessedLetters, letter]
    setGuessedLetters(newGuessedLetters)

    if (!word.includes(letter)) {
      const newWrongLetters = [...wrongLetters, letter]
      setWrongLetters(newWrongLetters)

      // Check if lost
      if (newWrongLetters.length >= 6) {
        setGameStatus("lost")
      }
    } else {
      // Check if won
      const isWordGuessed = word.split("").every((char) => newGuessedLetters.includes(char))

      if (isWordGuessed) {
        setGameStatus("won")
      }
    }
  }

  return (
    <div className="app">
      <h1>Hangman Game</h1>

      <div className="game-container">
        <Figure wrongLetters={wrongLetters} />

        <Word word={word} guessedLetters={guessedLetters} gameStatus={gameStatus} />

        {gameStatus === "won" && <div className="message win">Congratulations! You won!</div>}

        {gameStatus === "lost" && <div className="message lose">Game Over! The word was: {word}</div>}

        <Keyboard
          guessedLetters={guessedLetters}
          wrongLetters={wrongLetters}
          handleGuess={handleGuess}
          disabled={gameStatus !== "playing"}
        />

        <button onClick={startNewGame} className="new-game-btn">
          {gameStatus === "playing" ? "New Game" : "Play Again"}
        </button>
      </div>
    </div>
  )
}

export default App

