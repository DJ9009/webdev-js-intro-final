"use strict";
// Step 1: Initialize variables
let targetNumber;
let remainingTries = 3;
let guessHistory = [];
let gameOver = false;

// Step 2: Set up DOM references
const guessMessage = document.getElementById('guess-message');
const currentGuess = document.getElementById('current-guess');
const computerGuess = document.getElementById('computer-guess');
const guessHistoryElem = document.getElementById('guess-history');
const submitButton = document.getElementById('submit-btn');
const restartButton = document.getElementById('restart-btn');
const guessInput = document.getElementById('guess-input');

// Step 3: Function to start a new game
function startGame() {
  // Generate a random number between 1 and 100
  targetNumber = Math.floor(Math.random() * 100) + 1;
  remainingTries = 3;
  guessHistory = [];
  gameOver = false;

  // Clear all displayed values
  guessMessage.textContent = '';
  currentGuess.textContent = '';
  computerGuess.textContent = '';
  guessHistoryElem.textContent = '';

  // Enable the "Submit Guess" button and disable the "Restart" button
  submitButton.disabled = false;
  restartButton.disabled = true;
}

// Step 4: Function to handle submitting a guess
function submitGuess() {
  if (gameOver) return; // Prevent guesses after the game is over

  const playerGuess = parseInt(guessInput.value);

  // Validate the input
  if (isNaN(playerGuess) || playerGuess < 1 || playerGuess > 100) {
    guessMessage.textContent = "Please enter a number between 1 and 100.";
    return;
  }

  // Add the guess to the history
  guessHistory.push(playerGuess);
  guessHistoryElem.textContent = 'Guess History: ' + guessHistory.join(', ');

  // Show the player's guess
  currentGuess.textContent = playerGuess;

  // Check the guess
  if (playerGuess === targetNumber) {
    guessMessage.textContent = 'You won!';
    computerGuess.textContent = `The correct number was ${targetNumber}`;
    gameOver = true;
    submitButton.disabled = true; // Disable the "Submit Guess" button when the game is over
  } else if (remainingTries === 1) {
    guessMessage.textContent = 'You lost! The correct number was ' + targetNumber;
    computerGuess.textContent = `The correct number was ${targetNumber}`;
    gameOver = true;
    submitButton.disabled = true; // Disable the "Submit Guess" button when the game is over
  } else {
    remainingTries--;
    guessMessage.textContent = playerGuess < targetNumber ? 'Too low!' : 'Too high!';
  }
}

// Step 5: Function to restart the game
function restartGame() {
  startGame();
}

// Step 6: Event Listeners
submitButton.addEventListener('click', submitGuess);
restartButton.addEventListener('click', restartGame);

// Start the game when the page loads
startGame();
