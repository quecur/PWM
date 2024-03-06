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
