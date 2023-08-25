//declaring variables for future use
let word = "";
let mistake_count = 0;
let attempt = 0;
let guess = ""; 
let hidden_word = "";
let game = -1; // this is -1, as when player starts game, it will add 1, what will make iit zero, so later it will be possible to read full game log from nested array log_player_actions
let username = "";
let log_letter = []; // logging all guessed letter for current game
let final_result = ""; // win or loose

// Array for logging all player actions
let log_player_actions = [[
  "Player Name",
  "Difficulty",
  "Word",
  "Total of attempts per word",
  ["attempt number", "Letter guessed", "wrong or Correct"],
  "Win or Loose"
]];

//Array of difficulties
const difficulty_array = [
  "beginner",
  "easy",
  "intermediate",
  "advanced",
  "expert",
  "master",
  "legendary"
];

// Words list for each difficulty
const word_array = {
  beginner: ["btomas","bjonas"],
  easy: ["etomas", "ejonas"],
  intermediate: ["itomas", "ijonas"],
  advanced: ["atomas", "ajonas"],
  expert: ["xtomas", "xjonas"],
  master: ["mtomas", "mjonas"],
  legendary: ["ltomas", "ljonas"],
};

// array of hangman image filenames
const hangman_images = [
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
function hangman_image_update(mistake_count) {
  var image_element = document.getElementById("image");
  image_element.src = "/assets/images/" + hangman_images[mistake_count];
};

// Changing label "beginner" to other difficulties from array based on slider value
function update_slider_difficulty_label() {
  var slider = document.getElementById("difficulty_range");
  var label = document.getElementById("difficulty_label");
  // Map the slider value to the corresponding difficulty level
  var sliderValue = slider.value;
  var label_index = parseInt(sliderValue) - 1;
  var difficulty = difficulty_array[sliderValue];
  // Update the displayed difficulty label
  label.textContent = difficulty;
  // Correct the scope of the username variable
  username = document.getElementById("username").value;
  console.log(difficulty);
}


// choosing word from difficulties array
function choose_word(difficulty) {
  var chosen_word_list = word_array[difficulty];
  var word = chosen_word_list[Math.floor(Math.random() * chosen_word_list.length)];
  return word;
};

// Function to remove text content from the section with id "game_text" and "form" when player starts game
function clear_game_text_section() {
  const game_text_section = document.getElementById("game_text");
  game_text_section.innerHTML = "";
  const form_text_section = document.getElementById("form");
  form_text_section.innerHTML = "";
};

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
};

// Function to create and return a letter button
function create_letter_button(letter) {
  var button = document.createElement("button");
  button.textContent = letter;
  button.classList.add("frame", "letter_button");
  button.setAttribute("data-letter", letter);

  button.addEventListener("click", function () {
    if (button.style.backgroundColor !== "rgba(136, 8, 8, 1)") {
      guess_letter(letter, word, button);
    }
  });
  
  return button;
};

// Letter guessing function
function guess_letter(letter, word, button, hidden_word, attempt) {
  // Change the color of the clicked button
  button.style.backgroundColor = "rgba(136, 8, 8, 1)";
  // Perform the letter check and update the game based on the result
  if (word.includes(letter)) {
    guess = letter;
    attempt ++;
    log_letter.push([attempt, "correct", letter]);
    // if letter is correct, updating hidden word and exposing letter
    for (let i = 0; i < word.length; i++){
      if (word(i) === letter) {
        hidden_word = replaceAt(str,i,letter)
      };
    };
    if (hidden_word === word) {
      final_result = "win";
      game_over();
    }
  } else {
    guess = "mistake";
    attempt ++;
    mistake_count ++;
    log_letter.push([attempt, "wrong", letter]);
    hangman_image_update(mistake_count);
    if (mistake_count === 10) {
      final_result = "loose";
      game_over();
    }
  }
};

// function to perform when game is over
//this will create nested arrays
function game_over () {
  player_actions_log.push([username, difficulty, word, [log_letter], attempt, final_result]);
  log_letter = []; // clearing game log for next session
  final_result = ""; // resetting current game result
}

// creating dashed word to be displayed on game
  function display_underscores_word() {
    const guessedWordElement = document.getElementById("guessedWord");
    guessedWordElement.innerHTML = ""; // Clear the existing content
  
    for (let i = 0; i < word.length; i++) {
      const underscore = document.createElement("span");
      underscore.textContent = "_";
      underscore.classList.add("frame");
      guessedWordElement.appendChild(underscore);
  
      // Add a space between underscores (except for the last one)
      if (i !== length - 1) {
        const space = document.createElement("span");
        space.textContent = " ";
        guessedWordElement.appendChild(space);
      }
    }
  };

  // function that starts all needed functions when game starts
function start_game (difficulty) {
  game ++;
  clear_game_text_section(); // removing unneeded text from HTML
  mistake_count = 0; // resetting mistake count
  attempt = 0; // resetting atteempts for current word
  hangman_image_update (); // resetting hangman picture
  choose_word (); // generating new word
  const game_text_section = document.getElementById("game_text"); // adding letters button to HTML
  game_text_section.appendChild(letters_container);
  event.preventDefault(); // Stopping page from reloading on start button press
  hidden_word = "_".repeat(word.length); // creating hidden word made of "_"
  display_underscores_word(); // display in HTML underscores to bbe guessed
}