const quizData = [
    {
        question: "Which language runs in a web browser?",
        a: "Java",
        b: "C",
        c: "Python",
        d: "JavaScript",
        correct: "d",
    },
    {
        question: "What does CSS stand for?",
        a: "Central Style Sheets",
        b: "Cascading Style Sheets",
        c: "Cascading Simple Sheets",
        d: "Cars SUVs Sailboats",
        correct: "b",
    },
    {
        question: "What does HTML stand for?",
        a: "Hypertext Markup Language",
        b: "Hypertext Markdown Language",
        c: "Hyperloop Machine Language",
        d: "Helicopters Terminals Motorboats Lamborginis",
        correct: "a",
    },
    {
        question: "What year was JavaScript launched?",
        a: "1996",
        b: "1995",
        c: "1994",
        d: "none of the above",
        correct: "b",
    },
];
const $ = (v,el = document) => el.querySelector(v);
const $$ = (v,el = document) => el.querySelectorAll(v);
const quizContainer = $("#quiz");
const question = $("#question");
const answerInput = $$(".answer-input");
const answerLabel = $$(".answer-text");
let currentQuestion = 0,score = 0;
function loadQuiz(){
    initAnswers();
    let currentQuizData = quizData[currentQuestion];
    question.textContent = currentQuizData.question;
    answerLabel.forEach(item => {
        const key = item.getAttribute("for");
        item.textContent = currentQuizData[key];
    });
}
function initAnswers(){
    answerInput.forEach(item => item.checked = false);
}
function getSelected(){
    let answer;
    answerInput.forEach(item => {
        if(item.checked){
            answer = item.id;
        }
    });
    return answer;
}
submit.addEventListener("click",() => {
    const answer = getSelected();
    if(answer){
        if(answer === quizData[currentQuestion].correct){
            score++;
        }
        currentQuestion++;
        if(currentQuestion > quizData.length - 1){
            quizContainer.innerHTML = `
                <h2>You answered ${ score } / ${ quizData.length } questions correctly!</h2>
                <button type="button" class="btn" onclick="location.reload()">reload</button>
            `
        }else{
            loadQuiz();
        }
    }
})
window.onload = () => loadQuiz();