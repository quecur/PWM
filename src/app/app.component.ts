import { CUSTOM_ELEMENTS_SCHEMA, Component, OnInit, PlatformRef } from '@angular/core';
import { RouterLink } from '@angular/router';
import {IonicModule} from '@ionic/angular';
import { ProductsService } from './services/products.service';
import { Platform } from '@ionic/angular';
import { Device } from '@capacitor/device';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [ RouterLink, IonicModule],
})
export class AppComponent implements OnInit{
  isLoggedIn: boolean = false;

  constructor(private productService: ProductsService) {}

  ngOnInit() {
    this.productService.getUser().then((user) => {
      this.isLoggedIn = !!user; // Si hay un usuario, isLoggedIn será true
    }).catch((error) => {
      console.error('Error getting user:', error);
    });
  }
}
