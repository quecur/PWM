
import { Routes } from '@angular/router';

export const routes: Routes = [
  {path: '', loadComponent: ()=>import('./navbar/navbar.component').then(m => m.NavbarComponent)},
  {path: 'home', loadComponent: ()=>import('./home/home.component').then(m => m.HomeComponent)}
];
