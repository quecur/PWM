function cargarContenido(url, componente) {
  fetch(url)
      .then(response => response.text())
      .then(html => {
          // Insertar el HTML obtenido en el div de contenido
          document.getElementById(componente).innerHTML = html;
      })
      .catch(error => console.error('Error al cargar el contenido:', error));
}

cargarContenido('/components/Navbar.html','menu')
cargarContenido('/components/Home.html','body_section')
cargarContenido('/components/Footer.html','footer_end')

function scrollPageDown() {
  window.scroll({
      top: window.scrollY + 1000, 
      behavior: 'smooth' 
  });
}