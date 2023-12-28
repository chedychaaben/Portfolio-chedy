
let menu = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menu.onclick = () => {
    menu.classList.toggle('bx-x');
    navbar.classList.toggle('open')
};

const sr = ScrollReveal ({
    distance: '40px',
    duration: 2500,
    reset: true
});
sr.reveal('.logo',{delay:200, origin: 'left'});
sr.reveal('.navbar',{delay:400, origin: 'top'});
sr.reveal('.menu-btn',{delay:520, origin: 'right'});
sr.reveal('.app',{delay:520, origin: 'bottom'});



const questions = [
    {
        question: "Quel est le plus grand animal du monde ?",
        answers: [
             { text: "Requin", correct: false },
             { text: "Baleine bleue", correct: true },
             { text: "Éléphant", correct: false },
             { text: "Girafe", correct: false },
        ]
    },
    {
        question: "Quel est le plus petit pays du monde ?",
        answers: [
             { text: "Cité du Vatican", correct: true },
             { text: "Tunisie", correct: false },
             { text: "France", correct: false },
             { text: "Chine", correct: false },
        ]
    },
    {
        question: "Quel est le plus grand désert du monde ?",
        answers: [
             { text: "Gobi", correct: false },
             { text: "Sahara", correct: false },
             { text: "Kalahari", correct: false },
             { text: "Antarctique", correct: true },
        ]
    },
    {
        question: "Quel est le plus petit continent du monde ?",
        answers: [
             { text: "Afrique", correct: false },
             { text: "Europe", correct: false },
             { text: "Australie", correct: true },
             { text: "Arctique", correct: false },
        ]
    },
    {
        question: "Lequel est le premier système d'exploitation entièrement pris en charge en 64 bits ?",
        answers: [
             { text: "Windows Vista", correct: false },
             { text: "Mac", correct: false },
             { text: "Linux", correct: true },
             { text: "Windows XP", correct: false },
        ]
    },
    {
        question: "Le disque dur d'ordinateur a été introduit pour la première fois en 1956 par ?",
        answers: [
             { text: "Dell", correct: false },
             { text: "Apple", correct: false },
             { text: "Microsoft", correct: false },
             { text: "IBM", correct: true },
        ]
    },
    {
        question: "Lequel des éléments suivants n'est pas un navigateur Web ?",
        answers: [
             { text: "Navigateur Netscape", correct: false },
             { text: "WWW", correct: false },
             { text: "MOSAIC", correct: false },
             { text: "Facebook", correct: true },
        ]
    },
    {
        question: "Dans le monde de l'informatique, à quoi fait référence un cheval de Troie ?",
        answers: [
             { text: "Virus", correct: false },
             { text: "Malware", correct: true },
             { text: "Ver", correct: false },
             { text: "Logiciel espion", correct: false },
        ]
    },
    {
        question: "Lequel des éléments suivants est un langage de programmation ?",
        answers: [
             { text: "HTTP", correct: false },
             { text: "HTML", correct: true },
             { text: "HPML", correct: false },
             { text: "FTP", correct: false },
        ]
    },
    {
        question: "Quel protocole est utilisé pour envoyer des e-mails ?",
        answers: [
             { text: "SMTP", correct: true },
             { text: "POP3", correct: false },
             { text: "HTTP", correct: false },
             { text: "SSH", correct: false },
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => 
        {const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}


function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}





nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
       handleNextButton(); 
    }else{
        startQuiz();
    }
})

startQuiz();