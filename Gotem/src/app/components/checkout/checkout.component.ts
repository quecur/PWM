import { Component } from '@angular/core';
import {NavbarComponent} from "../navbar/navbar.component";
import {FooterComponent} from "../footer/footer.component";
import { Producto} from "../../interfaces/Producto";
import { CommonModule } from "@angular/common";

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [
    NavbarComponent,
    FooterComponent,
    CommonModule
  ],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})


export class CheckoutComponent {

  productos: Producto[] = [];
  Total: Number = 1000;
  constructor() {
    if (typeof sessionStorage !== 'undefined') {
      const productosGuardados = sessionStorage.getItem('carrito_productos');
      if (productosGuardados) {
        this.productos = JSON.parse(productosGuardados);
      }
    }
  }
  incrementarProducto(index: number): void {
    if (typeof sessionStorage !== 'undefined') {
      this.productos[index].cantidad++;
      this.actualizarProductos();
    } else {
      console.error('sessionStorage no está definido');
    }
  }
  decrementarProducto(index: number): void {
    if (typeof sessionStorage !== 'undefined') {
      if (this.productos[index].cantidad > 1) {
        this.productos[index].cantidad--;
        this.actualizarProductos();
      }
    } else {
      console.error('sessionStorage no está definido');
    }

  }

  eliminarProducto(index: number): void {
    if (typeof sessionStorage !== 'undefined') {
      this.productos.splice(index, 1);
      this.actualizarProductos();
    } else {
      console.error('sessionStorage no está definido');
    }
  }

  actualizarProductos(): void {
    if (typeof sessionStorage !== 'undefined') {
      sessionStorage.setItem('carrito_productos', JSON.stringify(this.productos));
    } else {
      console.error('sessionStorage no está definido');
    }
  }

    ngOnInit(): void {
  }

}
