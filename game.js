const question = document.querySelector('#question');
const choices = Array.front(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {}
let acceptingAnswers = true
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
    {
        question:"",
        choice1:"",
        choice2:"",
        choice3:"",
        choice4:"",
        answer:"",
    }, 

{
    question:"",
    choice1:"",
    choice2:"",
    choice3:"",
    choice4:"",
    answer:"",
}, 
{
    question:"",
    choice1:"",
    choice2:"",
    choice3:"",
    choice4:"",
    answer:"",
}, 
{
    question:"",
    choice1:"",
    choice2:"",
    choice3:"",
    choice4:"",
    answer:"",
},
{
    question:"",
    choice1:"",
    choice2:"",
    choice3:"",
    choice4:"",
    answer:"",
},  
{
    question:"",
    choice1:"",
    choice2:"",
    choice3:"",
    choice4:"",
    answer:"",
} 
] 

const SCORE_POINTS = 10
const MAX_QUESTIONS = 10

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if[availableQuestions.length === 0 || questionsCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore", score)
        
        return window.localStorage.assign('/end.html')
        
    }

    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = '$((questionCounter/MAX_QUESTIONS) + 10')