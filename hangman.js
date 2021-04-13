/********************************
Assignment #1: Hangman
*********************************/

// Maximum number of incorrect guesses
const MAX_PENALTIES = 7;

// A boolean variable indicating whether the game should continue
let play = true;

// The number of penalties committed by the player
let penalties = 0;

// A string variable representing the incorrect guesses (letters missed)
let misses = "";

// lists of categories

let sports = ["basketball", "tennis", "badminton", "rugby", "football"];
let animals = ["shark", "kangaroo", "dinosaur", "monkey", "penguin"];
let music = ["piano", "guitar", "xylophone", "triangle", "violin"];
let boba = ["oreo", "lychee", "milktea", "oolong", "matcha"];

// Welcome message
console.log ("Welcome to the Hangman Game! \n Guess the correct word before the man is hanged to win the game. \n There are 4 categories to choose from being sports, animals, music instruments and bubble tea flavours. \n Type quit to quit after the game begins");

// Getting category
let validCategory = false;
let category = "";
while(!validCategory) {
category = prompt("Enter a category from sports, animals, music or boba").toLowerCase();
if (category == "sports" || category == "animals" || category == "music" || category == "boba") {
validCategory = true;
} else {
alert("Please choose from one of the categories");
}
}


//Selecting random word
let word = ""
if(category == "sports") {
word = sports[(Math.floor(Math.random() * sports.length))];
} else if (category == "animals") {
word = animals[(Math.floor(Math.random() * animals.length))];
} else if (category == "music") {
word = music[(Math.floor(Math.random() * music.length))];
} else {
word = boba[(Math.floor(Math.random() * boba.length))];
}

const WORD_TO_GUESS = word;

// An array representation of the word to guess
let guessingWord = initializeGuessingWord(WORD_TO_GUESS);

// Step 1: An iterative statement that runs while the game is not over
while(play) {
// Print the hangman figure
printHangman(penalties);
console.log("Misses: " + misses);
console.log("Guess: " + guessingWordToString(guessingWord));

// Step 2: Ask for a letter
let suggestingLetter = askLetter();
if(suggestingLetter == null) {
// Stop the game if the player does an invalid move or wishes to quit.
console.log("GAME STOPS!");
play = false;

} else {
// Step 3: Check if the word to guess contains the letter just entered
let penalty = verifyLetter(guessingWord, WORD_TO_GUESS, suggestingLetter);
if(penalty == 1) {
misses = misses + suggestingLetter;
}
penalties += penalty;

// Step 4: Check if the player has won the game
if (checkGuessingWord(guessingWord)) {
play = false;
console.log("__________________");
console.log("CONGRATULATIONS!");
console.log("Guess: " + guessingWordToString(guessingWord));

// Step 5: Check if the player has lost the game
} else if(penalties == MAX_PENALTIES) {
play = false;
printHangman(penalties);
console.log("GAME OVER.");
}
}
}

/**********************************
YOUR IMPLEMENTATION STARTS HERE
***********************************/

/**
Prints the hangman figure according to the number of penalties.

@param {number} stage A number between 0 and 7 indicating the number of penalties.
@returns No value.
*/
function printHangman(stage) {
console.log(' ____');
console.log(' | |');

// Print the head
console.log(stage >= 1 ? ' | o' : ' |');

// Pring the upper limbs
if(stage == 2) {
console.log(' | /');
} else if(stage == 3) {
console.log(' | /|');
} else if(stage >= 4) {
console.log(' | /|\\');
} else {
console.log(' |');
}

// Print the trunk
console.log(stage >= 5 ? ' | |' : ' |');

// Print the lower limbs
if(stage == 6) {
console.log(' | /');
} else if(stage >= 7) {
console.log(' | / \\');
} else {
console.log(' |');
}

console.log(' _|_');
console.log('| |______');
console.log('| |');
console.log('|__________|');
}

/**
Initializes an array representing the guessing word based on the word to guess.
@param {oject} wordToGuess A string representing the word to guess.
@returns {object} An array representing the guessing word.
*/
function initializeGuessingWord(wordToGuess) {
let guessingWord = [];

// for the length of the word add a "_ "
for (let i = 0; i < wordToGuess.length; i ++) {
guessingWord[i] = "_ " ;
}

return guessingWord;
}

/**
Converts the array representing the guessing word to a string.

@param {object} guessingWord An array representing the guessing word.
@returns {string} A string representing the guessing word
*/
function guessingWordToString(guessingWord) {

// join the array guessingWord to a string
let str = guessingWord.join("");

return str;
}

/**
Checks if the array representing the guessing word has been completed.

@param {object} guessingWord An array representing the guessing word.
@returns {boolean} A boolean value indicating whether the guessing word has been guessed.
*/

// Check if guessing word has been completed
function checkGuessingWord(guessingWord) {
if (guessingWord.join("") == WORD_TO_GUESS) {
return true;
} else {
return false;
}
}

/**
Checks if the array representing the guessing word includes a letter.
If the guessing word includes the letter, then this function replaces the
corresponding positions in the array with the matching letter. This function,
returns a penatly value. If the guessing word contains the letter, then the penalty is 0.
Otherwise, the penalty is 1.

@param {object} guessingWordArray An array representing the guessing word.
@param {string} wordToGuess A string representing the word to guess.
@param {string} suggestingLetter A string representing a letter.
@returns {number} A number indicating the penalty.
*/

//checking for letter in guessing word
function verifyLetter(guessingWordArray, wordToGuess, suggestingLetter) {

let count = 0;

for(let i = 0; i < wordToGuess.length; i ++) {
if(wordToGuess[i] == suggestingLetter){
guessingWordArray[i] = suggestingLetter;
count ++;
}
}

if(count == 0) {
return 1;
} else {
return 0;
}
}

 

/**
Asks for an input string and checks if it represents a valid letter.
The input string represents a valid letter if it is not empty and if it is not the word "quit".
If the player enters a string with length greater than 1, then you must take only the first character.
This function should return the value null, if the value entered by the user is not valid.

@returns {string} A string representing the input letter.
*/
function askLetter() {

// repeats prompt if input is invalid
let validInput = false;
let letter = "";
while(!validInput) {
letter = prompt("Enter the letter you would like to guess").toLowerCase();
if(/^[a-zA-Z()]+$/.test(letter)) {
validInput = true;
} else {
alert("Invalid input. Please enter an alphabetical letter");
}
}

// if letter not valid letter or letter is quit
if (letter == "quit") {
return null;
} else if(letter.length > 1) {
return letter[0];
} else {
return letter;
}
}