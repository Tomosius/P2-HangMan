const difficulties = [
    'beginner',
    'elementary',
    'intermediate',
    'advanced',
    'expert',
    'master',
    'legendary'
  ];
  
  const wordLists = {
    beginner: ['apple', 'banana', 'cat', 'dog', 'elephant', 'fish', /* add more words */],
    elementary: ['house', 'book', 'school', 'tree', 'sun', 'moon', /* add more words */],
    intermediate: ['computer', 'programming', 'language', 'keyboard', 'mouse', /* add more words */],
    advanced: ['television', 'university', 'jupiter', 'oxygen', 'diamond', /* add more words */],
    expert: ['python', 'javascript', 'algorithm', 'database', 'framework', /* add more words */],
    master: ['champion', 'phenomenal', 'hypothesis', 'incredible', /* add more words */],
    legendary: ['abcdefghijklmnopqrstuvwxyz', 'elephantine', 'xylophone', /* add more words */]
  };
  
  function getRandomWord(difficulty) {
    const words = wordLists[difficulty];
    const randomIndex = Math.floor(Math.random() * words.length);
    return words[randomIndex];
  }
  
  function displayWord(word, guessedLetters) {
    let displayedWord = '';
    for (const char of word) {
      if (guessedLetters.includes(char)) {
        displayedWord += char;
      } else {
        displayedWord += '_';
      }
    }
    return displayedWord;
  }
  
  function hangmanGame(difficulty) {
    const word = getRandomWord(difficulty).toLowerCase();
    let guessedLetters = [];
    let attempts = 7;
  
    console.log('Welcome to Hangman!');
    console.log(`Guess the word: ${displayWord(word, guessedLetters)}`);
  
    const lettersDiv = document.getElementById('letters');
    lettersDiv.innerHTML = ''; // Clear previous letters
  
    for (let i = 0; i < 26; i++) {
      const letter = String.fromCharCode(97 + i); // ASCII code for lowercase 'a' is 97
      const button = document.createElement('button');
      button.textContent = letter;
      button.onclick = () => {
        if (!guessedLetters.includes(letter)) {
          guessedLetters.push(letter);
          if (!word.includes(letter)) {
            attempts--;
          }
        }
  
        console.log(`Attempts left: ${attempts}`);
        console.log(`Word: ${displayWord(word, guessedLetters)}`);
  
        if (displayWord(word, guessedLetters) === word) {
          console.log('Congratulations! You guessed the word correctly!');
        } else if (attempts === 0) {
          console.log('Game Over! You ran out of attempts.');
        }
      };
  
      lettersDiv.appendChild(button);
    }
  }
  
  function startGame() {
    const difficultySlider = document.getElementById('difficulty');
    const difficultyValue = document.getElementById('difficultyValue');
    const difficulty = parseInt(difficultySlider.value);
  
    difficultyValue.textContent = difficulties[difficulty - 1];
  
    if (difficulty >= 1 && difficulty <= 7) {
      hangmanGame(difficulties[difficulty - 1]);
    } else {
      console.log('Invalid difficulty level. Please choose a number between 1 and 7.');
    }
  }
  