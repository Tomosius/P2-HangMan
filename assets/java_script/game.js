const readline = require('readline');

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
  beginner: ['apple', 'banana', 'cat', 'dog', 'elephant', 'fish'],
  elementary: ['house', 'book', 'school', 'tree', 'sun', 'moon'],
  intermediate: ['computer', 'programming', 'language', 'keyboard', 'mouse'],
  advanced: ['television', 'university', 'jupiter', 'oxygen', 'diamond'],
  expert: ['python', 'javascript', 'algorithm', 'database', 'framework'],
  master: ['champion', 'phenomenal', 'hypothesis', 'incredible'],
  legendary: ['abcdefghijklmnopqrstuvwxyz', 'elephantine', 'xylophone']
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

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  rl.on('line', (input) => {
    const letter = input.trim().toLowerCase();
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
      rl.close();
    } else if (attempts === 0) {
      console.log('Game Over! You ran out of attempts.');
      rl.close();
    }
  });
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Choose difficulty (1-7):\n1. Beginner\n2. Elementary\n3. Intermediate\n4. Advanced\n5. Expert\n6. Master\n7. Legendary\n', (difficulty) => {
  difficulty = parseInt(difficulty);
  if (difficulty >= 1 && difficulty <= 7) {
    hangmanGame(difficulties[difficulty - 1]);
  } else {
    console.log('Invalid difficulty level. Please choose a number between 1 and 7.');
    rl.close();
  }
});
