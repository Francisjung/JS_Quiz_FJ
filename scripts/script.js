var startBtn = document.querySelector("#start")
var nextBtn = document.querySelector("#next-button")
var lastBtn = document.querySelector("#last-button")
var timerEl = document.querySelector("#timer")
var questionCounter = document.querySelector("#question-counter")
var questionNumber = 1;
var outOfTime = false;

function startQuiz(){
    document.getElementById("page1").style.display = "none";
    document.getElementById("page2").style.display = "block";
    startTimer();
}

function startTimer(){
    var timerCount = 60;
    var timerInterval = setInterval(function () {
        timerCount--;
        timerEl.textContent="Time: "+timerCount;

        lastBtn.addEventListener("click"), function(){
            if(questionsRemaining>1){ questionsNumber--;}};
        nextBtn.addEventListener("click"), function(){
            if(questionsRemaining<10){ questionsNumber++;}};

        questionCounter.textContent = "Questions Remaining: "+questionNumber+"/10";
        if(timerCount === 0){
            clearInterval(timerInterval);
            timerEl.textContent= "Time: 0"
            outOfTime = true;
            document.getElementById("page2").style.display = "none";
            document.getElementById("page3").style.display = "block";
        }
    }, 1000);
}

startBtn.addEventListener("click", function(){startQuiz()}); 
