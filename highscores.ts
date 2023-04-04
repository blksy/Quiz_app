const highScoresList = document.getElementById("highScoresList");
// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'highScores... Remove this comment to see the full error message
const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

// @ts-expect-error TS(2531): Object is possibly 'null'.
highScoresList.innerHTML = highScores
  .map((score: any) => {
    return `<li class="high-score">${score.name} - ${score.score}</li>`;
  })
  .join("");
