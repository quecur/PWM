
import { Routes } from '@angular/router';
import {HomeComponent} from './home/home.component';
import { SneakersComponent } from './sneakers/sneakers.component';

export const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'sneakers', component: SneakersComponent}
];
