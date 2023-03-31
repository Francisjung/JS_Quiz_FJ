/*
Author: Francis Jung
Date: 3/30/2023
Assignement 4: JS Quiz
*/

//Declaring Instance variables
var startBtn = document.querySelector("#start")
var timerEl = document.querySelector("#timer")
var answerList = document.querySelector("#answer-list")
var question = document.querySelector("#question")
var questionNum = document.querySelector("#question-num")
//var highscores = localStorage.getItem("highscores")
var selectedAnswer;

/*var questionCounter = document.querySelector("#question-counter")*/
var questionOrder = [];
var questionNumber = 1;
var timerCount = 60;
var numCorrect =0;
var outOfTime = false;
var lastquestion;
var scores = JSON.parse(localStorage.getItem("scores")) || [];
var timerInterval

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
    console.log("Last question = "+lastquestion)
        if(lastquestion!=null){
            if(lastquestion){
                document.querySelector("#last-question").textContent = "Correct :D"
                document.getElementById("last-question").style.color = "green";
            }else{
                document.querySelector("#last-question").textContent = "Incorrect :("
                document.getElementById("last-question").style.color = "red";
            }
    }
}

//Starts a 60 second timer which ticks down once a second. 
//When the timer reaches 0 it will set outOfTime to true and display page 3.
function startTimer(){

    timerInterval = setInterval(function () {

        timerCount--;
        timerEl.textContent="Time: "+timerCount;

        if(timerCount <= 0){
            if(timerCount<0){
                timerCount = 0;
            }
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

document.querySelector("#play-again").addEventListener("click", function(){playAgain()});

//Checks if the selected answer is the same as the correct answer.
function isCorrect(string){
    if(string == questionsArray[questionNumber-1].correctAnswer){
        console.log("true");
        numCorrect++;
        lastquestion = true;
        return true;
    }else{
        console.log("false");
        timerCount-=10;
        lastquestion = false;
        return false;
    }
}
//Checks if the player is done with the quiz, if not displays the next question.
//If all questions have been asked the timer is cleared and the next page is displayed.
function nextQuestion(){
    questionNumber++;
    if(questionNumber<10){
    generateQuestion(questionNumber-1);
    }else{
        clearInterval(timerInterval);
            document.getElementById("page2").style.display = "none";
            document.getElementById("page3").style.display = "block";
            resultScreen();
    }
}
//Calculates the player's final score
function calculateScore(){
    return numCorrect+ Math.floor(timerCount/10);
}
//Renders relevant information on the screen, showing the player their time, correct answers out of 10, then calculates the final score.
//As well displays a button which will call a function to move to the next page.
function resultScreen(){
    document.querySelector("#time-remaining").textContent = "Time Remaining: "+timerCount;
    document.querySelector("#num-correct").textContent = "Correct Answers: "+numCorrect+"/10";
    document.querySelector("#time-bonus").textContent = "Time Bonus: "+ Math.floor(timerCount/10);
    document.querySelector("#score").textContent = "Final Score: "+calculateScore();
}

document.querySelector("#page3-button").addEventListener("click", function(){
    console.log("show leaderboards clicked")
    var initials = document.getElementById("Initials").value;
    scores.push(initials+": "+calculateScore());
    localStorage.setItem("scores", JSON.stringify(scores));
    showLeaderboards()
});

//Hides the results page and shows the leaderboards, then renders scores from local memory on page
function showLeaderboards(){
    document.getElementById("page3").style.display = "none";
    document.getElementById("page4").style.display = "block";

    document.querySelector("#highscores").innerHTML="";
    for(var i=0; i<scores.length; i++){
        var newP = document.createElement("li");
        var scoreNode = document.createTextNode(scores[i]);
        newP.appendChild(scoreNode);
        document.querySelector("#highscores").appendChild(newP);
    }
}
//Resets the relevant values to their defaults and reinitializes the program
function playAgain(){
    questionNumber = 1;
    timerCount = 60;
    numCorrect =0;
    lastquestion = null;
    document.querySelector("#last-question").textContent = "";
    document.getElementById("page4").style.display = "none";
    startQuiz();
}