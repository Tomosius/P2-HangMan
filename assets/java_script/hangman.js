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

function chooseWord(difficulty) {
  
}



//function to be executed when player starts new game
function newGame(){
    if (username == "") { //checking if there is already username declared
      username = document.getElementById("username").value; //if there is not username declared, doing so
    }
    console.log(username); //logging username

    function chooseWord(difficulty);
}