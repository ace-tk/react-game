const Figure = ({ wrongLetters }) => {
    const errors = wrongLetters.length
  
    return (
      <div className="relative h-60 w-60">
        {/* Scaffold */}
        <div className="absolute w-16 h-1 bg-gray-800 bottom-0 left-16" />
        <div className="absolute w-1 h-60 bg-gray-800 left-16" />
        <div className="absolute w-32 h-1 bg-gray-800 top-0 left-16" />
        <div className="absolute w-1 h-12 bg-gray-800 top-0 right-12" />
  
        {/* Head */}
        {errors > 0 && <div className="absolute w-12 h-12 rounded-full border-4 border-gray-800 top-12 right-6" />}
  
        {/* Body */}
        {errors > 1 && <div className="absolute w-1 h-24 bg-gray-800 top-24 right-12" />}
  
        {/* Arms */}
        {errors > 2 && <div className="absolute w-12 h-1 bg-gray-800 top-28 right-12 rotate-45" />}
        {errors > 3 && <div className="absolute w-12 h-1 bg-gray-800 top-28 right-1 -rotate-45" />}
  
        {/* Legs */}
        {errors > 4 && <div className="absolute w-12 h-1 bg-gray-800 top-48 right-12 rotate-45" />}
        {errors > 5 && <div className="absolute w-12 h-1 bg-gray-800 top-48 right-1 -rotate-45" />}
      </div>
    )
  }
  
  export default Figure  