// console.log("Hello Lovin");

const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
// const questionCounterText= document.getElementById('questionCounter'); //updating counter to progress bar
const progressText= document.getElementById('progressText');
const scoreText= document.getElementById('score');
const progressBarFull=document.getElementById('progressBarFull');

let currentQuestion={};
let acceptingAnswer=false;
let score =0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [{
    question: "Inside which HTML element do we put JavaScript ?",
    choice1: "<script>",
    choice2: "<javascript>",
    choice3: "<js>",
    choice4: "<scripting>",
    answer: 1

},
{
    question: "What is the correct syntax for referring to an external script called xxx.js?",
    choice1: "<script href='xxx.js'>",
    choice2: "<script name='xxx.js'>",
    choice3: "<script src='xxx.js'>",
    choice4: "<script file='xxx.js'>",
    answer: 3

},
{
    question: "How do you write 'Hello World' in an alert box?",
    choice1: "msgBox('Hello world');",
    choice2: "alertBox('Hello World');",
    choice3: "msg('Hello World');",
    choice4: "alert('Hello World');",
    answer: 4

}];

//CONSTANTS

const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 3;

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [ ... questions]; //copy from array of questions using spread operator
    // console.log(availableQuestions); //worked
    getNewQuestion();
};


getNewQuestion = () => {

    if(availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS){
        localStorage.setItem('mostRecentScore',score)
        //GO TO END PAGE
        return window.location.assign("/end.html");
    }

    questionCounter++; //increment
    // questionCounterText.innerText = questionCounter + "/" + MAX_QUESTIONS;
    //template literal substitute expression and variable together
    // questionCounterText.innerText = `${questionCounter}/${MAX_QUESTIONS}`; //updating counter  to progress bar

    progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;
    //update progress bar
    // console.log((questionCounter/MAX_QUESTIONS)* 100);

    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS)* 100}%`;

    const questionIndex = Math.floor(Math.random() * availableQuestions.length); //random question using math.random and math.floor to integer value
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;

    choices.forEach(choice => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice' + number];
    });

    availableQuestions.splice(questionIndex,1); //remove used question
    acceptingAnswer = true;
};

choices.forEach(choice => {
    choice.addEventListener("click",e=> {
        // console.log(e.target);
        if(!acceptingAnswer) return;
        acceptingAnswer = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset["number"];

        //ALTERNATE TO TERNARY STEP

        // const classToApply = 'incorrect';
        // if(selectedAnswer == currentQuestion.answer){
        //     classToApply = 'correct';
        // }

        const classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';

        //INCREMENT SCORE IF CORRECT 
        if(classToApply === 'correct'){
            incrementScore(CORRECT_BONUS);
        }

        selectedChoice.parentElement.classList.add(classToApply);

        // console.log(classToApply); //worked

        // console.log(selectedAnswer == currentQuestion.answer); //worked

        // console.log(selectedAnswer); //worked

        //timeout for answer status color
        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);

        getNewQuestion();
        }, 1000);
        

    });
});

incrementScore = num =>{
    score += num;
    scoreText.innerText = score;
}

startGame();

