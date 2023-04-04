const username = document.getElementById('username');
const saveScoreBtn = document.getElementById('saveScoreBtn');
const finalScore = document.getElementById('finalScore') ;
const mostRecentScore = localStorage.getItem('mostRecentScore');

// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'highScores... Remove this comment to see the full error message
const highScores = JSON.parse(localStorage.getItem('highScores')) || [];

const MAX_HIGH_SCORES= 5;

// @ts-expect-error TS(2531): Object is possibly 'null'.
finalScore.innerText = mostRecentScore;

// @ts-expect-error TS(2531): Object is possibly 'null'.
username.addEventListener('keyup', () => {
    // @ts-expect-error TS(2531): Object is possibly 'null'.
    saveScoreBtn.disabled = !username.value;
});

// @ts-expect-error TS(2304): Cannot find name 'saveHighScore'.
saveHighScore = (e: any) => {
    e.preventDefault();

    const score = {
        score: mostRecentScore,
        // @ts-expect-error TS(2531): Object is possibly 'null'.
        name: username.value,
    };
    highScores.push(score);
    highScores.sort((a: any, b: any) => b.score - a.score);
    highScores.splice(5);

    localStorage.setItem('highScores', JSON.stringify(highScores));
    window.location.assign('/');
};
