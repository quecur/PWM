
import { Routes } from '@angular/router';
import {HomeComponent} from './home/home.component';
import { SneakersComponent } from './sneakers/sneakers.component';
import { AuthenticityComponent } from './authenticity/authenticity.component';
import { AboutComponent } from './about/about.component';
import { BuyComponent } from './buy/buy.component';
import { CartComponent } from './cart/cart.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';


export const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'sneakers', component: SneakersComponent},
  {path: 'authenticity', component: AuthenticityComponent},
  {path: 'about', component: AboutComponent},
  {path: 'buy', component: BuyComponent},
  {path: 'cart', component: CartComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent}
];
