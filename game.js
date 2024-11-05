// game.js
const words = ['polar', 'penguin', 'arctic', 'walrus', 'seal', 'blizzard', 'iceberg', 'tundra', 'aurora', 'muskox'];
let selectedWord = '';
let displayWord = '';
let guessedLetters = [];
let remainingAttempts = 13;

// Function to start a new game
function startNewGame() {
    selectedWord = words[Math.floor(Math.random() * words.length)];
    displayWord = '_'.repeat(selectedWord.length);
    guessedLetters = [];
    remainingAttempts = 13;
    updateUI();
}

// Function to update the UI after each guess
function updateUI() {
    document.getElementById('word-display').textContent = displayWord.split('').join(' ');
    document.getElementById('attempts').textContent = remainingAttempts;
    document.getElementById('guessed-letters').textContent = guessedLetters.join(', ');
    document.getElementById('guess-input').value = '';
    document.getElementById('feedback').textContent = '';
}

// Function to handle the guess
function handleGuess() {
    const guess = document.getElementById('guess-input').value.toLowerCase();

    // Basic validation for a single letter
    if (guess.length !== 1 || !/[a-z]/.test(guess)) {
        document.getElementById('feedback').textContent = 'Please enter a valid letter.';
        return;
    }

    if (guessedLetters.includes(guess)) {
        document.getElementById('feedback').textContent = 'You already guessed that letter!';
        return;
    }

    guessedLetters.push(guess);

    // Check if the guess is correct
    let correctGuess = false;
    let newDisplayWord = '';

    for (let i = 0; i < selectedWord.length; i++) {
        if (selectedWord[i] === guess) {
            newDisplayWord += guess;
            correctGuess = true;
        } else {
            newDisplayWord += displayWord[i];
        }
    }

    displayWord = newDisplayWord;

    if (!correctGuess) {
        remainingAttempts--;
    }

    // Check if the player has won or lost
    if (displayWord === selectedWord) {
        document.getElementById('feedback').textContent = 'Congratulations! You guessed the word!';
    } else if (remainingAttempts === 0) {
        document.getElementById('feedback').textContent = `Game Over! The word was: ${selectedWord}`;
    }

    updateUI();
}

// Set up event listeners
document.getElementById('submit-guess').addEventListener('click', handleGuess);

// Start the game when the page loads
window.onload = startNewGame;
