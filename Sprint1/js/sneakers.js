// Función para cargar las imágenes de las marcas de zapatillas
function cargarImagenesMarcas() {
    fetch('/json/Sneakers.json')
        .then(res => res.json())
        .then(data => {
            const snkBranchs = document.querySelector('.snk-branchs');
            data.sneakers_brands.forEach(image => {
                snkBranchs.insertAdjacentHTML('beforeend', `<div class="brands_div"><img src="${image}"></img></div>`);
            });
        })
        .catch(error => {
            console.error('Error al cargar las imágenes de las marcas de zapatillas:', error);
        });
}

let nextIndex = 12;
function indice(){
    nextIndex = 12;
}

// Función para cargar y mostrar las zapatillas
function cargarZapatillas() {
    fetch('/json/Sneakers.json')
        .then(res => res.json())
        .then(data => {
            const nikeSneakers = data.sneakers_nike || [];
            const sneakersToShow = nikeSneakers.slice(nextIndex - 12, nextIndex); // Cargar el próximo lote de imágenes
            mostrarZapatillas(sneakersToShow);
            if (nextIndex < nikeSneakers.length) {
                agregarBotonShowMore();
            }else{
                eliminarBotonShowMore();
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