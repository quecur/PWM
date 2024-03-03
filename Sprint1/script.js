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
                    aplicarToggleAButtons('.models-container .model', 'modelo-activo');
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

function changeImage(src) {
    const mainImage = document.getElementById('mainImage');
    if (mainImage) {
        mainImage.src = src;
    }
}

function configurarSeleccionDeMarca() {
    aplicarToggleAButtons('.snk-branchs .logo-img', 'marca-seleccionada', function(selectedItem) {
        if (selectedItem) {
            const marca = selectedItem.getAttribute('data-brand');
            cargarModelos(marca);
        } else {
            document.querySelector('.models-container').innerHTML = '';
        }
    });
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

    configurarSeleccionDeMarca();
}

function cargarModelos(marca) {
    const modelosPorMarca = {
        Nike: ["Air Force", "Jordan", "Dunk", "Air Max"],
        Adidas: ["Ultraboost", "NMD", "Superstar", "Stan Smith"],
        NewBalance: ["990v5", "574", "1080", "FuelCell"]
    };
    
    const modelos = modelosPorMarca[marca];
    const contenedorModelos = document.querySelector('.models-container');

    if (!contenedorModelos) return;

    contenedorModelos.innerHTML = '';

    modelos.forEach(modelo => {
        const btn = document.createElement('button');
        btn.textContent = modelo;
        btn.className = 'model';
        contenedorModelos.appendChild(btn);
    });

    aplicarToggleAButtons('.models-container .model', 'modelo-activo');
}

function cargarProductos(marcaSeleccionada = '', modeloSeleccionado = '') {
    const productos = [
        {
            marca: "Nike",
            modelo: "Air Force",
            nombre: "Zapatilla Nike Air Force 1",
            precio: "100€",
            imagen: "/images/dunks/nike_air_force.png", // Asegúrate de que estas rutas sean correctas
            descripcion: "Descripción del producto Nike Air Force 1."
        },
        {
            marca: "Adidas",
            modelo: "Ultraboost",
            nombre: "Zapatilla Adidas Ultraboost",
            precio: "120€",
            imagen: "/images/dunks/adidas_ultraboost.png",
            descripcion: "Descripción del producto Adidas Ultraboost."
        },
        // Añade más productos según sea necesario
    ];    

    const contenedorProductos = document.querySelector('.product-container');
    const template = document.getElementById('product-template').content;

    contenedorProductos.innerHTML = ''; // Limpia el contenedor

    productos
        .filter(producto => {
            return (!marcaSeleccionada || producto.marca === marcaSeleccionada) &&
                   (!modeloSeleccionado || producto.modelo === modeloSeleccionado);
        })
        .forEach(producto => {
            const clone = document.importNode(template, true);
            clone.querySelector('.product-image img').src = producto.imagen;
            clone.querySelector('.product-image img').alt = `Imagen de ${producto.nombre}`;
            clone.querySelector('.snk-info .product-name').textContent = `${producto.nombre} - ${producto.precio}`;
            contenedorProductos.appendChild(clone);
        });
}
