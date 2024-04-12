
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';  // Asegúrate de ajustar la ruta según sea necesario

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' }  // Redirige la ruta raíz a Home
];
