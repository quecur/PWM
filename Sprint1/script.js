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

// Función para la animación de la página de home
function scrollPageDown() {
  window.scroll({
      top: window.scrollY + 1000, 
      behavior: 'smooth' 
  });
}