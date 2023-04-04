const username: HTMLInputElement = document.getElementById('username') as HTMLInputElement;
const saveScoreBtn: HTMLButtonElement = document.getElementById('saveScoreBtn') as HTMLButtonElement;
const finalScore: HTMLElement = document.getElementById('finalScore') ;
const mostRecentScore: string | null = localStorage.getItem('mostRecentScore');

const highScores: { score: number, name: string }[] = JSON.parse(localStorage.getItem('highScores')) || [];

const MAX_HIGH_SCORES: number = 5;

finalScore.innerText = mostRecentScore!;

username.addEventListener('keyup', () => {
    saveScoreBtn.disabled = !username.value;
});

const saveHighScore = (e: Event): void => {
    e.preventDefault();
    const score = {
        score: parseInt(mostRecentScore!),
        name: username.value,
    };
    highScores.push(score);
    highScores.sort((a, b) => b.score - a.score);
    highScores.splice(MAX_HIGH_SCORES);

    localStorage.setItem('highScores', JSON.stringify(highScores));
    window.location.assign('/');
};