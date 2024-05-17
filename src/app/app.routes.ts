import { Routes } from '@angular/router';

export const routes: Routes = [
  {path: "", loadComponent: () => import('./main/main.page').then(m=>m.MainPage)},
  {path: "main", loadComponent: () => import('./main/main.page').then(m=>m.MainPage)},
  {path: 'product-list',loadComponent: () => import('./product-list/product-list.page').then( m => m.ProductListPage)},
  {path: 'login', loadComponent: () => import('./login/login.page').then( m => m.LoginPage)},
  {path: 'favorite', loadComponent: () => import('./favorite/favorite.page').then( m => m.FavoritePage)},
  {path: '**', redirectTo: 'main'},
];
