// script.js

let words = []; // Array to hold the words

// Fetch words from text file
fetch('words.txt')
    .then(response => response.text())
    .then(data => {
        words = data.trim().split('\n'); // Split words by lines into array
        initializeGame();
    })
    .catch(error => console.error('Error fetching words:', error));

function initializeGame() {
    targetWord = words[Math.floor(Math.random() * words.length)];
    // console.log('Target word:', targetWord);
    // You can add more initialization logic here if needed
}

const maxAttempts = 6;
let attempts = 0;

// Add an event listener to handle Enter key press
document.getElementById('guessInput').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault(); // Prevent form submission
        submitGuess(); // Call the submitGuess function
    }
});

// Function to submit a guess
function submitGuess() {
    const guessInput = document.getElementById('guessInput');
    const guess = guessInput.value.toLowerCase().trim();
    
    if (guess.length !== 5 || !words.includes(guess)) {
        alert("Please enter a valid 5-letter word.");
        return;
    }

    attempts++;
    displayGuess(guess);
    provideFeedback(guess);
    
    guessInput.value = '';

    if (guess === targetWord) {
        setTimeout(() => alert("Congratulations! You've guessed the word."), 100);
        resetGame();
    } else if (attempts === maxAttempts) {
        setTimeout(() => alert(`Sorry, you've run out of attempts. The word was '${targetWord}'.`), 100);
        resetGame();
    }
}

// Function to display the guessed word
function displayGuess(guess) {
    const guessContainer = document.getElementById('guesses');
    const guessRow = document.createElement('div');
    guessRow.className = 'guess-row';

    guess.split('').forEach(letter => {
        const letterBox = document.createElement('div');
        letterBox.className = 'guess-letter';
        letterBox.textContent = letter;
        guessRow.appendChild(letterBox);
    });

    guessContainer.appendChild(guessRow);
}

// Function to provide feedback for the guess
function provideFeedback(guess) {
    const feedback = [];
    
    for (let i = 0; i < guess.length; i++) {
        if (guess[i] === targetWord[i]) {
            feedback.push('correct');
        } else if (targetWord.includes(guess[i])) {
            feedback.push('present');
        } else {
            feedback.push('absent');
        }
    }

    const guessRow = document.querySelector('.guess-row:last-child');
    const letters = guessRow.children;

    for (let i = 0; i < letters.length; i++) {
        letters[i].classList.add(feedback[i]);
    }
}

// Function to reset the game
function resetGame() {
    document.getElementById('guesses').innerHTML = '';
    attempts = 0;
}
