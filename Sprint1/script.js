// Función que carga los elementos en la web
function cargarContenido(url, componente, callback) {
    return fetch(url)
        .then(response => response.text())
        .then(html => {
            document.getElementById(componente).innerHTML = html;
            // Verifica si se proporcionó una función de retorno de llamada y ejecútala
            if (callback && typeof(callback) === "function") {
                callback();
            }
        })
        .catch(error => {
            console.error('Error al cargar el contenido: ', url, error);
            throw error; 
        });
  }

function pageChange(direction){
    switch(direction){
        case "nike.png":
            window.location.href = "../components/Sneakers.html";
            break;
        case "nb_logo.png":
            window.location.href = "../components/Sneakers2.html";
            break;
        case "adidas.png":
            window.location.href = "../components/Sneakers3.html";
            break;
    }
}

// Función para la animación de la página de home
function scrollPageDown() {
  window.scroll({
      top: window.scrollY + 1000, 
      behavior: 'smooth' 
  });
}

// Función para cambiar el icono del botón de inicio de sesión
function cambiarIconoInicioSesion() {
    const iconoInicioSesion = document.querySelector('.login i');
    iconoInicioSesion.classList.remove('bx-user', 'bx-tada-hover');
    iconoInicioSesion.classList.add('bxs-log-in-circle');
}

// Función para verificar el estado de inicio de sesión y cambiar el icono al cargar la página
function verificarEstadoInicioSesion() {
    const usuarioHaIniciadoSesion = localStorage.getItem('usuarioHaIniciadoSesion');

    if (usuarioHaIniciadoSesion) {
        cambiarIconoInicioSesion();
    }
}

function cerrarSesion(){
    localStorage.removeItem('usuarioHaIniciadoSesion');
    window.location.href = "../index.html";
}