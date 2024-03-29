const form = document.getElementById("form");
const parrafo = document.getElementById("warnings");
form.addEventListener("submit", e=>{

    const userName = document.getElementById("userName");
    const mail = document.getElementById("mail");
    const password = document.getElementById("password");
    const confirmPassword = document.getElementById("confirmPassword");
    
    
    e.preventDefault();

    let warnings = "";
    let entrar = false;
    let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?w+)*(\.\w{2,3})+$/;
    
    if(userName.value.length < 4){
        console.log("funciona");
        warnings += 'Invalid name <br>';
        entrar = true;
    }

    if(!regexEmail.test(mail.value)){
        warnings += 'Invalid email <br>';
        entrar = true;
    }

    if(password.value.length <8){
        warnings += 'Password length < 8 <br>';
        entrar = true;
    }
    
    if(confirmPassword.value !== password.value){
        warnings += 'Password and confirm password are not the same <br>';
        entrar = true;
    }

    if(entrar){
        parrafo.innerHTML = warnings;
    } else {
        const Users = JSON.parse(localStorage.getItem("users")) || [];
        const isUserRegistered = Users.find(user => user.mail === mail.value);
        const isUserNameRegistered = Users.find(user => user.userName === userName.value);
        if(isUserRegistered || isUserNameRegistered){
            warnings += 'User already registered';
            parrafo.innerHTML = warnings;
        } else {
            Users.push({userName: userName.value, mail: mail.value, password: password.value, confirmPassword: confirmPassword.value});
            localStorage.setItem("users", JSON.stringify(Users));
            window.location.href = "../components/login.html";
        }
    }
})