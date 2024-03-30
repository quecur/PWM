document.addEventListener("DOMContentLoaded", function() {
    cargarContenido('../components/navbar.html','menu')
    cargarContenido('../components/about-temp.html','body_section');
    cargarContenido('../components/footer.html','footer_end', function(){
        verificarEstadoInicioSesion();
    })
});