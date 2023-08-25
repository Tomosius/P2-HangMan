//declaring variables for future use
let word = ""; //word to be guessed
let mistakeCount = 0; //mistakes per game session, max 10, then game over
let attempt = 0; //player guessing attempt
let hiddenWord = ""; //defining word to be guessed
let game = -1; // this is -1, as when player starts game, it will add 1, what will make iit zero, so later it will be possible to read full game log from nested array log_player_actions
let username = ""; //player username
let logLetter = {}; // logging all guessed letter for current game
let finalResult = ""; // win or loose
let elapsedTimeInSeconds = ""; //timer to log player actions
let difficulty = "beginner"; // declaring difficulty variable and setting it to lowest value for default
let startTime = 0; //setting to zero timer when game starts


/* Array for logging all player actions in this pattern:
  "Difficulty",
  "Word",
  "Total of attempts per word",
  ["attempt number", "Letter guessed", "wrong or Correct", "time"],
  "Win or Loose" */
let logPlayerActions = {};

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

// array of hangman image filenames to be used in function hangmanUpdatePicture
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
  imageElement.src = "/assets/images/" + hangmanImages[mistakeCount];
  console.log("mistake count:" + mistakeCount);
};

// Changing label "beginner" to other difficulties from array based on slider value
function updateSliderDifficultyLabel() {
  let slider = document.getElementById("difficultyRange");
  let label = document.getElementById("difficultyLabel");
  // Map the slider value to the corresponding difficulty level
  let sliderValue = slider.value;
  difficulty = difficultyArray[sliderValue];
  // Update the displayed difficulty label
  label.innerHTML = difficulty;
  // Correct the scope of the username variable
  console.log(difficulty);
}

//function to generate new word for game and display in "_"
function chooseWord(difficulty) {
  let wordList = wordArray[difficulty];
  let wordIndex = Math.floor(Math.random() * wordList.length);
  word = wordList[wordIndex]; // Declare and assign the word variable
  // Get the element where the hidden word will be displayed
  let hiddenWordLocation = document.getElementById('guessedWord');
  hiddenWordLocation.innerHTML = ''; // Clear previous content
  hiddenWord = "_".repeat(word.length);
  return word; // Return the chosen word
}

//function to update hidden word
function updateHiddenWord(word) {
  for (let i = 0; i < hiddenWord.length; i++) {
    let hiddenWordLetter = document.createElement("span");
    hiddenWordLetter.textContent = hiddenWordLetter[i];
    hiddenWordLetter.className = "frame guessWordLetters";
    hiddenWordLocation.appendChild(hiddenWordLetter); 
  }
}



// Function to create and display in HTML alphabet as separate buttons
function createAlphabet() {
  let alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let buttonContainer = document.getElementById('gameText'); // Getting location where buttons will be placed
  buttonContainer.innerHTML = ""; // Clear previous content
  for (let i = 0; i < alphabet.length; i++) {
    let letter = alphabet[i];
    let button = document.createElement("button");
    button.textContent = letter;
    button.className = "frame letterButton";
    buttonContainer.appendChild(button);
    button.addEventListener("click", function() {
      letterGuess(letter);    // Add event listener to the button
    });
  }
}

// Function to handle a letter guess
function letterGuess(letter, word) {
  for (let i = 0; i<word.length; i++) { //checking if word contains pressed letter
    if (letter === word[i]) { //if word conntains letter, will be executed below:
      hiddenWord = hiddenWord.slice(0, i) + letter + hiddenWord.slice(i + 1)
    }
  }
updateHiddenWord(word);
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
// Function to calculate elapsed time and update display
function updateTimer() {
  let currentTime = Date.now();
  let elapsedTimeInSeconds = Math.floor((currentTime - startTime) / 1000);
  updateTimerDisplay(elapsedTimeInSeconds);
}








//function to be executed when player starts new game
function newGame(event){
    event.preventDefault(); // disable screen update
    if (username == "") { //checking if there is already username declared
      username = document.getElementById("username").value; //if there is not username declared, doing so
    }
    console.log(username); //logging username
    chooseWord(difficulty); // choosing new word for selected difficulty
    updateHiddenWord(word); //create hidden word
    createAlphabet(); //creating alphabet
    startTimer(); // setting current time when game starts

}
