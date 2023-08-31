//declaring variables for future use
let timerInterval;
let word = ""; //word to be guessed
let mistakeCount = 0; //mistakes per game session, max 10, then game over
let attempt = 0; //player guessing attempt
let hiddenWord = []; //defining word to be guessed as an array
let game = 0 ; // this is as when player starts game, it will add 1, what will make it zero, so later it will be possible to read the full game log from the nested array log_player_actions
let username = ""; //player username
let logLetterNestedCurrentGame = []; // logging all guessed letter for the current game
let gameResult = 0; // win = 1, loose = 0
let difficulty = "beginner"; // declaring difficulty variable and setting it to the lowest value for default
let startTime = 0; //setting to zero timer when the game starts
let winsInRow = 0; //how many times player won in a row
let sliderValue = 0; //default slider value for difficulties
let sliderValueOther = 0; //will be used to reveal new buttons in game
let logPlayerActionsAll = ["Game", "Difficulty", "Word", "Lost or Won?",["Attemt", "Time", "Letter", "Guess", "Hidden Word"]]; //information will be stored as follows:

const startGameButton = document.getElementById('hangmanGame');
startGameButton.addEventListener('click', (event) => newGame(event));

//Array of difficulties
let difficultyArray = [
  "beginner",
  "easy",
  "intermediate",
  "advanced",
  "expert",
  "master",
  "legendary"
];

// Words list for each difficulty
let wordArray = {
  beginner: ["cat", "dog", "hat", "bat", "rat", "sun", "run", "pen", "hop", "top", "fan", "mat", "tap", "can", "map", "cup", "rug", "nut", "log", "bed", "jam", "lip", "pig", "pot", "leg", "car", "bus", "cap", "tag", "bug"],
  easy: ["apple", "chair", "dance", "happy", "ocean", "queen", "laugh", "phone", "river", "smile", "table", "under", "water", "young", "panda", "beach", "cloud", "green", "jelly", "tiger", "lemon", "plant", "robot", "snake", "wheel", "dress", "bread", "flute", "hotel", "music"],
  intermediate: ["balloon", "bicycle", "chicken", "diamond", "elephant", "fantasy", "gravity", "horizon", "jasmine", "lantern", "mountain", "necklace", "orchestra", "pineapple", "question", "scissors", "treasure", "umbrella", "village", "waterfall", "xylophone", "zucchini", "butterfly", "fireplace", "kangaroo", "labyrinth", "mushroom", "octopus", "porcupine", "raccoon"],
  advanced: ["astronomical", "bittersweet", "conversation", "detrimental", "embodiment", "flamboyant", "gastronomic", "harmonious", "indefatigable", "jubilant", "kaleidoscope", "labyrinthine", "melancholic", "nostalgia", "ostentatious", "paradigm", "quintessential", "resplendent", "serendipity", "transcendence", "ubiquitous", "venerable", "whimsical", "xenophobia", "yearning", "zenith", "alacrity", "balderdash", "cacophony", "debacle"],
  expert: ["cacophonous", "ephemeral", "garrulous", "iconoclast", "juxtaposition", "mellifluous", "obfuscate", "paradigmatic", "quixotic", "recalcitrant", "sesquipedalian", "truculent", "ubiquitousness", "verisimilitude", "xenophobically", "yesteryear", "zealousness", "antediluvian", "beneficence", "cogent", "delineate", "ephemeralness", "fractious", "grandiloquent", "histrionic", "intransigent", "jettison", "knavery", "lugubrious", "magnanimous"],
  master: ["capriciousness", "defenestration", "equivocal", "felicific", "grandiosity", "hermeneutics", "indefatigability", "juxtapositional", "kinesiology", "lugubriousness", "magniloquence", "noctambulation", "obnubilate", "perfunctory", "quiddity", "refulgent", "supererogatory", "transcendentalism", "unputdownable", "verisimilar", "widdershins", "xenogenetic", "ylem", "zephyr", "abecedarian", "brachylogy", "cachinnate", "dalliance", "ebullient", "fructuous"],
  legendary: ["antitransubstantiate", "brontide", "catoptromancy", "deipnosophist", "effervescence", "floccinaucinihilipilification", "gastromancy", "hippopotomonstrosesquipedaliophobia", "inconubinage", "jentacular", "keraunothnetophobia", "logomachy", "macroscian", "nociceptive", "omphaloskepsis", "peristeronic", "quomodo", "rhabdology", "sarcophagous", "thalassophile", "uroboros", "ventripotent", "witzelsucht", "xenobombulate", "yarborough", "zythum", "amphiscians", "boustrophedon", "carcharhinus", "dactylion"],
};

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
  sliderValue = parseInt(slider.value);
  difficulty = difficultyArray[sliderValue];
  // Update the displayed difficulty label
  label.innerHTML = difficulty;
  // Correct the scope of the username variable
  return difficulty;
}

//function to generate a new word for the game and display it as "_"
function chooseWord(difficulty) {
  hiddenWord = [];
  let wordList = wordArray[difficulty];
  let wordIndex = Math.floor(Math.random() * wordList.length);
  word = wordList[wordIndex]; // Declare and assign the word variable
  // Get the element where the hidden word will be displayed
  let hiddenWordLocation = document.getElementById('guessedWord');
  hiddenWordLocation.innerHTML = ''; // Clear previous content
    for (let i = 0; i < word.length; i++) {
    hiddenWord.push("*");
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
  function letterClickHandler(button, letter) {
    button.style.backgroundColor = "rgb(136, 8, 8)"; // Set background color to red
    letterGuess(letter, hiddenWord, word);
    button.removeEventListener("click", button.clickHandler);
  }
  // function to attach event listeners
  function attachEventListener(button, letter) {
    button.clickHandler = function () {
      letterClickHandler(button, letter);
    };
    button.addEventListener("click", button.clickHandler);
  }
  for (let i = 0; i < alphabet.length; i++) {
    let letter = alphabet[i];
    let button = document.createElement("button");
    button.textContent = letter;
    button.className = "frame letterButton";
    buttonContainer.appendChild(button);
    // Attach the event listener using the separate function
    attachEventListener(button, letter);
  }
}

// Function to handle a letter guess
function letterGuess(letter, hiddenWord, word, elapsedTimeInSeconds) {
  attempt ++;
  letter = letter.toLowerCase(); // Convert letter to lowercase for comparison
  if (word.includes(letter)) {
    for (let i = 0; i < word.length; i++) {
      let lowerCaseWordChar = word[i].toLowerCase();
      if (letter === lowerCaseWordChar) {
        hiddenWord[i] = letter.toUpperCase(); // Update the corresponding index in the hiddenWord array
      }
    }
    updateHiddenWord(hiddenWord);
    logLetterNestedCurrentGame.push(attempt, elapsedTimeInSeconds, letter, "correct", hiddenWord.join());
  } else if (!word.includes(letter)) {
    mistakeCount++; // Increment the global mistakeCount variable
    hangmanImageUpdate();
    logLetterNestedCurrentGame.push(attempt, elapsedTimeInSeconds, letter, "wrong", hiddenWord.join());
  }
  // Check if the word has been completely guessed
  if (hiddenWord.join('').toUpperCase() === word.toUpperCase()) {
    winsInRow++;
    gameResult = 1;    
    updateHiddenWord(hiddenWord);
    gameOver();
    logPlayerActionsAll.push(game, difficulty, word, "WON", logLetterNestedCurrentGame);
  }
  if (mistakeCount === 10) {
  winsInRow = 0;
  gameResult = 0;
  logPlayerActionsAll.push(game, difficulty, word, "LOST", logLetterNestedCurrentGame);
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
  timerInterval = setInterval(updateTimer, 1000);
}

// Function to calculate elapsed time and update the display
function updateTimer() {
  let currentTime = Date.now();
  let elapsedTimeInSeconds = Math.floor((currentTime - startTime) / 1000);
  updateTimerDisplay(elapsedTimeInSeconds);
}

//function to be executed when the player starts a new game
function newGame(event) {
  //resetting all log values for current game
  attempt = 0;
  word = "";
  mistakeCount = 0;
  game ++; //indexing game played
  //checking if this is first game, if so then we push username to logPlayerActionsAll aray
  document.getElementById("image").src = "assets/images/new.png"; //esseting image for game
  event.preventDefault(); // Disable screen update
  document.getElementById("image").style.display = ""; //unhiding picture
  sliderValue = parseInt(document.getElementById("difficultyRange").value);
  if (username === "") { // Checking if there is already a username declared
    username = document.getElementById("username").value; // If there is no username declared, do so
  }
  chooseWord(difficulty); // Choosing a new word for the selected difficulty
  // Initialize the hiddenWord array with underscores
  hiddenWord = Array.from({ length: word.length }, () => "*");
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
  //logging player actions
  logPlayerActions();
  sliderValueOther = parseInt(sliderValue); //resetting sliderValueOther
  displayHiddenWord(); //revealing hidden word
  document.getElementById('timerDisplay').style.display = "none";
  // getting current difficulty level
  slider = document.getElementById("difficultyRange");
  sliderValue = parseInt(slider.value) ;
  document.getElementById("difficultyRange").value = sliderValue;
  difficulty = difficultyArray[sliderValue];
  //code to create 3 buttons depending on win/loose situation
  //code for button container where buttons will be displayed
  let buttonContainer = document.getElementById('gameText');
  buttonContainer.innerHTML = "";
  //Try Again will be shown by default each time
  gameTryAgainButton(buttonContainer, sliderValue);
  // code to check if player has LOST
  if (gameResult == 0 && sliderValue == 0) { //if it is easiest level of game, we will change just "gameTreyAgainButton" Text content
    document.getElementById('buttonTryAgainId').innerHTML = 'This is ALREADY EASIEST level of game, please try HARDER';
  }
  else if (gameResult == 0 && sliderValue > 0) { // will reveal Other button because it is not easiest level
    sliderValueOther = sliderValue - 1;
    gameTryAgainButtonOther (buttonContainer, sliderValueOther);
  }
  //code to check if player has WON
  if (gameResult == 1 && sliderValue == 6) { //if it is easiest level of game, we will change just "gameTreyAgainButton" Text content
  document.getElementById('buttonTryAgainId').innerHTML = 'This is already HARDEST level of game, Congratulations';
  } 
  else if ( gameResult == 1 && sliderValue < document.getElementById('difficultyRange').max) { // will reveal Other button because it is not hardest level
    sliderValueOther = sliderValue + 1;
    gameTryAgainButtonOther (buttonContainer, sliderValueOther);
  }
}

//function to display button Try again
function gameTryAgainButton (buttonContainer, sliderValue) {
  //code to create button Try Again
  let buttonTryAgain = document.createElement('button');
  buttonTryAgain.className = "frame gameOverButton";
  buttonTryAgain.id = "buttonTryAgainId";
  let currentDifficulty = difficultyArray[sliderValue];
  buttonTryAgain.innerHTML = 'Try playing game again with same "' + currentDifficulty + '" difficulty';
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
    buttonTryAgainOther.innerHTML = 'Try playing "' + difficultyOther + '" difficulty';
    // add event listener to button
    buttonTryAgainOther.addEventListener('click', newGameOther); 
    buttonContainer.appendChild(buttonTryAgainOther);
}

//function to play Other difficulty Game
function newGameOther() {
  document.getElementById("difficultyRange").value =sliderValueOther; //reducing easier difficulty by 1
  updateSliderDifficultyLabel(); //updating slider so player will see new label of difficulty
  newGame(event);
}

//logging all layer actions
function logPlayerActions() {
  logPlayerActionsAll.push(game,word, difficulty, logLetterNestedCurrentGame);
}

function contactForm() { //tthis function is needed, as it is activated from HTML
  //now will clear up HTML page so it is empty to create form
  document.getElementById('form').style.display = "none"; // hide start game form
  document.getElementById('image').style.display = "none"; // hide image
  document.getElementById('clearForContactForm').innerHTML = "";
  // clearing left side where form will be located by default
  //now will start creating Form by itself on left side
  createForm();
  rearrangeNavigation();
  playerActionsTable ();
}

function createForm() { //function to create contact form
  // Create a form element
  let form = document.createElement("form");
  form.className = "instructions";
  //form.Id = "contactFormJavaScript";
  form.action="https://formdump.codeinstitute.net";
  // Create a label and input for name
  let nameLabel = document.createElement("label");
  nameLabel.textContent = "Name:";
  let nameInput = document.createElement("input");
  nameInput.type = "text";
  nameInput.name = "name";
  nameInput.innerHTML = username;
  nameInput.className = "frame gameOverButton";
  nameInput.required = true;
  // Create a label and input for email
  let emailLabel = document.createElement("label");
  emailLabel.textContent = "Email:";
  let emailInput = document.createElement("input");
  emailInput.type = "email";
  emailInput.name = "email";
  emailInput.className = "frame gameOverButton";
  emailInput.required = true;
  // Create a label and textarea for text
  let textLabel = document.createElement("label");
  textLabel.textContent = "Text:";
  let textArea = document.createElement("textarea");
  textArea.name = "text";
  textArea.className = "frame gameOverButton";
  textArea.style.height = "40vh";
  textArea.required = true;
  // Create a submit button
  let submitButton = document.createElement("button");
  submitButton.type = "submit";
  submitButton.textContent = "Send";
  submitButton.className = "gameOverButton";
  // Append elements to the form
  form.appendChild(nameLabel);
  form.appendChild(nameInput);
  form.appendChild(document.createElement("br"));
  form.appendChild(emailLabel);
  form.appendChild(emailInput);
  form.appendChild(document.createElement("br"));
  form.appendChild(textLabel);
  form.appendChild(textArea);
  form.appendChild(document.createElement("br"));
  form.appendChild(submitButton);
  // Append the form to a container
  document.getElementById("clearForContactForm").appendChild(form);
  document.getElementById("clearForContactForm").style.width = "96vw";
  document.getElementById("clearForContactForm").style.height = "80vh";
  //document.getElementById("clearForContactForm").style.marginTop = "-38vh"; 15
  if (window.innerWidth < 450 && window.matchMedia("(orientation: portrait)").matches) {
    document.getElementById("clearForContactForm").style.marginTop = "-38vh";
  } else {
    document.getElementById("clearForContactForm").style.marginTop = "15vh";
  }
}

function rearrangeNavigation() {
  // gettinng navigation links container
  let navigationContainer = document.getElementById("navigation");
  //geting id of links
  let githubLink = document.getElementById("GitHub");
  let linkedinLink = document.getElementById("LinkedIn");
  let contactLink = document.getElementById("Contact");
  // removing links from container, so later will append them as children in different order
  navigationContainer.removeChild(githubLink);
    navigationContainer.removeChild(linkedinLink);
    navigationContainer.removeChild(contactLink);
  // changing contact to home button
  contactLink.innerHTML = "Home Page";
  contactLink.href="index.html"; //changing what function will be called when clicking home Button
  // rearanging links, so home page is first
  navigationContainer.appendChild(contactLink);
  navigationContainer.appendChild(linkedinLink);
  navigationContainer.appendChild(githubLink);
}

function playerActionsTable() { //create table to show player actions
 // need to create loops to put out game actions log to a table
}
