
import { Routes } from '@angular/router';
import {HomeComponent} from './components/home/home.component';
import { SneakersComponent } from './components/sneakers/sneakers.component';
import { AuthenticityComponent } from './components/authenticity/authenticity.component';
import { AboutComponent } from './components/about/about.component';
import { BuyComponent } from './components/buy/buy.component';
import { CartComponent } from './components/cart/cart.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import {CheckoutComponent} from "./components/checkout/checkout.component";


export const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'sneakers', component: SneakersComponent},
  {path: 'authenticity', component: AuthenticityComponent},
  {path: 'about', component: AboutComponent},
  {path: 'buy', component: BuyComponent},
  {path: 'cart', component: CartComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'checkout', component: CheckoutComponent}
];
