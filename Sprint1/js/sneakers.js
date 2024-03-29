// Función para cargar las imágenes de las marcas de zapatillas
function cargarImagenesMarcas() {
    fetch('../json/sneakers.json')
        .then(res => res.json())
        .then(data => {
            const snkBranchs = document.querySelector('.snk-branchs');
            data.sneakers_brands.forEach(image => {
                const marca = image.split("/")[3];
                snkBranchs.insertAdjacentHTML('beforeend', `<div class="brands_div"><img src="${image}" onclick="pageChange('${marca}')"></img></div>`);
            });
        })
        .catch(error => {
            console.error('Error al cargar las imágenes de las marcas de zapatillas:', error);
        });
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
                    const  nbSneakers = data.sneakers_nb || [];
                    mostrarZapatillas(nbSneakers);
                    break;
                case "adidas.png":
                    const adidasSneakers = data.sneakers_adidas || [];
                    mostrarZapatillas(adidasSneakers);
                    break;
            }
        })
        .catch(error => {
            console.error('Error al cargar las zapatillas:', error);
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