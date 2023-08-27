//declaring variables for future use
let word = ""; //word to be guessed
let mistakeCount = 0; //mistakes per game session, max 10, then game over
let attempt = 0; //player guessing attempt
let hiddenWord = []; //defining word to be guessed as an array
let game = -1; // this is -1, as when player starts game, it will add 1, what will make it zero, so later it will be possible to read the full game log from the nested array log_player_actions
let username = ""; //player username
let logLetter = {}; // logging all guessed letter for the current game
let gameResult = 0; // win = 1, loose = 0
let elapsedTimeInSeconds = ""; //timer to log player actions
let difficulty = "beginner"; // declaring difficulty variable and setting it to the lowest value for default
let startTime = 0; //setting to zero timer when the game starts
let winsInRow = 0; //how many times player won in a row
let sliderValue = 0; //default slider value for difficulties
let sliderValueOther = 0; //will be used to reveal new buttons in game

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
function hangmanImageUpdate() {
  let imageElement = document.getElementById("image");
  imageElement.src = "assets/images/h" + mistakeCount + ".png";
}

// Changing label "beginner" to other difficulties from the array based on the slider value
function updateSliderDifficultyLabel() {
  let slider = document.getElementById("difficultyRange");
  let label = document.getElementById("difficultyLabel");
  // Map the slider value to the corresponding difficulty level
  sliderValue = slider.value;
  difficulty = difficultyArray[sliderValue];
  // Update the displayed difficulty label
  label.innerHTML = difficulty;
  console.log(difficulty);
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
  } else {
    mistakeCount++; // Increment the global mistakeCount variable
    hangmanImageUpdate();
  }
  // Check if the word has been completely guessed

  if (hiddenWord.join('').toUpperCase() === word.toUpperCase()) {
    winsInRow++;
    gameResult = 1;
    document.getElementById("image").style.display = "none"; //hiding picture
    document.getElementById("gameWonText").style.display = ""; //un-hiding congratulations text
    let displayWinlocation = document.getElementById('gameWonText');
    displayWinlocation.className = "image";
    let displayWinText = ["You have WON ", winsInRow, " times in a Row !!!"]; // Use a different variable name
    for (let i = 0; i < displayWinText.length; i++) {
      let displayWinParagraph = document.createElement("p"); // Use a different variable name
      displayWinParagraph.textContent = displayWinText[i];
      displayWinParagraph.className = "frame guessWordLetters";
      displayWinlocation.appendChild(displayWinParagraph);
    }
    gameOver();
    updateHiddenWord(hiddenWord);
  }
  if (mistakeCount === 10) {
  winsInRow = 0;
  gameResult = 0;
  gameOver ();
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
  document.getElementById("image").style.display = ""; //unhiding picture
  document.getElementById("gameWonText").style.display = "none"; //hiding game won !
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

//when player wins or looses execute gameOver function
function gameOver() {
  sliderValueOther = sliderValue; //resetting sliderValueOther
  displayHiddenWord(); //revealing hidden word
  document.getElementById('timerDisplay').style.display = "none";
  // getting current difficulty level
  slider = document.getElementById("difficultyRange");
  sliderValue = slider.value ;
  document.getElementById("difficultyRange").value = sliderValue;
  difficulty = difficultyArray[sliderValue];
  //code to create 3 buttons depending on win/loose situation
  //code for button container where buttons will be displayed
  let buttonContainer = document.getElementById('gameText');
  buttonContainer.innerHTML = "";
  //Try Again will be shown by default each time
  gameTryAgainButton(buttonContainer, sliderValue);
  // code to check if player has LOST
  if (gameResult == 0) { // player has lost
    if (sliderValue == 0) { //if it is easiest level of game, we will change just "gameTreyAgainButton" Text content
      document.getElementById('buttonTryAgainId').innerHTML = 'This is ALREADY EASIEST level of game, please try HARDER';
    }
    if (sliderValue > 0) { // will reveal Other button because it is not easiest level
      sliderValueOther = sliderValue - 1;
      gameTryAgainButtonOther (buttonContainer, sliderValueOther);
    }
  }
  //code to check if player has WON
  if (gameResult == 1) { //player has WON
    if (sliderValue == 6) { //checking iif it is already hardest level of game, will change "gameTryAgainButton" text content
      document.getElementById('buttonTryAgainId').innerHTML = 'This is HARDEST level of game! <br> Congratulations! lets try again';
    }
    if (sliderValue < 6) { // will reveal Other button because it is not hardest level
      sliderValueOther = sliderValue + 1;
      gameTryAgainButtonOther (buttonContainer, sliderValueOther);
    }
  }


}

//function to display button Try again
function gameTryAgainButton (buttonContainer, sliderValue) {
  //code to create button Try Again
  let buttonTryAgain = document.createElement('button');
  buttonTryAgain.className = "frame gameOverButton";
  buttonTryAgain.id = "buttonTryAgainId";
  let currentDifficulty = difficultyArray[sliderValue];
  buttonTryAgain.innerHTML = 'Try playing game again with same "' + currentDifficulty + '" difficulty'  + gameResult;
  // add event listener to button
  buttonTryAgain.addEventListener('click', newGame); 
  buttonContainer.appendChild(buttonTryAgain);
}

//function to display button Try again
function gameTryAgainButtonOther (buttonContainer, sliderValueOther) {
 //code to create button Try Again Easier
    let buttonTryAgainOther = document.createElement('button');
    buttonTryAgainOther.className = "frame gameOverButton";
    let difficultyOther = difficultyArray[sliderValueOther];
    buttonTryAgainOther.innerHTML = 'Try playing "' + difficultyOther + '" difficulty' + sliderValueOther;
    // add event listener to button
    buttonTryAgainOther.addEventListener('click', newGameOther); 
    buttonContainer.appendChild(buttonTryAgainOther)
}

//function to play Other difficulty Game
function newGameOther() {
  document.getElementById("difficultyRange").value =sliderValueOther; //reducing easier difficulty by 1
  updateSliderDifficultyLabel(); //updating slider so player will see new label of difficulty
  newGame(event);
}
