import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
import { Sneaker } from '../../interfaces/sneakers';
import { DbService } from '../../services/db.service';
import { SnkloaderService } from '../../services/snkloader.service';
import { Brand } from '../../interfaces/brands';
import { HttpClient } from '@angular/common/http';
import {Producto} from "../../interfaces/Producto";

@Component({
  selector: 'app-sneakers',
  standalone: true,
  imports: [NavbarComponent, FooterComponent],
  providers: [DbService, SnkloaderService],
  templateUrl: './sneakers.component.html',
  styleUrl: './sneakers.component.css'
})

export class SneakersComponent implements OnInit {
  sneakers: Sneaker[] = [];
  brands: Brand[] = [];

  constructor(private dbservice: DbService, private snkloader: SnkloaderService, private http: HttpClient) {}

  ngOnInit(): void {
    this.loadSneakers(); // Llama al método para cargar todas las zapatillas al iniciar la página
    this.loadBrands();
  }
  loadBuy(sneaker: Sneaker){
        const nuevoProducto: Producto = {
          imagen: sneaker.image,
          nombre: sneaker.name,
          precio: sneaker.price,
          cantidad: 1
        };
        if (nuevoProducto) {
          sessionStorage.setItem('producto-temporal', JSON.stringify(nuevoProducto));
          window.location.href = '/buy';
        }
  }
  loadBrands(): void {
    const data = this.dbservice.getDataFromStorage('gs://gotem-2c6cc.appspot.com/brands.json');
    data.then((snk) => {
      snk.marcas.forEach((brand: any) => {
        this.brands.push(brand);
      });
    });
  }

  changeBrand(brand: Brand): void {
    this.loadSneakers(brand); // Llama al método para cargar zapatillas de una marca específica
  }

  async loadSneakers(brand?: Brand): Promise<void> {
    try {
      this.sneakers = await this.snkloader.loadSneakers(brand); // Espera la resolución de la promesa
    } catch (error) {
      console.error('Error loading sneakers:', error);
    }
  }
}
