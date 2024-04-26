import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
import { Sneaker } from '../../interfaces/sneakers';
import { DbService } from '../../services/db.service';
import { SnkloaderService } from '../../services/snkloader.service';
import { Brand } from '../../interfaces/brands';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-sneakers',
  standalone: true,
  imports: [NavbarComponent, FooterComponent],
  providers: [DbService, SnkloaderService],
  templateUrl: './sneakers.component.html',
  styleUrl: './sneakers.component.css'
})

export class SneakersComponent implements OnInit{
  sneakers: Sneaker[] = [];
  brands: Brand[] = [];

  constructor(private dbservice: DbService, private snkloader: SnkloaderService, private http: HttpClient) {}

  ngOnInit(): void {
    this.loadbrands();
  }

  loadbrands(): void {
    const data = this.dbservice.getDataFromStorage('gs://gotem-2c6cc.appspot.com/brands.json');
    data.then((snk) => {
      snk.marcas.forEach((brand: any) => {
        this.brands.push(brand);
      });
    });
  }

  changeBrand(brand: Brand): void {
    const data = this.snkloader.loadSneakers(brand);
    this.sneakers = data;
  }
}