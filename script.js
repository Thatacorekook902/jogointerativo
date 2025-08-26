const startBtn = document.getElementById("startBtn");
const restartBtn = document.getElementById("restartBtn");
const hintEl = document.getElementById("hint");
const wardrobe = document.getElementById("wardrobe");
const scoreEl = document.getElementById("score");
const timeEl = document.getElementById("time");
const message = document.getElementById("message");

const roupas = [
  { nome: "Camiseta", emoji: "👕" },
  { nome: "Casaco", emoji: "🧥" },
  { nome: "Vestido", emoji: "👗" },
  { nome: "Calça", emoji: "👖" },
  { nome: "Short", emoji: "🩳" },
];

let score = 0;
let time = 60;
let interval;
let currentHint = "";

function startGame() {
  score = 0;
  time = 60;
  scoreEl.textContent = score;
  timeEl.textContent = time;
  startBtn.style.display = "none";
  restartBtn.style.display = "inline-block";
  message.textContent = "";
  nextRound();

  interval = setInterval(() => {
    time--;
    timeEl.textContent = time;
    if (time <= 0) {
      clearInterval(interval);
      message.textContent = "⏰ Tempo esgotado! Pontuação final: " + score;
      wardrobe.innerHTML = "";
      restartBtn.style.display = "inline-block";
    }
  }, 1000);
}

function restartGame() {
  clearInterval(interval);
  startGame();
}

function nextRound() {
  wardrobe.innerHTML = "";

  // Escolhe uma roupa como a correta
  const correctIndex = Math.floor(Math.random() * roupas.length);
  currentHint = roupas[correctIndex].nome;
  hintEl.textContent = `Pegue o(a) ${currentHint}`;

  // Embaralhar roupas
  const embaralhadas = [...roupas].sort(() => 0.5 - Math.random());

  embaralhadas.forEach((roupa) => {
    const btn = document.createElement("button");
    btn.classList.add("clothingItem");
    btn.textContent = roupa.emoji;
    btn.setAttribute("aria-label", roupa.nome);

    btn.addEventListener("click", () => {
      if (roupa.nome === currentHint) {
        score += 10;
        message.textContent = "✅ Acertou!";
      } else {
        score -= 5;
        message.textContent = "❌ Errou!";
      }
      scoreEl.textContent = score;
      setTimeout(() => {
        message.textContent = "";
        nextRound();
      }, 1000);
    });

    wardrobe.appendChild(btn);
  });
}

startBtn.addEventListener("click", startGame);
restartBtn.addEventListener("click", restartGame);
