function updatePaymentFields() {
    // Ocultar todos los campos primero
    document.getElementById('credit-card-fields').style.display = 'none';
    document.getElementById('paypal-fields').style.display = 'none';
    document.getElementById('bank-transfer-fields').style.display = 'none';

    // Obtener la opción seleccionada
    var paymentOption = document.getElementById('payment-method').value;

    // Mostrar campos basados en la selección
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

document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('payment-method')) {
        updatePaymentFields();
    }
});

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