const word_element = document.getElementById('word');
const popup = document.querySelector('#popup-container');
const succes_message = document.querySelector('#succes');
const wrongLetters_element = document.querySelector('#wrong-letters');
const items = document.querySelectorAll('.item');
const message_element = document.querySelector('#message');
const play_againBtn = document.querySelector('#play-again');

const correctLetters = [];
const wrongLetters = [];
let selectedWord = getRandomWord();

function getRandomWord() {
  const words = [
    'javascript',
    'java',
    'python',
    'css',
    'html',
    'react',
    'angular',
    'vue',
    'next',
    'express',
    'node',
  ];
  return words[Math.floor(Math.random() * words.length)];
}

function displayWord() {
  word_element.innerHTML = `${selectedWord
    .split('')
    .map(
      (letter) => `<div class="letter">
  ${correctLetters.includes(letter) ? letter : ''}
  </div>
  `
    )
    .join('')}`;

  const w = word_element.innerText.replace(/\n/g, '');
  if (w === selectedWord) {
    popup.style.display = 'flex';
    succes_message.innerText = 'Congratulations!';
  }
}

function updateWrongLetters() {
  wrongLetters_element.innerHTML = `
    ${wrongLetters.length > 0 ? '<h3>Wrong Letters</h3> ' : ''}
    ${wrongLetters.map((letter) => `<span>${letter}</span>`)}
    `;

  items.forEach((item, index) => {
    const errorCount = wrongLetters.length;
    if (index < errorCount) {
      item.style.display = 'block';
    } else {
      item.style.display = 'none';
    }
  });

  if (wrongLetters.length === items.length) {
    popup.style.display = 'flex';
    succes_message.innerText = 'Lose!';
  }
}

function displayMessage() {
  message_element.classList.add('show');
  setTimeout(() => {
    message_element.classList.remove('show');
  }, 2000);
}

play_againBtn.addEventListener('click', function () {
  correctLetters.splice(0);
  wrongLetters.splice(0);

  selectedWord = getRandomWord();
  displayWord();
  updateWrongLetters();

  popup.style.display = 'none';
});

window.addEventListener('keydown', function (e) {
  if ((e.keyCode >= 65 && e.keyCode <= 90) || e.keyCode == 222) {
    const letter = e.key;

    if (selectedWord.includes(letter)) {
      if (!correctLetters.includes(letter)) {
        correctLetters.push(letter);
        displayWord();
      } else {
        displayMessage();
      }
    } else {
      if (!wrongLetters.includes(letter)) {
        wrongLetters.push(letter);
        updateWrongLetters();
      } else {
        displayMessage();
      }
    }
  }
});

displayWord();
