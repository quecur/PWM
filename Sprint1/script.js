document.addEventListener("DOMContentLoaded", function() {
  cargarComponente("navbar-container", "/componentes/navbar.html");
  cargarComponente("login-panel", "/componentes/login_panel.html");
  cargarComponente("footer", "/componentes/footer.html");
  cargarComponente("Authenticity", "/componentes/Authenticity.html");
  cargarComponente("cart_item", "/componentes/cart_item.html");
  cargarComponente("contact", "/componentes/contact.html");
});

function cargarComponente(id, url) {
  fetch(url)
      .then(response => response.text())
      .then(html => {
          document.getElementById(id).innerHTML = html;
      })
      .catch(error => console.error('Error al cargar el componente:', error));
}
