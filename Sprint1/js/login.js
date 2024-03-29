const loginForm = document.getElementById("loginForm");
const parrafo = document.getElementById("warnings");
loginForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    let warnings = "";
    const mail = document.getElementById("mail").value;
    const password = document.getElementById("password").value;
    const Users = JSON.parse(localStorage.getItem('users')) || [];
    const validUser = Users.find(user => user.mail === mail && user.password === password);
    const validUser2 = Users.find (user => user.userName === mail && user.password === password);
    if(!validUser && !validUser2){
        warnings += 'User and/or password incorrect';
        parrafo.innerHTML = warnings;
    } else {
        localStorage.setItem("login", true);
        window.location.href = "../index.html";
    }
})