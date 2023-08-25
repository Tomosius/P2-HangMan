//declaring variables for future use
let word = ""; //word to be guessed
let mistakeCount = 0; //mistakes per game session, max 10, then game over
let attempt = 0; //player guessing attempt
let hiddenWord = []; //defining word to be guessed as an array
let game = -1; // this is -1, as when player starts game, it will add 1, what will make it zero, so later it will be possible to read the full game log from the nested array log_player_actions
let username = ""; //player username
let logLetter = {}; // logging all guessed letter for the current game
let finalResult = ""; // win or loose
let elapsedTimeInSeconds = ""; //timer to log player actions
let difficulty = "beginner"; // declaring difficulty variable and setting it to the lowest value for default
let startTime = 0; //setting to zero timer when the game starts
let winsInRow = 0;

//Array of difficulties
const difficultyArray = [
  "beginner",
  "easy",
  "intermediate",
  "advanced",
  "expert",
  "master",
  "legendary"
];

// Words list for each difficulty
const wordArray = {
  beginner: ["btomas","bjonas"],
  easy: ["etomas", "ejonas"],
  intermediate: ["itomas", "ijonas"],
  advanced: ["atomas", "ajonas"],
  expert: ["xtomas", "xjonas"],
  master: ["mtomas", "mjonas"],
  legendary: ["ltomas", "ljonas"],
};

// array of hangman image filenames to be used in the function hangmanUpdatePicture
const hangmanImages = [
  "h1.png",
  "h2.png",
  "h3.png",
  "h4.png",
  "h5.png",
  "h6.png",
  "h7.png",
  "h8.png",
  "h9.png",
  "h10.png"
];

// Function to update the hangman picture 
function hangmanImageUpdate(mistakeCount) {
  let imageElement = document.getElementById("image");
  imageElement.src = "assets/images/h" + mistakeCount + ".png";
}

// Changing label "beginner" to other difficulties from the array based on the slider value
function updateSliderDifficultyLabel() {
  let slider = document.getElementById("difficultyRange");
  let label = document.getElementById("difficultyLabel");
  // Map the slider value to the corresponding difficulty level
  let sliderValue = slider.value;
  difficulty = difficultyArray[sliderValue];
  // Update the displayed difficulty label
  label.innerHTML = difficulty;
  // Correct the scope of the username variable
  return difficulty;
}

//function to generate a new word for the game and display it as "_"
function chooseWord(difficulty) {
  let wordList = wordArray[difficulty];
  let wordIndex = Math.floor(Math.random() * wordList.length);
  word = wordList[wordIndex]; // Declare and assign the word variable
  // Get the element where the hidden word will be displayed
  let hiddenWordLocation = document.getElementById('guessedWord');
  hiddenWordLocation.innerHTML = ''; // Clear previous content
  hiddenWord = [];
    for (let i = 0; i < word.length; i++) {
    hiddenWord.push("_");
    }
  // Initialize the hiddenWord array with underscores
return word; // Return the chosen word
}

//function to update the hidden word
function updateHiddenWord(hiddenWord) {
  let hiddenWordLocation = document.getElementById('guessedWord');
  hiddenWordLocation.innerHTML = ''; // Clear previous content

  for (let i = 0; i < hiddenWord.length; i++) {
    let hiddenWordLetter = document.createElement("span");
    hiddenWordLetter.textContent = hiddenWord[i];
    hiddenWordLetter.className = "frame guessWordLetters";
    hiddenWordLocation.appendChild(hiddenWordLetter);
  }
}

// Function to create and display in HTML alphabet as separate buttons
function createAlphabet() {
  let alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let buttonContainer = document.getElementById('gameText'); // Getting the location where buttons will be placed
  buttonContainer.innerHTML = ""; // Clear previous content
  for (let i = 0; i < alphabet.length; i++) {
    let letter = alphabet[i];
    let button = document.createElement("button");
    button.textContent = letter;
    button.className = "frame letterButton";
    buttonContainer.appendChild(button);

    function letterClickHandler() {
      console.log("Letter clicked: " + letter); // Debugging
      button.style.backgroundColor = "rgb(136, 8, 8)"; // Set background color to red
      letterGuess(letter, hiddenWord, word);
      button.removeEventListener("click", letterClickHandler); // Remove the event listener after letterGuess is executed
    }

    button.addEventListener("click", letterClickHandler);
  }
}


// Function to handle a letter guess
function letterGuess(letter, hiddenWord, word) {
  letter = letter.toLowerCase(); // Convert letter to lowercase for comparison
  if (word.includes(letter)) {
    for (let i = 0; i < word.length; i++) {
      let lowerCaseWordChar = word[i].toLowerCase();
      if (letter === lowerCaseWordChar) {
        hiddenWord[i] = letter.toUpperCase(); // Update the corresponding index in the hiddenWord array
      }
    }
    updateHiddenWord(hiddenWord);
    // Check if the word has been completely guessed
    if (hiddenWord.join("").toUpperCase() === word.toUpperCase()) {
      winsInRow++;
      document.getElementById('Contact').innerHTML = winsInRow;
      gameOver(mistakeCount, winsInRow);
    }
  } else {
    mistakeCount++; // Increment the global mistakeCount variable
    hangmanImageUpdate(mistakeCount);

  }
  updateHiddenWord(hiddenWord);
  if (mistakeCount === 10) {
  winsInRow = 0;
  gameOver (mistakeCount, winsInRow);
}
}


// Function to update the timer display
function updateTimerDisplay(elapsedTimeInSeconds) {
  let timerElement = document.getElementById("timerDisplay");
  timerElement.textContent = elapsedTimeInSeconds;
}

// Function to start the timer
function startTimer() {
  startTime = Date.now(); // Set the start time to the current time
  // Set up a timer to update the display every second (1000 milliseconds)
  setInterval(updateTimer, 1000);
}

// Function to calculate elapsed time and update the display
function updateTimer() {
  let currentTime = Date.now();
  let elapsedTimeInSeconds = Math.floor((currentTime - startTime) / 1000);
  updateTimerDisplay(elapsedTimeInSeconds);
}

//function to be executed when the player starts a new game
function newGame(event) {
  mistakeCount = 0;
  event.preventDefault(); // Disable screen update
  if (username === "") { // Checking if there is already a username declared
    username = document.getElementById("username").value; // If there is no username declared, do so
  }
  chooseWord(difficulty); // Choosing a new word for the selected difficulty

  // Initialize the hiddenWord array with underscores
  hiddenWord = Array.from({ length: word.length }, () => "_");

  updateHiddenWord(hiddenWord); // Create hidden word
  createAlphabet(); // Creating alphabet
  startTimer(); // Setting the current time when the game starts
}

//when player wins or looses execute gameOver function
function gameOver(mistakeCount, difficulty) {
  if (mistakeCount === 10) {
    //displaying hidden word
    displayHiddenWord();


    let buttonContainer = document.getElementById('gameText');
    buttonContainer.innerHTML = "";

    let buttonTryAgain = document.createElement('button');
    buttonTryAgain.className = "frame gameOverButton";
    buttonTryAgain.textContent = "Try Again";
    buttonContainer.appendChild(buttonTryAgain);
    buttonTryAgain.addEventListener('click', newGame);

    const wordIds = Object.keys(wordArray).reduce((acc, difficulty) => {
      acc[difficulty] = wordArray[difficulty].map(word => word);
      return acc;
    }, {});



    let buttonTryAgainEasier = document.createElement('button');
    buttonTryAgainEasier.className = "frame gameOverButton";
    buttonTryAgainEasier.textContent = "Try Easier Difficulty ";
    buttonContainer.appendChild(buttonTryAgainEasier);
    slider = document.getElementById("difficultyRange");
    sliderValue = slider.value - 1;
    document.getElementById("difficultyRange").value = sliderValue
    updateSliderDifficultyLabel()
    buttonTryAgainEasier.textContent = "Try Easier Difficulty " + document.getElementById("difficultyLabel").textContent;
    buttonTryAgainEasier.addEventListener('click', newGame); // Start a new game with the updated difficulty level
  }    
}

//function to reveal hidden word
function displayHiddenWord() {
  let hiddenWordLocation = document.getElementById('guessedWord');
  hiddenWordLocation.innerHTML = ''; // Clear previous content

  for (let i = 0; i < word.length; i++) {
    let hiddenWordLetter = document.createElement("span");

    if (hiddenWord[i].toUpperCase() === word[i].toUpperCase()) {
      hiddenWordLetter.textContent = hiddenWord[i];
      hiddenWordLetter.className = "frame guessWordLetters";
    } else {
      hiddenWordLetter.textContent = word[i].toUpperCase();
      hiddenWordLetter.className = "frame guessWordLetters";
      hiddenWordLetter.style.backgroundColor = "rgba(136, 8, 8, 0.5)";
    }

    hiddenWordLocation.appendChild(hiddenWordLetter);
  }
}


