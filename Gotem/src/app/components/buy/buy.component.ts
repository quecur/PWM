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
  nuevoProducto : Producto | null = null;
  marca : string | null = null;
  selectedSize: string = 'Size (EU):'; // Inicializa la talla seleccionada
  tallas: string[] = ['41', '42', '43', '44', '45', '46'];

  constructor() {
    if(typeof sessionStorage !== 'undefined') {
      let producto = sessionStorage.getItem('producto-temporal');
      if (producto) {
        this.nuevoProducto = JSON.parse(producto);
        if(this.nuevoProducto){
          const array = this.nuevoProducto.nombre.split(' ');
          if(array.slice(0, 1)[0] != 'New'){
            this.marca = array[0];
          } else {
            this.marca = array[0] + ' ' + array[1];
          }

        }
      }
    }
  }

  ngOnInit(): void {
    if (typeof window !== 'undefined' && window.sessionStorage) {
    }
  }

  addCart(){
        let size = document.querySelector('.size');
        if(size!=null && typeof sessionStorage !== 'undefined'){
          if(size.textContent == "Size (EU):"){
            alert("Por favor, seleccione una talla");
          }else{
              let productos: Producto[] = [];
              const productosGuardados = sessionStorage.getItem('carrito_productos');
              if (productosGuardados) {
                productos = JSON.parse(productosGuardados);
              }
              if(this.nuevoProducto){
                productos.push(this.nuevoProducto);
              }
              sessionStorage.setItem('carrito_productos', JSON.stringify(productos));


            window.location.href = '/checkout';
          }
        }
  }

  elegirTalla(tallaSeleccionada: string): void {
    this.selectedSize = "Size (EU): " + tallaSeleccionada;
  }
}
