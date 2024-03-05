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
