
import { Routes } from '@angular/router';
import {HomeComponent} from './home/home.component';
import { SneakersComponent } from './sneakers/sneakers.component';
import { AuthenticityComponent } from './authenticity/authenticity.component';
import { AboutComponent } from './about/about.component';
import { CartComponent } from './cart/cart.component';

export const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'sneakers', component: SneakersComponent},
  {path: 'authenticity', component: AuthenticityComponent},
  {path: 'about', component: AboutComponent},
  {path: 'cart', component: CartComponent}
];
