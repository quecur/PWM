document.addEventListener("DOMContentLoaded", function() {
    document.querySelectorAll('.nav_links a').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault(); 
            const id = this.id.replace('-link', '');
            let url = `/components/${id}.html`;

            cargarComponente(id, url, () => {
                if (id === 'Buy') {
                    crearBotonesDeTallas();
                    aplicarToggleAButtons('.tallas-contenedor .btn-talla', 'btn-talla-activa', actualizarSize);
                } else if (id === 'Sneakers') {
                    cargarMarcasZapatillas();
                    cargarProductos();
                }
            });
        });
    });
});

function cargarComponente(id, url, callback) {
    fetch(url)
        .then(response => response.text())
        .then(html => {
            const contentContainer = document.getElementById('content');
            if (contentContainer) {
                contentContainer.innerHTML = html;
                if (callback) callback();
            }
        })
        .catch(error => console.error('Error al cargar el componente:', error));
}
function cargarContenido(url, componente) {
  fetch(url)
      .then(response => response.text())
      .then(html => {
          // Insertar el HTML obtenido en el div de contenido
          document.getElementById(componente).innerHTML = html;
      })
      .catch(error => console.error('Error al cargar el contenido:', error));
}

function changeImage(src) {
    const mainImage = document.getElementById('mainImage');
    if (mainImage) {
        mainImage.src = src;
    }
}

function aplicarToggleAButtons(selector, claseActiva, callbackOpcional = null) {
    document.querySelectorAll(selector).forEach(btn => {
        btn.addEventListener('click', function() {
            const estabaActivo = this.classList.contains(claseActiva);

            document.querySelectorAll(selector).forEach(boton => boton.classList.remove(claseActiva));

            if (!estabaActivo) {
                this.classList.add(claseActiva);
                if (callbackOpcional) callbackOpcional(this);
            } else {
                if (callbackOpcional) callbackOpcional(null);
            }
        });
    });
}

function crearBotonesDeTallas() {
    const tallas = [35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46];
    const contenedorTallas = document.querySelector('.tallas-contenedor');

    if (!contenedorTallas) return;

    contenedorTallas.innerHTML = '';

    tallas.forEach(talla => {
        const btn = document.createElement('button');
        btn.textContent = talla;
        btn.className = 'btn-talla';
        contenedorTallas.appendChild(btn);
    });
}

function actualizarSize(btn) {
    const sizeElement = document.querySelector('.size');
    if (btn) {
        sizeElement.textContent = `Size (EU): ${btn.textContent}`;
    } else {
        sizeElement.textContent = `Size (EU): Select`;
    }
}

function cargarMarcasZapatillas() {
    const marcasZapatillas = [
        { nombre: "Nike", logo: "/images/fotos/nike.png" },
        { nombre: "Adidas", logo: "/images/fotos/adidas.png" },
        { nombre: "NewBalance", logo: "/images/fotos/nb_logo.png" }
    ];

    const contenedorMarcas = document.querySelector('.snk-branchs');
    if (!contenedorMarcas) return;

    marcasZapatillas.forEach(marca => {
        const img = document.createElement('img');
        img.src = marca.logo;
        img.alt = marca.nombre;
        img.className = 'logo-img';
        img.setAttribute('data-brand', marca.nombre);
        contenedorMarcas.appendChild(img);
    });
}

function cargarProductos() {
    const productos = [
        {
            marca: "Adidas",
            modelo: "Ultraboost",
            nombre: "Zapatilla Adidas Ultraboost",
            precio: "120€",
            imagen: "/images/dunks/dunk_cian.webp",
            descripcion: "Descripción del producto Adidas Ultraboost."
        },
        {
            marca: "Adidas",
            modelo: "Ultraboost",
            nombre: "Zapatilla Adidas Ultraboost",
            precio: "120€",
            imagen: "/images/dunks/dunk_cian.webp",
            descripcion: "Descripción del producto Adidas Ultraboost."
        },
        {
            marca: "Adidas",
            modelo: "Ultraboost",
            nombre: "Zapatilla Adidas Ultraboost",
            precio: "120€",
            imagen: "/images/dunks/dunk_cian.webp",
            descripcion: "Descripción del producto Adidas Ultraboost."
        },
        {
            marca: "Adidas",
            modelo: "Ultraboost",
            nombre: "Zapatilla Adidas Ultraboost",
            precio: "120€",
            imagen: "/images/dunks/dunk_cian.webp",
            descripcion: "Descripción del producto Adidas Ultraboost."
        },
        {
            marca: "Adidas",
            modelo: "Ultraboost",
            nombre: "Zapatilla Adidas Ultraboost",
            precio: "120€",
            imagen: "/images/dunks/dunk_cian.webp",
            descripcion: "Descripción del producto Adidas Ultraboost."
        },
        {
            marca: "Adidas",
            modelo: "Ultraboost",
            nombre: "Zapatilla Adidas Ultraboost",
            precio: "120€",
            imagen: "/images/dunks/dunk_cian.webp",
            descripcion: "Descripción del producto Adidas Ultraboost."
        },
        {
            marca: "Adidas",
            modelo: "Ultraboost",
            nombre: "Zapatilla Adidas Ultraboost",
            precio: "120€",
            imagen: "/images/dunks/dunk_cian.webp",
            descripcion: "Descripción del producto Adidas Ultraboost."
        },
        {
            marca: "Adidas",
            modelo: "Ultraboost",
            nombre: "Zapatilla Adidas Ultraboost",
            precio: "120€",
            imagen: "/images/dunks/dunk_cian.webp",
            descripcion: "Descripción del producto Adidas Ultraboost."
        }
    ];    

    const contenedorProductos = document.querySelector('.product-container');
    const template = document.getElementById('product-template').content;

    contenedorProductos.innerHTML = '';

    productos
        .forEach(producto => {
            const clone = document.importNode(template, true);
            clone.querySelector('.product-image-sneaker img').src = producto.imagen;
            clone.querySelector('.product-image-sneaker img').alt = `Imagen de ${producto.nombre}`;
            clone.querySelector('.snk-info .snk-name').textContent = `${producto.nombre} - ${producto.precio}`;
            contenedorProductos.appendChild(clone);
        });
}

cargarContenido('/componentes/Navbar.html','menu')
cargarContenido('/componentes/Home.html','body_section')
cargarContenido('/componentes/Footer.html','footer_end')

function scrollPageDown() {
  window.scroll({
      top: window.scrollY + 1000, 
      behavior: 'smooth' 
  });
}