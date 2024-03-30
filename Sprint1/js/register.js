function validarFormulario() {
    const formulario = document.getElementById("form");
    formulario.addEventListener("submit", e=>{        

        const userName = document.getElementById("userName");
        const mail = document.getElementById("mail");
        const password = document.getElementById("password");
        const confirmPassword = document.getElementById("confirmPassword");
        
        e.preventDefault();

        let entrar = false;
        
       
        if(confirmPassword.value !== password.value){
            entrar = true;
        }

        if(entrar){
            console.log("Error");
        } else {
            const Users = JSON.parse(localStorage.getItem("users")) || [];
            const isUserRegistered = Users.find(user => user.mail === mail.value);
            const isUserNameRegistered = Users.find(user => user.userName === userName.value);
            if(isUserRegistered || isUserNameRegistered){
                alert("Usuario ya registrado");
            } else {
                Users.push({userName: userName.value, mail: mail.value, password: password.value, confirmPassword: confirmPassword.value});
                localStorage.setItem("users", JSON.stringify(Users));
                window.location.href = "../components/login.html";
            }
        }
    }
)};