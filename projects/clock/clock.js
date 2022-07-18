setInterval(timer, 1000);

function timer(){
    let date = new Date();
    document.getElementById("myClock").innerHTML = date.toLocaleTimeString();
}