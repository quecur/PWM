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

    async loadSneakers(brand?: Brand): Promise<Sneaker[]> {
      this.sneakers = [];
      
      if (!brand) {
        const [adidas, newBalance, nike] = await Promise.all([
          this.dbService.getDataFromStorage('gs://gotem-2c6cc.appspot.com/adidas.json'),
          this.dbService.getDataFromStorage('gs://gotem-2c6cc.appspot.com/nb.json'),
          this.dbService.getDataFromStorage('gs://gotem-2c6cc.appspot.com/nike.json')
        ]);

        this.sneakers = [...adidas.adidas, ...newBalance.nb, ...nike.nike];
      } else {
        switch (brand.name) {
          case 'Adidas':
            const adidasData = await this.dbService.getDataFromStorage('gs://gotem-2c6cc.appspot.com/adidas.json');
            adidasData.adidas.forEach((snk: any) => {
              this.sneakers.push(snk);
            });
            break;
          case 'NewBalance':
            const newBalanceData = await this.dbService.getDataFromStorage('gs://gotem-2c6cc.appspot.com/nb.json');
            newBalanceData.nb.forEach((snk: any) => {
              this.sneakers.push(snk);
            });
            break;
          case 'Nike':
            const nikeData = await this.dbService.getDataFromStorage('gs://gotem-2c6cc.appspot.com/nike.json');
            nikeData.nike.forEach((snk: any) => {
              this.sneakers.push(snk);
            });
            break;
        }
      }

      return this.sneakers;
    }    
}
