/* Función que actualiza los campos necesarios para cada método de pago.
Primero, se ocultan todos los campos, luego se obtiene el seleecionado,
y, por último, se muestran los campos basándose en la selección. */
function updatePaymentFields() {
    document.getElementById('credit-card-fields').style.display = 'none';
    document.getElementById('paypal-fields').style.display = 'none';
    document.getElementById('bank-transfer-fields').style.display = 'none';

    var paymentOption = document.getElementById('payment-method').value;
    switch(paymentOption) {
        case 'credit-card':
            document.getElementById('credit-card-fields').style.display = 'block';
            break;
        case 'paypal':
            document.getElementById('paypal-fields').style.display = 'block';
            break;
        case 'bank-transfer':
            document.getElementById('bank-transfer-fields').style.display = 'block';
            break;
    }
}

// Listener para cambiar el método de pago del checkout
document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('payment-method')) {
        updatePaymentFields();
    }
});

/*Función que extrae del SessionStorage los datos del producto
seleccionado y los muestra en el Checkout. Para ello, se clona
el contenido del template y se rellena con la información. */
function checkout(){

    var imagen = sessionStorage.getItem('imagen_producto');
    var nombre = sessionStorage.getItem('nombre_producto');
    var precio = sessionStorage.getItem('precio_producto');

    if(imagen == null){
        console.log("Carrito vacío");
    }else{
        var template = document.getElementById('Checkout_temp').content.cloneNode(true);
        var imgElement = template.querySelector('.product-image');
        var nameTemplate = template.querySelector('.product-details h4');
        var precioTemplate = template.querySelector('.product-details p');

        imgElement.src = imagen;
        nameTemplate.textContent = nombre;
        precioTemplate.textContent = precio;
        

        var generalContainer = document.getElementById('shopping-product');
        generalContainer.appendChild(template); 
    }  
}

// Listener que carga los componentes del Checkout
document.addEventListener("DOMContentLoaded", function() {
    cargarContenido('/components/navbar.html','menu');
    cargarContenido('/components/checkout-temp.html','body_section')
        .then(() => {
            checkout();
        })
        .catch(error => {
            console.error('Error al cargar el contenido:', error);
        });
    cargarContenido('/components/footer.html','footer_end');
});