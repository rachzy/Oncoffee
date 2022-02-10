const loginbtn = document.querySelector(".login");
const registerbtn = document.querySelector(".register");
const loginbox = document.querySelector(".loginbox");
const registerbox = document.querySelector(".registerbox");
const logmark = document.querySelector("#logcheck");

logmark.addEventListener("click", function() {
    const logcheck = $("#logcheck").prop("checked");
    if(logcheck == false) {
        loginbox.style.display = 'flex';
        registerbox.style.display = 'none';
    } else {
        loginbox.style.display = 'none';
        registerbox.style.display = 'flex';
    }    
});