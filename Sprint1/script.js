document.addEventListener("DOMContentLoaded", function() {
    document.querySelectorAll('.nav_links a').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault(); 
            
            const id = this.id.replace('-link', '');
            
            // Construye la URL basada en el ID
            let url = `/components/${id}.html`;

            // Llama a cargarComponente con el ID, URL y un callback si es necesario
            if (id === 'Buy') {
                cargarComponente(id, url, inicializarSeleccionTallas);
            } else {
                cargarComponente(id, url);
            }
        });
    });
});

function cargarComponente(id, url, callback) {
    fetch(url)
        .then(response => response.text())
        .then(html => {
            // Selecciona el contenedor donde el contenido debe ser cargado
            const contentContainer = document.getElementById('content');
            
            if (contentContainer) {
                contentContainer.innerHTML = html;
                if (callback) callback();
            }
        })
        .catch(error => console.error('Error al cargar el componente:', error));
}
  
function inicializarSeleccionTallas() {
    const tallas = [35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46];
    const contenedorTallas = document.querySelector('.tallas-contenedor');
  
    if (!contenedorTallas) return;
  
    tallas.forEach((talla, index) => {
        const btn = document.createElement('button');
        btn.textContent = talla;
        btn.className = 'btn-talla';
        btn.onclick = () => {
            if (btn.classList.contains('btn-talla-activa')) {
                btn.classList.remove('btn-talla-activa');
                document.querySelector('.size').textContent = `Size (EU): Select`;
            } else {
                document.querySelectorAll('.btn-talla').forEach(boton => boton.classList.remove('btn-talla-activa'));
                btn.classList.add('btn-talla-activa');
                document.querySelector('.size').textContent = `Size (EU): ${talla}`;
            }
        };
  
        contenedorTallas.appendChild(btn);
    });
}
  
function changeImage(src) {
    const mainImage = document.getElementById('mainImage');
    if (mainImage) {
        mainImage.src = src;
    }
}
  