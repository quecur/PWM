// Función para cargar las imágenes de las marcas de zapatillas
function cargarImagenesMarcas() {
    fetch('../json/sneakers.json')
        .then(res => res.json())
        .then(data => {
            const snkBranchs = document.querySelector('.snk-branchs');
            data.sneakers_brands.forEach(image => {
                const marca = image.split("/")[3];
                snkBranchs.insertAdjacentHTML('beforeend', `<div class="brands_div"><img src="${image}" onclick="cargarZapatillas('${marca}')"></img></div>`);
            });
        })
        .catch(error => {
            console.error('Error al cargar las imágenes de las marcas de zapatillas:', error);
        });
}

function limpiarContenido() {
    const snkContainer = document.getElementById("snk_container");
    const template = document.getElementById("product-template").content.cloneNode(true); // Clonar el template
    console.log(template);
    snkContainer.innerHTML = ''; // Limpiar el contenido del contenedor
}


// Función para cargar y mostrar las zapatillas
function cargarZapatillas(image) {
    console.log(image);
    fetch('../json/sneakers.json')
        .then(res => res.json())
        .then(data => {
            switch(image){
                case "nike.png":
                    const  nikeSneakers = data.sneakers_nike || [];
                    mostrarZapatillas(nikeSneakers);
                    break;
                case "nb_logo.png":
                    break;
                case "adidas.png":
                    const adidasSneakers = data.sneakers_adidas || [];
                    mostrarZapatillas(adidasSneakers);
                    break;
            }
        })
        .catch(error => {
            console.error('Error al cargar las zapatillas de Nike:', error);
        });
}

// Función para mostrar las zapatillas en el contenedor
function mostrarZapatillas(sneakers) {
    const snkContainer = document.getElementById("snk_container");
    const template = document.getElementById("product-template");
    snkContainer.childNodes.forEach(child => child.remove());
    sneakers.forEach(sneaker => {
        const clonedTemplate = document.importNode(template.content, true);
        const sneakerCard = clonedTemplate.querySelector(".sneaker-card");
        const sneakerName = clonedTemplate.querySelector(".snk-name");
        const sneakerPrice = clonedTemplate.querySelector(".snk-price");
        
        sneakerCard.src = sneaker.imagen;
        sneakerName.textContent = sneaker.nombre;
        sneakerPrice.textContent = sneaker.precio;
        
        snkContainer.appendChild(clonedTemplate);
    });
}

// Función para agregar el botón "Show more"
function agregarBotonShowMore() {
    const paginationContainer = document.querySelector('.pagination');
    const buttonTemplate = document.querySelector('template#pag');
    const clonedButton = document.importNode(buttonTemplate.content, true);
    const showMoreButton = clonedButton.querySelector('button');

    showMoreButton.textContent = `Show more`;

    showMoreButton.addEventListener('click', () => {
        nextIndex += 12; 
        cargarZapatillas(nextIndex);
    });

    paginationContainer.appendChild(clonedButton);
}

// Función para eliminar el botón "Show more"
function eliminarBotonShowMore(){
    const paginationContainer = document.querySelector('.pagination');
    const PageButton = paginationContainer.querySelector('button');
    if (PageButton) {
        PageButton.remove();
    }
}