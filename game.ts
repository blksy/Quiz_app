const question = document.getElementById('question');
const choices = Array.from(document.getElementsByClassName('choice-text'));
const progressText = document.getElementById('progressText');
const scoreText = document.getElementById('score');
const progressBarFull = document.getElementById('progressBarFull');
const loader = document.getElementById('loader');
const game = document.getElementById('game');

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuesions: any = [];

let questions: any = [];

fetch(
    'https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple'
)
    .then((res) => {
        return res.json();
    })
    .then((loadedQuestions) => {
        questions = loadedQuestions.results.map((loadedQuestion: any) => {
            const formattedQuestion = {
                question: loadedQuestion.question,
            };

            const answerChoices = [...loadedQuestion.incorrect_answers];
            // @ts-expect-error TS(2339): Property 'answer' does not exist on type '{ questi... Remove this comment to see the full error message
            formattedQuestion.answer = Math.floor(Math.random() * 4) + 1;
            answerChoices.splice(
                // @ts-expect-error TS(2339): Property 'answer' does not exist on type '{ questi... Remove this comment to see the full error message
                formattedQuestion.answer - 1,
                0,
                loadedQuestion.correct_answer
            );

            answerChoices.forEach((choice, index) => {
                // @ts-expect-error TS(7053): Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
                formattedQuestion['choice' + (index + 1)] = choice;
            });

            return formattedQuestion;
        });

        // @ts-expect-error TS(2304): Cannot find name 'startGame'.
        startGame();
    })
    .catch((err) => {
        console.error(err);
    });


const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 5;

// @ts-expect-error TS(2304): Cannot find name 'startGame'.
startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuesions = [...questions];
    // @ts-expect-error TS(2304): Cannot find name 'getNewQuestion'.
    getNewQuestion();
    // @ts-expect-error TS(2531): Object is possibly 'null'.
    game.classList.remove('hidden');
    // @ts-expect-error TS(2531): Object is possibly 'null'.
    loader.classList.add('hidden');
};

// @ts-expect-error TS(2304): Cannot find name 'getNewQuestion'.
getNewQuestion = () => {
    if (availableQuesions.length === 0 || questionCounter >= MAX_QUESTIONS) {
        // @ts-expect-error TS(2345): Argument of type 'number' is not assignable to par... Remove this comment to see the full error message
        localStorage.setItem('mostRecentScore', score);
   
        return window.location.assign('/end.html');
    }
    questionCounter++;
    // @ts-expect-error TS(2531): Object is possibly 'null'.
    progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;
 
    // @ts-expect-error TS(2531): Object is possibly 'null'.
    progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

    const questionIndex = Math.floor(Math.random() * availableQuesions.length);
    currentQuestion = availableQuesions[questionIndex];
    // @ts-expect-error TS(2531): Object is possibly 'null'.
    question.innerHTML = currentQuestion.question;

    choices.forEach((choice) => {
        // @ts-expect-error TS(2339): Property 'dataset' does not exist on type 'Element... Remove this comment to see the full error message
        const number = choice.dataset['number'];
        // @ts-expect-error TS(7053): Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        choice.innerHTML = currentQuestion['choice' + number];
    });

    availableQuesions.splice(questionIndex, 1);
    acceptingAnswers = true;
};

choices.forEach((choice) => {
    choice.addEventListener('click', (e) => {
        if (!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        // @ts-expect-error TS(2531): Object is possibly 'null'.
        const selectedAnswer = selectedChoice.dataset['number'];

        const classToApply =
            // @ts-expect-error TS(2339): Property 'answer' does not exist on type '{}'.
            selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';

        if (classToApply === 'correct') {
            // @ts-expect-error TS(2304): Cannot find name 'incrementScore'.
            incrementScore(CORRECT_BONUS);
        }

        // @ts-expect-error TS(2531): Object is possibly 'null'.
        selectedChoice.parentElement.classList.add(classToApply);

        setTimeout(() => {
            // @ts-expect-error TS(2531): Object is possibly 'null'.
            selectedChoice.parentElement.classList.remove(classToApply);
            // @ts-expect-error TS(2304): Cannot find name 'getNewQuestion'.
            getNewQuestion();
        }, 1000);
    });
});

// @ts-expect-error TS(2304): Cannot find name 'incrementScore'.
incrementScore = (num: any) => {
    score += num;
    // @ts-expect-error TS(2531): Object is possibly 'null'.
    scoreText.innerText = score;
};
