import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-sneakers',
  standalone: true,
  imports: [NavbarComponent, FooterComponent],
  templateUrl: './sneakers.component.html',
  styleUrl: './sneakers.component.css'
})

export class SneakersComponent /*implements OnInit*/ {/*
  sneakers: any[] = []; // Aquí se cargarán los datos de las zapatillas

  constructor() {}

  ngOnInit(): void {
    // Simulación de carga de datos
    this.loadSneakers();
  }

  loadSneakers(): void {
    // Aquí implementarías la carga de datos desde una API o servicio
    this.sneakers = [{name: "Nike Air", price: "$100", image: "nike.png"}, ...];
  }

  buyProduct(sneaker): void {
    // Implementación del método para comprar producto
    sessionStorage.setItem('nombre_producto', sneaker.name);
    sessionStorage.setItem('precio_producto', sneaker.price);
    sessionStorage.setItem('imagen_producto', sneaker.image);
    // Redireccionar a la página de compra
  }*/
}

