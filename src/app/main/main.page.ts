import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonButtons, IonMenuButton, IonImg, IonIcon, IonMenuToggle } from '@ionic/angular/standalone';
import { RouterLink } from '@angular/router';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
  standalone: true,
  imports: [IonIcon, IonImg, IonButtons, IonButton, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonMenuButton, IonMenuToggle, RouterLink]
})
export class MainPage implements OnInit {
  isLoggedIn: boolean = false;
  user: any;
  constructor(private productService: ProductsService) { }

  ngOnInit() {
    this.productService.getUser().then((user) => {
      this.isLoggedIn = !!user; // Si hay un usuario, isLoggedIn será true
      this.user = user;
    }).catch((error) => {
      console.error('Error getting user:', error);
    });
  }
  @ViewChild(IonContent, { static: false }) content: IonContent | undefined;
  scrollDown(pixels: number){
    if(this.content){
      this.content.scrollByPoint(0, 900, 1000); // (x, y, duration in ms)
    }
  }

}
