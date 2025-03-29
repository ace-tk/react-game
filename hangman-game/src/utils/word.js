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
  
  export const getRandomWord = () => {
    const randomIndex = Math.floor(Math.random() * wordList.length)
    return wordList[randomIndex]
  }
  
  