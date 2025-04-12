// ------------------- Tab Switching -------------------
const userGuessTab = document.getElementById('user-guess-tab');
const computerGuessTab = document.getElementById('computer-guess-tab');
const userGuessContent = document.getElementById('user-guess-content');
const computerGuessContent = document.getElementById('computer-guess-content');

userGuessTab.addEventListener('click', () => {
    userGuessTab.classList.add('active');
    computerGuessTab.classList.remove('active');
    userGuessContent.classList.add('active');
    computerGuessContent.classList.remove('active');
});

computerGuessTab.addEventListener('click', () => {
    computerGuessTab.classList.add('active');
    userGuessTab.classList.remove('active');
    computerGuessContent.classList.add('active');
    userGuessContent.classList.remove('active');
    resetComputerGuessing();
});

// ------------------- User Guessing Mode -------------------
let correctNumber = Math.floor(Math.random() * 1000) + 1;
const message = document.getElementById('message');
const korom = document.getElementById('korom');
const guessInput = document.getElementById('guess');
const guessList = document.getElementById('guess-list');
let userGuesses = [];

// Verify input on Enter key
guessInput.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        checkGuess();
    }
});

function checkGuess() {
    const guess = parseInt(guessInput.value);
    if (isNaN(guess) || guess < 1 || guess > 1000) {
        message.textContent = "Please enter a valid number between 1 and 1000.";
        return;
    }
    userGuesses.push(guess);
    updateGuessList();
    if (guess === correctNumber) {
        message.textContent = "You got it! The korom is happy!";
        korom.classList.remove('hidden');
        endUserGuessing();
    } else if (guess < correctNumber) {
        message.textContent = "Too low! Try again.";
    } else {
        message.textContent = "Too high! Try again.";
    }
    guessInput.value = "";
}

function updateGuessList() {
    guessList.textContent = userGuesses.join(", ");
}

function endUserGuessing() {
    guessInput.disabled = true;
    document.querySelector('#input-section button').disabled = true;
}

// ------------------- Computer Guessing Mode -------------------
const computerMessage = document.getElementById('computer-message');
const computerNumberBox = document.getElementById('computer-number-box');
const computerButtonBox = document.getElementById('computer-button-box');
const computerKorom = document.getElementById('computer-korom');

let computerMin = 1;
let computerMax = 1000;
let computerGuess;

const koromSays = [
    "Hmmmmm, my magic korom sense tells me your number is...",
    "Well then, it must be...",
    "Meow meow meow meow the number is...",
    "The korom Wizard guesses...",
    "No??? Well, uh... how about..."
];

function resetComputerGuessing() {
    computerMin = 1;
    computerMax = 1000;
    computerGuess = Math.floor((computerMin + computerMax) / 2);
    computerMessage.textContent = "Think of a number between 1 and 1000, and I'll try to guess it!";
    computerNumberBox.textContent = "";
    computerButtonBox.style.display = 'none';
    computerKorom.classList.add('hidden');
    setTimeout(() => {
        makeComputerGuess();
    }, 1000);
}

function makeComputerGuess() {
    if (computerMin > computerMax) {
        computerMessage.textContent = "Hmm, something's wrong. Are you sure about your responses?";
        computerNumberBox.textContent = "";
        computerButtonBox.style.display = 'none';
        return;
    }
    computerGuess = Math.floor((computerMin + computerMax) / 2);
    const randomText = koromSays[Math.floor(Math.random() * koromSays.length)];
    computerNumberBox.textContent = `${randomText} ${computerGuess}?`;
    computerButtonBox.style.display = 'block';
}

function computerHigher() {
    computerMin = computerGuess + 1;
    makeComputerGuess();
}

function computerLower() {
    computerMax = computerGuess - 1;
    makeComputerGuess();
}

function computerCorrect() {
    computerMessage.textContent = "Hooray! I guessed your number!";
    computerNumberBox.textContent = "";
    computerButtonBox.style.display = 'none';
    computerKorom.classList.remove('hidden');
}