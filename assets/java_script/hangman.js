//declaring variables for future use
let word = ""; //word to be guessed
let mistakeCount = 0; //mistakes per game session, max 10, then game over
let attempt = 0; //player guessing attempt
let hiddenWord = ""; //defining word to be guessed
let game = -1; // this is -1, as when player starts game, it will add 1, what will make iit zero, so later it will be possible to read full game log from nested array log_player_actions
let username = ""; //player username
let logLetter = {}; // logging all guessed letter for current game
let finalResult = ""; // win or loose
let timer = ""; //timer to log player actions
let difficulty = "beginner"; // declaring difficulty variable and setting it to lowest value for default


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
  for (let i = 0; i < word.length; i++) {
    let hiddenWordLetter = document.createElement("span");
    hiddenWordLetter.textContent = "_";
    hiddenWordLetter.className = "frame guessWordLetters";
    hiddenWordLocation.appendChild(hiddenWordLetter); 
  }
  return word; // Return the chosen word
}


//function to remove instructions section from screen
function clearGameText() {
  document.getElementById('gameText').innerHTML = "";
}

//function to create and display in HTML alphabet as separate buttons
function createAlphabet() {
  let alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let buttonContainer = document.getElementById('gameText'); // getting location where buttons will be placed
  for (let i = 0; i < alphabet.length; i++) {
    let letter = alphabet[i];
    let button = document.createElement("button");
    button.textContent = letter;
    button.className = "frame letterButton";
    buttonContainer.appendChild(button);
  }
}









//function to be executed when player starts new game
function newGame(event){
    event.preventDefault(); // disable screen update
    if (username == "") { //checking if there is already username declared
      username = document.getElementById("username").value; //if there is not username declared, doing so
    }
    console.log(username); //logging username

    chooseWord(difficulty); // choosing new word for selected difficulty

    clearGameText() //clearing text on screen so it is blank for future use

    createAlphabet() //creating alphabet
}