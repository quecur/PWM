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
  Total: number = 0;
  constructor() {
    if (typeof sessionStorage !== 'undefined') {
      const productosGuardados = sessionStorage.getItem('carrito_productos');
      if (productosGuardados) {
        this.productos = JSON.parse(productosGuardados);
      }
      this.Total = this.total();
    }
  }

  updatePaymentFields() {
    var credit_card = document.getElementById('credit-card-fields');
    var paypal = document.getElementById('paypal-fields');
    var banktransfer = document.getElementById('bank-transfer-fields');
    var paymentOption = document.getElementById('payment-method') as HTMLInputElement;
    var paymentAux = paymentOption.value;
    if(credit_card && paypal && banktransfer && paymentOption) {
      credit_card.style.display = 'none';
      paypal.style.display = 'none';
      banktransfer.style.display = 'none';
      switch (paymentAux) {
        case 'credit-card':
          credit_card.style.display = 'block';
          break;
        case 'paypal':
          paypal.style.display = 'block';
          break;
        case 'bank-transfer':
          banktransfer.style.display = 'block';
          break;
      }
    }
  }
  total() : number{
    let suma = 0;
    for (let i = 0; i < this.productos.length; i++) {
      suma += this.productos[i].precio * this.productos[i].cantidad; // Sumar cada elemento a la variable `suma`
    }
    return suma;
  }
  incrementarProducto(index: number): void {
    if (typeof sessionStorage !== 'undefined') {
      this.productos[index].cantidad++;
      this.Total = this.Total + this.productos[index].precio;
      this.actualizarProductos();
    } else {
      console.error('sessionStorage no está definido');
    }
  }
  decrementarProducto(index: number): void {
    if (typeof sessionStorage !== 'undefined') {
      if (this.productos[index].cantidad > 1) {
        this.productos[index].cantidad--;
        this.Total = this.Total - this.productos[index].precio;
        this.actualizarProductos();
      }
    } else {
      console.error('sessionStorage no está definido');
    }

  }

  eliminarProducto(index: number): void {
    if (typeof sessionStorage !== 'undefined') {
      this.Total = this.Total - (this.productos[index].precio * this.productos[index].cantidad);
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
