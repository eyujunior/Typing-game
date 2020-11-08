const word = document.getElementById("word");
const text = document.getElementById("text");
const scoreEl = document.getElementById("score");
const timeEl = document.getElementById("time");
const endgameEl = document.getElementById("end-game-container");
const settingsBtn = document.getElementById("settings-btn");
const settings = document.getElementById("settings");
const settingsForm = document.getElementById("settings-form");
const difficultySelect = document.getElementById("difficulty");
const theme = document.querySelector('.theme');
const body = document.querySelector('.body');

// List of words
const words = [
  "sigh",
  "tense",
  "airplane",
  "ball",
  "pies",
  "juice",
  "warlike",
  "bad",
  "north",
  "dependent",
  "steer",
  "silver",
  "highfalutin",
  "superficial",
  "quince",
  "eight",
  "feeble",
  "admit",
  "drag",
  "loving",
];

// Initialzing
let random;
let score = 0;
let time = 10;
let difficulty =
  localStorage.getItem("difficulty") !== null
    ? localStorage.getItem("difficulty")
    : "medium";

//set difficulty select value

difficultySelect.value =
  localStorage.getItem("difficulty") !== null
    ? localStorage.getItem("difficulty")
    : "medium";

//focus on the input

text.focus();

const gameOver = () => {
  endgameEl.innerHTML = `
    <h1>Time ran out </h1>
    <p>Your final score is ${score}</p>
    <button onclick='location.reload()'>Reload </button>
    `;

  endgameEl.style.display = "flex";
};

const updateTime = () => {
  time--;
  timeEl.innerHTML = time + "s";

  if (time === 0) {
    clearInterval(timeInterval);

    //end game
    gameOver();
  }
};

const timeInterval = setInterval(updateTime, 1000);

//generate random word from array
const getRandomWord = () => words[Math.floor(Math.random() * words.length)];

const addWordDOM = () => {
  randomWord = getRandomWord();

  word.innerHTML = randomWord;
};
addWordDOM();

const updateScore = () => {
  score++;

  scoreEl.innerHTML = score;
};

// event listeners

text.addEventListener("input", (e) => {
  const insertedText = e.target.value;

  if (insertedText === randomWord) {
    addWordDOM();
    updateScore();

    //clear input field
    e.target.value = "";

    if(difficulty === 'hard') {
        time += 2;
    } else if(difficulty === 'medium') {
        time += 3;
    } else {
        time += 5;
    }
    

    updateScore();
  }
});

// settings
settingsBtn.addEventListener("click", () => settings.classList.toggle("hide"));

// settings select

settingsForm.addEventListener("change", (e) => {
  difficulty = e.target.value;
  localStorage.setItem("difficulty", difficulty);

});

// light and dark mode
theme.addEventListener('click', () => {
  body.classList.toggle('light');

  if(body.classList.contains('light')) {
    theme.innerHTML = 'Light mode';
  } else {
    theme.innerHTML = 'Dark mode'
  }
  
})











