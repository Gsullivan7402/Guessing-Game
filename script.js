const words = [
  "variable","array", "modulus", "object", "function", "string", "boolean"
];

let randomWord, guessedWord, remainingAttempts, timerInterval, timeLeft, wins = 0, losses = 0;

function displayPossibleWords() {
  const possibleWordsList = document.getElementById('possible-words');
  words.forEach(word => {
    const listItem = document.createElement('li');
    listItem.textContent = word;
    possibleWordsList.appendChild(listItem);
  });
}

function hide(element) {
  element.style.display = 'none';
}

function show(element) {
  element.style.display = 'block';
}

function getRandomWord() {
  return words[Math.floor(Math.random() * words.length)];
}

function updateWordDisplay(word) {
  document.getElementById('word-container').innerText = word;
}

function updateAttemptsDisplay(attempts) {
  document.getElementById('attempts').innerText = attempts;
}

function updateTimeDisplay(time) {
  document.getElementById('timer').innerText = time;
}

function startTimer() {
  return setInterval(() => {
    timeLeft--;
    updateTimeDisplay(timeLeft);
    if (timeLeft === 0) {
      clearInterval(timerInterval);
      losses++;
      document.getElementById('losses').innerText = losses;
      alert('Time is up! The word was: ' + randomWord);
      resetGame();
    }
  }, 1000);
}

function handleCorrectGuess(keyPressed) {
  const updatedWord = randomWord.split('').map((letter, index) => {
    if (letter === keyPressed) {
      return keyPressed;
    } else {
      return guessedWord.split(' ')[index];
    }
  }).join(' ');

  guessedWord = updatedWord;
  updateWordDisplay(guessedWord);

  if (guessedWord === randomWord) {
    clearInterval(timerInterval);
    if (document.getElementById('wins').innerText !== wins.toString()) {
      wins++;
      document.getElementById('wins').innerText = wins;
      const response = prompt('Congratulations! You guessed the word! Would you like to play again? (Yes/No)');
      if (response && response.toLowerCase() === 'yes') {
        resetGame();
      } else {
      }
    }
  }
}
function handleIncorrectGuess(keyPressed) {
  remainingAttempts--;
  updateAttemptsDisplay(remainingAttempts);

  if (remainingAttempts === 0) {
    clearInterval(timerInterval);
    losses++;
    document.getElementById('losses').innerText = losses;
    alert('No more attempts left! The word was: ' + randomWord);
    resetGame();
  }
}

function handleKeyPress(event) {
  const keyPressed = event.key.toLowerCase();
  if (remainingAttempts > 0) {
    if (randomWord.includes(keyPressed)) {
      handleCorrectGuess(keyPressed);
    } else {
      handleIncorrectGuess(keyPressed);
    }
  }
}

function resetGame() {
  hide(document.querySelector('.game-screen'));
  hide(document.querySelector('.word-list'));
  show(document.querySelector('.start-screen'));
  clearInterval(timerInterval);
  document.removeEventListener('keydown', handleKeyPress);
}

function startGame() {
  hide(document.querySelector('.start-screen'));
  show(document.querySelector('.word-list'));
  show(document.querySelector('.game-screen'));

  randomWord = getRandomWord();
  remainingAttempts = 10;
  guessedWord = "_".repeat(randomWord.length).split('').join(' ');

  updateWordDisplay(guessedWord);
  updateAttemptsDisplay(remainingAttempts);

  timeLeft = 20;
  updateTimeDisplay(timeLeft);

  timerInterval = startTimer();

  document.addEventListener('keydown', handleKeyPress);
}

displayPossibleWords();