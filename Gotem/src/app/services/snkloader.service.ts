import { Injectable } from '@angular/core';
import { DbService } from './db.service';
import { Sneaker } from '../interfaces/sneakers';
import { Brand } from '../interfaces/brands';


@Injectable({
  providedIn: 'root'
})

export class SnkloaderService {
    public sneakers: Sneaker[] = [];
    constructor(private dbService: DbService) {}

    loadSneakers(brand: Brand): Sneaker[] {
      this.sneakers = [];
      console.log(brand.name);
      if (brand === undefined) return this.sneakers;
      
      switch (brand.name) {
        case 'Adidas':
          const adidasData = this.dbService.getDataFromStorage('gs://gotem-2c6cc.appspot.com/adidas.json');
          adidasData.then((snk) => {
            snk.adidas.forEach((snk: any) => {
              this.sneakers.push(snk);
            });
          });
          console.log(adidasData);
          break;
        case 'NewBalance':
          const newBalanceData = this.dbService.getDataFromStorage('gs://gotem-2c6cc.appspot.com/nb.json');
          newBalanceData.then((snk) => {
            snk.nb.forEach((snk: any) => {
              this.sneakers.push(snk);
            });
          });          
          break;
        case 'Nike':
          const nikeData = this.dbService.getDataFromStorage('gs://gotem-2c6cc.appspot.com/nike.json');
          nikeData.then((snk) => {
            snk.nike.forEach((snk: any) => {
              this.sneakers.push(snk);
            });
          });          
          break;
      }
      return this.sneakers;
    }
    
}
