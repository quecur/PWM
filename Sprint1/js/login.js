
function login(){
    const loginForm = document.getElementById("loginForm");
    const parrafo = document.getElementById("warnings");

    loginForm.addEventListener('submit', (e)=>{
        e.preventDefault();
        const mail = document.getElementById("mail").value;
        const password = document.getElementById("password").value;
        const Users = JSON.parse(localStorage.getItem('users')) || [];
        const validUser = Users.find(user => user.mail === mail && user.password === password);
        const validUser2 = Users.find (user => user.userName === mail && user.password === password);
        if(!validUser && !validUser2){
            alert('User and/or password incorrect');
            parrafo.innerHTML = warnings;
        } else {
            localStorage.setItem('usuarioHaIniciadoSesion', true);
            window.location.href = "../index.html";
            cambiarIconoInicioSesion();
        }
    })
}

// Suponiendo que el usuario ha iniciado sesión con éxito
function cambiarIconoInicioSesion() {
    const iconoInicioSesion = document.querySelector('.login i');
    iconoInicioSesion.classList.remove('bx-user', 'bx-tada-hover');
    iconoInicioSesion.classList.add('bxs-log-in-circle');
}
