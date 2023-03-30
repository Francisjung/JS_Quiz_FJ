var startBtn = document.querySelector("#start")
var timerEl = document.querySelector("#timer")
var answerList = document.querySelector("#answer-list")
var question = document.querySelector("#question")
var questionNum = document.querySelector("#question-num")
/*var answer0 = document.querySelector("#answer1")
var answer1 = document.querySelector("#answer2")
var answer2 = document.querySelector("#answer3")
var answer3 = document.querySelector("#answer4")
*/
var selectedAnswer;

/*var questionCounter = document.querySelector("#question-counter")*/
var questionOrder = [];
var questionNumber = 1;
var timerCount = 60;
var numCorrect =0;
var outOfTime = false;

//An array which holds 10 objects, each representing a question in  our quiz.
var questionsArray = [
    {
        question:"Inside which HTML element do we put the JavaScript?",
        answers: ["<!DOCTYPE JavaScript> </script>", "<JavaScript> </JavaScript>", "<src> </src>", "javaScript: "],
        correctAnswer: "<script> </script>"
    },
    {
        question:"Where is the correct place to insert a JS script?",
        answers: ["<head>", "The top of <body>", "Inside the element it is accessing", "scripts in the same directory auto link"],
        correctAnswer: "the bottom of <body>"
    },
    {
        question:"What is the correct syntax for referring to an external script called script.js?",
        answers: ["<script.get(script.js)></script>", "<script import= script.js>", "<script href=script.js></script>", "script.get('myScript')"],
        correctAnswer: "<script src=script.js></script>"
    },
    {
        question:"How do you write Hello World in an alert box?",
        answers: ["document.alertBox('Hello World')", "alert.push('Hello World')","alertBox(){'Hello World'}","console.alert('Hello World')"],
        correctAnswer: "alert('Hello World')"
    },
    {
        question:"How do you create a function named 'myFunction' in JavaScript?",
        answers: ["var myFunction = new Function(){};", "console.Function('MyFunction');", "touch myFunction(){};","git init myFunction"],
        correctAnswer: "function myFunction(){};"
    },
    {
        question:"How do you call a function named myFunction?",
        answers: ["myFuncion.run();", "myFunction = true;", "myFunction(){};","git push myFunction"],
        correctAnswer: "myFunction();"
    },
    {
        question:"How to write an IF statement in JavaScript?",
        answers: ["if x<10 then... ", "if{x>10} = true(...)", "while(x<10){...};","if(x<10) else{...}"],
        correctAnswer: "if(x<10){...};"
    },
    {
        question:"How to write a WHILE loop in JavaScript?",
        answers: ["for(var i =0; i<10; i++){...}", "do{...}while(x<10)", "document.while(x<10){...};","while{x<10}(...)"],
        correctAnswer: "while(x<10){...};"
    },
    {
        question:"How to write a FOR loop in JavaScript?",
        answers: ["while(x<10){...};", "for(x<10){....}", "document.for(var i =0; i<10; i++){...}","for(x<10){...}"],
        correctAnswer: "for(var i =0; i<10; i++){...}"
    },
    {
        question:"What is 'var' short for?",
        answers: ["Nothing, it was made up by developers of JS", "Valid Arithmetic Record", "Variance", "Var is named after its' creator"],
        correctAnswer: "Variable"
    },
];

//Main method, runs when start button is pushed
function startQuiz(){

    document.getElementById("page1").style.display = "none";
    document.getElementById("page2").style.display = "block";

    document.querySelector("#question-counter").textContent = "Questions Remaining: "+questionNumber+"/10";
    generateQuestion(questionNumber-1);
    startTimer();

}

//Generates a random number between 0 and maxVal
function generateRand(maxVal){
    return Math.floor(Math.random()*maxVal);
}

function generateQuestion(index){
    question.textContent = questionsArray[index].question;
    document.querySelector("#question-counter").textContent = "Questions Remaining: "+questionNumber+"/10";
    var numAnswers = 4
    var correctIndex = generateRand(4);
    console.log("correctIndex = "+correctIndex);
    for(var i=0; i<numAnswers; i++){
        if(i==correctIndex){
            document.querySelector("#answer"+i).textContent=questionsArray[index].correctAnswer;
        }else{
            document.querySelector("#answer"+i).textContent=questionsArray[index].answers[i];
    }
}
}

//Starts a 60 second timer which ticks down once a second. 
//When the timer reaches 0 it will set outOfTime to true and display page 3.
function startTimer(){

    var timerInterval = setInterval(function () {

        timerCount--;
        timerEl.textContent="Time: "+timerCount;

        if(timerCount <= 0||questionNumber>10){
            clearInterval(timerInterval);
            document.getElementById("page2").style.display = "none";
            document.getElementById("page3").style.display = "block";
            resultScreen();
        }
    }, 1000);
}

//Listens for the button element #start to be pressed.
startBtn.addEventListener("click", function(){startQuiz()});

document.querySelectorAll("ul#answer-list li").forEach((item) => {
    item.addEventListener('click', (event) =>{
            event.preventDefault();
            isCorrect(item.textContent);
            nextQuestion();
    })
});

function isCorrect(string){
    if(string == questionsArray[questionNumber-1].correctAnswer){
        console.log("true");
        numCorrect++;
        return true;
    }else{
        console.log("false");
        timerCount-=10;
        return false;
    }
}

function nextQuestion(){
    questionNumber++;
    if(questionNumber<10){
    generateQuestion(questionNumber-1);
    }
}

function calculateScore(){
    return numCorrect+timerCount;
}

function resultScreen(){
    document.querySelector("#time-remaining").textContent = "Time Remaining: "+timerCount;
    document.querySelector("#num-correct").textContent = "Correct Answers: "+numCorrect+"/10";
    document.querySelector("#score").textContent = "Final Score: "+calculateScore();
}