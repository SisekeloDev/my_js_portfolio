let secretNumber = Math.floor(Math.random() * 10) + 1;
let displayOutput = document.getElementById("result");
document.getElementById("guessButton").onclick = myGuess;
document.getElementById("restartButton").onclick = restartGame;
let attempts = 0;

function myGuess(){
    let answer = document.getElementById("guess").value;
    answer = Number(answer);
    attempts = attempts + 1;
    checkAnswer(answer);
}

function checkAnswer(guess){
    if(attempts <= 3){
        if(guess === secretNumber){
            displayOutput.innerHTML = "Congrats! Your guess " + guess + " is correct.";
        }else if(guess < secretNumber){
            displayOutput.innerHTML = "Incorrect! Your guess " + guess + " is too low."
            clearInput();
        }else if(guess > secretNumber){
            displayOutput.innerHTML = "Incorrect! Your guess " + guess + " is too high."
            clearInput();
        }else{
            displayOutput.innerHTML = "Invalid input! Try again."
            clearInput();
        }
    }else{
        displayOutput.innerHTML = "You have no more attempts. Restart!"
        clearInput();
    }
}

function clearInput(){
    let input = document.getElementById("guess");
    input.value = "";
}

function restartGame(){
    location.reload();
}