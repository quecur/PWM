import { CUSTOM_ELEMENTS_SCHEMA, Component, OnInit, PlatformRef } from '@angular/core';
import { RouterLink } from '@angular/router';
import {IonicModule} from '@ionic/angular';
import { ProductsService } from './services/products.service';
import { Platform } from '@ionic/angular';
import { Device } from '@capacitor/device';
import { SqliteService } from './services/sqlite.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [ RouterLink, IonicModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppComponent implements OnInit{
  isLoggedIn: boolean = false;
  isWeb: boolean = false;
  load: boolean = false;

  constructor(private productService: ProductsService, private platform: Platform, private sqlite: SqliteService) {}

  ngOnInit() {
    this.productService.getUser().then((user) => {
      this.isLoggedIn = !!user; // Si hay un usuario, isLoggedIn será true
    }).catch((error) => {
      console.error('Error getting user:', error);
    });
    this.initApp();
  }

  initApp() {
    this.platform.ready().then( async () => {
      const info = await Device.getInfo();
      this.isWeb = info.platform == 'web';
      this.sqlite.init();
      this.sqlite.dbReady.subscribe((ready: boolean) => { this.load = ready; });
    });
  }
}
