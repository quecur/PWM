/*
function cargarComponente(id, url) {
  fetch(url)
      .then(response => response.text())
      .then(html => {
          document.getElementById(id).innerHTML = html;
      })
      .catch(error => console.error('Error al cargar el componente:', error));
}

document.addEventListener("DOMContentLoaded", function() {
  cargarComponente("navbar-container", "/componentes/navbar.html");
  //cargarComponente("login-panel", "/componentes/login_panel.html");
  cargarComponente("footer", "/componentes/footer.html");
  //cargarComponente("Authenticity", "/componentes/Authenticity.html");
  cargarComponente("Home", "/componentes/Home.html");
});

// script.js
document.addEventListener('DOMContentLoaded', function() {
  // Obtener el contenido del template
  const template = document.getElementById('Home');
  const templateContent = template.content.cloneNode(true);

  // Agregar el contenido clonado al contenedor en el index.html
  const container = document.getElementById('Home');
  container.appendChild(templateContent);

  // Ahora puedes manipular el contenido del template según necesites
  console.log(container)
});

*/