// Función que carga los elementos en la web
function cargarContenido(url, componente) {
  return fetch(url)
      .then(response => response.text())
      .then(html => {
          document.getElementById(componente).innerHTML = html;
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