"use client"

const Keyboard = ({ guessedLetters, wrongLetters, handleGuess, disabled }) => {
  const rows = [
    ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
    ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
    ["z", "x", "c", "v", "b", "n", "m"],
  ]

  return (
    <div className="w-full max-w-md">
      {rows.map((row, rowIndex) => (
        <div key={rowIndex} className="flex justify-center mb-2">
          {row.map((letter) => {
            const isGuessed = guessedLetters.includes(letter)
            const isWrong = wrongLetters.includes(letter)

            return (
              <button
                key={letter}
                onClick={() => handleGuess(letter)}
                disabled={isGuessed || disabled}
                className={`
                  w-8 h-10 m-1 rounded font-medium text-sm
                  ${
                    isGuessed
                      ? isWrong
                        ? "bg-red-500 text-white"
                        : "bg-green-500 text-white"
                      : "bg-gray-200 hover:bg-gray-300"
                  }
                  ${disabled && !isGuessed ? "opacity-50 cursor-not-allowed" : ""}
                `}
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

export default Keyboard

