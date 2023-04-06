const highScoresList = document.getElementById("highScoresList")! as HTMLUListElement;
let highScore: { name: string, score: number }[] = JSON.parse(localStorage.getItem("highScores")) || [];

highScoresList.innerHTML = highScore
  .map((score: { name: string, score: number }) => {
    return `<li class="high-score">${score.name} - ${score.score}</li>`;
  })
  .join("");