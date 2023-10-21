# Hangman Game
[Link to live page](https://tomosius.github.io/P2-HangMan/)


Welcome to the Hangman Game! This is a simple web-based implementation of the classic Hangman word-guessing game. Players attempt to guess a hidden word by suggesting letters, with a limited number of incorrect guesses allowed before the hangman is fully drawn.

![Hangman Game](assets/images/mokup_devices.png)

# Hangman Game Documentation

## Table of Contents

- [User Experience (UX)](#user-experience-ux)
- [Design](#design)
    - [Page Layout](#page-layout)
    - [Fonts](#fonts)
    - [Color Palette](#color-palette)
    - [Responsiveness](#responsiveness)
- [Testing](#testing)
    - [Compatibility](#compatibility)
    - [Manual Testing](#manual-testing)
    - [Browser Compatibility](#browser-compatibility)
- [Validation](#validation)
- [Technologies](#technologies)
    - [Languages used](#languages-used)
    - [Bootstrapping](#bootstrapping)
    - [Tools used](#tools-used)
- [Features](#features)
    - [GamePlay](#gameplay)
    - [Difficulty Levels](#difficulty-levels)
- [Functions](#functions)
  - [hangmanImageUpdate](#hangmanimageupdate)
  - [updateSliderDifficultyLabel](#updatesliderdifficultylabel)
  - [chooseWord](#chooseword)
  - [updateHiddenWord](#updatehiddenword)
  - [createAlphabet](#createalphabet)
  - [letterGuess](#letterguess)
  - [updateTimerDisplay](#updatetimerdisplay)
  - [startTimer](#starttimer)
  - [updateTimer](#updatetimer)
  - [newGame](#newgame)
  - [gameTryAgainButton](#gametryagainbutton)
  - [gameTryAgainButtonOther](#gametryagainbuttonother)
  - [newGameOther](#newgameother)
  - [gameOver](#gameover)
  - [logPlayerActions](#logplayeractions)
  - [contactForm](#contactform)
  - [createForm](#createform)
  - [rearrangeNavigation](#rearrangenavigation)
  - [homePage](#homepage)
  - [playerActionsTable](#playeractionstable)



# Hangman Game Documentation

## User Experience (UX)

The Hangman game provides an engaging user experience through its intuitive interface and interactive gameplay. The following features contribute to a seamless and enjoyable user experience:

- Clear instructions explaining how to play the game.
- An interactive form for the user to enter their name and select the difficulty level.
- Visual feedback through animations, transitions, and hover effects on buttons.
- Mobile responsiveness for optimal gameplay on different devices.

[Back to top ⇧](#hangman-game)

## Design

### Page Layout

The design of the Hangman game focuses on creating an appealing and user-friendly environment for players. Here are the design aspects that contribute to the overall look and feel of the game:

|     Layout Name      |                 Layout Wireframe                  |
|:--------------------:|:-------------------------------------------------:|
| Main Page Horizontal | ![main_page_h.png](assets/images/main_page_h.png) |
|  Main Page Vertical  | ![main_page_v.png](assets/images/main_page_v.png) |
| Game Play Horizontal |      ![game_h.png](assets/images/game_h.png)      |
|  Game Play Vertical  |      ![game_v.png](assets/images/game_v.png)      |
| Game Over Horizontal | ![game_over_h.png](assets/images/game_over_h.png) |
|  Game Over Vertical  | ![game_over_v.png](assets/images/game_over_v.png) |


### Fonts

Two custom fonts were selected to enhance the visual appeal and uniqueness of the game's interface:

- **Handwritten Font**: The "Handwritten" font is used for most of the text elements, giving the game a playful and informal vibe.
- **Mono Font**: The "Mono" font is used for specific text elements to create a clear and easily readable appearance.

### Color Palette

The color palette is chosen to provide a balance between readability and visual interest:

- Background: #fffef0 (light cream)
- Text: #403e41 (dark gray)
- Accent: rgba(136, 8, 8, 1) (deep red)

### Layout

The game layout is divided into two main sections: the right side and the left side. This division optimizes screen space and ensures a comfortable gaming experience on both larger screens and mobile devices:

- **Right Side**: Contains navigation links, an image of a hanged-man, and 
  a log of player actions.
- **Left Side**: Displays instructions, the game's title, and the area where the user interacts with the game.

### Responsiveness

The game layout adapts gracefully to different screen sizes using media queries:

- For screens with a width of 450px or less, or in portrait orientation, the layout adjusts to ensure optimal viewing and interaction.

These design elements come together to create an inviting and enjoyable atmosphere for players, making the Hangman game an engaging and visually appealing experience.

[Back to top ⇧](#hangman-game)

## Testing

### Javascript Testing
Javascript was tested with [jshint](https://jshint.com/)
* on line 287 I have unused variable "contactForm".
  It has to be, as intention was
  to make a link in navigation work as a button not as a link.
  Soo when it is clicked,
  even it is hyperlink, it calls a function from javascript.

|               Feature                |                         Expected Outcome                          | Result |
|:------------------------------------:|:-----------------------------------------------------------------:|:------:|
|  Start Button listening for "event"  |                          New game Starts                          |  Pass  |
|       Moving Difficulty Slider       |                     Difficulty label changes                      |  Pass  |
|  Difficulty range passed to program  |                Game starts on selected difficulty                 |  Pass  |
|           Game choose word           |             Game chooses word on selected difficulty              |  Pass  |
| Function to create letters - buttons |                Buttons with Letters are Displayed                 |  Pass  |
|           Letter Clicking            |             After letter clicked - it changes colour              |  Pass  |
|           Letter Clicking            |            Button becomes inactive after being pressed            |  Pass  |
|           Letter Clicking            | Java Script passes letter value to be processed by game algorithm |  Pass  |
|         Correct Letter Guess         | When letter is guessed correctly, it is revealed in hidden word  |  Pass  |
|          Wrong letter Guess          |            When wrong letter guessed, picture changes             |  Pass  |
|          Wrong Letter Guess          |               Game counts wrong guessing attempts                |  Pass  |
|       Word guessed successfully       |                             Game win                              |  Pass  |
|               Game Win               |          Program offers to try same level of difficulty           |  Pass  |
|               Game Win               |             Program offers to try harder difficulty              |  Pass  |
|      Game Win on hardest level       |                  Next Difficulty level unlocked                   |  Pass  |
|   Game win on Legendary difficulty   |                     Congratulations displayed                     |  Pass  |
|              Game Loose              |           Program offers to play same difficulty again            |  Pass  |
|              Game Loose              |             Program offers to try easier difficulty              |  Pass  |
|   Game Loose on Easiest Difficulty   |       Program displays text when loosing Easiest difficulty       |  Pass  |
|            Starting Game             |                         Game timer starts                         |  Pass  |





### Compatibility
The Website was tested for appearance,
functionality or responsiveness on these devices:
* Ipad Pro 12.9"
* Macbook Air 13"
* Iphone 12
All these devices have used Safari, Firefox and Google Chrome browsers
### Manual Testing
* Device compatibility

| Device          | Test                                                    | Result |
|-----------------|---------------------------------------------------------|--------|
| MacBook Air 13" | No appearance, responsiveness nor functionality issues. | Pass   |
| iPad Pro 12.9"  | No appearance, responsiveness nor functionality issues. | Pass   |
| iPhone 8        | No appearance, responsiveness nor functionality issues. | Pass   |



### Browser Compatibility

| Browser         | Test                                                    | Result |
|-----------------|---------------------------------------------------------|--------|
| Google Chrome   | No appearance, responsiveness nor functionality issues. | Pass   |
| Safari          | No appearance, responsiveness nor functionality issues. | Pass   |
| Mozilla Firefox | No responsiveness nor functionality issues.             | Pass   |
| Microsoft Edge  | No appearance, responsiveness nor functionality issues. | Pass   |


[Back to top ⇧](#hangman-game)
## Validation
![W3C HTML Validation](assets/images/w3c_html.png)
![W3C CSS Validation](assets/images/w3c_css.png)

[Back to top ⇧](#hangman-game)
## Technologies
### Languages used
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white) 

![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)

![Javascript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
### Bootstrapping
* Fonts were used from Google Fonts
* Icons on hyperlinks were not used as intention of all layouts 
  handwritten on paper style
### Tools used
* Program "Gimp" for cropping and adjusting images
* Visual Studio Code - as Code Editor
* Git / GitHub for Version Control
* Shields.io for badges used in README.md

[Back to top ⇧](#hangman-game)
## Features

- Choose from different difficulty levels, ranging from beginner to legendary.
- Guess letters to uncover the hidden word.
- Interactive hangman image that updates with each incorrect guess.
- Timed gameplay with a countdown timer.
- Player actions log to track each game's progress and outcomes.
- Contact form for users to provide feedback or inquire.

[Back to top ⇧](#hangman-game)

## Usage

### Gameplay
1. Upon opening the game, you'll be presented with the option to choose a difficulty level using a slider.
2. Click the "Start Game" button to begin. The game will display a hidden word as a series of underscores.
3. Use the on-screen buttons to guess letters. Each correct guess will reveal the position of the letter in the word. Incorrect guesses will update the hangman image.
4. The game ends when the word is fully revealed (win) or the hangman is completed (loss).
5. User is presented only with the first five levels of difficulty; after succeeding highest, one more will be revealed and so on, till Legendary difficulty is unlocked.

[Back to top ⇧](#hangman-game)

### Difficulty Levels
The game offers the following difficulty levels:

* Beginner
* Easy
* Intermediate
* Advanced
* Expert
* Master
* Legendary

Each level corresponds to a different set of words, with varying levels of complexity.

[Back to top ⇧](#hangman-game)

## Functions

Here are the functions used in the Hangman game:

### hangmanImageUpdate
This function updates the hangman image based on the current mistake count.

### updateSliderDifficultyLabel
This function updates the displayed difficulty label (on HTML page) based on the slider value.

### chooseWord
This function selects a random word based on the chosen difficulty level and initializes the hidden word array.

### updateHiddenWord
This function updates the displayed hidden word on the screen.

### createAlphabet
This function creates and displays clickable alphabet buttons for letter guessing.

### letterGuess
This function handles a letter guess,
updates the hidden word, and log player actions.

### updateTimerDisplay
This function updates the countdown timer display.

### startTimer
This function starts the timer when a game begins.

### updateTimer
This function calculates and updates the elapsed time during gameplay.

### newGame
This function starts a new game, resetting various game-related variables and UI elements.

### gameTryAgainButton
This function displays the "Try Again" button on the game over screen.
* If player was already playing EASIEST (**Beginner**) level, it will change button text contents accordingly
* If a player has won the hardest (**Legendary**) level, a text within button will congratulate the player and will offer to try iit again

### gameTryAgainButtonOther
This function displays the "Try Again" button with a different difficulty level on the game over screen. When button pressed, will initiate function **newGameOther**
* If a player has lost, it will offer easier difficulty based on one player just jas lost
* If player won, then button will offer harder difficulty to try
* Function also checks, was it Beginner or Legendary difficulties, if so, this button will not be revealed

### newGameOther
This function starts a new game with a different difficulty level.

### gameOver
This function handles the game over state, including logging player actions and displaying appropriate buttons. 

### logPlayerActions
This function logs player actions, including the current game's progress and outcome.

### contactForm
**contact** hyperlink clicked in NAV section will trigger function **contactForm**, which will initiate other functions to change the layout of page feedback or inquiries. 
### createForm
This function creates the contact form elements,
where the player can fill details and post them.

### rearrangeNavigation
This function rearranges navigation links based on the current page. Button **Contact** becomes **Home** page and will be moved to left

### homePage
This function restores the homepage content and functionality:
* Restores HomePage text and layout
* Stops the times
* Restores instructions
* Restore the main image to default
By using function instead of manually refreshing page,
  player can keep current game progress (win loose etc.).


### playerActionsTable
This function is intended for a player actions table:
* Each game log output is visible in table
* Each game will have a sub-table for every guessing attempt made by player

[Back to top ⇧](#hangman-game)

## To Do List

### Implement ChatGPT generating words
I want in the future to improve this code, so Ai could generate words,
the downside Api Key has to be hidden, so will need to think a way around it.
###  Player actions log output
Also, I would like in future to make separate file,
where all player actions in Game could be stored
and emailed to player if such a thing is desired.

[Back to top ⇧](#hangman-game)

## Bugs


