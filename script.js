const hints = [
  {
    hint: "Está nevando lá fora!",
    correct: "🧥"
  },
  {
    hint: "É um dia quente de verão.",
    correct: "🩳"
  },
  {
    hint: "Está chovendo!",
    correct: "🌂"
  },
  {
    hint: "Hora de dormir.",
    correct: "🛌"
  },
  {
    hint: "Você vai à praia!",
    correct: "🩱"
  },
  {
    hint: "Está ventando muito!",
    correct: "🧣"
  }
];

const clothingOptions = ["🧥", "🩳", "🌂", "🛌", "🩱", "🧣", "👗", "👕"];

let currentHintIndex = 0;
let score = 0;
let time = 60;
let timer;
const scoreDisplay = document.getElementById("score");
const timeDisplay = document.getElementById("time");
const hintSpan = document.getElementById("hint");
const wardrobe = document.getElementById("wardrobe");
const character = document.getElementById("character");
const startBtn = document.getElementById("startBtn");
const message = document.getElementById("message");

function startGame() {
  score = 0;
  time = 60;
  updateScore();
  updateTime();
  message.textContent = "";
  startBtn.disabled = true;
  nextHint();
  startTimer();
}

function startTimer() {
  timer = setInterval(() => {
    time--;
    updateTime();
    if (time <= 0) {
      clearInterval(timer);
      message.textContent = `⏰ Tempo esgotado! Pontuação final: ${score}`;
      startBtn.disabled = false;
    }
  }, 1000);
}

function updateScore() {
  scoreDisplay.textContent = score;
}

function updateTime() {
  timeDisplay.textContent = time;
}

function nextHint() {
  wardrobe.innerHTML = "";
  currentHintIndex = Math.floor(Math.random() * hints.length);
  const currentHint = hints[currentHintIndex];
  hintSpan.textContent = currentHint.hint;

  const shuffledOptions = clothingOptions.sort(() => 0.5 - Math.random()).slice(0, 4);
  if (!shuffledOptions.includes(currentHint.correct)) {
    shuffledOptions[Math.floor(Math.random() * 4)] = currentHint.correct;
  }

  shuffledOptions.forEach(item => {
    const el = document.createElement("div");
    el.textContent = item;
    el.classList.add("clothing");
    el.setAttribute("draggable", true);
    el.addEventListener("dragstart", dragStart);
    wardrobe.appendChild(el);
  });
}

function dragStart(e) {
  e.dataTransfer.setData("text/plain", e.target.textContent);
}

character.addEventListener("dragover", (e) => {
  e.preventDefault();
});

character.addEventListener("drop", (e) => {
  e.preventDefault();
  const data = e.dataTransfer.getData("text/plain");
  const correct = hints[currentHintIndex].correct;

  if (data === correct) {
    score++;
    message.textContent = "✅ Acertou!";
  } else {
    score = Math.max(0, score - 1);
    time = Math.max(0, time - 5);
    message.textContent = "❌ Errado! -5s";
  }
  updateScore();
  updateTime();
  nextHint();
});

startBtn.addEventListener("click", startGame);
