import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonMenuButton, IonCardSubtitle, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonFab, IonFabButton, IonIcon, IonAlert, IonButton } from '@ionic/angular/standalone';
import { Product, ProductsService } from '../services/products.service';
import { AlertController } from '@ionic/angular';
import { RouterLink } from '@angular/router';
import { SqliteService } from '../services/sqlite.service';
import { CapacitorSQLite, capSQLiteChanges } from '@capacitor-community/sqlite';

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

  constructor(private productservice: ProductsService, private alertCtrl: AlertController, private sqlite: SqliteService) {
  }

  async ngOnInit() {
    this.productservice.getProducts().then((data) => {
      data.adidas.forEach((product: Product) => {
        product.favorite = false;
      });
      this.products = data.adidas;
    }).catch((error) => {
      console.error('Error al obtener productos:', error);
    });
    this.productservice.getUser().then((user) => {
      this.isLoggedIn = !!user; // Si hay un usuario, isLoggedIn será true
      this.user = user;
    }).catch((error) => {
      console.error('Error getting user:', error);
    });
  }

  async saveSnk(product: Product) {
    // Aquí se debería guardar y eliminar el producto en la base de datos SQLite
    product.favorite = !product.favorite; 
    const message = product.favorite ? 'Added to Favorites' : 'Removed from Favorites';
    const alert = await this.alertCtrl.create({
      header: product.name,
      message: message,
      buttons: ['OK'],
      cssClass: 'custom-alert'
    });
    await alert.present();   
    
    if(this.isLoggedIn){
      if(product.favorite){
        this.sqlite.create(product).then((response) =>{
          console.log('Product added to favorites', response);
        })}
    }
  }
}
