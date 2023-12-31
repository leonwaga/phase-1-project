//Wait for the DOM to be fully loaded before executing the code
document.addEventListener("DOMContentLoaded", function () {
    const API_URL = 'http://localhost:3000/quiz';
    let questions = []
// Function to fetch questions from the server
    async function fetchQuestionsFromServer() {
 try {
        const response = await fetch('http://localhost:3000/quiz');
        const data = await response.json();
        return console.log(data);
    } catch (error) {
        return console.log(error);
    }
};
 // Get references to HTML elements
    const question = document.querySelector('#question');
    const choices = Array.from(document.querySelectorAll('.choice-text'));
    const progressText = document.querySelector('#progressText');
    const scoreText = document.querySelector('#score');
    const progressBarFull = document.querySelector('#progressBarFull');
     
 // Create variables to store the current question and game state
    let currentQuestion = {}
    let acceptingAnswers = true
    let score = 0;
    let questionCounter = 0;
    let availableQuestions = [];

// Constants for scoring and number of questions
    const SCORE_POINTS = 10
    const MAX_QUESTIONS = 10

// Function to start game
    function startGame() {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}
// create new question to get new questions
    function getNewQuestion() {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem("mostRecentScore", score)
        return window.location.assign('/end.html');
        }
// Increment question counter and update progress bar
    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS)* 100}%`
// Get a random index for the current question
    const questionIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionIndex]
    question.innerText = currentQuestion.question
// Display choices for the current question
    choices.forEach(choice => {
        const number = choice.dataset["number"]
        choice.innerText = currentQuestion[`choice${number}`];
    })
    
    availableQuestions.splice(questionIndex, 1)

    acceptingAnswers = true
}
// Display choices for the current question and add click event listners to each choice
    choices.forEach(choice => {
        choice.addEventListener('click', e => {
            e.preventDefault();
         if (!acceptingAnswers)  return 

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset["number"]

        let classToApply = selectedAnswer == currentQuestion.answer ? "correct" :
        "incorrect";

        if(classToApply == "correct") {
            incrementScore(SCORE_POINTS);

        }
// Add the class to show the result (correct or incorrect) and wait for 1 second before showing the next question
        selectedChoice.parentElement.classList.add(classToApply)
            setTimeout(() => {

                selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()

        }, 1000)

        })
    })

// Create function to increment the score
    incrementScore = num => {
        score += num
        scoreText.innerText = score
    }
// Call the fetchQuestionsFromServer() function to fetch questions before starting the game
    fetchQuestionsFromServer() 
        .then(questionsData => {
          questions = questionsData;
          startGame();
    })
    .catch(error => console.log(error));
});



