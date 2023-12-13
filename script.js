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

function resetGame() {
  hide(document.querySelector('.game-screen'));
  hide(document.querySelector('.word-list'));
  show(document.querySelector('.start-screen'));
  clearInterval(timerInterval);
  document.removeEventListener('keydown', handleKeyPress);

  wins = parseInt(document.getElementById('wins').innerText);
  losses = parseInt(document.getElementById('losses').innerText);

  document.getElementById('wins').innerText = wins;
  document.getElementById('losses').innerText = losses;
}

function handleCorrectGuess(keyPressed) {
  let correctlyGuessed = false;
  let updatedWord = '';

  for (let i = 0; i < randomWord.length; i++) {
    if (randomWord[i] === keyPressed || guessedWord[i] === randomWord[i]) {
      updatedWord += randomWord[i];
      correctlyGuessed = true;
    } else {
      updatedWord += guessedWord[i];
    }
  }

  guessedWord = updatedWord;
  updateWordDisplay(guessedWord);

  if (correctlyGuessed && guessedWord === randomWord) {
    clearInterval(timerInterval);
    wins++;
    document.getElementById('wins').innerText = wins;

    const response = confirm('Congratulations! You won! Play again?');
    if (response) {
      resetGame();
    } else {
      // Handle other cases if needed
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
    const response = confirm('Play again?');
    if (response) {
      resetGame();
    } else {
      // Handle other cases if needed
    }
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