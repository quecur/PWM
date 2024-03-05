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
