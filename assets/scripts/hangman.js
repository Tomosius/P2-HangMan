/**
 * Hangman Game
 *
 * This script provides the logic and functionalities for playing a Hangman game.
 * It handles the game initialization, word selection, and UI interactions.
 */

// Global Variables
let timerInterval; // Timer interval for a game clock
let word = ""; // Current word to be guessed
let mistakeCount = 0; // Number of incorrect guesses
let attempt = 0; // Number of attempts by the player
let hiddenWord = []; // The current state of the word being guessed,
// represented with asterisks and revealed letters
let game = 0; // Game counter to track the number of games played
let username = ""; // Player's username
let logLetterNestedCurrentGame = []; // Log to store the guessed letters for the current game
let gameResult = 0; // Game result flag: 1 for win, 0 for loss
let difficulty = "beginner"; // Initial difficulty setting
let startTime = 0; // Start time for the timer
let winsInRow = 0; // Counter for consecutive wins
let slider; // Slider for difficulty selection
let sliderValue = 0; // Current value of the difficulty slider
let sliderValueOther = 0; // Secondary value for extra options
let logPlayerActionsAll = ["Game", "Difficulty", "Word", "Lost or Won?", ["Attempt", "Time", "Letter", "Guess", "Hidden Word"]]; // Log for player actions


/**
 * The 'startGameButton' element is fetched from the HTML document
 * and an event listener is added. When the button is clicked,
 * the 'newGame' function will be invoked, passing the event as an argument.
 */
const startGameButton = document.getElementById('hangmanGame');
startGameButton.addEventListener('click', (event) => newGame(event));

/**
 * Array of difficulty levels.
 *
 * This array contains the different difficulty levels that can be
 * selected in the game. These levels are used to determine the
 * complexity of the word to be guessed.
 */
let difficultyArray = [
    "beginner",      // Suitable for first-time players
    "easy",          // Still easy but a bit challenging
    "intermediate",  // For players who have some experience
    "advanced",      // For experienced players
    "expert",        // Very challenging
    "master",        // Extremely challenging
    "legendary"      // Almost impossible to solve
];




/**
 * Object containing lists of words for each difficulty level.
 *
 * This object serves as a dictionary for the game, categorizing words
 * by their level of difficulty. When a new game starts, a word is
 * randomly selected from the list that corresponds to the chosen difficulty.
 */
let wordArray = {
    beginner: ["cat", "dog", "hat", "bat", "rat", "sun", "run", "pen", "hop", "top", "fan", "mat", "tap", "can", "map", "cup", "rug", "nut", "log", "bed", "jam", "lip", "pig", "pot", "leg", "car", "bus", "cap", "tag", "bug"],
    easy: ["apple", "chair", "dance", "happy", "ocean", "queen", "laugh", "phone", "river", "smile", "table", "under", "water", "young", "panda", "beach", "cloud", "green", "jelly", "tiger", "lemon", "plant", "robot", "snake", "wheel", "dress", "bread", "flute", "hotel", "music"],
    intermediate: ["balloon", "bicycle", "chicken", "diamond", "elephant", "fantasy", "gravity", "horizon", "jasmine", "lantern", "mountain", "necklace", "orchestra", "pineapple", "question", "scissors", "treasure", "umbrella", "village", "waterfall", "xylophone", "zucchini", "butterfly", "fireplace", "kangaroo", "labyrinth", "mushroom", "octopus", "porcupine", "raccoon"],
    advanced: ["astronomical", "bittersweet", "conversation", "detrimental", "embodiment", "flamboyant", "gastronomic", "harmonious", "indefatigable", "jubilant", "kaleidoscope", "labyrinthine", "melancholic", "nostalgia", "ostentatious", "paradigm", "quintessential", "resplendent", "serendipity", "transcendence", "ubiquitous", "venerable", "whimsical", "xenophobia", "yearning", "zenith", "alacrity", "balderdash", "cacophony", "debacle"],
    expert: ["cacophonous", "ephemeral", "garrulous", "iconoclast", "juxtaposition", "mellifluous", "obfuscate", "paradigmatic", "quixotic", "recalcitrant", "sesquipedalian", "truculent", "ubiquitousness", "verisimilitude", "xenophobically", "yesteryear", "zealousness", "antediluvian", "beneficence", "cogent", "delineate", "ephemeralness", "fractious", "grandiloquent", "histrionic", "intransigent", "jettison", "knavery", "lugubrious", "magnanimous"],
    master: ["capriciousness", "defenestration", "equivocal", "felicific", "grandiosity", "hermeneutics", "indefatigability", "juxtapositional", "kinesiology", "lugubriousness", "magniloquence", "noctambulation", "obnubilate", "perfunctory", "quiddity", "refulgent", "supererogatory", "transcendentalism", "unputdownable", "verisimilar", "widdershins", "xenogenetic", "ylem", "zephyr", "abecedarian", "brachylogy", "cachinnate", "dalliance", "ebullient", "fructuous"],
    legendary: ["antitransubstantiate", "brontide", "catoptromancy", "deipnosophist", "effervescence", "floccinaucinihilipilification", "gastromancy", "hippopotomonstrosesquipedaliophobia", "inconubinage", "jentacular", "keraunothnetophobia", "logomachy", "macroscian", "nociceptive", "omphaloskepsis", "peristeronic", "quomodo", "rhabdology", "sarcophagous", "thalassophile", "uroboros", "ventripotent", "witzelsucht", "xenobombulate", "yarborough", "zythum", "amphiscians", "boustrophedon", "carcharhinus", "dactylion"],
};

/**
 * Function to Update the Hangman Image
 *
 * This function is responsible for updating the hangman image displayed on the
 * screen. The image is changed based on the number of mistakes made by the user.
 *
 * How it works:
 * 1. Fetch the HTML element where the hangman image is displayed and store it
 *    in the variable 'imageElement'.
 * 2. Update the 'src' attribute of 'imageElement' to point to the new image file.
 *    The file name is determined by the current mistake count.
 */
function hangmanImageUpdate() {
    let imageElement = document.getElementById("image");

    imageElement.src = "assets/images/h" + mistakeCount + ".png";
}



/**
 * Update the displayed difficulty level based on the slider's position.
 *
 * The function fetches the current value of the slider, maps it to a corresponding
 * difficulty level, and then updates the displayed label with this level.
 * It returns the updated difficulty level.
 *
 * @returns {string} The updated difficulty level.
 */
function updateSliderDifficultyLabel() {
    let slider = document.getElementById("difficultyRange");
    let label = document.getElementById("difficultyLabel");
    sliderValue = parseInt(slider.value);
    difficulty = difficultyArray[sliderValue];
    label.innerHTML = difficulty;
    return difficulty;
}



/**
 * Choose and Initialize Game Word.
 *
 * This function picks a random word from a list associated with the given game
 * difficulty level. It also initializes a hidden version of this word, represented
 * by an array of asterisks, which will be displayed to the player. The function
 * returns the chosen word for further use in the game.
 */
function chooseWord(difficulty) {
    hiddenWord = [];
    let wordList = wordArray[difficulty];
    let wordIndex = Math.floor(Math.random() * wordList.length);
    word = wordList[wordIndex];
    let hiddenWordLocation = document.getElementById('guessedWord');
    hiddenWordLocation.innerHTML = '';
    for (let i = 0; i < word.length; i++) {
        hiddenWord.push("*");
    }
    return word;
}




/**
 * Update and Display Hidden Word on UI.
 *
 * This function takes an array that represents the hidden version of the word
 * and updates the UI to reflect this. Each element of the array is displayed
 * as a span element within a designated area of the HTML document.
 */
function updateHiddenWord(hiddenWord) {
    let hiddenWordLocation = document.getElementById('guessedWord');
    hiddenWordLocation.innerHTML = '';
    for (let i = 0; i < hiddenWord.length; i++) {
        let hiddenWordLetter = document.createElement("span");
        hiddenWordLetter.textContent = hiddenWord[i];
        hiddenWordLetter.className = "frame guessWordLetters";
        hiddenWordLocation.appendChild(hiddenWordLetter);
    }
}


/**
 * Create Alphabet Buttons and Attach Event Listeners.
 *
 * This function dynamically generates buttons for each letter in the alphabet
 * and appends them to a designated area in the HTML document. Event listeners
 * are attached to each button to handle letter guesses.
 */
function createAlphabet() {
    let alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let buttonContainer = document.getElementById('gameText');
    buttonContainer.innerHTML = "";

    function letterClickHandler(button, letter) {
        button.style.backgroundColor = "rgb(136, 8, 8)";
        letterGuess(letter, hiddenWord, word);
        button.removeEventListener("click", button.clickHandler);
    }

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
        attachEventListener(button, letter);
    }
}


/**
 * Handle a Letter Guess in the Hangman Game.
 *
 * This function is triggered when a letter button is clicked. It takes in the
 * guessed letter, the current hidden word, the actual word, and the elapsed time
 * in seconds. It checks if the guessed letter exists in the word and updates the
 * hidden word and UI accordingly. It also logs these actions for analytics.
 */
function letterGuess(letter, hiddenWord, word, elapsedTimeInSeconds) {
    attempt++;
    letter = letter.toLowerCase();
    if (word.includes(letter)) {
        for (let i = 0; i < word.length; i++) {
            let lowerCaseWordChar = word[i].toLowerCase();
            if (letter === lowerCaseWordChar) {
                hiddenWord[i] = letter.toUpperCase();
            }
        }
        updateHiddenWord(hiddenWord);
        logLetterNestedCurrentGame.push(attempt, elapsedTimeInSeconds, letter, "correct", hiddenWord.join());
    } else if (!word.includes(letter)) {
        mistakeCount++;
        hangmanImageUpdate();
        logLetterNestedCurrentGame.push(attempt, elapsedTimeInSeconds, letter, "wrong", hiddenWord.join());
    }
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
        gameOver();
    }
}


/**
 * Update the Timer Display in the Hangman Game.
 *
 * This function is responsible for updating the timer display on the UI.
 * It takes the elapsed time in seconds as an argument and updates the
 * timer element's text content accordingly.
 */
function updateTimerDisplay(elapsedTimeInSeconds) {
    let timerElement = document.getElementById("timerDisplay");
    timerElement.textContent = elapsedTimeInSeconds;
}

/**
 * Start the Timer for the Hangman Game.
 *
 * This function initializes the timer by capturing the current time as the start time.
 * It also sets up an interval to call the `updateTimer` function every second (1000 milliseconds).
 */
function startTimer() {
    startTime = Date.now(); // Set the start time to the current time
    timerInterval = setInterval(updateTimer, 1000); // Set up a timer to update the display every second
}


/**
 * Calculate Elapsed Time and Update the Display.
 *
 * This function calculates the elapsed time by subtracting the start time from the current time.
 * The result is then rounded down to the nearest second and displayed by calling the `updateTimerDisplay` function.
 */
function updateTimer() {
    let currentTime = Date.now();
    let elapsedTimeInSeconds = Math.floor((currentTime - startTime) / 1000);
    updateTimerDisplay(elapsedTimeInSeconds);
}


/**
 * Initialize a New Game.
 *
 * This function sets up a new game by resetting all relevant variables, logs, and UI elements.
 * It starts a new game by selecting a word based on the difficulty level,
 * initializes the hidden word, creates the alphabet buttons, and starts the timer.
 *
 * @param {Event} event - The event object, usually a click event.
 */
function newGame(event) {
    document.getElementById('timerDisplay').style.display = "inline";
    attempt = 0;
    word = "";
    mistakeCount = 0;
    game++;
    document.getElementById("image").src = "assets/images/new.png";
    event.preventDefault();
    document.getElementById("image").style.display = "";
    sliderValue = parseInt(document.getElementById("difficultyRange").value);
    if (username === "") {
        username = document.getElementById("username").value;
    }
    chooseWord(difficulty);
    hiddenWord = Array.from({ length: word.length }, () => "*");
    updateHiddenWord(hiddenWord);
    createAlphabet();
    startTimer();
}


/**
 * Display the Hidden Word.
 *
 * This function updates the display to reveal the hidden word.
 * It either shows the guessed letters or the actual letters in the word.
 * Incorrectly guessed letters are highlighted with a different background color.
 */
function displayHiddenWord() {
    let hiddenWordLocation = document.getElementById('guessedWord');
    hiddenWordLocation.innerHTML = '';
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


/**
 * Handle a Game Over.
 *
 * This function performs all the actions required once the game is over, either
 * because the player won or lost. It clears the existing timer, hides the timer
 * display, and logs the player's actions. It also updates the UI to reflect the
 * end-game state, displaying different buttons and messages depending on the outcome.
 */
function gameOver() {
    clearInterval(timerInterval);
    document.getElementById('timerDisplay').style.display = "none";
    logPlayerActions();
    sliderValueOther = parseInt(sliderValue);
    displayHiddenWord();
    document.getElementById('timerDisplay').style.display = "none";
    slider = document.getElementById("difficultyRange");
    sliderValue = parseInt(slider.value);
    document.getElementById("difficultyRange").value = sliderValue;
    difficulty = difficultyArray[sliderValue];
    let buttonContainer = document.getElementById('gameText');
    buttonContainer.innerHTML = "";
    gameTryAgainButton(buttonContainer, sliderValue);
    if (gameResult === 0 && sliderValue === 0) {
        document.getElementById('buttonTryAgainId').innerHTML = 'This is ALREADY EASIEST level of game, please try HARDER';
    } else if (gameResult === 0 && sliderValue > 0) {
        sliderValueOther = sliderValue - 1;
        gameTryAgainButtonOther(buttonContainer, sliderValueOther);
    }
    if (gameResult === 1 && sliderValue === 6) {
        document.getElementById('buttonTryAgainId').innerHTML = 'This is already HARDEST level of game, Congratulations';
    } else if (gameResult === 1 && sliderValue < document.getElementById('difficultyRange').max) {
        sliderValueOther = sliderValue + 1;
        gameTryAgainButtonOther(buttonContainer, sliderValueOther);
    }
}


/**
 * Display 'Try Again' Button.
 *
 * This function creates and displays a "Try Again" button in the UI.
 * The button allows the user to replay the game at the current difficulty level.
 * It attaches an event listener to the button to start a new game when clicked.
 *
 * @param {HTMLElement} buttonContainer - The container where the button will be appended.
 * @param {number} sliderValue - The current value of the difficulty slider.
 */
function gameTryAgainButton(buttonContainer, sliderValue) {
    let buttonTryAgain = document.createElement('button');
    buttonTryAgain.className = "frame gameOverButton";
    buttonTryAgain.id = "buttonTryAgainId";
    let currentDifficulty = difficultyArray[sliderValue];
    buttonTryAgain.innerHTML = 'Try playing game again with same "' + currentDifficulty + '" difficulty';
    buttonTryAgain.addEventListener('click', newGame);
    buttonContainer.appendChild(buttonTryAgain);
}


/**
 * Display 'Try Again' Button for Another Difficulty Level.
 *
 * This function creates and displays a button that allows the user to play
 * the game at a different difficulty level. The button is displayed when
 * the game ends, either by winning or losing. It attaches an event listener
 * to the button that starts a new game at the different difficulty when clicked.
 *
 * @param {HTMLElement} buttonContainer - The container where the button will be appended.
 * @param {number} sliderValueOther - The value for the alternative difficulty level.
 */
function gameTryAgainButtonOther(buttonContainer, sliderValueOther) {
    let buttonTryAgainOther = document.createElement('button');
    buttonTryAgainOther.className = "frame gameOverButton";
    let difficultyOther = difficultyArray[sliderValueOther];
    buttonTryAgainOther.innerHTML = 'Try playing "' + difficultyOther + '" difficulty';
    buttonTryAgainOther.addEventListener('click', newGameOther);
    buttonContainer.appendChild(buttonTryAgainOther);
}


/**
 * Start a New Game with an Alternative Difficulty Level.
 *
 * This function is triggered when the player chooses to play the game at a
 * different difficulty level after the game ends. It updates the difficulty slider
 * to reflect the new level and then initiates a new game.
 */
function newGameOther() {
    document.getElementById("difficultyRange").value = sliderValueOther;
    updateSliderDifficultyLabel();
    newGame(event);
}


/**
 * Log Player Actions for the Current Game.
 *
 * This function logs key metrics like the game number, chosen word,
 * difficulty level, and nested letter actions for the current game.
 * All this information is stored in an array for future analysis or debugging.
 */
function logPlayerActions() {
    logPlayerActionsAll.push(game, word, difficulty, logLetterNestedCurrentGame);
}



/**
 * Display Contact Form and Reconfigure Page Layout.
 *
 * This function performs several tasks to prepare the UI for the contact form:
 * 1. Hides the existing game-related elements.
 * 2. Clear the designated area where the contact form will be displayed.
 * 3. Initiates the creation of the contact form via the 'createForm' function.
 * 4. Rearranges the navigation menu via the 'rearrangeNavigation' function.
 * 5. Displays the table that logs player actions via the 'playerActionsTable' function.
 */
function contactForm() {
    document.getElementById('form').style.display = "none";
    document.getElementById('image').style.display = "none";
    document.getElementById('clearForContactForm').innerHTML = "";
    createForm();
    rearrangeNavigation();
    playerActionsTable();
}

/**
 * Create and Display a Contact Form
 *
 * This function dynamically creates a contact form and appends it to the designated area of the webpage.
 * The contact form consists of the following elements:
 * 1. A name field (populated with the username if available)
 * 2. Email field
 * 3. A text area for the user's message
 * 4. Submit button
 *
 * The form also accommodates responsive design by adjusting its position based on the screen width and orientation.
 */
function createForm() {
    let form = document.createElement("form");
    form.className = "instructions";
    form.action="https://formdump.codeinstitute.net";

    let nameLabel = document.createElement("label");
    nameLabel.textContent = "Name:";
    let nameInput = document.createElement("input");
    nameInput.type = "text";
    nameInput.name = "name";
    nameInput.innerHTML = username;
    nameInput.className = "frame gameOverButton";
    nameInput.required = true;

    let emailLabel = document.createElement("label");
    emailLabel.textContent = "Email:";
    let emailInput = document.createElement("input");
    emailInput.type = "email";
    emailInput.name = "email";
    emailInput.className = "frame gameOverButton";
    emailInput.required = true;

    let textLabel = document.createElement("label");
    textLabel.textContent = "Text:";
    let textArea = document.createElement("textarea");
    textArea.name = "text";
    textArea.className = "frame gameOverButton";
    textArea.style.height = "40vh";
    textArea.required = true;

    let submitButton = document.createElement("button");
    submitButton.type = "submit";
    submitButton.textContent = "Send";
    submitButton.className = "gameOverButton";

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

    let formContainer = document.getElementById("clearForContactForm");
    formContainer.appendChild(form);
    formContainer.style.width = "96vw";
    formContainer.style.height = "80vh";

    if (window.innerWidth < 450 && window.matchMedia("(orientation: portrait)").matches) {
        formContainer.style.marginTop = "-38vh";
    } else {
        formContainer.style.marginTop = "15vh";
    }
}


/**
 * Rearrange Navigation Links and Update Home Page Link
 *
 * This function rearranges the order of navigation links and updates the contact link to serve as a home page link.
 * The function performs the following tasks:
 * 1. Fetches the navigation container and individual navigation links by their IDs.
 * 2. Removes the existing links from the navigation container.
 * 3. Updates the contact link to point to the home page and renames it to "Home Page".
 * 4. Reorders the links to place the home page link first and appends them back to the navigation container.
 */
function rearrangeNavigation() {
    let navigationContainer = document.getElementById("navigation");

    let githubLink = document.getElementById("GitHub");
    let linkedinLink = document.getElementById("LinkedIn");
    let contactLink = document.getElementById("Contact");

    navigationContainer.removeChild(githubLink);
    navigationContainer.removeChild(linkedinLink);
    navigationContainer.removeChild(contactLink);

    contactLink.innerHTML = "Home Page";
    contactLink.href = "index.html";

    navigationContainer.appendChild(contactLink);
    navigationContainer.appendChild(linkedinLink);
    navigationContainer.appendChild(githubLink);
}



/**
 * Create and Display Player Actions Table
 *
 * This function dynamically creates a table to display the logged actions taken by the player during the game.
 * The function performs the following tasks:
 * 1. Initializes an HTML table and header elements.
 * 2. Adds table headers to describe the information being displayed.
 * 3. Iterates through the logged player actions to populate the table rows.
 *
 * Note: This function is a placeholder and needs to be implemented to include the logic for fetching and displaying player actions.
 */
function playerActionsTable() {
    // Initialize table and header elements
    let table = document.createElement("table");
    let headerRow = document.createElement("tr");

    // Add table headers
    let headers = ["Game", "Word", "Difficulty", "Action Log"];
    headers.forEach(headerText => {
        let header = document.createElement("th");
        header.textContent = headerText;
        headerRow.appendChild(header);
    });

    table.appendChild(headerRow);

    // TODO: Iterate through logged player actions to populate table rows

    // Append the table to a container (assuming a container with ID 'tableContainer' exists)
    document.getElementById("tableContainer").appendChild(table);
}
