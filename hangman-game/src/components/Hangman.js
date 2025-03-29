"use client"

import { useState, useEffect } from "react"
import Word from "./Word"
import Keyboard from "./Keyboard"
import Figure from "./Figure"
import { getRandomWord } from "@/utils/words"

const Hangman = () => {
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
    <div className="flex flex-col items-center max-w-md mx-auto w-full">
      <Figure wrongLetters={wrongLetters} />

      <Word word={word} guessedLetters={guessedLetters} gameStatus={gameStatus} />

      {gameStatus === "won" && <div className="my-4 text-green-600 text-xl font-bold">Congratulations! You won!</div>}

      {gameStatus === "lost" && (
        <div className="my-4 text-red-600 text-xl font-bold">Game Over! The word was: {word}</div>
      )}

      <Keyboard
        guessedLetters={guessedLetters}
        wrongLetters={wrongLetters}
        handleGuess={handleGuess}
        disabled={gameStatus !== "playing"}
      />

      <button
        onClick={startNewGame}
        className="mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
      >
        {gameStatus === "playing" ? "New Game" : "Play Again"}
      </button>
    </div>
  )
}

export default Hangman