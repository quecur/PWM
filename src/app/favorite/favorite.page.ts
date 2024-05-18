import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Product, ProductsService } from '../services/products.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.page.html',
  styleUrls: ['./favorite.page.scss'],
  standalone: true,
  imports: [ IonicModule, CommonModule, FormsModule, RouterLink]
})
export class FavoritePage implements OnInit {
  isLoggedIn: boolean = false;
  user: any;
  favorites: Product[] = [];
  product: Product | undefined;

  constructor(private productService: ProductsService) { }

  ngOnInit() {
    this.productService.getUser().then((user) => {
      this.isLoggedIn = !!user;
      this.user = user;
    }).catch((error) => {
      console.error('Error getting user:', error);
    });
  }

  

}
