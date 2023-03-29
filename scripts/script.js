var startBtn = document.querySelector("#start")
var timerEl = document.querySelector("#timer")
var answerList = document.querySelector("#answer-list")
var question = document.querySelector("#question")
var questionNum = document.querySelector("#question-num")

/*var questionCounter = document.querySelector("#question-counter")*/
var questionOrder = [];
var questionNumber = 1;
var outOfTime = false;

//An array which holds 10 objects, each representing a question in  our quiz.
var questionsArray = [
    {
        question:"Inside which HTML element do we put the JavaScript?",
        answers: ["<!DOCTYPE JavaScript> </script>", "<JavaScript> </JavaScript>", "<src> </src>"],
        correctAnswer: "<script> </script>"
    },
    {
        question:"Where is the correct place to insert a JS script?",
        answers: ["<head>", "The top of <body>", "Inside the element it is accessing"],
        correctAnswer: "the bottom of <body>"
    },
    {
        question:"What is the correct syntax for referring to an external script called script.js?",
        answers: ["script.get(script.js)></script>", "<script import= script.js>", "script href=script.js></script>"],
        correctAnswer: "<script src=script.js></script>"
    },
    {
        question:"How do you write Hello World in an alert box?",
        answers: ["document.alertBox('Hello World')", "alert.push('Hello World')","alertBox(){'Hello World'}"],
        correctAnswer: "alert('Hello World')"
    },
    {
        question:"How do you create a function named 'myFunction' in JavaScript?",
        answers: ["var myFunction = new Function(){};", "console.Function('MyFunction');", "touch myFunction(){};"],
        correctAnswer: "function myFunction(){};"
    },
    {
        question:"How do you call a function named myFunction?",
        answers: ["myFuncion.run();", "myFunction = true;", "myFunction(){};"],
        correctAnswer: "myFunction();"
    },
    {
        question:"How to write an IF statement in JavaScript?",
        answers: ["if x<10 then... ", "if{x>10} = true(...)", "while(x<10){...};"],
        correctAnswer: "if(x<10){...};"
    },
    {
        question:"How to write a WHILE loop in JavaScript?",
        answers: ["for(var i =0; i<10; i++){...}", "do{...}while(x<10)", "document.while(x<10){...};"],
        correctAnswer: "while(x<10){...};"
    },
    {
        question:"How to write a FOR loop in JavaScript?",
        answers: ["while(x<10){...};", "for(x<10){....}", "document.for(var i =0; i<10; i++){...}"],
        correctAnswer: "for(var i =0; i<10; i++){...}"
    },
    {
        question:"What is 'var' short for?",
        answers: ["Nothing, it was made up by developers of JS", "Valid Arithmetic Record", "Variance"],
        correctAnswer: "Variable"
    },
];

//Main method, runs when start button is pushed
function startQuiz(){
    generateOrder();

    document.getElementById("page1").style.display = "none";
    document.getElementById("page2").style.display = "block";

    document.querySelector("#question-counter").textContent = "Questions Remaining: "+questionNumber+"/10";
    startTimer();
}

//Generates a random number between 0 and maxVal
function generateRand(maxVal){
    Math.floor(Math.random()*maxVal);
}

//Creates a random question order, genrating numbers between 0-9 then pushing them to an array.
//This array will be used to decide the order which questions are shown in.
function generateOrder(){
    while(questionOrder.length()<10){
        var random = generateRand(10);
        if(!questionOrder.includes(random)){
            questionOrder.push(random);
        }
    }
}

function generateQuestion(index){

}

//Starts a 60 second timer which ticks down once a second. 
//When the timer reaches 0 it will set outOfTime to true and display page 3.
function startTimer(){
    var timerCount = 60;
    var timerInterval = setInterval(function () {

        timerCount--;
        timerEl.textContent="Time: "+timerCount;

        if(timerCount <= 0){
            clearInterval(timerInterval);
            timerEl.textContent= "Time: 0"
            outOfTime = true;
            document.getElementById("page2").style.display = "none";
            document.getElementById("page3").style.display = "block";
        }
    }, 1000);
}

//Listens for the button element #start to be pressed.
startBtn.addEventListener("click", function(){startQuiz()});

