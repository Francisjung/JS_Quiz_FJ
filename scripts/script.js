var startBtn = document.querySelector("#start")
var timerEl = document.querySelector("#timer")
var outOfTime = false;

function startQuiz(){
    
}

function startTimer(){
    var timerCount = 60;
    var timerInterval = setInterval(function () {
        timerCount--;
        timerEl.textContent="Time: "+timerCount;
        if(timerCount === 0){
            clearInterval(timerInterval);
            timerEl.textContent= "Time: 0"
            outOfTime = true;
        }
    }, 1000);
}

startBtn.addEventListener("click", startQuiz()); 