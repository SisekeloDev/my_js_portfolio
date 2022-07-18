const button = document.getElementById('myBtn');
button.addEventListener("click", getValue);

function getValue(){
    let value = document.querySelector('input').value;
    document.getElementById("display").innerHTML += "<li>" + value + "</li";
}