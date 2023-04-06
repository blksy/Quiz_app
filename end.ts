const username = document.getElementById('username')! as HTMLInputElement;
const saveScoreBtn = document.getElementById('saveScoreBtn')! as HTMLButtonElement;
const finalScore = document.getElementById('finalScore')! as HTMLHeadingElement;
const mostRecentScore = localStorage.getItem('mostRecentScore');

interface Score {
    score: string;
    name: string;
}

let highScores: Score[] = JSON.stringify(localStorage.getItem('highScores'));

const MAX_HIGH_SCORES: number = 10;

finalScore.innerText = mostRecentScore;

username.addEventListener('keyup', () => {
    saveScoreBtn.disabled = !username.value;
});

const saveHighScore = (e: Event): void => {
    e.preventDefault();

    const score: Score = {
        score: mostRecentScore,
        name: username.value,
    };
    highScores.push(score);
    highScores.sort((a: Score, b: Score) => b.score - a.score);
    highScores.splice(5);

    localStorage.setItem('highScores', JSON.stringify(highScores));
    window.location.assign('/');
};