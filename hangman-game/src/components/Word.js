const Word = ({ word, guessedLetters, gameStatus }) => {
    return (
      <div className="mb-8 mt-4">
        <div className="flex space-x-2 justify-center">
          {word.split("").map((letter, index) => (
            <div
              key={index}
              className="border-b-4 border-gray-700 w-8 h-10 flex items-center justify-center text-2xl font-bold"
            >
              {guessedLetters.includes(letter) || gameStatus === "lost" ? letter : ""}
            </div>
          ))}
        </div>
      </div>
    )
  }
  
  export default Word
  
  