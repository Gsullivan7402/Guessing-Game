const words = [
  "javascript", "python", "html", "css", "java", "php", "ruby", "typescript", 
  "cplusplus", "swift", "sql", "nodejs", "react", "angular", "mongodb", "firebase"
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

function startGame() {
  document.querySelector('.start-screen').style.display = 'none';
  document.querySelector('.word-list').style.display = 'block';
  document.querySelector('.game-screen').style.display = 'block';

  randomWord = words[Math.floor(Math.random() * words.length)];
  remainingAttempts = 10;
  guessedWord = "_".repeat(randomWord.length).split('').join(' ');

  document.getElementById('word-container').innerText = guessedWord;
  document.getElementById('attempts').innerText = remainingAttempts;

  timeLeft = 20;
  document.getElementById('timer').innerText = timeLeft;

  timerInterval = setInterval(() => {
    timeLeft--;
    document.getElementById('timer').innerText = timeLeft;
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
  document.querySelector('.game-screen').style.display = 'none';
  document.querySelector('.word-list').style.display = 'none';
  document.querySelector('.start-screen').style.display = 'block';
  clearInterval(timerInterval);
}

displayPossibleWords();
