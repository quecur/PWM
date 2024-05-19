import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonMenuButton, IonCardSubtitle, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonFab, IonFabButton, IonIcon, IonAlert, IonButton } from '@ionic/angular/standalone';
import { Product, ProductsService } from '../services/products.service';
import { AlertController } from '@ionic/angular';
import { RouterLink } from '@angular/router';
import { FavoriteService } from '../services/favorite.service';


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.page.html',
  styleUrls: ['./product-list.page.scss'],
  standalone: true,
  imports: [IonButton, IonAlert, IonIcon, IonFabButton, IonFab, IonCardContent, IonCardTitle, IonCardHeader, IonCard, IonCardSubtitle, IonButtons, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonMenuButton, RouterLink]
})
export class ProductListPage implements OnInit {

  products: Product[] = [];
  isLoggedIn: boolean = false;
  user: any;

  constructor(private productservice: ProductsService, private fvservice: FavoriteService, private alertController: AlertController) {
  }

  async ngOnInit() {
    this.fvservice.readSneakers().subscribe((products) => {
      this.products = products;
    }); // Se obtienen los productos de la base de datos
    this.productservice.getUser().then((user) => {
      this.isLoggedIn = !!user; // Si hay un usuario, isLoggedIn será true
      this.user = user;
    }).catch((error) => {
      console.error('Error getting user:', error);
    });
  }

  async saveSnk(product: Product) {
    const index = this.products.indexOf(product);
    console.log(product.favorite);
    product.favorite = !product.favorite;

      if (product.favorite) {
        await this.fvservice.createFavorite(index);
      } else {
        await this.fvservice.deleteFavorite(index);
      }
      this.products[index].favorite = product.favorite;
    }
}
