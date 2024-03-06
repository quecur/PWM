function cargarContenido(url, componente) {
  return fetch(url)
      .then(response => response.text())
      .then(html => {
          document.getElementById(componente).innerHTML = html;
      })
      .catch(error => {
          console.error('Error al cargar el contenido:', error);
          throw error; 
      });
}


cargarContenido('/components/Navbar.html','menu')
cargarContenido('/components/Home.html','body_section')
cargarContenido('/components/Footer.html','footer_end')


function cargarSneakers() {
  cargarContenido('/components/Sneakers.html', 'body_section')
      .then(() => {
          cargarImagenesMarcas();
          cargarImagenesSneakers();
      })
      .catch(error => {
          console.error('Error al cargar sneakers:', error);
      });
}

// Función para la animación de la página de home
function scrollPageDown() {
  window.scroll({
      top: window.scrollY + 1000, 
      behavior: 'smooth' 
  });
}