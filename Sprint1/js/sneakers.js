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

// Función para cargar las imágenes de los sneakers
function cargarImagenesSneakers() {
    fetch('/json/Sneakers.json')
        .then(res => res.json())
        .then(data => {
            const snkContainer = document.getElementById("snk_container");
            const template = document.getElementById("product-template");

            data.sneakers_nike.forEach(sneaker => {
                const clonedTemplate = document.importNode(template.content, true);
                const sneakerCard = clonedTemplate.querySelector(".sneaker-card");
                const sneakerName = clonedTemplate.querySelector(".snk-name");
                const sneakerPrice = clonedTemplate.querySelector(".snk-price");
                
                sneakerCard.src = sneaker.imagen;
                sneakerName.textContent = sneaker.nombre;
                sneakerPrice.textContent = sneaker.precio;
                
                snkContainer.appendChild(clonedTemplate);
            });
        })
        .catch(error => {
            console.error('Error al cargar las imágenes de los sneakers:', error);
        });
}
