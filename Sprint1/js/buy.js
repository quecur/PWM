/* Función que extrae del sessionStorage la info necesaria 
y lo carga en el template del Buy.html. Además, se cargan
dinámicamente los botones de selección de tallas. */
function cargarBuy() {
    var imagen = sessionStorage.getItem('imagen_producto');
    var nombre = sessionStorage.getItem('nombre_producto');
    var precio = sessionStorage.getItem('precio_producto');

    var template = document.getElementById('buy_template').content.cloneNode(true);
    var imgElement = template.querySelector('#product_img');
    var infoTemplate = template.querySelector('#shoe-name');
    var precioTemplate = template.querySelector('#price');

    var tallas = ['41', '42', '43', '44', '45', '46'];
    var tallasContenedor = template.querySelector('.tallas-contenedor');
    tallas.forEach(function(talla) {
        var botonTalla = document.createElement('button');
        botonTalla.textContent = talla;
        botonTalla.classList.add('btn-talla');
        tallasContenedor.appendChild(botonTalla);
    });

    imgElement.src = imagen;
    infoTemplate.textContent = nombre;
    precioTemplate.textContent = "Price: "+precio;

    var generalContainer = document.getElementById('general');
    generalContainer.appendChild(template);    
}

/* Función que gestiona el evento de click sobre 
una talla para actualizar la info del size. */
function elegirTalla() {
    var botonesTalla = document.querySelectorAll('.btn-talla');
    var selectTalla = document.querySelector('.size');

    botonesTalla.forEach(function(boton) {
        boton.addEventListener('click', function() {
            var tallaSeleccionada = boton.textContent;
            selectTalla.textContent = "Size (EU): "+ tallaSeleccionada;
        });
    });
}

/* Función que comprueba que se ha seleccionado una talla
para poder añadir al carro el producto. Si se añade al carro
el producto, se almacenan la info en el sessionStorage y luego
se carga el Check_out.html */
function añadirCarrito(){
    var add = document.querySelector('.add-to-cart');
    add.addEventListener('click', function() {
        var size = document.querySelector('.size');
        if(size.textContent == "Size (EU):"){
            alert("Por favor, seleccione una talla");
        }else{
            var imagen = sessionStorage.getItem('imagen_producto');
            var nombre = sessionStorage.getItem('nombre_producto');
            var precio = sessionStorage.getItem('precio_producto');
            sessionStorage.setItem('imagen_producto', imagen);
            sessionStorage.setItem('nombre_producto', nombre);
            sessionStorage.setItem('precio_producto', precio)
            window.location.href = '../components/Check_out.html';
        }
    });
}