import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';

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
  
  cargarBuy(): void {
    this.imagen = sessionStorage.getItem('imagen_producto');
    this.nombre = sessionStorage.getItem('nombre_producto');
    this.precio = sessionStorage.getItem('precio_producto');
  }

  elegirTalla(tallaSeleccionada: string): void {
    this.selectedSize = "Size (EU): " + tallaSeleccionada;
  }
}
