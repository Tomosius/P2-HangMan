// Creating array that will log all player actions
var player_log = [
  "Player Name",
  "Selected Difficulty",
  "Word",
  ["attempt number", "Correct or Wrong", "Letter Guessed"],
  "Total attempts",
  "Win or Lose",
];

// Counting mistakes
var mistakeCount = 0;

// Define the variable to store the chosen word
var chosen_word = "";

// Define the variable to store the guessed word array
var guessed_word = [];

// Making array of difficulties for game 
const difficulties = [
  "beginner",
  "elementary",
  "intermediate",
  "advanced",
  "expert",
  "master",
  "legendary"
];

// Changing label "beginner" to other difficulties from array based on slider value
function update_slider_difficulty_name() {
  var slider = document.getElementById("difficulty");
  var label = document.getElementById("difficulty_label");
  // Map the slider value to the corresponding difficulty level
  selected_difficulty = difficulties[parseInt(slider.value) - 1];
  // Update the displayed difficulty label
  label.textContent = selected_difficulty;
}

// Define selected_difficulty globally
var selected_difficulty;

// Words list for each difficulty
var word_lists = {
  beginner: ["btomas","bjonas" /* add more words */],
  elementary: ["etomas", "ejonas" /* add more words */],
  intermediate: ["itomas", "ijonas"  /* add more words */],
  advanced: ["atomas", "ajonas" /* add more words */],
  expert: ["xtomas", "xjonas" /* add more words */],
  master: ["mtomas", "mjonas" /* add more words */],
  legendary: ["ltomas", "ljonas" /* add more words */]
};

// Defining the array of hangman image filenames
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
function updateHangmanPicture() {
  var imageElement = document.getElementById("image");
  imageElement.src = "assets/images/" + hangmanImages[mistakeCount];
}

function choose_word() {
  var chosen_word_list = word_lists[selected_difficulty];
  var chosen_word = chosen_word_list[Math.floor(Math.random() * chosen_word_list.length)];
  return chosen_word;
}

// Function to remove text content from the section with id "game_text" and "form"
function clear_game_text_section() {
  const game_text_section = document.getElementById("game_text");
  game_text_section.innerHTML = "";
  const form_text_section = document.getElementById("form");
  form_text_section.innerHTML = "";
}

// Function to create and return the letters container with buttons
function create_letters_container() {
  var letters_container = document.createElement("div");
  letters_container.classList.add("letters_container");
  var letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  for (let i = 0; i < letters.length; i++) {
    var button = create_letter_button(letters[i]);
    letters_container.appendChild(button);
  }
  return letters_container;
}

// Function to create and return a letter button
function create_letter_button(letter) {
  var button = document.createElement("button");
  button.textContent = letter;
  button.classList.add("frame", "letter_button");
  button.setAttribute("data-letter", letter);

  button.addEventListener("click", function () {
    if (button.style.backgroundColor !== "rgba(136, 8, 8, 1)") {
      guess_letter(letter, button);
    }
  });
  
  return button;
}

// Letter guessing function
function guess_letter(letter, button) {
  var chosen_word = choose_word();
  
  // Change the color of the clicked button
  button.style.backgroundColor = "rgba(136, 8, 8, 1)";

  // Perform the letter check and update the game based on the result
  if (chosen_word.includes(letter)) {
    console.log(`Letter "${letter}" is correct in the word "${chosen_word}"`);
    for (let i = 0; i < chosen_word.length; i++) {
      if (chosen_word[i] === letter) {
        guessed_word[i] = letter;
      }
    }
    updateDisplayedWord();
    if (guessed_word.join("") === chosen_word) {
      game_over("win");
    }
  } else {
    console.log(`Letter "${letter}" is incorrect in the word "${chosen_word}"`);
    mistakeCount++;
    updateHangmanPicture();
    if (mistakeCount >= hangmanImages.length) {
      game_over("lose");
    }
  }
}

// Function to update the displayed guessed word
function updateDisplayedWord() {
  const guessedWordElement = document.getElementById("guessedWord");
  guessedWordElement.textContent = guessed_word.join(" ");
}

// Function to start the game
function start_game() {
  clear_game_text_section(); // Clearing text from screen
  mistakeCount = 0; // Resetting mistake count
  updateHangmanPicture(); // Resetting hangman picture
  chosen_word = choose_word(); // Choosing a new word
  guessed_word = new Array(chosen_word.length).fill("_"); // Resetting guessed word array

  var letters_container = create_letters_container(); // Creating container for letters
  const game_text_section = document.getElementById("game_text"); //

  game_text_section.appendChild(letters_container);
  event.preventDefault(); // Stopping page from reloading on start button press
}

// Initialize player_log array
var player_log = [
  "Player Name",
  "Selected Difficulty",
  "Word",
  [],
  "Total attempts",
  "Win or Lose"
];

// Function to log player actions
function log_player_action(attempt, result, letterGuessed) {
  player_log[3].push([attempt, result, letterGuessed]);
}

// Function to update player_log
function update_player_log(playerName, difficulty, word, totalAttempts, winOrLose) {
  player_log[0] = playerName;
  player_log[1] = difficulty;
  player_log[2] = word;
  player_log[4] = totalAttempts;
  player_log[5] = winOrLose;
}

// Function to handle the end of the game
function game_over(result) {
  clear_game_text_section();
  const game_text_section = document.getElementById("game_text");

  var resultMessage = document.createElement("p");
  if (result === "win") {
    resultMessage.textContent = "Congratulations! You guessed the word: " + chosen_word;
  } else {
    resultMessage.textContent = "You lost! The word was: " + chosen_word;
  }
  game_text_section.appendChild(resultMessage);

  // Add "Try Again" and "Next Difficulty" buttons
  var tryAgainButton = create_button("Try Again", "try_again");
  var nextDifficultyButton = create_button("Next Difficulty", "next_difficulty");

  tryAgainButton.addEventListener("click", function () {
    start_game(); // Start the game again
  });

  nextDifficultyButton.addEventListener("click", function () {
    // Get the current index of the selected difficulty
    var currentIndex = difficulties.indexOf(selected_difficulty);
    // Move to the next difficulty, or stay on the current one if it's legendary
    var nextIndex = Math.min(currentIndex + 1, difficulties.length - 1);
    selected_difficulty = difficulties[nextIndex];
    update_slider_difficulty_name(); // Update the displayed difficulty label
    start_game(); // Start the game with the new difficulty
  });

  game_text_section.appendChild(tryAgainButton);
  game_text_section.appendChild(nextDifficultyButton);

  // Update player_log
  update_player_log("Player Name", selected_difficulty, chosen_word, mistakeCount, result);
}

// Helper function to create a button
function create_button(text, id) {
  var button = document.createElement("button");
  button.textContent = text;
  button.classList.add("frame");
  button.id = id;
  return button;
}

// ... (Your existing code)
