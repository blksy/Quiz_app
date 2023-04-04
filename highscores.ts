const highScoresList: HTMLElement = document.getElementById("highScoresList")!;
const highScores: { name: string, score: number }[] = JSON.parse(localStorage.getItem("highScores")) || [];

highScoresList.innerHTML = highScores
  .map((score: { name: string, score: number }) => {
    return `<li class="high-score">${score.name} - ${score.score}</li>`;
  })
  .join("");