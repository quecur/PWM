import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
import { Producto} from "../../interfaces/Producto";

@Component({
  selector: 'app-buy',
  standalone: true,
  imports: [CommonModule, NavbarComponent, FooterComponent],
  templateUrl: './buy.component.html',
  styleUrl: './buy.component.css'
})

export class BuyComponent {
  imagen: string | null = '';
  nombre: string | null = '';
  precio: string | null = '';
  selectedSize: string = 'Size (EU):'; // Inicializa la talla seleccionada
  tallas: string[] = ['41', '42', '43', '44', '45', '46'];

  constructor() { }

  ngOnInit(): void {
    if (typeof window !== 'undefined' && window.sessionStorage) {
      this.cargarBuy();
    }
  }

  addCart(){
        let size = document.querySelector('.size');
        if(size!=null && typeof sessionStorage !== 'undefined'){
          if(size.textContent == "Size (EU):"){
            alert("Por favor, seleccione una talla");
          }else{
            var imagen = sessionStorage.getItem('imagen_producto');
            var nombre = sessionStorage.getItem('nombre_producto');
            var precio = sessionStorage.getItem('precio_producto');
            var cantidad = 1;
            if(imagen!= null && nombre!=null && precio!=null){
              sessionStorage.setItem('imagen_producto', imagen);
              sessionStorage.setItem('nombre_producto', nombre);
              sessionStorage.setItem('precio_producto', precio);
              const nuevoProducto: Producto = {
                imagen: imagen,
                nombre: nombre,
                precio: precio,
                cantidad: cantidad
              };
              let productos: Producto[] = [];
              const productosGuardados = sessionStorage.getItem('carrito_productos');

              if (productosGuardados) {
                productos = JSON.parse(productosGuardados);
              }

              // Agrega el nuevo producto al array
              productos.push(nuevoProducto);

              // Guarda el array actualizado en sessionStorage
              sessionStorage.setItem('carrito_productos', JSON.stringify(productos));
            }
            window.location.href = '/checkout';
          }
        }
  }
  cargarBuy(): void {
    this.imagen = sessionStorage.getItem('imagen_producto');
    this.nombre = sessionStorage.getItem('nombre_producto');
    this.precio = sessionStorage.getItem('precio_producto');
  }

  elegirTalla(tallaSeleccionada: string): void {
    this.selectedSize = "Size (EU): " + tallaSeleccionada;
  }
}
